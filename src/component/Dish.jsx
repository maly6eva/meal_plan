import React, {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export const Dish = ({handleSubmit}) => {
    const [text, setText] = useState('')
    const [sel, setSel] = useState('Завтрак')
    const [date, setDate] = useState(null)
    const [number, setNumber] = useState('')
    const [products, setProducts] = useState('')


    function handleChange(e) {
        e.preventDefault()
        if (!text.trim() || !date) return

        const newDish = {
            id: Date.now(),
            text,
            sel,
            date,
            number,
            products: products.split(',').map(p => p.trim()),
            com: false
        }
        handleSubmit(newDish)
        setText('')
        setSel('Завтрак')
        setDate(null)
        setNumber('')
        setProducts('')
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

            <div>
                <input type="text" placeholder='placeholder="продукты (через запятую)"' value={products} onChange={(e) => setProducts(e.target.value)}/>
            </div>


        </form>
    );
};

