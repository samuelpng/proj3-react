//=== Dependencies ===
import React, { useEffect, useState } from 'react'
import axios from 'axios';


//=== Contexts ===
import ProductsContext from "../contexts/ProductsContext";

const BASE_URL = 'https://kicks-city.herokuapp.com/api';

export default function ProductsProvider(props) {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            let response = await axios.get(BASE_URL + '/products')
            setProducts(response.data)
        }
        fetchProducts()
    }, [])

    const context = {
        getProducts: () => {
            return products
        },

        getProductById: (productId) => {
            let response = '';
            products.map(p => {
                if (p.id === productId) {
                    return response = p
                }
            })
            return response;
        },
    }


    return (
        <ProductsContext.Provider value={context}>
            {props.children}
        </ProductsContext.Provider>
    )
}

