import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import styled from 'styled-components';
import { addAppointment } from '../features/appointmentsSlice';

const ScrollableAppointmentList = styled.div`
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
`;

const AppointmentItem = styled.div`
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

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
    margin-bottom: 20px;
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

function Calendar() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const { year, month } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appointments = useSelector(state => state.appointments);

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = [2019, 2020, 2021, 2022, 2023, 2024];

    useEffect(() => {
        if (!year || !month) {
            const currentDate = new Date();
            navigate(`/year/${currentDate.getFullYear()}/month/${currentDate.getMonth() + 1}`);
        }
    }, [month, year, navigate]);

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCreateModalOpen(false);
    };

    const onSubmit = data => {
        const appointmentDate = new Date(`${data.date}T${data.time}`);
        dispatch(addAppointment({
            ...data,
            id: Date.now(),
            date: appointmentDate.toISOString(),
            day: appointmentDate.getDate(),
            month: appointmentDate.getMonth() + 1,
            year: appointmentDate.getFullYear()
        }));
        closeModal();
        reset();
    };

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value);
        navigate(`/year/${year}/month/${newMonth}`);
    };

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value);
        navigate(`/year/${newYear}/month/${month}`);
    };

    const daysInMonth = (month, year) => new Date(year, parseInt(month), 0).getDate();
    const totalDays = daysInMonth(month, year);

    const renderDays = () => {
        let days = [];
        for (let day = 1; day <= totalDays; day++) {
            const dailyAppointments = appointments.filter(app =>
                app.year === parseInt(year) &&
                app.month === parseInt(month) &&
                app.day === day
            ).sort((a, b) => new Date(a.date) - new Date(b.date));

            days.push(
                <DayCell key={day}>
                    <strong>Day {day}</strong>
                    <AppointmentsContainer>
                        {dailyAppointments.slice(0, 3).map((app, index) => (
                            <Appointment key={index} onClick={() => openModal(app)}>
                                {`${new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${app.name}`}
                            </Appointment>
                        ))}
                        {dailyAppointments.length > 3 && (
                            <Appointment onClick={() => openModal({ day, appointments: dailyAppointments, isMore: true })}>
                                {`+ ${dailyAppointments.length - 3} more`}
                            </Appointment>
                        )}
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
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
                <button onClick={() => setCreateModalOpen(true)}>Create Appointment</button>
            </CalendarHeader>
            <CalendarContainer>
                {renderDays()}
            </CalendarContainer>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Appointment Details">
                <h2>Appointment Details</h2>
                {selectedAppointment ? (
                    selectedAppointment.isMore ? (
                        <div>
                            <h5>All Appointments for Day {selectedAppointment.day}</h5>
                            <ScrollableAppointmentList>
                                {selectedAppointment.appointments.map((app, index) => (
                                    <AppointmentItem key={index}>
                                        <p><strong>Name:</strong> {app.name}</p>
                                        <p><strong>Time:</strong> {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p><strong>Gender:</strong> {app.gender}</p>
                                        <p><strong>Age:</strong> {app.age}</p>
                                    </AppointmentItem>
                                ))}
                            </ScrollableAppointmentList>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Name:</strong> {selectedAppointment.name}</p>
                            <p><strong>Time:</strong> {new Date(selectedAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p><strong>Gender:</strong> {selectedAppointment.gender}</p>
                            <p><strong>Age:</strong> {selectedAppointment.age}</p>
                        </div>
                    )
                ) : <p>No details available.</p>}
                <button onClick={closeModal}>Close</button>
            </Modal>
            <Modal isOpen={createModalOpen} onRequestClose={closeModal} style={customStyles}>
                <h2>Create New Appointment</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} placeholder="Name" required />
                    <select {...register("gender")} required>
                        <option value="">Select Gender...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="number" {...register("age")} placeholder="Age" required />
                    <input type="date" {...register("date")} required />
                    <input type="time" {...register("time")} required />
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Calendar;
