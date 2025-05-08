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
            products: products.split(',').map(p => ({
                id: Date.now() + Math.random(),
                name: p.trim()
            })),
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
        <form onSubmit={handleChange} className={'form'}>
          <div>
              <label className="form-label">
                  Выбери дату
                  <DatePicker selected={date} placeholderText='-Выбери дату-' onChange={(newDate) => setDate(newDate)}
                              dateFormat='dd.MM.yyyy' locale='ru'/>
              </label>
          </div>
          <div>
              <label>
                  Выбери прием пищи
                  <select value={sel} onChange={(e) => setSel(e.target.value)}>
                      <option value="Завтрак">Завтрак</option>
                      <option value="Обед">Обед</option>
                      <option value="Ужин">Ужин</option>
                  </select>
              </label>
          </div>
            <div>
                <label>
                    Какое название блюда?
                    <input type="text" placeholder='название блюда...' value={text} onChange={(e) => setText(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Колличество ккал в блюде
                    <input type="number" placeholder='0 ккал' value={number} onChange={(e) => setNumber(Number(e.target.value))}/>
                </label>
            </div>
            <div>
                    <label htmlFor="description">    Ингридиенты</label>
                    <textarea
                        id="description"
                        rows="4"
                        cols="50"
                        placeholder="продукты (через запятую)"
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}></textarea>
            </div>
            <button>Добавить!</button>
        </form>
    );
};

