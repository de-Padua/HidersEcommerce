import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserAuth() {
  let form = useRef();
  let newUser = useRef(null);
  let newEmail = useRef(null);
  let newPassword = useRef(null);
  let userEmail = useRef();
  let userToken = useRef();
  const [newuserobj, setnewuserobj] = useState(null);
  const [error, setError] = useState(false);
  const [errorEmailNotMatch, setErrorNotMatch] = useState(false);
  const [failLogin, setFailLogin] = useState(false);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const styleBorder = error ? "2px solid red" : "1px solid black";
  const placeHolderMsg = error ? "Email já cadastrado" : "";
  const emailDontMatch = errorEmailNotMatch ? "Email inválido" : "";
  const errorMsgDefaultLogin = failLogin ? "Senha ou email inválidos" : "";

  function getData() {
    if (newEmail.current.value.match(regex) != null) {
      const newUserObj = {
        user: newUser.current.value,
        email: newEmail.current.value,
        token: newPassword.current.value,
        userProfilePic:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        userCart: [],
        userLocale: undefined,
        userPhone: undefined,
      };

      const usersData = JSON.parse(localStorage.getItem("users"));
      const found = usersData.find((item) => {
        return item.email === newUserObj.email;
      });
      if (found) {
        setError(true);
      } else {
        toast.success(`Conta criada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        form.current.reset();
        setUsers((oldUsers) => [...oldUsers, newUserObj]);
      }
    } else {
      setErrorNotMatch(true);
    }
  }

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  function userLogin() {
    const getUsers = JSON.parse(localStorage.getItem("users"));
    const found = getUsers.find((userLog) => {
      return (
        userLog.token === userToken.current.value &&
        userLog.email === userEmail.current.value
      );
    });
    if (found) {
      localStorage.setItem("loged", JSON.stringify(found));
      window.location = "/";
    } else {
      setFailLogin(true);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="form-containerMASTER">
        <div className="left-img"></div>
        <div className="form-container">
          <form ref={form}>
            <h1>Bem vindo</h1>

            <div className="formcontainer">
              <div className="container">
                <label htmlFor="uname">
                  <strong>Usuário</strong>
                </label>
                <input
                  ref={newUser}
                  type="text"
                  placeholder="Novo usuário"
                  name="uname"
                  required
                />
                <label htmlFor="mail">
                  <strong>E-mail</strong>
                </label>
                <h6 style={{ margin: "0", marginTop: ".5em", color: "red" }}>
                  {placeHolderMsg}
                  {emailDontMatch}
                </h6>
                <input
                  style={{ border: styleBorder }}
                  type="text"
                  ref={newEmail}
                  placeholder="Novo E-mail"
                  name="mail"
                  required
                  onChange={() => {
                    setError(false);
                    setErrorNotMatch(false);
                  }}
                />
                <label htmlFor="psw">
                  <strong>Senha</strong>
                </label>
                <input
                  type="password"
                  ref={newPassword}
                  placeholder="Nova senha"
                  name="psw"
                  required
                />
              </div>
              <button
                className="btn-dif"
                type="submit"
                onClick={() => {
                  event.preventDefault();
                  getData();
                }}
              >
                <strong>Criar conta</strong>
              </button>
            </div>
          </form>
          <form action="/">
            <h1>Login</h1>

            <div className="icon">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="formcontainer">
              <div className="container">
                <h4 style={{ color: "red" }}>{errorMsgDefaultLogin}</h4>

                <label htmlFor="mail">
                  <strong>E-mail</strong>
                </label>
                <input
                  type="text"
                  placeholder="E-mail"
                  name="mail"
                  required
                  ref={userEmail}
                />
                <label htmlFor="psw">
                  <strong>Senha</strong>
                </label>
                <input
                  ref={userToken}
                  type="password"
                  placeholder="Entre uma senha"
                  name="psw"
                  required
                />
              </div>
              <button
                className="btn-dif"
                type="submit"
                onClick={() => {
                  event.preventDefault();
                  userLogin();
                }}
              >
                <strong>Entrar</strong>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
