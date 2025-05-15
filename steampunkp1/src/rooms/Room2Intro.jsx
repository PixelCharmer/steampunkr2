import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/backgrounds/room2intro.png';
import '../styles/Room2Intro.scss';

export default function Room2Intro() {
    const navigate = useNavigate();

    return (
        <div className="room2intro" style={{ backgroundImage: `url(${background})` }}>
            <div className="intro-content">
                <p>
                    The next room is quieter, but no less unnerving. Shelves sag under the weight of aged schematics and sprawling scrolls. Mechanical arms still twitch as they draft loops of ink across parchment. The air crackles faintly with static, as if memory itself resides in the margins.
                    <br />
                    <br />  
                    At the center: the Professor's master drafting table. Notes scrawled in frantic handwriting are pinned alongside precise designs. It's clear he was working on something something massive. But the blueprints are fragmented, coded, and out of order.
                    <br />
                    <br />  
                    This chamber requires clarity of thought and keen observation. Reconstruct the plans in their correct sequence and decode the hidden symbols laced into the schematics. Only then will the vault to the next chamber open.
                    <br />
                    <br />  
                    "Schematics deceive the untrained eye. Look not for lines - but for what lies between them."
                </p>
                <button onClick={() => navigate('/room2')}>Enter The Drafting Room</button>
            </div>
        </div>
    );
}
