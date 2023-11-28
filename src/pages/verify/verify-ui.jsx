import React from 'react'
import verifyLogic from "./verify-logic"
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom"
import Loading from "src/components/Loading"

function VerifyUi() {
  const { isLoading, confirmed, error } = verifyLogic()
  
  return (
    <section className="py-4">
      <ToastContainer />
      {
        isLoading && (
            <>
              <h2 className="title">Confirming Your Account ...</h2>
              <Loading /> 
            </>
          )
      }
      {
        !isLoading && confirmed && (
            <div className="text-center">
              <h2 className=""><span className="text-3xl">🔥</span><span className="title">{confirmed}</span></h2>
              <p>Now you can login to your account</p>
              <button className="mt-2 outline_btn"><a href="/">🚀 Login</a></button>
            </div>
          )
      }
      {
        !isLoading && error && (
          <div className="">
            <h2 className="title">{error}</h2>
            <div className="mt-3 text-center">
              <p className="text-center">You might clicked on wrong link.Click bellow button and try to login your account</p>
              <button className="mt-2 outline_btn"><Link to="/">🚀 Login</Link></button>
            </div>
          </div>
        )
      }
    </section>
  )
}

export default VerifyUi
