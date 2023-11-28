import { useState } from "react";
import loginLogic from "./login-logic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AppDesc from "src/components/AppDesc"

function LoginPage() {
  const {
    username,
    password,
    onChange,
    onSubmit,
    passwordVisible,
    handlePasswordVisible,
    isLoading,
    darkTheme
  } = loginLogic();

  return (
    <section className={`${darkTheme && "darktheme"} container login_ui`}>
      <ToastContainer />
      <h1 className="title">
        <span>DUE</span> <span className={`${darkTheme && "text-white"} text-black`}>CASH</span>
      </h1>
      <div className="flex justify-center">
        <p className="h-[3px] w-10 bg-blue-600"></p>
      </div>
      <AppDesc />
      <h2 className="mt-4 text-center text-md font-bold">
        Login to your account
      </h2>

      <form onSubmit={onSubmit} className="" accept-charset="utf-8">
        <div className="my-4">
          <input
            onChange={onChange}
            placeholder="Enter username or email"
            className={`${darkTheme && "darkthemeDim"} text_input`}
            type="text"
            name="username"
            id="username"
            value={username}
          />
        </div>
        <div className="my-4 relative">
          <input
            onChange={onChange}
            placeholder="Enter password"
            className={`${darkTheme && "darkthemeDim"} text_input`}
            type={!passwordVisible ? "password" : "text"}
            name="password"
            id="password"
            value={password}
          />
          <span
            onClick={handlePasswordVisible}
            className="absolute right-1 top-2 text-lg"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button disabled={isLoading} className="blue_gradient_btn" type="submit">
          {isLoading ? "Logining ..." : "Login"}
        </button>
        <div className="flex justify-center items-center mt-4 text-sm">
          <Link className="text-blue-600" to="/forgot-password">
            Forgot password?
          </Link>
        </div>
        <div className="flex justify-center items-center mt-2 gap-2 text-sm">
          <span className={`${darkTheme && "text-white"} text-gray-600`}>Haven't account?</span>
          <Link className="text-blue-600" to="/signup">
            Signup
          </Link>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
