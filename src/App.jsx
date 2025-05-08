import './App.css'
import {Dish} from "./component/Dish.jsx";
import React, {useEffect, useState} from "react";

function App() {
    const [dish, setDish] = useState(() => {
        const saved = localStorage.getItem('dish');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('dish', JSON.stringify(dish));
    }, [dish]);

    const [edit, setEdit] = useState({dishId: null, productId: null, value: ''});

    function updateProduct(dishId, productId, newValue) {
        setDish(prev =>
            prev.map(d =>
                d.id === dishId
                    ? {
                        ...d,
                        products: d.products.map(p =>
                            p.id === productId ? {...p, name: newValue} : p
                        ),
                    }
                    : d
            )
        );
        setEdit({dishId: null, productId: null, value: ''});
    }

    function handleSubmit(di) {
        setDish(prev => [di, ...prev]);
    }

    function deleteDish(id) {
        setDish(res => res.filter(r => r.id !== id));
    }

    function deleteProduct(dishId, productId) {
        setDish(prev =>
            prev.map(d => {
                if (d.id === dishId) {
                    return {
                        ...d,
                        products: d.products.filter(p => p.id !== productId)
                    };
                }
                return d;
            })
        );
    }

    const groupedByDate = dish.reduce((acc, d) => {
        const dateKey = new Date(d.date).toLocaleDateString('ru-RU');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(d);
        return acc;
    }, {});

    return (
        <>
            <h1 className="title">🍽️ План питания</h1>
            <Dish handleSubmit={handleSubmit} setDish={setDish} />

            {Object.entries(groupedByDate).map(([date, dishesByDate]) => (
                <div key={date}>
                    <h2>{date}</h2>
                    {['Завтрак', 'Обед', 'Ужин'].map(mealType => {
                        const filtered = dishesByDate.filter(d => d.sel === mealType);
                        if (filtered.length === 0) return null;

                        const emoji = {
                            'Завтрак': '🥣',
                            'Обед': '🍽',
                            'Ужин': '🌙'
                        };

                        return (
                            <div key={mealType}>
                                <h3>{emoji[mealType]} {mealType}</h3>
                                <ul>
                                    {filtered.map(d => (
                                        <li key={d.id}>
                                            {d.text} - {d.number} ккал
                                            <button className="button-prod" onClick={() => deleteDish(d.id)}>❌</button>
                                            <ul>
                                                {d.products?.map(prod => (
                                                    <li key={prod.id}>
                                                        {edit.dishId === d.id && edit.productId === prod.id ? (
                                                            <input
                                                                autoFocus
                                                                value={edit.value}
                                                                onChange={e => setEdit({...edit, value: e.target.value})}
                                                                onBlur={() => updateProduct(d.id, prod.id, edit.value)}
                                                                onKeyDown={e => {
                                                                    if (e.key === 'Enter') {
                                                                        updateProduct(d.id, prod.id, edit.value);
                                                                    }
                                                                }}
                                                            />
                                                        ) : (
                                                            <span
                                                                onDoubleClick={() =>
                                                                    setEdit({
                                                                        dishId: d.id,
                                                                        productId: prod.id,
                                                                        value: prod.name
                                                                    })
                                                                }
                                                            >
                                                                🍎{prod.name}
                                                            </span>
                                                        )}
                                                        <button className="button-prod" onClick={() => deleteProduct(d.id, prod.id)}>❌</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    );
}

export default App;