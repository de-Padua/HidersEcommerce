import React from "react";
import { useState, useEffect, useRef } from "react";
import { FiSlash } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";

export default function Cart({
  totalValue,
  increaseQuantidade,
  decreaseQuantidade,
  removerItem,
  total,
  state,
  handleCartState,
  handlesetBuy,
  handleCleanCart,
}) {
  const teste = totalValue.length ? "" : "Sem itens do carrinho";
  const menuConfig = state ? "0px" : "-490px";

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  const items = totalValue.map((item) => {
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
        <div className="buttons-in-cart">
          <div className="btn-left">
            <button
              className="btn-add"
              onClick={() => {
                increaseQuantidade(item);
              }}
            >
              +
            </button>
            <button
              className="btn-red"
              onClick={() => {
                decreaseQuantidade(item);
              }}
            >
              -
            </button>
          </div>
          <div className="btn-right">
            <FiSlash
              className="remove-item-btn"
              onClick={() => {
                removerItem(item);
              }}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="cart-items-container" style={{ right: menuConfig }}>
      <FiShoppingBag
        className="cart-open"
        onClick={() => {
          handleCartState();
        }}
      />
      <button
        className="btn-clean-cart"
        onClick={() => {
          handleCleanCart();
        }}
      >
        Limpar tudo
      </button>
      <div className="items-container">{items}</div> {teste}
      <div className="total-price">
        {" "}
        <h2>{formatter.format(total)}</h2>
      </div>
      <div>
        <button
          className="finalizar-comprar-btn"
          onClick={() => {
            handlesetBuy();
          }}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
