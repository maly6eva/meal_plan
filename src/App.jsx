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


    const [edit, setEdit] = useState({dishId: null, productId: null, value: ''})

    function updateProduct(dishId, productId, newValue) {
        setDish(prev =>
            prev.map(d =>
                d.id === dishId
                    ? {
                        ...d,
                        products: d.products.map(p =>
                            p.id === productId ? {
                                ...p, name: newValue
                            } : p
                        ),
                    }
                    : d
            )
        );
        setEdit({dishId: null, productId: null, value: ''})
    }



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
            <h1 className='title'>🍽️ План питания</h1>
            <Dish handleSubmit={handleSubmit} setDish={setDish}/>
            <ul>
                {dish.map((d) => {
                    return (
                        <li key={d.id}>
                            {d.date ? new Date(d.date).toLocaleDateString('ru-RU') : 'Дата не выбрана'} - {d.sel} - {d.text} - {d.number} ккал
                            <button onClick={() => deleteDish(d.id)}>X</button>
                       <ul>
                           {d.products?.map((prod) => (
                               <li key={prod.id}>
                                   {edit.dishId === d.id && edit.productId === prod.id ? (
                                       <input
                                           autoFocus
                                           value={edit.value}
                                           onChange={(e) => setEdit({...edit, value: e.target.value}) }
                                           onBlur={() => updateProduct(d.id, prod.id, edit.value)}
                                           onKeyDown={(e) => {
                                               if(e.key === 'Enter') {
                                                   updateProduct(d.id, prod.id, edit.value)
                                           }}}
                                           />
                                   ) : (
                                       <span
                                           onDoubleClick={() =>
                                       setEdit({
                                           dishId: d.id,
                                           productId: prod.id,
                                           value: prod.name,
                                       })}
                                       >🍎{prod.name}</span>
                                   )}

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
