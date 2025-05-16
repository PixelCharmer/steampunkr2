import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/backgrounds/room2.png';
import '../styles/Room2.scss';

import frag1 from '../assets/game-elements/tink_frag1.png';
import frag2 from '../assets/game-elements/tink_frag2.png';
import frag3 from '../assets/game-elements/tink_frag3.png';
import frag4 from '../assets/game-elements/tink_frag4.png';
import frag5 from '../assets/game-elements/tink_frag5.png';
import frag6 from '../assets/game-elements/tink_frag6.png';

const imageFragments = [
    { id: 'frag1', src: frag1, x: '10%', y: '20%' },
    { id: 'frag2', src: frag2, x: '70%', y: '25%' },
    { id: 'frag3', src: frag3, x: '20%', y: '70%' },
    { id: 'frag4', src: frag4, x: '80%', y: '65%' },
    { id: 'frag5', src: frag5, x: '35%', y: '45%' },
    { id: 'frag6', src: frag6, x: '60%', y: '75%' }
];

export default function Room2() {
    const [found, setFound] = useState([]);
    const navigate = useNavigate();

    const handleFragmentClick = (id) => {
        if (!found.includes(id)) {
            setFound((prev) => [...prev, id]);
        }
    };

    return (
        <div className="room2" style={{ backgroundImage: `url(${background})` }}>
            <h2 className="objective">Find all 6 hidden blueprint parts</h2>
            {/* Hidden fragment click zones */}
            {imageFragments.map((frag) =>
                !found.includes(frag.id) ? (
                    <div
                        key={frag.id}
                        className="click-zone"
                        style={{ top: frag.y, left: frag.x }}
                        onClick={() => handleFragmentClick(frag.id)}
                        title="You see something unusual..."
                    ></div>
                ) : null
            )}

            {/* Recovered pieces UI */}
            <div className="assembly">
                <h3>Recovered Fragments</h3>
                <div className="fragments">
                    {found.map((id) => {
                        const frag = imageFragments.find((f) => f.id === id);
                        return <img key={id} src={frag.src} alt={`Fragment ${id}`} />;
                    })}
                </div>
            </div>

            {/* Show 'Begin Assembly' button when all are found */}
            {found.length === imageFragments.length && (
                <div className="begin-button">
                    <button onClick={() => navigate('/Room2Assemble')}>Begin Assembly</button>
                </div>
            )}
        </div>
    );
}
