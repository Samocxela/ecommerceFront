import React, {useContext} from 'react';
import { ShopContext } from "../../context/shop-context";//importamos el context
import { CartItem } from './cart-item'; //importamos el cartitem para cada item que se ingrese en el carrito
import "./cart.css"; //vinculamos el css
import { useNavigate } from 'react-router-dom' //se importa para poder redireccionar
import axios from 'axios';//se usa para hacer peticiones al servidor
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'https://ecommerce-back-omega.vercel.app/productos/';//esta sera la ruta en la cual se haran las peticiones
//const URI = 'http://localhost:5000/productos/';//esta sera la ruta en la cual se haran las peticiones
export const Cart = () => {
    const context = useContext(ShopContext);//variable para usar el contexto
    const { cartItems, getTotalCartAmount } = useContext(ShopContext); //aqui almacenamos los elementos del carrito
    const totalAmount = getTotalCartAmount(); //aqi se almacena el total de la compra
    const navigate = useNavigate();//se usa para navegar entre direcciones

    const[products, setProducts] = useState([])//aqui se almacenan todos los productos
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {//aqui se obtienen todos los productos
        const res = await axios.get(URI)
        setProducts(res.data)
    }

    const buy = async (e) => {
        e.preventDefault();
      
        const cartData = Object.entries(cartItems).reduce((data, [itemId, quantity]) => {
          data[itemId] = parseInt(quantity);
          return data;
        }, {});
        try {
            console.log(cartData)
          await axios.put(URI+'buy', cartData);
          context.setPayAumount(totalAmount);
          alert("payment succesful")
          //navigate('/stripe');
        } catch (error) {
          alert(error.message);
        }
      };
      
      
      
    return (
        <div className="cart">
            <div> 
                <h1> Your Cart Items</h1>
            </div>
            <div className="cartItems">
                {products.map((product) => {
                    if (cartItems[product.id] !== 0) {{/*para cada producto lo mostramos */}
                        return <CartItem key={product.id} data={product} />;
                    }
                })}
            </div>
            {totalAmount > 0 ? //si el total es mayor que 0
            <div className="checkout">
                <p> Subtotal: ${totalAmount}</p>{/*imprime el total de la compra calculado */}
                <button onClick={() => navigate ("/shop")}> Continue Shopping</button>{/*si se le da click se devuelve a la tienda principal */}
                <button onClick={buy}> Checkout </button>{/*si se le da clic llama a la funcion buy que lleva a procesar el pago */}
            </div>
            : <h1 className='mensaje-vacio'> Your Cart is Empty </h1>}
        </div>
    )
};