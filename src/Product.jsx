import React from "react";
import { FiStar } from "react-icons/fi";

export default function Product({ data, handleAddToCart, filterItems }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const products = data.map((item) => {
    return (
      <div className="product" key={item.id}>
        <span className="star-obj">
          {" "}
          {item.rating.rate} <FiStar className="start-fistart" />
        </span>
        <div className="header-product">
          <h2>{item.title}</h2>
          <img src={item.image[0]} />
        </div>

        <div className="body-product">
          <h3>
            <span>À vista por </span>
            {formatter.format(item.price)}
          </h3>
          <p> 12x de {formatter.format(item.price / 8)} no cartão</p>
        </div>

        <button
          className="btn-add-to-cart"
          onClick={() => {
            handleAddToCart(item);
          }}
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  });
  return (
    <div className="general-container">
      <h2 className="title-general-container">
        {filterItems ? filterItems : "Todos os produtos"}
      </h2>
      <div className="items-container-home">{products}</div>
    </div>
  );
}
