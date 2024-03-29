import { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../assets/Infinity.gif";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // New state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setIsLoading(true);
      const { username, password } = values;

      try {
        const { data } = await axios.post(loginRoute, { username, password });
        setIsLoading(false);
        if (data.status === false) {
          toast.error(data.msg);
        }
        if (data.status === true) {
          localStorage.setItem(
            "ChatterSphere-user",
            JSON.stringify(data.returnUser)
          );
          setLoginSuccess(true); // Set the login success state
          setTimeout(() => {
            setLoginSuccess(false); // Reset the login success state after a delay
            navigate("/");
          }, 3000); // Adjust the delay as needed
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("An error occurred during the login process.");
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    let errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is Required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemoCredentials = () => {
    setValues({
      username: "Lin",
      password: "12345678",
    });
  };

  return (
    <>
      <FormContainer>
        <div className="left">
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>
              ChatterSphere
              <sup>
                <span>&#174;</span>
              </sup>
            </h1>
          </div>
        </div>
        <div className="right">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="heading">
              <h2>Login</h2>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={(e) => handleChange(e)}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={(e) => handleChange(e)}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>

            <button type="submit" className="cssbuttons-io-button">
              Login
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  ></path>
                </svg>
              </div>
            </button>
            {loginSuccess && (
              <p style={{ color: "green" }}>
                Login successful! Redirecting...
              </p>
            )}
            <span>
              New to ChatterSphere? <Link to="/register">REGISTER</Link>
            </span>
            <button
              type="button"
              className="cssbuttons-io-button"
              onClick={handleDemoCredentials}
            >
              Use Demo Credentials
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  ></path>
                </svg>
              </div>
            </button>
          </form>
        </div>
      </FormContainer>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && (
        <Overlay>
          <img src={Loader} alt="loading" />
        </Overlay>
      )}
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background: #dee5e8;
  box-shadow: 21px 21px 42px #bdc3c5, -21px -21px 42px #ffffff;
  .left {
    height: 100vh;
    width: 60vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .brand {
      height: 30%;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      @keyframes floatEffect {
        0%,
        100% {
          transform: translateY(-5px);
        }
        50% {
          transform: translateY(5px);
        }
      }
      img {
        height: 40rem;
        animation: floatEffect 5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      }
      h1 {
        margin-left: -35px;
        font-size: 57px;
      }
      span {
        font-size: 30px;
      }
    }
  }
  .right {
    height: 100vh;
    width: 40vw;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
      /* box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12); */
      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
      height: auto;
      width: 70%;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      padding: 3rem 3.5rem;
      border-radius: 1rem;
      &::placeholder {
        color: rgb(175, 175, 175);
      }
      .heading {
        text-align: center;
        font-size: 24px;
        color: #6fd492;
        /* text-wrap:balance; */
      }

      input {
        background-color: transparent;
        padding: 0.8rem;
        outline: none;
        border: none;
        border-bottom: 0.1rem solid #74d465;
        border-radius: 0.4rem;
        width: 100%;
        font-size: 1rem;
        &:focus {
          border-bottom: 0.1rem solid #997af0;
          outline: none;
        }
      }
      .cssbuttons-io-button {
        background: #a370f0;
        background: #00d0cc;
        color: white;
        font-family: inherit;
        padding: 0.35em;
        padding-left: 1.2em;
        font-size: 17px;
        font-weight: 500;
        border-radius: 0.9em;
        border: none;
        letter-spacing: 0.05em;
        display: flex;
        align-items: center;
        /* box-shadow: inset 0 0 1.6em -0.6em #714da6; */
        box-shadow: inset 0 0 1.6em -0.6em #07e4df;
        box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
          rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
        overflow: hidden;
        position: relative;
        height: 2.8em;
        padding-right: 3.3em;
      }

      .cssbuttons-io-button .icon {
        background: white;
        margin-left: 1em;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.2em;
        width: 2.2em;
        border-radius: 0.7em;
        box-shadow: 0.1em 0.1em 0.6em 0.2em #44dbd9;
        right: 0.3em;
        transition: all 0.8s;
      }

      .cssbuttons-io-button:hover .icon {
        width: calc(100% - 0.6em);
      }

      .cssbuttons-io-button .icon svg {
        width: 1.1em;
        transition: transform 0.3s;
        color: #7b52b9;
      }

      .cssbuttons-io-button:hover .icon svg {
        transform: translateX(0.1em);
      }

      .cssbuttons-io-button:active .icon {
        transform: scale(0.95);
      }
      span {
        text-transform: uppercase;
        text-align: center;
        a {
          color: #4e0eff;
          text-decoration: none;
          font-weight: bold;
        }
      }
      p {
        color: red;
        margin-left: 0.5rem;
        font-size: 0.8rem;
        margin-top: 0.2rem;
      }
    }
  }
  @media (max-width: 1190px) and (min-width: 869px) {
    .left {
      .brand {
        img {
          height: 30rem; // Reduced height from 40rem
        }
        h1 {
          font-size: 55px; // Reduced font size from 57px
        }
        span {
          font-size: 24px; // Reduced font size from 30px
        }
      }
    }
  }
  @media (max-width: 868px) {
    // Adjust this breakpoint value as needed
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      width: 0;
      background: transparent; // Optional: Make scrollbar transparent
    }

    // Hide scrollbar for IE and Edge
    & {
      -ms-overflow-style: none; // IE and Edge
      scrollbar-width: none; // Firefox
    }

    .left {
      width: 100vw;
      height: 30vh;
      flex-direction: column;

      .brand {
        align-items: center;
        justify-content: center;
        img {
          height: 15rem;
        }
        h1 {
          margin-left: 0;
          font-size: 32px;
        }
      }
    }

    .right {
      width: 100vw;
      height: auto;
      form {
        width: 90%; // adjust this based on your preference for mobile layout
        /* max-height: 50vh; */
      }
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
`;
