import './App.css'
import {Dish} from "./component/Dish.jsx";
import React, {useEffect, useState} from "react";

function App() {
    const [dish, setDish] = useState(() => {
        try {
            const saved = localStorage.getItem('dish');
            const parsed = saved ? JSON.parse(saved) : [];
            return Array.isArray(parsed) ? parsed : []
        } catch (e) {
            console.error('Ошибка при чтении из localStorage: ', e)
            return []
        }

    });

    useEffect(() => {
        localStorage.setItem('dish', JSON.stringify(dish));
    }, [dish]);

    const [edit, setEdit] = useState({dishId: null, productId: null, value: ''});
    const [newProducts, setNewProducts] = useState({})

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

    const groupedByDate = Array.isArray(dish)
        ? dish.reduce((acc, d) => {
            const dateKey = new Date(d.date).toLocaleDateString('ru-RU');
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(d);
            return acc;
        }, {})
        : {};

    function addProduct(dishId, productName) {
        const newProduct = {
            id: Date.now(),
            name: productName
        }

        setDish(prev => {
            return (
                prev.map(d =>
                    d.id === dishId
                        ? {...d, products: [...d.products, newProduct]}
                        : d
                )
            )
        })
    }

    return (
        <>
            <h1 className="title">🍽️ План питания</h1>
            <Dish handleSubmit={handleSubmit} setDish={setDish}/>

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
                                            <button
                                                className="button-prod"
                                                onClick={() => deleteDish(d.id)}
                                                >❌</button>
                                            <ul>
                                                {d.products?.map(prod => (
                                                    <li key={prod.id}>
                                                        {edit.dishId === d.id && edit.productId === prod.id ? (
                                                            <input
                                                                autoFocus
                                                                value={edit.value}
                                                                onChange={e => setEdit({
                                                                    ...edit,
                                                                    value: e.target.value
                                                                })}
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
                                                        <button
                                                            className="button-prod"
                                                            onClick={() => deleteProduct(d.id, prod.id)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    deleteProduct(d.id, prod.id); // Выполним действие при нажатии Enter
                                                                }
                                                            }}
                                                            tabIndex="0" // добавляем tabIndex для доступности кнопки
                                                        >
                                                            ❌
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                            <input
                                                type='text'
                                                placeholder='Добавить ингридиент'
                                                value={newProducts[d.id] || ''}
                                                onChange={(e) =>
                                                    setNewProducts({...newProducts, [d.id]: e.target.value})}
                                            />
                                            <button
                                                onClick={() => {
                                                    const value = newProducts[d.id]?.trim()
                                                    if (value) {
                                                        addProduct(d.id, value);
                                                        setNewProducts({...newProducts, [d.id]: ''});
                                                    }
                                                }}>
                                                +
                                            </button>
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