//=== Dependencies ===
import React, { useEffect, useState } from 'react'
import axios from 'axios';


//=== Contexts ===
import CustomerContext from '../contexts/CustomerContext';

// const BASE_URL = 'https://kicks-city.herokuapp.com/api';
const BASE_URL = 'https://8000-samuelpng-proj3express-iwcbe9cedes.ws-us63.gitpod.io/api'

export default function ProductsProvider(props) {
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

    const login = async (username, password) => {
        let response = await axios.post(BASE_URL + '/customers/login', {
            username,
            password
        })
        if (response.data.error) {
            console.log('Username or password does not match')
            setCustomer({})
            return false
        }

        //add to local storage? or session storage
        localStorage.setItem('accessToken', loginResponse.data.accessToken)
        localStorage.setItem('refreshToken', loginResponse.data.refreshToken)

        console.log(response.data)
        setJWT(response.data)
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
        registerCustomer: async (input) => {
           let inputData = {}
           let username = input.username;
           let first_name = input.first_name;
           let last_name = input.last_name;
           let email = input.email;
           let password = input.password;
           let contact_number = input.contact_number
           inputData = { username, first_name, last_name, email, password, contact_number }

           let response = await axios.post(BASE_URL + '/customers/register', formData)
        }
    }






    
}