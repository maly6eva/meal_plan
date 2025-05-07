import './App.css'
import {Dish} from "./component/Dish.jsx";
import {useEffect, useState} from "react";


function App() {
    const [dish, setDish] = useState(() => {
        const saved = localStorage.getItem('dish')
        return saved ? JSON.parse(saved) : []
    });

    useEffect(() => {
        localStorage.setItem('dish', JSON.stringify(dish))
    }, [dish])

    function handleSubmit(di) {
        setDish((prev) => [di, ...prev]);
    }


    return (
        <>
            <h1>🍽️ План питания</h1>
            <Dish handleSubmit={handleSubmit} setDish={setDish}/>
            <ul>
                {dish.map((d) => {
                    return (
                        <li key={d.id}>
                            {d.date ? new Date(d.date).toLocaleDateString('ru-RU') : 'Дата не выбрана'} - {d.sel} - {d.text} - {d.number} ккал
                       <ul>
                           {d.products?.map((prod, i) => (
                               <li key={i}>🍎{prod}</li>
                           ))}
                       </ul>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default App
