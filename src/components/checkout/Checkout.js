import {useContext, useState} from "react";
import {ShoppingListContext} from "../../context/ShoppingContext";
import {RadioGroup} from '@headlessui/react'
import useCartHelper from "../../hooks/useCartHelper";
import {Link} from "react-router-dom";

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Checkout = () => {
    const {productList, setProductList, cartItemList, setCartItemList} = useContext(ShoppingListContext);
    const {updateCart, removeItemFromCart, isProductAvailable, getNumOfSpecificItemAddedInCart, allItemPriceAddedInCart} = useCartHelper();
    const [selected, setSelected] = useState(methods[0]);

    return (
        <div
            className="mt-4 max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:max-w-7xl lg:px-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
            <div>
                <h1 className="text-lg font-bold text-indigo-600">Contact Information</h1>

                <div className="mt-6">
                    <label htmlFor="email" className="block text-gray-700 font-bold">Email address</label>
                    <input type="email" id="email" name="email" autoComplete="email"
                           className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>

                <hr className="my-10 block border-1 bg-gray-500 h-0.1"/>

                <h1 className="text-lg font-bold text-indigo-600">Shipping Information</h1>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="mt-4 flex-1">
                        <label htmlFor="first-name" className="block text-gray-700 font-bold">First Name</label>
                        <input type="text" id="first-name" name="first-name"
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>

                    <div className="mt-4 flex-1">
                        <label htmlFor="last-name" className="block text-gray-700 font-bold">Last Name</label>
                        <input type="text" id="last-name" name="last-name"
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                </div>

                <div className="mt-4 flex-1">
                    <label htmlFor="company" className="block text-gray-700 font-bold">Company</label>
                    <input type="text" id="company" name="company"
                           className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>

                <div className="mt-4 flex-1">
                    <label htmlFor="address" className="block text-gray-700 font-bold">Address</label>
                    <input type="text" id="address" name="address"
                           className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="mt-4 flex-1">
                        <label htmlFor="city" className="block text-gray-700 font-bold">City</label>
                        <input type="text" id="city" name="city"
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>

                    <div className="mt-4 flex-1">
                        <label htmlFor="country" className="block text-gray-700 font-bold">Country</label>
                        <input type="text" id="country" name="country"
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="mt-4 flex-1">
                        <label htmlFor="province" className="block text-gray-700 font-bold">Province</label>
                        <input type="text" id="province" name="province"
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>

                    <div className="mt-4 flex-1">
                        <label htmlFor="postal-code" className="block text-gray-700 font-bold">Postal code</label>
                        <input type="text" id="postal-code" name="postal-code"
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                </div>

                <div className="mt-4 flex-1">
                    <label htmlFor="phone" className="block text-gray-700 font-bold">Phone</label>
                    <input type="text" id="phone" name="phone"
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
                                                <div className="flex items-center justify-between w-full">
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
                                                                <span className="block mt-5 font-bold">${plan.price}</span>
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
                    <div className="flow-root mb-8">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItemList.map((cartItem) => (
                                <li key={cartItem.id} className="py-6 flex">
                                    <div
                                        className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                        <img
                                            src={cartItem.image}
                                            alt="Not Found"
                                            className="w-full h-full object-center object-cover"
                                        />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col">
                                        <div>
                                            <div
                                                className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href={cartItem.href}>{cartItem.title}</a>
                                                </h3>
                                                <p className="ml-4">${(cartItem.price * getNumOfSpecificItemAddedInCart(cartItem.id)).toFixed(2)}</p>
                                            </div>
                                            {/*<p className="mt-1 text-sm text-gray-500">{product.color}</p>*/}
                                        </div>
                                        <div
                                            className="mt-2 flex-1 flex items-center items-end justify-between text-sm">
                                            {/*<p className="text-gray-500">Qty {product.quantity}</p>*/}
                                            <div
                                                className="relative text-gray-600 focus-within:text-gray-400">
                                                <input type="number"
                                                       className="cart-quantity w-6/12 py-2 text-sm text-gray-900 bg-gray-200 rounded-md pl-4
                                                                                   focus:outline-none focus:bg-gray-300"
                                                       value={cartItem.quantity}
                                                       onChange={() => {}}
                                                />

                                                <span
                                                    className="absolute flex flex-col justify-center items-center
                                                                                  inset-y-0 left-12 pl-2">
                                                                                <button type="submit"
                                                                                        disabled={!isProductAvailable(cartItem.id)}
                                                                                        onClick={() => updateCart(cartItem, true, true)}
                                                                                        className={classNames(
                                                                                            isProductAvailable(cartItem.id) ? 'hover:text-indigo-600' : 'hover:text-gray-600',
                                                                                            'focus:outline-none focus:shadow-outline'
                                                                                        )}>
                                                                                  <svg fill="none"
                                                                                       stroke="currentColor"
                                                                                       strokeLinecap="round"
                                                                                       strokeLinejoin="round"
                                                                                       strokeWidth="2"
                                                                                       viewBox="0 0 24 24"
                                                                                       className="w-4 h-4">
                                                                                      <path d="M5 15l7-7 7 7"/>
                                                                                  </svg>
                                                                                </button>

                                                                                <button type="submit"
                                                                                        onClick={() => updateCart(cartItem, true, false)}
                                                                                        className="focus:outline-none focus:shadow-outline
                                                                                        hover:text-indigo-600">
                                                                                    <svg fill="none"
                                                                                         stroke="currentColor"
                                                                                         strokeLinecap="round"
                                                                                         strokeLinejoin="round"
                                                                                         strokeWidth="2"
                                                                                         viewBox="0 0 24 24"
                                                                                         className="w-4 h-4">
                                                                                      <path d="M19 9l-7 7-7-7"/>
                                                                                  </svg>
                                                                                </button>

                                                                        </span>

                                            </div>

                                            <div className="flex">
                                                <button type="button"
                                                        onClick={() => removeItemFromCart(cartItem.id)}
                                                        className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-gray-200 py-6 font-bold text-gray-900">
                        <div className="flex justify-between text-base">
                            <p>Subtotal</p>
                            <p>${allItemPriceAddedInCart()}</p>
                        </div>

                        <div className="flex justify-between text-base mt-2">
                            <p>Shipping</p>
                            <p>${selected.price}</p>
                        </div>

                        <div className="my-4 py-4 border-t border-gray-200 flex justify-between text-base">
                            <p>Total</p>
                            <p>${(+allItemPriceAddedInCart() + +selected.price).toFixed(2)}</p>
                        </div>

                        <Link to='/checkout' className="mt-6">
                            <button
                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent
                                                rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Confirm Order
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
