import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function TestCalendar() {
    const [date, setDate] = useState(null);

    return (
        <div style={{ padding: '50px' }}>
            <h2>Тест календаря</h2>
            <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                placeholderText="Выбери дату"
                dateFormat="dd.MM.yyyy"
                locale="ru"
            />
        </div>
    );
}