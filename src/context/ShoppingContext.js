import React, {createContext, useState} from "react";

export const ShoppingListContext = createContext([]);

function ShoppingContext(props) {
    const [productList, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cartItemList, setCartItemList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    return (
        <ShoppingListContext.Provider value={{
            productList, setProductList, filteredProducts, setFilteredProducts,
            cartItemList, setCartItemList, openModal, setOpenModal
        }}>
            {props.children}
        </ShoppingListContext.Provider>
    )
}

export default ShoppingContext;
