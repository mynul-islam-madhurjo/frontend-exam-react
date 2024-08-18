import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from './components/Calender';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Calendar />} />
                    <Route path="/year/:year/month/:month" element={<Calendar />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
