import {useContext, useEffect} from "react";
import {ShoppingListContext} from "../../context/ShoppingContext";
import {MinusIcon, PlusIcon} from "@heroicons/react/outline";
import useCartHelper from "../../hooks/useCartHelper";
import {Link} from "react-router-dom";
import classNames from "../../helper/ClassNameJoiner";

const ProductList = () => {
    const {productList, setProductList} = useContext(ShoppingListContext);
    const {updateCart, isProductAvailable, isItemPresentInCart, getNumOfSpecificItemAddedInCart} = useCartHelper();
    const keyProductList = 'productList';

    useEffect(() => {
        if (productList.length === 0) {
            if (localStorage.getItem(keyProductList) == null) {
                fetch('https://fakestoreapi.com/products')
                    .then((response) => response.json())
                    .then(responseData => {
                        localStorage.setItem(keyProductList, JSON.stringify(responseData));
                        setProductList(productList.concat(responseData));
                        console.log(productList);
                    });
            } else setProductList(JSON.parse(localStorage.getItem(keyProductList)));
        }
    }, []);

    return (
        <div>
            <div className="max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:max-w-7xl lg:px-8">

                <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {productList.map((product) => (
                        <div key={product.id} className="flex flex-col bg-white p-4 shadow-lg rounded-lg">
                            <Link to={`/product/${product.id}`}>
                                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden
                                                hover:opacity-75 cursor-pointer lg:h-80 lg:aspect-none">
                                    <img
                                        src={product.image}
                                        alt="Not Found"
                                        className="w-full h-full object-center object-fill"
                                    />
                                </div>
                            </Link>
                            <div>
                                <h3 className="text-base font-medium text-gray-900">{product.title}</h3>
                            </div>
                            <div className="my-4 flex justify-between">
                                <p className="text-sm font-medium text-gray-900">${product.price}</p>
                                <p className="text-sm font-medium text-gray-900">
                                    <span><i className="fa fa-star"/></span>
                                    <span> {product.rating['rate']}</span>
                                </p>
                            </div>

                            {
                                product.rating['count'] <= 0 ?
                                    (<div className="mt-auto">
                                        <button
                                            disabled
                                            className="flex justify-center items-center px-6 py-2 border border-transparent
                                                       w-full rounded-md shadow-sm text-base font-medium text-white
                                                       cursor-pointer bg-red-500">
                                            Out of stock
                                        </button>
                                    </div>) :

                                    (
                                        !isItemPresentInCart(product.id) ?
                                            (<div className="mt-auto">
                                                <button
                                                    onClick={() => updateCart(product, false, true)}
                                                    className="flex justify-center items-center px-6 py-2 border border-transparent
                                                               w-full rounded-md shadow-sm text-base font-medium text-white
                                                               cursor-pointer bg-indigo-700 hover:bg-indigo-800">
                                                    Add to Cart
                                                </button>
                                            </div>) :

                                            (<div className="mt-auto">
                                                <div className="flex justify-center items-center px-4 py-1 border border-transparent
                                            rounded-md shadow-sm text-base font-medium text-gray-900 bg-gray-100">
                                            <button className="bg-indigo-700 text-white p-2 rounded-lg shadow-sm cursor-pointer"
                                                    onClick={() => updateCart(product, true, false)}>
                                                <MinusIcon className="h-3 w-3" aria-hidden="true"/>
                                            </button>
                                            <span className="mx-3">{getNumOfSpecificItemAddedInCart(product.id)}</span>
                                            <button className={classNames(
                                                        isProductAvailable(product.id) ? 'bg-indigo-700 text-white' : 'bg-gray-300',
                                                        'p-2 rounded-lg shadow-sm cursor-pointer'
                                                    )}
                                                    disabled={!isProductAvailable(product.id)}
                                                    onClick={() => updateCart(product, true, true)}>
                                                <PlusIcon className="h-3 w-3" aria-hidden="true"/>
                                            </button>
                                                </div>
                                            </div>)
                                    )
                            }
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ProductList;
