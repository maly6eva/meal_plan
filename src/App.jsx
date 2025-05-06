import './App.css'
import {Dish} from "./component/Dish.jsx";
import {useState} from "react";


function App() {
    const [dish, setDish] = useState([]);


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
                            {d.date ? d.date.toLocaleDateString('ru-Ru') : 'Дата не выбрана'} - {d.sel} - {d.text} - {d.number} ккал
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default App
