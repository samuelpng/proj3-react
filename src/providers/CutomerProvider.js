//=== Dependencies ===
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useInRouterContext, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


//=== Contexts ===
import CustomerContext from '../contexts/CustomerContext';

// const BASE_URL = 'https://kicks-city.herokuapp.com/api';
const BASE_URL = 'https://8000-samuelpng-proj3express-iwcbe9cedes.ws-us63.gitpod.io/api'

export default function CustomerProvider(props) {
    const [stripeSessionData, setStripeSessionData] = useState('');
    const navigate = useNavigate()


    const parseJWT = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const login = async (email, password) => {
        let response = await axios.post(BASE_URL + '/customers/login', {
            email,
            password
        })
        if (response.data.error) {
            toast.error("Invalid email or password")
            localStorage.clear()
            return false
        }

        //add to local storage? or session storage
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)

        let customerData = parseJWT(response.data.accessToken)
        console.log('customerData =>', customerData)
        localStorage.setItem('customer', JSON.stringify(customerData))
        toast.success("Login Success")
        return true
    }

    const logout = async () => {
        if (localStorage.accessToken) {
            let response = await axios.post(BASE_URL + '/customers/logout',
                {
                    refreshToken: localStorage.getItem('refreshToken')
                },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })

            if (response.data.message) {
                console.log(response.data.message)
                localStorage.clear()
                toast.success('Log out Successful')
            }

            if (response.data.error) {
                console.log('error, token not found')
            }
        }
    }

    const getCartItems = async () => {
        try {
            const response = await axios.get(BASE_URL + `/cart`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            let cartItems = response.data
            return cartItems
        } catch (error) {
            return false
        }
    }

    const updateCartItem = async (customerId, variantId, quantity) => {
        if (localStorage.getItem("accessToken")) {
            try {
                await axios.post(BASE_URL + `/cart/${variantId}/update`, {
                    customer_id: customerId,
                    quantity: quantity
                },
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                    })
                    return true
            } catch(error) {
                return false
            }
        }else {
            return false
        }
    }

    const deleteCartItem = async (customerId, variantId) => {
        if (localStorage.getItem("accessToken")) {
            try {
                await axios.delete(BASE_URL + `/cart/${variantId}/delete`, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                    return true
            } catch(error) {
                return false
            }
        }else {
            return false
        }
    
    }

    const getStripeData = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                let response = await axios.get(BASE_URL + '/checkout', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                console.log('stripesession data', response.data)
                setStripeSessionData(response.data)
                navigate('/stripe')

            } catch (error) {
                return false
            }
        } else {
            return false
        }
    }

    const getStripe = () => {
        return stripeSessionData
    }

    const getOrders = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                let response = await axios.get(BASE_URL + '/orders', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                console.log(response.data, "i am order")
                let orders = response.data
                return orders
            } catch (error) {
                return false
            }
        } else {
            return false
        }
    }

    const refreshToken = async () => {
        console.log('refresh attempted')
        try {
            const response = await axios.post(BASE_URL + '/customers/refresh', {
                refreshToken: localStorage.getItem('refreshToken')
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })

            const accessToken = response.data.accessToken
            console.log(accessToken)
            localStorage.setItem('accessToken', accessToken);
            return true

        } catch (error) {
            if (localStorage.getItem('accessToken')){ 
                await logout()
            }
            navigate('/login');
            toast.error('Session has expired. Please login to continue');
            return false
        }
    }


    const context = {
        register: async (data) => {
            let formData = {}
            let username = data.username;
            let email = data.email;
            let first_name = data.first_name;
            let last_name = data.last_name;
            let password = data.password;
            let contact_number = data.contact_number
            formData = { username, email, first_name, last_name, password, contact_number }
            console.log(formData)

            let response = await axios.post(BASE_URL + '/customers/register', formData)

            if (response.data.customer) {
                return await login(email, password)
            }
            if (response.data.error) {
                return false
            }
        },
        login: async (email, password) => {
            let response = await login(email, password)
            return response
        },
        getLocalData: () => {
            let localData = localStorage.getItem("accessToken")
            console.log(localData)
        },
        logout: async () => {
            await logout()
        },
        checkIfAuth: async () => {
            if (localStorage.accessToken) {
                let response = await refreshToken()
                if (response) {
                    return true
                } else {
                    return false
                }
                // return true
            } else {
                return false
            }
        },
        getCartItems: async () => {
            let response = await getCartItems()
            return response
        },
        updateCartItem: async (customerId, variantId, quantity) => {
            let response = await updateCartItem(customerId, variantId, quantity)
            return response
        },
        deleteCartItem: async (customerId, variantId) => {
            let response = await deleteCartItem(customerId, variantId)
            console.log('blablbla')
            return response
        },
        checkout: async () => {
            let response = await getStripeData()
            // console.log('checkout', response)
            return response
        },
        getStripe: () => {
            let response = getStripe()
            return response
        },
        getOrders: async () => {
            let response = await getOrders()
            return response
        }
    }

    return <CustomerContext.Provider value={context}>
        {props.children}
        <ToastContainer />
    </CustomerContext.Provider>







}