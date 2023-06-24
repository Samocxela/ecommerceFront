import React from "react";

export const Product = (props) => {
    const {id, nombre, precio, descripcion, img, img2, img3 } = props.data; //se le da valor a las variables en funcion de lo que se saca de la base de datos
    const imgURL = `../../img/${img}`;
    console.log(imgURL)
    return (
        <div className="product"> {/*aqui se muestran las informaciones de los productos en la pagina principal */}
            <div className="slide-var">
                <ul key={id}>
                    <li ><img src={require(`../../img/${img}`)} alt={nombre}/></li>{/*este es el carrusel para las imagenes */}
                    <li ><img src={imgURL} alt={nombre}/></li>
                    <li ><img src={require(`../../img/${img}`)} alt={nombre}/></li>
                </ul>
            </div>
            <div className="description">
                <p>{descripcion}</p>
            </div>
            <div className="description"> 
                <p> 
                    <b>{nombre}</b> 
                </p>
                <p> ${precio}</p>
            </div>
        </div> 
    );
};