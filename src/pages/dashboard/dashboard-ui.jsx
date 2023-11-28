import React from "react";
import Card from "../../components/Card";
import DashboardModal from "../../components/DashboardModal";
import Loading from "../../components/Loading";
import Warning from "../../components/Warning";
import dashboardLogic from "./dashboard-logic";
import { ToastContainer } from 'react-toastify';
import convertNumberToBn from "src/utils/convertNumberToBn"

function DashboardPage({userName}) {
  const {
    customersData,
    customersDataReserved,
    searchValue,
    onSearch,
    isOpen,
    setIsOpen,
    showDeletePrompt,
    setShowDeletePrompt,
    deleteRecord,
    createCustomer,
    editCustomer,
    handleDelete,
    handleModal,
    modalType,
    editData,
    isLoading,
    isLoadingCard,
    error,
    appLanguage,
    darkTheme
  } = dashboardLogic();
  
  if(isLoading){
    return <Loading />
  }
  
  if(error){
    return <h2>Oops! Something went wrong</h2>
  }
  
  return (
    <section className={`container`}>
      <ToastContainer />
      <DashboardModal type={modalType} isOpen={isOpen} setIsOpen={setIsOpen} createCustomer={createCustomer} editCustomer={editCustomer} editData={editData} isLoadingCard={isLoadingCard} />
      <Warning showDeletePrompt={showDeletePrompt} deleteRecord={deleteRecord} setShowDeletePrompt={setShowDeletePrompt} isLoadingCard={isLoadingCard} />
      
      <h1 className="text-center text-2xl text-gray-400">
        {
          appLanguage === "en" 
          ? <span>Manage Your Due Cash - No More Paperwork Hassles!</span>
          : <span>আপনার পাওনা টাকা ম্যানেজ করুন সহজভাবে। আর নয় খাতা-কলম!</span>
        }
      </h1>
      <button
        onClick={() => handleModal("Create") }
        className="my-4 blue_gradient_btn"
      >
        {appLanguage === "en" ? "Create New Customer" : "নতুন তালিকা তৈরী করুন"}
      </button>
      <div className="">
        <input
          onChange={onSearch}
          placeholder={`${appLanguage === "en" ? "Search by name..." : "নাম লিখে খুজুন ..."}`}
          className={`${darkTheme && "darktheme"} text_input rounded px-2 shadow focus:border-0`}
          type="text"
          name="search"
          id="search"
          value={searchValue}
        />
      </div>
      <div className="card_container">
        {
          customersData?.length > 0 && <h4 className={`${darkTheme && "text-white"} mt-2`}>{appLanguage === 'en' ? "Total Customer:" : "মোট কাস্টমার:"} {appLanguage === "en" ? (customersData?.length) : (convertNumberToBn(customersData?.length))}</h4>
        }
        
        {!isLoading && customersDataReserved.length !== 0 && customersData.length == 0 && (
          <div className="mt-5 flex justify-center items-center font-bold">
            <p className={`${darkTheme && "text-white"}`}>Oops! Not Found</p>
          </div>
        )}
        
        {!isLoading && customersDataReserved.length == 0 && (
          <div className="mt-5 flex justify-center items-center font-bold">
            <p className={`${darkTheme && "text-white"}`}>Create a new customer to get started 🚀</p>
          </div>
        )}
        
        {
          isLoadingCard && <Loading />
        }
        
        {!isLoadingCard && customersData.map((customer) => (
          <Card
            key={customer._id}
            customer={customer}
            handleDelete={handleDelete}
            handleModal={handleModal}
          />
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
