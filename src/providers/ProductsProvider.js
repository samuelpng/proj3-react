//=== Dependencies ===
import React, { useEffect, useState } from 'react'
import axios from 'axios';

//=== Contexts ===
import ProductsContext from "../contexts/ProductsContext";

// const BASE_URL = 'https://kicks-city.herokuapp.com/api';
const BASE_URL = 'https://8000-samuelpng-proj3express-iwcbe9cedes.ws-us63.gitpod.io/api'

export default function ProductsProvider(props) {

    const [products, setProducts] = useState([]);
    const [eachProduct, setEachProduct] = useState("")


    useEffect(() => {
        const fetchProducts = async () => {
            let response = await axios.get(BASE_URL + '/products')
            setProducts(response.data)
        }
        fetchProducts()
    }, [])

    const context = {
        getProducts: () => {
            return products.products
        },
        getProductById: (productId) => {
            let response = '';
            products.products.map(p => {
                if (p.id === productId) {
                    return response = p
                }
            })
            return response;
        },
        search: async (searchQuery)=>{
            let response = await axios.post(BASE_URL + '/products/search', searchQuery)
            return response.data
        },
        getBrands: () => {
            return products.brands
        },
        getCollections: () => {
            return products.collections
        },
        getMaterials: () => {
            return products.materials
        },
        getColours: () => {
            return products.colours
        },
        getSurfaces: () => {
            return products.surfaces
        },
        getClosures: () => {
            return products.closures
        },
        getCuttings: () => {
            return products.cuttings
        },
        getPositions: () => {
            return products.positions
        },
        getNewProducts: async () => {
            let response = await axios.get(BASE_URL + '/products/new')
            return response.data
        }
    }


    return (
        <ProductsContext.Provider value={context}>
            {props.children}
        </ProductsContext.Provider>
    )
}

