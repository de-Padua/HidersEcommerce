import React from "react";
import { useState, useEffect, useRef } from "react";
import { FiSlash } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function profilePage() {
  const [user, getUser] = useState(JSON.parse(localStorage.getItem("loged")));

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <>
      <div className="user-home-container">
        <div className="userContainerMain">
          <div className="header-user-info">
            <div className="left-img-name-info">
              <img src={user.userProfilePic} />

              <h4> {user.user}</h4>
              <p>Email : {user.email}</p>
            </div>
            <div className="cart-preview">
              <h2>Seu cart</h2>
              {user.userCart.map((item) => {
                return (
                  <div className="item-in-cart">
                    <div className="header-cart">
                      <div>
                        <img src={item.item.image[0]} width={"80px"} />
                      </div>
                      <div className="info-in-cart">
                        <h4> {item.item.title}</h4>
                        <p>{formatter.format(item.item.price)}</p>
                        <p> Quantidade : {item.quantidade}</p>
                      </div>
                    </div>
                    <div className="buttons-in-cart"></div>
                  </div>
                );
              })}
            </div>
          </div>
          <Link to="/HidersEcommerce/">
            <button className="btn-dif">Página principal</button>
          </Link>
        </div>
      </div>
    </>
  );
}
