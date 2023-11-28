import { useState, useEffect, useContext } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Context from "src/context-api/Context";

function ManageModal({ manageModalProps }) {
  const { 
    type, 
    isOpen, 
    setIsOpen, 
    createRecord, 
    editRecord,
    editData,
    isLoadingCard
  } = manageModalProps;
  
  const [boughtProducts, setBoughtProducts] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [givenAmount, setGivenAmount] = useState("");
  const { darkTheme, toggleDarkTheme, appLanguage } = useContext(Context)
  
  // For send to edit function
  const props = {
    boughtProducts,setBoughtProducts,
    totalPrice,setTotalPrice,
    givenAmount,setGivenAmount
  }
  
  useEffect(() => {
    setBoughtProducts(editData?.boughtProducts || "")
    setTotalPrice(editData?.totalPrice || "")
    setGivenAmount(editData?.givenAmount || "")
  },[editData]);
  
  const createText = (type === 'Create') && appLanguage === 'en' ? "Create New Bought Record" : "কেনা পণ্যের নতুন হিসাব তৈরি করুন"
  const editText = (type !== 'Create') && appLanguage === 'en' ? "Edit Bought Record" : "কেনা পণ্যের হিসাব এডিট করুন"
  
  return (
    <div
      className={`${
        isOpen ? "visible" : "hidden"
      }
      fixed z-10 top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.75)] h-[100vh] w-[100vw] p-10 overflow-scroll`}
    >
      <div className={`relative bg-white py-10 px-5 rounded md:mx-24 md:px-20 ${darkTheme && "darktheme"}`}>
        <span
          className={`absolute right-5 top-2 text-2xl`}
          onClick={() => setIsOpen(false)}
        >
          <FaRegWindowClose />
        </span>
        <h1 className="title my-5">
          {type == "Create" ? createText : editText }
        </h1>
        <div className="">
          <textarea
            onChange={(e) => setBoughtProducts(e.target.value)}
            className={`textarea_input my-2 px-2 resize-none ${darkTheme && "darkthemeDim"}`}
            placeholder={`${appLanguage === 'en' ? "Enter bought products" : "কেনা পণ্যসমহের বিবরণ" }`}
            type="text"
            name="products"
            value={boughtProducts}
          />
        </div>
        <div className="">
          <input
            onChange={(e) => setTotalPrice(e.target.value)}
            className={`text_input my-2 px-2 ${darkTheme && "darkthemeDim"}`}
            placeholder={`${appLanguage === 'en' ? "Enter total price" : "মোট দাম" }`}
            type="number"
            name="totalPrice"
            value={totalPrice}
          />
        </div>
        <div className="">
          <input
            onChange={(e) => setGivenAmount(e.target.value)}
            className={`text_input my-2 px-2 ${darkTheme && "darkthemeDim"}`}
            placeholder={`${appLanguage === 'en' ? "Enter given money" : "জমা টাকা" }`}
            type="number"
            name="givenAmount"
            value={givenAmount}
          />
        </div>
        <button
          disabled={isLoadingCard}
          onClick={() =>
            type === "Create"
              ? createRecord(props)
              : editRecord(props)
          }
          className="blue_gradient_btn mt-4"
        >
          {appLanguage === 'en' ? "Save" : "সংরক্ষণ"}
        </button>
      </div>
    </div>
  );
}

export default ManageModal;
