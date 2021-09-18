import {Fragment, useContext} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import './ShoppingCart.css';
import {ShoppingListContext} from "../../context/ShoppingContext";
import useCartHelper from "../../hooks/useCartHelper";
import {Link} from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ShoppingCart = () => {
    const {cartItemList, openModal, setOpenModal} = useContext(ShoppingListContext);
    const {
        updateCart,
        removeItemFromCart,
        isProductAvailable,
        getNumOfSpecificItemAddedInCart,
        allItemPriceAddedInCart,
        generateProductQuantityArray,
    } = useCartHelper();

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpenModal}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full">
                            <div className="w-screen max-w-md">
                                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">Shopping
                                                cart</Dialog.Title>
                                            <div className="ml-3 h-7 flex items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={() => setOpenModal(false)}>
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true"/>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
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
                                                                               className="cart-quantity w-6/12 py-2 text-sm text-gray-900 bg-gray-200 rounded-md pl-2
                                                                                          focus:outline-none focus:bg-gray-300"
                                                                               value={cartItem.quantity}
                                                                               onChange={() => {}}/>

                                                                        <span className="absolute flex flex-col justify-center items-center
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
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${allItemPriceAddedInCart()}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at
                                            checkout.</p>
                                        <Link to='/checkout' className="mt-6">
                                            <button
                                                onClick={() => setOpenModal(false)}
                                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent
                                                rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                                Checkout
                                            </button>
                                        </Link>
                                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                            <p>
                                                or{' '}
                                                <button
                                                    type="button"
                                                    className="text-indigo-600 font-medium hover:text-indigo-500"
                                                    onClick={() => setOpenModal(false)}>
                                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ShoppingCart;
