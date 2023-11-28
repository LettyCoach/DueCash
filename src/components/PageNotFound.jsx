import React from 'react'
import notFound from "/404.svg"

function PageNotFound() {
  return (
    <section className="flex flex-col justify-center items-center h-[100vh] md:flex-row ">
      <img className="" src={notFound} width="100%" height="auto" alt="404 Error" />
      <div className="">
        <p className="text-gray-500 font-bold text-center mt-4">
          Sorry, We Couldn't Find That Page
        </p>
        <div className="flex justify-center my-2">
          <button className="outline_btn" type="button">Back</button>
        </div>
      </div>
    </section>
  )
}

export default PageNotFound
