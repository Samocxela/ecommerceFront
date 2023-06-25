import React from "react";
import { useState } from "react";
import axios from 'axios';

const URI = 'https://ecommerce-back-omega.vercel.app/productos/';//aqui se hacen las peticiones 

export const Product = (props) => {
    const { id, nombre, precio, img, img2, img3, stockmax, stockmin, stock } = props.data;
    const [priceHook, setPrice] = useState('');
    const [maxStock, setMaxS] = useState('');
    const [minStock, setMinS] = useState('');
    const [stockHook,setStock] = useState('');
    const URLimg = `../../../img/${img}`

    const update = async (e) => {
        e.preventDefault();
        await axios.put(URI+id+'/', { precio: priceHook, stockmax: maxStock, stockmin: minStock, stock:stockHook});
        
        // Actualizar el estado local del producto con los nuevos valores
        setPrice('');
        setMaxS('');
        setMinS('');
        setStock('');
    }

    return (
        <div className="product">
            <div className="slide-var">
                <ul>
                    <li><img src={URLimg} alt={nombre}/></li>
                    <li><img src={URLimg} alt={nombre}/></li>
                    <li><img src={URLimg} alt={nombre}/></li>
                </ul>
            </div>
            <div className="description"> 
                <p> 
                    <b>{nombre}</b>
                </p>
                <p> ${precio}</p>
                <p> {stock}</p>
                <p> Max Stock: {stockmax}</p>
                <p> Min Stock: {stockmin}</p>
                <form onSubmit={update} action="/auth" method="post">
                    <input 
                        value={priceHook}
                        onChange={ (e) => setPrice(e.target.value)}
                        type="text" min={0} name="pass" id="pass" required placeholder="New Price"/>
                    <input 
                        value={stockHook}
                        onChange={ (e) => setStock(e.target.value)}
                        type="text" min={0} name="pass" id="pass" required placeholder="New Stock"/>
                    <input 
                        value={maxStock}
                        onChange={ (e) => setMaxS(e.target.value)}
                        type="text" min={0} name="pass" id="pass" required placeholder="New MaxStock"/>
                    <input 
                        value={minStock}
                        onChange={ (e) => setMinS(e.target.value)}
                        type="text" min={0} name="pass" id="pass" required placeholder="New MinStock"/>
                    <input type="submit" className="btn-login" value="Edit" />
                </form>
            </div>
        </div> 
    );
};
