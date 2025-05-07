import React, {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export const Dish = ({handleSubmit}) => {
    const [text, setText] = useState('')
    const [sel, setSel] = useState('Завтрак')
    const [date, setDate] = useState(null)
    const [number, setNumber] = useState(null)


    function handleChange(e) {
        e.preventDefault()
        if (!text.trim() || !date) return

        const newDish = {
            id: Date.now(),
            text,
            sel,
            date,
            number,
            com: false
        }
        handleSubmit(newDish)
        setText('')
        setSel('Завтрак')
        setDate(null)
        setNumber('')
    }


    return (
        <form onSubmit={handleChange}>
            <DatePicker selected={date} placeholderText='-Выбери дату-' onChange={(newDate) => setDate(newDate)}
                        dateFormat='dd.MM.yyyy' locale='ru'/>
            <select value={sel} onChange={(e) => setSel(e.target.value)}>
                <option value="Завтрак">Завтрак</option>
                <option value="Обед">Обед</option>
                <option value="Ужин">Ужин</option>
            </select>
            <input type="text" placeholder='название блюда...' value={text} onChange={(e) => setText(e.target.value)}/>
            <input type="number" placeholder='0 ккал' value={number} onChange={(e) => setNumber(Number(e.target.value))}/>
            <button>Добавить!</button>
        </form>
    );
};

