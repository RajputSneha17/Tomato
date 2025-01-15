import React, { createContext, useState } from 'react';
import { food_list } from '../assets/assets';

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });
    };

    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [id, count]) => {
            const itemInfo = food_list.find((product) => product._id === id);
            return itemInfo ? total + itemInfo.price * count : total;
        }, 0);
    };

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};
