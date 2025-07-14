import { useState } from 'react';

export default function useCart() {

    //состояние корзины (массив товаров)
    const [cartItems, setCartItems] = useState([]);

    //добавление товара в корзину
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            //проверка есть ли такой товар уже
            const alreadyInCart = prevItems.find(i => i.id === item.id);
            //если есть ничего не меняем
            if (alreadyInCart) return prevItems;
            //если нету добавляем товар в массив
            return [...prevItems, item];
        });
    };


    // Функция удаления товара из корзины по id
    const removeFromCart = (id) => {
        // Возвращаем массив без товара с указанным id
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
    };
}
