import React, {createContext, useState} from "react";

export const ShoppingListContext = createContext([]);

function ShoppingContext(props) {
    const [productList, setProductList] = useState([]);
    const [cartItemList, setCartItemList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    return (
        <ShoppingListContext.Provider value={{productList, setProductList, cartItemList, setCartItemList, openModal, setOpenModal}}>
            {props.children}
        </ShoppingListContext.Provider>
    )
}

export default ShoppingContext;
