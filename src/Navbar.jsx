import React, { useEffect, useState } from "react";
import logo from "./assets/mental-health-svgrepo-com.svg";
import { FiShoppingBag, FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar({
  totalItems,
  total,
  handleCartState,
  dropDown,
  handleDropDown,
  handleFulteredItem,
}) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loged")) || "offline"
  );
  const [isLogged, setIsLogged] = useState(false);

  function userOpt() {
    if (user != "offline") {
      setIsLogged(true);
    } else {
      localStorage.setItem("loged", JSON.stringify("offline"));
    }
  }
  function saveUserCart() {
    const activeUser = JSON.parse(localStorage.getItem("loged"));
    const addtoUserCart = {
      ...activeUser,
      userCart: JSON.parse(localStorage.getItem("cart")),
    };

    const usersList = JSON.parse(localStorage.getItem("users"));
    const filteredList = usersList.filter((item) => {
      return item.email != activeUser.email;
    });

    const newUsersList = [...filteredList, addtoUserCart];
    localStorage.setItem("users", JSON.stringify(newUsersList));
  }

  const exitOpt = isLogged ? (
    <FiLogOut
      className="exitButton"
      onClick={() => {
        setIsLogged(false);
        saveUserCart();
        setTimeout(() => {
          localStorage.setItem("loged", JSON.stringify("offline"));
          localStorage.setItem("cart", JSON.stringify([]));
          window.location = "/";
        }, 1000);
      }}
    ></FiLogOut>
  ) : (
    ""
  );
  const userMsg = isLogged ? `${user.user}` : `Crie uma conta ou faça login`;
  const userPath = isLogged ? "/profilePage" : "/userAuth";

  useEffect(() => {
    userOpt();
  }, [user]);

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const dropDownConfig = {
    top: dropDown ? "110px" : "20px",
    opacity: dropDown ? "1" : "0",
    pointerEvents: dropDown ? "auto" : "none",
  };
  return (
    <div className="navbar">
      <div className="logo">
        <h2>HIDER</h2>
      </div>
      <div className="links">
        <div className="categorias">
          <a onClick={handleDropDown} className="categorias-btn-menu">
            {" "}
            Categorias
          </a>
          <div
            className="drop-down-menu"
            onClick={handleDropDown}
            style={dropDownConfig}
          >
            <p
              onClick={() => {
                handleFulteredItem("sapato");
              }}
            >
              Sapatos
            </p>
            <p
              onClick={() => {
                handleFulteredItem("mochila");
              }}
            >
              Mochilas
            </p>
            <p
              onClick={() => {
                handleFulteredItem("home");
              }}
            >
              Todos
            </p>
          </div>
        </div>
        <div
          className="cart-btn"
          onClick={() => {
            handleCartState();
          }}
        >
          <div className="cart-qnt">
            <FiShoppingBag className="cart-icon" />
            <p className="quantity-icon">{totalItems.length}</p>
          </div>
          <div>
            <p className="total-btn-cart">{formatter.format(total)}</p>
          </div>
        </div>
        <Link className="user" to={userPath}>
          <div
            onClick={() => {
              saveUserCart();
            }}
          >
            <FiUser className="user-icon" />
          </div>
          <div>
            <p>{userMsg}</p>
          </div>
        </Link>
        {exitOpt}
      </div>
    </div>
  );
}
