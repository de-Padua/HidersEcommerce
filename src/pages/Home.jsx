import React from "react";
import { useEffect, useState } from "react";
import Product from "../Product";
import Cart from "../Cart";
import Navbar from "../Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [filterItems, setFilterItems] = useState(null);
  const [item, setItem] = useState(null);
  const [value, setValue] = useState(0);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartValue, setTotalCartValue] = useState();
  const [cartState, setCartState] = useState(false);
  const [buy, setBuy] = useState(false);
  const [filterByColor, setfilterByColor] = useState(null);
  const [activeUserF, setActiveUser] = useState(null);
  const [userCart, setUserCart] = useState([]);
  const notify = () => {
    toast.warn("Item já está no carrinho", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };
  function handleCleanCart() {
    setCart([]);
  }
  const notifyAdded = () => {
    toast.success("Item adicionado no carrinho", {
      position: "top-right",

      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const handlesetBuyf = () => {
    if (cart.length === 0) {
      const rejectBuy = new Promise((resolve, reject) =>
        setTimeout(reject, 3000)
      );
      toast.promise(rejectBuy, {
        pending: "A compra está sendo finalizada",
        success: "Compra concluída! A nota fiscal foi enviada ao seu email. ",
        error: "Algo deu errado ! 🤯",
      });
    } else {
      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

      toast.promise(resolveAfter3Sec, {
        pending: "A compra está sendo finalizada",
        success: "Compra concluída! A nota fiscal foi enviada ao seu email. ",
        error: "Algo deu errado !   🤯",
      });
      setTimeout(() => {
        setCart([]);
      }, 1500);
    }
  };
  function handleDropDown() {
    setDropDownMenu((oldValue) => (oldValue = !oldValue));
  }
  function getFilteredItems(filteredItem) {
    if (filteredItem === "home") {
      setFilterItems(null);
      setItem(Product({ data, handleAddToCart: addToCart }));
    } else {
      setFilterItems(filteredItem);
    }
  }

  function filterColor(filteredItem) {
    if (filteredItem === "home") {
      setfilterByColor(null);
      setItem(Product({ data, handleAddToCart: addToCart }));
    } else {
      setfilterByColor(filteredItem);
    }
  }

  function addToCart(item) {
    //check duplicates
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const found = cartItems.find((duplicate) => {
      return duplicate.item.id === item.id;
    });
    if (found) {
      notify();
    } else {
      notifyAdded();
      setCart((previusValue) => [...previusValue, { item, quantidade: 1 }]);
    }
  }
  function increaseF(select) {
    let foundItem = cart.find((x) => {
      return x.item.id === select.item.id;
    });
    foundItem.quantidade = foundItem.quantidade + 1;
    let newCart = cart.slice();

    setCart(newCart);
  }
  function removerItem(select) {
    let newCartItems = cart.filter((cartItems) => {
      return cartItems.item.id != select.item.id;
    });

    setCart(newCartItems);
  }

  function decreaseF(select) {
    let foundItem = cart.find((x) => {
      return x.item.id === select.item.id;
    });
    if (foundItem.quantidade < 2) {
      return;
    } else {
      foundItem.quantidade = foundItem.quantidade - 1;
      let newCart = cart.slice();
      setCart(newCart);
    }
  }
  function removerItem(select) {
    let newCartItems = cart.filter((cartItems) => {
      return cartItems.item.id != select.item.id;
    });

    setCart(newCartItems);
  }

  function getTotalValue() {
    if (cart.length === 0) {
      setValue(0);
    } else {
      const y = cart.map((x) => {
        return x.item.price * x.quantidade;
      });
      const p = y.reduce((acc, v) => {
        return acc + v;
      });
      setValue(p);
    }
  }
  function changeState() {
    setCartState((oldValue) => (oldValue = !oldValue));
  }

  useEffect(() => {
    fetch("./products.json")
      .then((resp) => resp.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    const x = JSON.parse(localStorage.getItem("loged"));
    if (x === "offline") {
    } else {
      setCart(x.userCart);
    }
  }, []);

  useEffect(() => {
    const x = JSON.parse(localStorage.getItem("loged"));
    if (buy) {
      const activeUser = x;
      const addtoUserCart = {
        ...activeUser,
        userCart: cart,
      };
      localStorage.setItem("loged", JSON.stringify(addtoUserCart));
      setActiveUser(addtoUserCart);
    } else if (value > 1) {
      const activeUser = x;
      const addtoUserCart = {
        ...activeUser,
        userCart: cart,
      };
      localStorage.setItem("loged", JSON.stringify(addtoUserCart));
      setActiveUser(addtoUserCart);
    }
  }, [cart]);

  useEffect(() => {
    if (activeUserF === null) {
      return;
    } else {
      const usersList = JSON.parse(localStorage.getItem("users"));
      const filteredList = usersList.filter((item) => {
        return item.email != activeUserF.email;
      });

      const newUsersList = [...filteredList, activeUserF];
      console.log(newUsersList);
      localStorage.setItem("users", JSON.stringify(newUsersList));
    }
  }, [activeUserF]);
  useEffect(() => {
    JSON.parse(localStorage.getItem("users")) || [];
  }, []);

  useEffect(() => {
    if (filterItems === null) {
      return;
    } else {
      const w = JSON.parse(localStorage.getItem("products"));
      const newArr = w.filter((x) => {
        return x.category === filterItems;
      });
      const data = newArr;
      setItem(Product({ data, handleAddToCart: addToCart, filterItems }));
    }
  }, [filterItems]);

  useEffect(() => {
    if (filterByColor === null) {
      return;
    } else {
      const w = JSON.parse(localStorage.getItem("products"));
      const newArr = w.filter((x) => {
        return x.cor === filterByColor;
      });
      const data = newArr;
      setItem(Product({ data, handleAddToCart: addToCart }));
    }
  }, [filterByColor]);

  useEffect(() => {
    if (data === null) {
      return;
    } else {
      setItem(Product({ data, handleAddToCart: addToCart }));
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    getTotalValue();
  }, [cart]);
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Navbar
        totalItems={cart}
        total={value}
        handleCartState={changeState}
        dropDown={dropDownMenu}
        handleDropDown={handleDropDown}
        handleFulteredItem={getFilteredItems}
      />

      <Cart
        totalValue={cart}
        increaseQuantidade={increaseF}
        decreaseQuantidade={decreaseF}
        removerItem={removerItem}
        total={value}
        state={cartState}
        handleCartState={changeState}
        handlesetBuy={handlesetBuyf}
        handleCleanCart={handleCleanCart}
      />
      <div className="container-main">
        <div className="cat">
          <div>
            <h3>Categorias</h3>
            <p
              onClick={() => {
                getFilteredItems("Para cabeça");
              }}
            >
              Para cabeça
            </p>
            <p
              onClick={() => {
                getFilteredItems("Sapatos");
              }}
            >
              Sapatos
            </p>
            <p
              onClick={() => {
                getFilteredItems("Luvas");
              }}
            >
              Luvas
            </p>
            <p
              onClick={() => {
                getFilteredItems("Mochilas");
              }}
            >
              Mochilhas
            </p>
            <p
              onClick={() => {
                getFilteredItems("home");
              }}
            >
              Todos
            </p>
          </div>
          <div>
            <h3>Cores</h3>
            <div className="colors">
              <div
                className="block rosa"
                onClick={() => {
                  filterColor("home");
                }}
              ></div>
              <div
                className="block vermelho"
                onClick={() => {
                  filterColor("vermelho");
                }}
              ></div>
              <div
                className="block verde"
                onClick={() => {
                  filterColor("verde");
                }}
              ></div>
              <div
                className="block azul"
                onClick={() => {
                  filterColor("azul");
                }}
              ></div>
              <div
                className="block amarelo"
                onClick={() => {
                  filterColor("amarelo");
                }}
              ></div>
              <div
                className="block preto"
                onClick={() => {
                  filterColor("preto");
                }}
              ></div>
              <div
                className="block branco"
                onClick={() => {
                  filterColor("branco");
                }}
              ></div>
            </div>
          </div>
        </div>
        {item}
      </div>
      <div className="disclaymer-con">
        <div>
          <h2>Disclaimer for Hiders</h2>
          <p>
            If you require any more information or have any questions about our
            site's disclaimer, please feel free to contact us by email at
            Email@Website.com. Disclaimers for Company Name All the information
            on this website is published in good faith and for general
            information purpose only. Website Name does not make any warranties
            about the completeness, reliability and accuracy of this
            information. Any action you take upon the information you find on
            this website , is strictly at your own risk. will not be liable for
            any losses and/or damages in connection with the use of our website.
            From our website, you can visit other websites by following
            hyperlinks to such external sites. While we strive to provide only
            quality links to useful and ethical websites, we have no control
            over the content and nature of these sites. These links to other
            websites do not imply a recommendation for all the content found on
            these sites. Site owners and content may change without notice and
            may occur before we have the opportunity to remove a link which may
            have gone ‘bad'. Please be also aware that when you leave our
            website, other sites may have different privacy policies and terms
            which are beyond our control. Please be sure to check the Privacy
            Policies of these sites as well as their "Terms of Service" before
            engaging in any business or uploading any information.
          </p>
        </div>
      </div>
    </>
  );
}
