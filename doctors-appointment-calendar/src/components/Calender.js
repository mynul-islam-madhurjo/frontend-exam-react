import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 8px;
    padding: 16px;
`;

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 20px;  // Adds some space between the header and the calendar grid
`;

const DayCell = styled.div`
    border: 1px solid #ccc;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
`;

const AppointmentsContainer = styled.div`
    width: 100%;
    overflow-y: auto;
    max-height: 120px;
`;

const Appointment = styled.div`
    min-height: 20px;
    width: 95%;
    padding: 2px 5px;
    margin: 2px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
};

// Dummy data for appointments
const initialAppointments = [
    { id: 1, day: 1, time: '09:00 AM', title: 'Dental Checkup', description: 'Routine dental check at Green Dental Clinic.' },
    { id: 2, day: 1, time: '12:00 PM', title: 'Meeting with Mr. Smith Jackson', description: 'Discuss quarterly business results and projections.' },
    { id: 3, day: 1, time: '01:00 PM', title: 'Dental Checkup', description: 'Follow-up dental treatment for cavity filling.' },
    { id: 4, day: 1, time: '02:00 PM', title: 'Meeting with Jake', description: 'Plan upcoming marketing campaign strategies.' },
    { id: 5, day: 2, time: '02:00 PM', title: 'Lunch with Surgeon', description: 'Casual lunch to discuss collaborative opportunities.' },
    // Add more appointments as needed
];

function Calendar() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = [2019, 2020, 2021];

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleMonthChange = (e) => {
        setMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value));
    };

    const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
    const totalDays = daysInMonth(month, year);

    const renderDays = () => {
        let days = [];
        for (let day = 1; day <= totalDays; day++) {
            const dailyAppointments = initialAppointments.filter(app => app.day === day);
            days.push(
                <DayCell key={day}>
                    <strong>Day {day}</strong>
                    <AppointmentsContainer>
                        {dailyAppointments.map(app => (
                            <Appointment key={app.id} onClick={() => openModal(app)}>
                                {app.time} - {app.title}
                            </Appointment>
                        ))}
                    </AppointmentsContainer>
                </DayCell>
            );
        }
        return days;
    };

    return (
        <div>
            <CalendarHeader>
                <select value={month} onChange={handleMonthChange}>
                    {months.map(m => (
                        <option key={m} value={m}>
                            {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
                <select value={year} onChange={handleYearChange}>
                    {years.map(y => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </CalendarHeader>
            <CalendarContainer>
                {renderDays()}
            </CalendarContainer>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Appointment Details">
                <h2>Appointment Details</h2>
                {selectedAppointment ? (
                    <div>
                        <p><strong>Time:</strong> {selectedAppointment.time}</p>
                        <p><strong>Title:</strong> {selectedAppointment.title}</p>
                        <p><strong>Description:</strong> {selectedAppointment.description}</p>
                    </div>
                ) : <p>No details available.</p>}
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
}

export default Calendar;
