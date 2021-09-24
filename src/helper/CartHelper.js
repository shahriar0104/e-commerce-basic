import {useContext} from "react";
import {ShoppingListContext} from "../context/ShoppingContext";

const CartHelper = () => {
    const {productList, cartItemList, setCartItemList} = useContext(ShoppingListContext);

    const updateCart = (cartItem, isItemPresent, isIncrement) => {
        let newProduct = {...cartItem};
        if (!isItemPresent) {
            newProduct.quantity = 1;
            newProduct.availableItemCount = cartItem.rating['count'] - 1;
            setCartItemList([...cartItemList, newProduct]);

        } else {
            let newCartItemList = [...cartItemList];

            for (const [idx, item] of newCartItemList.entries()) {
                if (item.id === cartItem.id) {
                    newProduct = {...item};
                    if (isIncrement) {
                        if (newProduct.availableItemCount > 0) {
                            newProduct.quantity += 1
                            newProduct.availableItemCount -= 1;
                        }
                    } else {
                        newProduct.quantity -= 1;
                        newProduct.availableItemCount += 1;
                    }
                    if (newProduct.quantity === 0) newCartItemList.splice(idx, 1);
                    else newCartItemList.splice(idx, 1, newProduct);
                    break;
                }
            }

            setCartItemList(newCartItemList);
        }
    }

    const removeItemFromCart = (cartItemId) => {
        let newCartItemList = [...cartItemList];
        for (const [idx, item] of newCartItemList.entries()) {
            if (item.id === cartItemId) {
                newCartItemList.splice(idx, 1);
                break;
            }
        }
        setCartItemList(newCartItemList);
    }

    const isProductAvailable = (cartItemId) => {
        for (const cartItemListEl of cartItemList) {
            if (cartItemListEl.id === cartItemId) {
                if (cartItemListEl.availableItemCount > 0)
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

    const allItemPriceAddedInCart = (cartItems) => {
        let totalPrice = 0;
        for (const cartItemListEl of cartItems === undefined ? cartItemList : cartItems) {
            totalPrice += (cartItemListEl.price * cartItemListEl.quantity);
        }
        return totalPrice.toFixed(2);
    }

    const onChangeQuantity = (event, cartItem, isItemPresent, isIncrement) => {
        let quantity = 0;
        try {
            quantity = event.target.value;
            if (quantity > productList[cartItem.id - 1].rating['count'] || !quantity)
                event.preventDefault();
            else {
                const cartItems = [...cartItemList];
                for (const item of cartItems)
                    if (item.id === cartItem.id) {
                        item.quantity = Number(quantity);
                        item.availableItemCount = item.rating['count'] - item.quantity;
                    }
                setCartItemList(cartItems);
            }
        } catch (e) {
            isIncrement ? (isItemPresent ? updateCart(cartItem, true, true)
                    : updateCart(cartItem, false, true))
                :
                updateCart(cartItem, true, false);
        }
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
        onChangeQuantity,
        generateProductQuantityArray,
    }
}

export default CartHelper;
