import {useContext, useRef, useState} from "react";
import {ShoppingListContext} from "../../context/ShoppingContext";
import {RadioGroup} from '@headlessui/react'
import useCartHelper from "../../hooks/useCartHelper";
import {useHistory} from "react-router-dom";
import CartItemShow from "../CartItemShow/CartItemShow";

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
    const {cartItemList} = useContext(ShoppingListContext);
    const {allItemPriceAddedInCart} = useCartHelper();
    const [selected, setSelected] = useState(methods[0]);
    const [isConfirmClicked, setIsConfirmClicked] = useState(false);
    const history = useHistory();
    const errors = {
        email: '', firstName: '', lastName: '', company: '', address: '', city: '', country: '',
        province: '', postalCode: '', phone: '',
    }

    const inputEmailRef = useRef();
    const inputFirstNameRef = useRef();
    const inputLastNameRef = useRef();
    const inputCompanyRef = useRef();
    const inputAddressRef = useRef();
    const inputCityRef = useRef();
    const inputCountryRef = useRef();
    const inputProvinceRef = useRef();
    const inputPostalCodeRef = useRef();
    const inputPhoneRef = useRef();

    const navigateToOrderSummary = () => {
        setIsConfirmClicked(true);
        validateInputEl([inputEmailRef, inputFirstNameRef, inputAddressRef, inputCityRef, inputCountryRef, inputPhoneRef]);
        if (
            errors.email === '' &&
            errors.firstName === '' &&
            errors.address === '' &&
            errors.city === '' &&
            errors.country === '' &&
            errors.phone === ''
        ) {
            history.push({
                pathname: '/order-summary',
                state: {
                    [inputEmailRef.current.name]: inputEmailRef.current.value,
                    [inputFirstNameRef.current.name]: inputFirstNameRef.current.value,
                    [inputLastNameRef.current.name]: inputLastNameRef.current.value,
                    [inputCompanyRef.current.name]: inputCompanyRef.current.value,
                    [inputAddressRef.current.name]: inputAddressRef.current.value,
                    [inputCityRef.current.name]: inputCityRef.current.value,
                    [inputCountryRef.current.name]: inputCountryRef.current.value,
                    [inputProvinceRef.current.name]: inputProvinceRef.current.value,
                    [inputPostalCodeRef.current.name]: inputPostalCodeRef.current.value,
                    [inputPhoneRef.current.name]: inputPhoneRef.current.value,
                    deliveryMethod: selected,
                    cartItems: JSON.parse(JSON.stringify(cartItemList)),
                }
            });
        } else console.log(errors);
    }

    const validateInputEl = (refs) => {
        refs.forEach(ref => {
            console.log(ref.current.value);
            if (!ref.current.validity.valid) {
                errors[ref.current.name] = `${ref.current.name} is not valid`;
            } else errors[ref.current.name] = '';
        });
        return errors;
    }

    const generateErrorMsg = (ref) => {
        if (ref.current.value !== '' && !ref.current.validity.valid)
            return <span className="text-red-500 text-sm">{ref.current.name} is not valid</span>
        else if (ref.current.value === '')
            return <span className="text-red-500 text-sm">{ref.current.name} is required</span>
    }

    return (
        <div
            className="mt-4 max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:max-w-7xl lg:px-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
            <div>
                <h1 className="text-lg font-bold text-indigo-600">Contact Information</h1>

                <div className="mt-6">
                    <label htmlFor="email" className="block text-gray-700 font-bold">Email address</label>
                    <input ref={inputEmailRef} required type="email" id="email" name="email" autoComplete="email"
                           onFocus={() => setIsConfirmClicked(false)}
                           className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    {isConfirmClicked ? generateErrorMsg(inputEmailRef) : null}
                </div>

                <hr className="my-10 block border-1 bg-gray-500 h-0.1"/>

                <h1 className="text-lg font-bold text-indigo-600">Shipping Information</h1>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="mt-4 flex-1">
                        <label htmlFor="firstName" className="block text-gray-700 font-bold">First Name</label>
                        <input ref={inputFirstNameRef} required type="text" id="firstName" name="firstName"
                               onFocus={() => setIsConfirmClicked(false)}
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        {isConfirmClicked ? generateErrorMsg(inputFirstNameRef) : null}
                    </div>

                    <div className="mt-4 flex-1">
                        <label htmlFor="lastName" className="block text-gray-700 font-bold">Last Name</label>
                        <input ref={inputLastNameRef} type="text" id="lastName" name="lastName"
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                </div>

                <div className="mt-4 flex-1">
                    <label htmlFor="company" className="block text-gray-700 font-bold">Company</label>
                    <input ref={inputCompanyRef} type="text" id="company" name="company"
                           className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>

                <div className="mt-4 flex-1">
                    <label htmlFor="address" className="block text-gray-700 font-bold">Address</label>
                    <input ref={inputAddressRef} required type="text" id="address" name="address"
                           onFocus={() => setIsConfirmClicked(false)}
                           className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    {isConfirmClicked ? generateErrorMsg(inputAddressRef) : null}
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="mt-4 flex-1">
                        <label htmlFor="city" className="block text-gray-700 font-bold">City</label>
                        <input ref={inputCityRef} required type="text" id="city" name="city"
                               onFocus={() => setIsConfirmClicked(false)}
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        {isConfirmClicked ? generateErrorMsg(inputCityRef) : null}
                    </div>

                    <div className="mt-4 flex-1">
                        <label htmlFor="country" className="block text-gray-700 font-bold">Country</label>
                        <input ref={inputCountryRef} required type="text" id="country" name="country"
                               onFocus={() => setIsConfirmClicked(false)}
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        {isConfirmClicked ? generateErrorMsg(inputCountryRef) : null}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="mt-4 flex-1">
                        <label htmlFor="province" className="block text-gray-700 font-bold">Province</label>
                        <input ref={inputProvinceRef} type="text" id="province" name="province"
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>

                    <div className="mt-4 flex-1">
                        <label htmlFor="postalCode" className="block text-gray-700 font-bold">Postal code</label>
                        <input ref={inputPostalCodeRef} type="text" id="postalCode" name="postalCode"
                               className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                </div>

                <div className="mt-4 flex-1">
                    <label htmlFor="phone" className="block text-gray-700 font-bold">Phone</label>
                    <input ref={inputPhoneRef} required type="tel" id="phone" name="phone"
                           onFocus={() => setIsConfirmClicked(false)}
                           className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    {isConfirmClicked ? generateErrorMsg(inputPhoneRef) : null}
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

                        <div className="my-4 py-4 border-t border-gray-200 flex justify-between text-base">
                            <p>Total</p>
                            <p>${(+allItemPriceAddedInCart() + +selected.price).toFixed(2)}</p>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={navigateToOrderSummary}
                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent
                                                rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
