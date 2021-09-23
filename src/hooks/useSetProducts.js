import {useContext, useEffect, useState} from "react";
import {keyCategoryList, keyProductList} from "../constants/keys";
import generateCategoryList from "../helper/generateCategoryList";
import {ShoppingListContext} from "../context/ShoppingContext";


const useSetProducts = () => {
    const {productList, setProductList, filteredProducts, setFilteredProducts} = useContext(ShoppingListContext);
    const [categoryList, setCategoryList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(keyProductList) === null) {
            setLoader(true);
            fetch('https://fakestoreapi.com/products')
                .then((response) => response.json())
                .then(responseData => {
                    localStorage.setItem(keyProductList, JSON.stringify(responseData));
                    setProductList(productList.concat(responseData));
                    setFilteredProducts(filteredProducts.concat(responseData));
                    const categories = generateCategoryList(responseData);
                    localStorage.setItem(keyCategoryList, JSON.stringify(categories));
                    setCategoryList(categories);
                    setLoader(false);
                });
        } else {
            setProductList(JSON.parse(localStorage.getItem(keyProductList)));
            setFilteredProducts(JSON.parse(localStorage.getItem(keyProductList)));
            setCategoryList(JSON.parse(localStorage.getItem(keyCategoryList)));
        }
    }, []);

    return {productList, filteredProducts, setFilteredProducts, categoryList, loader};
}

export default useSetProducts;