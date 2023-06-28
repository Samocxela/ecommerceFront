/*import React from 'react';
import {Elements} from "@stripe/react-stripe-js";//se llama elements para stripe
import { loadStripe } from '@stripe/stripe-js'; //se llama loadstripe
import PaymentForm from './PaymentForm';

const PUBLIC_KEY="pk_test_51NIJVgGbqyIDsGbL2Ee3cyY7sTaBkDhvXsLHIurCIXgYtmbvHVVTGvwL9A56diwxNr5DhMYyOEBBuDY1mxB9c0Iu00bDPzOohm" //se coloca la llave publica

const stripeTestPromise = loadStripe(PUBLIC_KEY); //se crea una variable en la que se almacena la key

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>{/*se llama al elemento al formulario de del pago  
                <PaymentForm/>
        </Elements>
    )
}*/