import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);  // 7 days for a week
    grid-gap: 8px;
    padding: 16px;
`;

const DayCell = styled.div`
    border: 1px solid #ccc;
    height: 150px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background-color: ${props => props.isToday ? '#e3f2fd' : '#fff'};
    &:hover {
        background-color: #f0f0f0;
    }
`;

const Appointment = styled.div`
    min-height: 20px;
    margin-bottom: 2px;
    padding: 2px;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
        background-color: #e9e9e9;
        outline: none;
        border-radius: 2px;
    }
`;

const MoreAppointments = styled.div`
  overflow-y: auto;  
  max-height: 90px;  
`;

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState([
        { id: 1, day: 1, time: '09:00 AM', title: 'Dental Checkup' },
        { id: 2, day: 1, time: '12:00 PM', title: 'Meeting with Mr. Smith Jackson' },
        { id: 1, day: 1, time: '01:00 PM', title: 'Dental Checkup' },
        { id: 2, day: 1, time: '02:00 PM', title: 'Meeting with jake' },
        { id: 3, day: 2, time: '02:00 PM', title: 'Lunch with Surgeon' },
    ]);

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getAppointmentsForDay = (day) => {
        return appointments
            .filter(appointment => appointment.day === day)
            .sort((a, b) => new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`));
    };

    const renderDays = () => {
        const totalDays = daysInMonth(currentDate);
        let days = [];
        for (let i = 1; i <= totalDays; i++) {
            const dailyAppointments = getAppointmentsForDay(i);
            days.push(
                <DayCell key={i}>
                    <strong>{i}</strong>
                    <MoreAppointments>
                        {dailyAppointments.map(app => (
                            <Appointment key={app.id}>
                                {app.time} - {app.title}
                            </Appointment>
                        ))}
                    </MoreAppointments>
                </DayCell>
            );
        }
        return days;
    };

    return (
        <CalendarContainer>
            {renderDays()}
        </CalendarContainer>
    );
}

export default Calendar;
