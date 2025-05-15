import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Room2Intro from './rooms/Room2Intro';
import Room2 from './rooms/Room2';
import Room2Assemble from './rooms/Room2Assemble';


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Room2Intro />} />
                <Route path="/room2" element={<Room2 />} />
                <Route path="/room2assemble" element={<Room2Assemble />} />
            </Routes>
        </Router>
    );
}
