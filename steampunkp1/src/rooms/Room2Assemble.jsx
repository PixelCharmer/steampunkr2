import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Room2Assemble.scss';

import frag1 from '../assets/game-elements/tink_frag1.png';
import frag2 from '../assets/game-elements/tink_frag2.png';
import frag3 from '../assets/game-elements/tink_frag3.png';
import frag4 from '../assets/game-elements/tink_frag4.png';
import frag5 from '../assets/game-elements/tink_frag5.png';
import frag6 from '../assets/game-elements/tink_frag6.png';

const fragments = [
    { id: 'frag1', src: frag1 },
    { id: 'frag2', src: frag2 },
    { id: 'frag3', src: frag3 },
    { id: 'frag4', src: frag4 },
    { id: 'frag5', src: frag5 },
    { id: 'frag6', src: frag6 }
];

export default function Room2Assemble() {
    const [positions, setPositions] = useState(
        fragments.reduce((acc, frag, index) => {
            acc[frag.id] = { x: 100 + index * 120, y: 100 };
            return acc;
        }, {})
    );

    const [selections, setSelections] = useState(['', '', '']);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const CORRECT_COMBO = ['BIOLOCK', 'CRYOGEL', 'FISSION-ALERT'];
    const options = ['BIOLOCK', 'CRYOGEL', 'NEUROSEAL', 'FISSION-ALERT', 'STEAM-FLUX', 'QUARANTINE-42'];

    const containerRef = useRef(null);
    const dragItem = useRef(null);
    const dragOffset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e, id) => {
        dragItem.current = id;

        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const xInContainer = e.clientX - containerRect.left;
        const yInContainer = e.clientY - containerRect.top;

        const currentPos = positions[id];

        dragOffset.current = {
            x: xInContainer - currentPos.x,
            y: yInContainer - currentPos.y
        };
    };

    const handleMouseMove = (e) => {
        if (!dragItem.current || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - containerRect.left - dragOffset.current.x;
        const y = e.clientY - containerRect.top - dragOffset.current.y;

        setPositions((prev) => ({
            ...prev,
            [dragItem.current]: { x, y }
        }));
    };

    const handleMouseUp = () => {
        if (dragItem.current) {
            const id = dragItem.current;
            dragItem.current = null;

            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('glow');
                void element.offsetWidth; // force reflow
                element.classList.add('glow');
            }

            // No snapping — preserve position
            setPositions((prev) => ({
                ...prev
            }));
        }
    };

    const handleChange = (index, value) => {
        const updated = [...selections];
        updated[index] = value;
        setSelections(updated);
        setError(false);
    };

    const handleSubmit = () => {
        if (JSON.stringify(selections) === JSON.stringify(CORRECT_COMBO)) {
            setTimeout(() => {
                window.location.href = 'https://steampunkp2.netlify.app/';
            }, 2000);
        } else {
            setError(true);
        }
    };

    const handleReset = () => {
        setSelections(['', '', '']);
        setError(false);
    };

    return (
        <div
            className="room2-assemble"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <h2>Assemble the image to reveal the hidden words</h2>
            <h4>Click to select a piece then drag the pieces to the correct position.</h4>
            <h4>Once you have all 3 words, enter them in the dropdowns below.</h4>

            <div className="drag-area">
                {fragments.map((frag) => (
                    <img
                        key={frag.id}
                        id={frag.id}
                        src={frag.src}
                        alt={frag.id}
                        style={{
                            position: 'absolute',
                            width: 'auto',
                            top: positions[frag.id].y,
                            left: positions[frag.id].x,
                            cursor: 'grab',
                            userSelect: 'none',
                            margin: 0,
                            padding: 0,
                            display: 'block',
                            border: 'none',
                            background: 'none'
                        }}
                        onMouseDown={(e) => handleMouseDown(e, frag.id)}
                    />
                ))}
            </div>

            <div className="code-entry">
                <h3>Enter the 3 hidden words</h3>
                <p> Placed in order from highest to lowest</p>
                <div className="dropdowns">
                    {selections.map((val, idx) => (
                        <select key={idx} value={val} onChange={(e) => handleChange(idx, e.target.value)}>
                            <option value="">-- Select --</option>
                            {options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ))}
                </div>

                <div className="buttons">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleReset}>Reset</button>
                </div>

                {error && <p className="error">❌ Incorrect combination. Try again.</p>}
            </div>
        </div>
    );
}
