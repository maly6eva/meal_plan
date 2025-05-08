import './App.css'
import {Dish} from "./component/Dish.jsx";
import React, {useEffect, useState} from "react";


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

    function deleteDish(id) {
        setDish((res) => res.filter((r) => r.id !== id))
    }

    function deleteProduct(dishId, productId) {
        setDish(prev =>
        prev.map(d => {
            if (d.id === dishId) {
                return {
                    ...d,
                    products: d.products.filter(p  => p.id !== productId)
                }
            }
            return d;
        }))
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
                            <button onClick={() => deleteDish(d.id)}>X</button>
                       <ul>
                           {d.products?.map((prod) => (
                               <li key={prod.id}>🍎{prod.name}
                                   <button  onClick={() => deleteProduct(d.id, prod.id)}>X</button>
                               </li>
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
