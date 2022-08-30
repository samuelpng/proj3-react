//=== Dependencies ===
import React, { useEffect, useState } from 'react'
import axios from 'axios';


//=== Contexts ===
import CustomerContext from '../contexts/CustomerContext';

// const BASE_URL = 'https://kicks-city.herokuapp.com/api';
const BASE_URL = 'https://8000-samuelpng-proj3express-iwcbe9cedes.ws-us63.gitpod.io/api'

export default function CustomerProvider(props) {
    const [customer, setCustomer] = useState({});
    const [jwt, setJwt] = useState([]);
    const [cart, setCart] = useState({});

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
            console.log('Email or password does not match')
            setCustomer({})
            return false
        }

        //add to local storage? or session storage
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)

        console.log('response =>',response.data)
        setJwt(response.data)
        let customerData = parseJWT(response.data.accessToken)
        console.log('customerData =>', customerData)
        localStorage.setItem('customer', customerData)
        return true
    }

    const logout = async () => {
        if (jwt.accessToken) {
            let response = await axios.post(BASE_URL + '/customers/logout', {
                refreshToken: jwt.refreshToken
            },
                {
                    headers: {
                        authorization: `${jwt.accessToken}`
                        // authorization: `Bearer ${jwt.accessToken}`
                    }
                })

            if (response.data.message) {
                setCustomer({});
                console.log(response.data.message)
                //todo: clear sessions or local storage
                localStorage.clear()
                setJwt([]);
            }

            if (response.data.error) {
                setCustomer({});
                setJwt([]);
                console.log('error, token not found')
            }
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
            console.log(sessionData)
        },
        logout: async () => {
            await logout()
        },
        checkAuthenticated: () => {
            if (jwt.accessToken) {
                return true
            } else {
                return false
            }
        },
    }

    return <CustomerContext.Provider value={context}>
        {props.children}
    </CustomerContext.Provider>







}