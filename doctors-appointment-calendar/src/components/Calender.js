import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr); // 7 days for a week
    grid-gap: 8px;
    padding: 16px;
`;

const DayCell = styled.div`
  border: 1px solid #ccc;
  height: 100px; // Fixed height for each cell
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const renderDays = () => {
        const totalDays = daysInMonth(currentDate);
        let days = [];
        for (let i = 1; i <= totalDays; i++) {
            days.push(
                <DayCell key={i}>
                    {i}
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
