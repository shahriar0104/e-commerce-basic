import {useContext, useState} from "react";
import {ShoppingListContext} from "../../context/ShoppingContext";
import {RadioGroup} from '@headlessui/react'
import CartHelper from "../../helper/CartHelper";
import {useHistory} from "react-router-dom";
import CartItemShow from "../cart-item-show/CartItemShow";
import emptyCart from "../../assets/images/empty-cart.png"
import {keyCategoryList, keyProductList} from "../../constants/keys";
import generateCategoryList from "../../helper/generateCategoryList";

const methods = [
    {
        name: 'Standard',
        time: '4-10 business days',
        price: '5.00',
    },
    {
        name: 'Express',
        time: '2-5 business days',
        price: '16.00',
    },
]

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2"/>
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const Checkout = () => {
    const {
        cartItemList,
        setCartItemList,
        productList,
        setProductList,
        setFilteredProducts
    } = useContext(ShoppingListContext);
    const {allItemPriceAddedInCart} = CartHelper();
    const [selected, setSelected] = useState(methods[0]);
    const [formFields, setFormFields] = useState(
        {
            email: '', firstName: '', lastName: '', company: '', address: '', city: '', country: '',
            province: '', postalCode: '', phone: '',
        }
    );
    const history = useHistory();

    const inputChangeHandler = (event) => {
        setFormFields({...formFields, [event.target.name]: event.target.value});
    }

    const navigateToOrderSummary = (event) => {
        console.log('event');
        event.preventDefault();
        setAfterOrderProducts();

        history.push({
            pathname: '/order-summary',
            state: {
                formFields,
                deliveryMethod: selected,
                cartItems: JSON.parse(JSON.stringify(cartItemList)),
            }
        });
    }

    const setAfterOrderProducts = () => {
        const products = [...productList];
        for (const cartItem of cartItemList)
            products[cartItem.id - 1].rating['count'] -= cartItem.quantity;
        setCartItemList([]);
        localStorage.setItem(keyProductList, JSON.stringify(products));
        setProductList(products);
        setFilteredProducts(products);
        const categories = generateCategoryList(products);
        localStorage.setItem(keyCategoryList, JSON.stringify(categories));
    }

    return (
        <form onSubmit={navigateToOrderSummary}>
            <div
                className="mt-4 max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:max-w-7xl lg:px-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-16">

                {
                    cartItemList.length === 0 ?
                        (<div className="lg:col-span-2 flex justify-center">
                            <img
                                src={emptyCart}
                                alt="your shopping cart is empty"
                                className="object-center object-fill"
                            />
                        </div>) :

                        (
                            <>
                                <div>
                                    <h1 className="text-lg font-bold text-indigo-600">Contact Information</h1>

                                    <div className="mt-6">
                                        <label htmlFor="email" className="block text-gray-700 font-bold">Email
                                            address</label>
                                        <input required type="email" id="email" name="email"
                                               autoComplete="email"
                                               value={formFields.email} onChange={inputChangeHandler}
                                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>

                                    <hr className="my-10 block border-1 bg-gray-500 h-0.1"/>

                                    <h1 className="text-lg font-bold text-indigo-600">Shipping Information</h1>
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <div className="mt-4 flex-1">
                                            <label htmlFor="firstName" className="block text-gray-700 font-bold">First
                                                Name</label>
                                            <input required type="text" id="firstName"
                                                   name="firstName"
                                                   value={formFields.firstName} onChange={inputChangeHandler}
                                                   className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                        </div>

                                        <div className="mt-4 flex-1">
                                            <label htmlFor="lastName" className="block text-gray-700 font-bold">Last
                                                Name</label>
                                            <input type="text" id="lastName" name="lastName"
                                                   value={formFields.lastName} onChange={inputChangeHandler}
                                                   className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex-1">
                                        <label htmlFor="company"
                                               className="block text-gray-700 font-bold">Company</label>
                                        <input type="text" id="company" name="company"
                                               value={formFields.company} onChange={inputChangeHandler}
                                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>

                                    <div className="mt-4 flex-1">
                                        <label htmlFor="address"
                                               className="block text-gray-700 font-bold">Address</label>
                                        <input required type="text" id="address" name="address"
                                               value={formFields.address} onChange={inputChangeHandler}
                                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>

                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <div className="mt-4 flex-1">
                                            <label htmlFor="city" className="block text-gray-700 font-bold">City</label>
                                            <input required type="text" id="city" name="city"
                                                   value={formFields.city} onChange={inputChangeHandler}
                                                   className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                        </div>

                                        <div className="mt-4 flex-1">
                                            <label htmlFor="country"
                                                   className="block text-gray-700 font-bold">Country</label>
                                            <input required type="text" id="country" name="country"
                                                   value={formFields.country} onChange={inputChangeHandler}
                                                   className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <div className="mt-4 flex-1">
                                            <label htmlFor="province"
                                                   className="block text-gray-700 font-bold">Province</label>
                                            <input type="text" id="province" name="province"
                                                   value={formFields.province} onChange={inputChangeHandler}
                                                   className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                                              focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                        </div>

                                        <div className="mt-4 flex-1">
                                            <label htmlFor="postalCode" className="block text-gray-700 font-bold">Postal
                                                code</label>
                                            <input type="text" id="postalCode" name="postalCode"
                                                   value={formFields.postalCode} onChange={inputChangeHandler}
                                                   className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex-1">
                                        <label htmlFor="phone" className="block text-gray-700 font-bold">Phone</label>
                                        <input required type="tel" id="phone" name="phone"
                                               value={formFields.phone} onChange={inputChangeHandler}
                                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>

                                    <hr className="my-10 block border-1 bg-gray-500 h-0.1"/>

                                    <h1 className="text-lg font-bold text-indigo-600">Delivery Method</h1>
                                    <div className="w-full py-8">
                                        <div className="w-full">
                                            <RadioGroup value={selected} onChange={setSelected}>
                                                <RadioGroup.Label className="sr-only">Delivery Method</RadioGroup.Label>
                                                <div className="space-y-2">
                                                    {methods.map((plan) => (
                                                        <RadioGroup.Option
                                                            key={plan.name}
                                                            value={plan}
                                                            className={({active, checked}) =>
                                                                `${
                                                                    active
                                                                        ? 'ring-2 ring-offset-2 ring-offset-indigo-300 ring-white ring-opacity-60'
                                                                        : ''
                                                                }
                                            ${
                                                                    checked ? 'bg-indigo-700 bg-opacity-75 text-white' : 'bg-white'
                                                                }
                                            relative border border-2 rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                                                            }>
                                                            {({active, checked}) => (
                                                                <>
                                                                    <div
                                                                        className="flex items-center justify-between w-full">
                                                                        <div className="flex items-center">
                                                                            <div className="text-sm">
                                                                                <RadioGroup.Label
                                                                                    as="p"
                                                                                    className={`font-bold ${
                                                                                        checked ? 'text-white' : 'text-gray-900'
                                                                                    }`}>
                                                                                    {plan.name}
                                                                                </RadioGroup.Label>
                                                                                <RadioGroup.Description
                                                                                    as="span"
                                                                                    className={`inline ${
                                                                                        checked ? 'text-sky-100' : 'text-gray-500'
                                                                                    }`}>
                                                                <span>
                                                                  {plan.time}
                                                                </span>
                                                                                    <span
                                                                                        className="block mt-5 font-bold">${plan.price}</span>
                                                                                </RadioGroup.Description>
                                                                            </div>
                                                                        </div>
                                                                        {checked && (
                                                                            <div className="flex-shrink-0 text-white">
                                                                                <CheckIcon className="w-6 h-6"/>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>

                                </div>

                                <div>
                                    <h1 className="text-lg font-bold text-indigo-600">Order Summary</h1>
                                    <div className="mt-6 p-4 lg:p-8 bg-white rounded-lg shadow-lg border">

                                        <CartItemShow/>

                                        <div className="mt-8 border-t border-gray-200 py-6 font-bold text-gray-900">
                                            <div className="flex justify-between text-base">
                                                <p>Subtotal</p>
                                                <p>${allItemPriceAddedInCart()}</p>
                                            </div>

                                            <div className="flex justify-between text-base mt-2">
                                                <p>Shipping</p>
                                                <p>${selected.price}</p>
                                            </div>

                                            <div
                                                className="my-4 py-4 border-t border-gray-200 flex justify-between text-base">
                                                <p>Total</p>
                                                <p>${(Number(allItemPriceAddedInCart()) + Number(selected.price)).toFixed(2)}</p>
                                            </div>

                                            <div className="mt-6">
                                                <button
                                                    type="submit"
                                                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent
                                                rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                                    Confirm Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                }

            </div>
        </form>
    )
}

export default Checkout;
