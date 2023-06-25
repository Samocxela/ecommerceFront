import React from 'react';
import { Product } from './productAddtoCart';
import './shopAddtoCart.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'https://ecommerce-back-omega.vercel.app/productos/'; //aqui se hacen las peticiones 

export const ShopAddtoCart = () => {

    const[products, setProducts] = useState([])//aqui se guardan todos los productos
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {//aqui se hace la solicitud 
        const res = await axios.get(URI)
        setProducts(res.data)
    }
    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>SPORTLINE TENNIS</h1>
            </div>
            <div className="products"> 
                {products.map((product) => (
                    <Product key={product.id} data={product} />//aqui por todo el arreglo de productos se imprimen los productos
                ))}
            </div>
        </div>
    )
};