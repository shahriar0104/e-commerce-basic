import {useContext} from "react";
import {ShoppingListContext} from "../context/ShoppingContext";

const useCartHelper = () => {
    const {productList, cartItemList, setCartItemList} = useContext(ShoppingListContext);

    const updateCart = (cartItem, isItemPresent, isIncrement) => {
        let newProduct = {...cartItem};
        if (!isItemPresent) {
            newProduct.quantity = 1;
            newProduct.availableItemCount = cartItem.rating['count'] - 1;
            setCartItemList([...cartItemList, newProduct]);

        } else {
            let newCartItemList = [...cartItemList];
            for (let i = 0; i < newCartItemList.length; i++) {
                if (newCartItemList[i].id === cartItem.id) {
                    newProduct = {...newCartItemList[i]};
                    if(isIncrement) {
                        if (newProduct.availableItemCount > 0) {
                            newProduct.quantity += 1
                            newProduct.availableItemCount -= 1;
                        }
                    } else {
                        newProduct.quantity -= 1;
                        newProduct.availableItemCount += 1;
                    }
                    if (newProduct.quantity === 0) newCartItemList.splice(i, 1);
                    else newCartItemList.splice(i, 1, newProduct);
                    break;
                }
            }
            setCartItemList(newCartItemList);
        }
    }

    const removeItemFromCart = (cartItemId) => {
        let newCartItemList = [...cartItemList];
        for (let i = 0; i < newCartItemList.length; i++) {
            if (newCartItemList[i].id === cartItemId) {
                newCartItemList.splice(i, 1);
                break;
            }
        }
        setCartItemList(newCartItemList);
    }

    const isProductAvailable = (cartItemId) => {
        for (const cartItemListEl of cartItemList) {
            if (cartItemListEl.id === cartItemId) {
                if(cartItemListEl.availableItemCount > 0)
                    return true;
            }
        }
        return false;
    }

    const itemsLeft = (cartItemId) => {
        for (const cartItemListEl of cartItemList) {
            if (cartItemListEl.id === cartItemId) {
                return cartItemListEl.availableItemCount;
            }
        }
        return 0;
    }

    const isItemPresentInCart = (cartItemId) => {
        for (const cartItemListEl of cartItemList) {
            if (cartItemListEl.id === cartItemId) return true;
        }
        return false;
    }

    const getNumOfSpecificItemAddedInCart = (cartItemId) => {
        for (const cartItemListEl of cartItemList) {
            if (cartItemListEl.id === cartItemId) return cartItemListEl.quantity;
        }
        return 0;
    }

    const getTotalNumOfItemAddedInCart = () => {
        let totalItemInCart = 0;
        for (const cartItemListEl of cartItemList) {
            totalItemInCart += cartItemListEl.quantity
        }
        return totalItemInCart;
    }

    const allItemPriceAddedInCart = () => {
        let totalPrice = 0;
        for (const cartItemListEl of cartItemList) {
            totalPrice += (cartItemListEl.price * cartItemListEl.quantity);
        }
        console.log(totalPrice);
        return totalPrice.toFixed(2);
    }

    const generateProductQuantityArray = (cartItemId) => {
        for (const productListEl of productList) {
            if (productListEl.id === cartItemId) {
                let quantityArr = [];
                for (let i = 1; i <= productListEl.rating['count']; i++) {
                    quantityArr.push(i);
                }
                return quantityArr;
            }
        }
        return [];
    }

    return {
        updateCart,
        removeItemFromCart,
        isProductAvailable,
        isItemPresentInCart,
        itemsLeft,
        getNumOfSpecificItemAddedInCart,
        getTotalNumOfItemAddedInCart,
        allItemPriceAddedInCart,
        generateProductQuantityArray,
    }
}

export default useCartHelper;
