import React, { createContext, useContext, useState, useEffect } from 'react';


// Создаём контекст для корзины
const CartContext = createContext();

// Компонент-провайдер, который оборачивает всё приложение
export const CartProvider = ({ children }) => {
    // Загружаем корзину из localStorage при первом рендере
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    // Сохраняем корзину в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


    //добавление товара
    const addToCart = (item) => {
        setCartItems(prev => {
            // ищем товар по id
            const existingItem = prev.find(i => i.id === item.id);
            // если товар уже есть — увеличиваем количество
            if (existingItem) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
                // если товара нет — добавляем его с количеством 1
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    // Удаление товара из корзины по id
    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // Увеличение количества конкретного товара
    const incrementQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Уменьшение количества. Если оно стало 0 — товар удаляется
    const decrementQuantity = (id) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    // Расчёт общей суммы товаров в корзине (учитывает скидки)
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const itemTotal = item.discount
                ? Math.round(item.price - (item.price * item.discount / 100))
                : item.price;
            return total + itemTotal * item.quantity;
        }, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            incrementQuantity,
            decrementQuantity,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
