import { useEffect,useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import manageLogic from "./manage-logic";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ManageModal from "src/components/ManageModal";
import Warning from "src/components/Warning";
import Loading from "src/components/Loading";
import { ToastContainer } from 'react-toastify';
import Context from "src/context-api/Context";
import convertNumberToBn from "src/utils/convertNumberToBn"

function ManagePage() {
  const location = useLocation();
  const { darkTheme, toggleDarkTheme } = useContext(Context)
  const {
    openMenu,
    setOpenMenu,
    type,
    isOpen,
    setIsOpen,
    createRecord,
    editRecord,
    handleModal,
    editData,
    handleDelete,
    showDeletePrompt,
    setShowDeletePrompt,
    deleteRecord,
    isLoading,
    customerDetails,
    isLoadingCard,
    appLanguage
  } = manageLogic(location);
  
  const manageModalProps = {
    type,
    isOpen,
    setIsOpen,
    createRecord,
    editRecord,
    editData,
  };
  
  console.log(customerDetails)
  
  if(isLoading){
    return <Loading />
  }
  
  return (
    <section className="container">
      <ToastContainer />
      <Warning
        showDeletePrompt={showDeletePrompt}
        setShowDeletePrompt={setShowDeletePrompt}
        deleteRecord={deleteRecord}
      />
      <ManageModal manageModalProps={manageModalProps} isLoadingCard={isLoadingCard} />
      <h1 className="title">{customerDetails?.name}</h1>
      <div className="my-4 text-center text-gray-600 font-light">
        <p className="font-satoshi text-sm">📱 {appLanguage === "en" ? "Phone Number:" : "ফোন নাম্বারঃ" } {customerDetails?.phone}</p>
        <p className="font-satoshi text-sm">🏠 {appLanguage === 'en' ? "Address:" : "ঠিকানাঃ" } {customerDetails?.address}</p>
        <button className="outline_btn mt-2">
          <a href={`tel:${customerDetails?.phone}`}>☎️ {appLanguage === 'en' ? "Call Now" : "কল করুন" }</a>
        </button>
      </div>
      
      <div className="my-4">
        <button
          onClick={() => handleModal("Create")}
          className="blue_gradient_btn"
        >
          {appLanguage === 'en' ? "Create New Record" : "নতুন হিসাব তৈরি করুন"}
        </button>
      

      {
        isLoadingCard && <Loading />
      }
      
      {
        customerDetails?.details.length === 0 && <div className="text-center pt-10 text-sm tracking-wider">
          <h4 className={`${darkTheme && "text-white"}`}>{appLanguage === 'en' ? "No record found ):" : "📢 আপনি এখনো কোনো হিসাব তৈরি করেননি" }</h4>
        </div>
      }
      
       {/* Make A List Component */}
       <ol className="">
          {!isLoadingCard && customerDetails?.details.map((obj) => (
            <li key={obj._id} className={`relative bg-gray-200 space-y-2 p-4 my-4 rounded ${darkTheme && "darktheme"}`}>
              <span
                onClick={() =>
                  setOpenMenu({
                    id: obj._id,
                    shouldOpen:
                      obj._id !== openMenu.id ? true : !openMenu.shouldOpen,
                  })
                }
                className="absolute right-2 text-2xl"
              >
                <BiDotsVerticalRounded />
              </span>
              <span className="text-blue-600">🗓️ Date: 22 Aug, 23</span>
              <p>🛍️{" "}<span className="font-bold leading-6">{appLanguage === 'en' ? "Bought Products:" : "কেনা পণ্যঃ" }</span> {obj.boughtProducts}</p>
              <p>🎯{" "}<span className="font-bold">{appLanguage === 'en' ? "Totall Price:" : "মোট দামঃ" }</span> {obj.totalPrice}</p>
              <p>✅{" "}<span className="font-bold">{appLanguage === 'en' ? "Given Money:" : "জমা টাকাঃ"}</span> {obj.givenAmount}</p>
              <p>🔥{" "}<span className="font-bold">{appLanguage === 'en' ? "Due Money:" : "বাকি টাকাঃ"}</span> {obj.dueAmount}</p>
              <div
                className={`${
                  openMenu.shouldOpen && openMenu.id == obj._id
                    ? "visible"
                    : "hidden"
                } 
                ${darkTheme && "bg-gray-700"}
                absolute top-8 right-2 mt-4 flex flex-col justify-center gap-4 bg-gray-300 p-2 rounded`}
              >
                <button
                  onClick={() => handleModal("Edit", obj, customerDetails._id)}
                  className="flex items-center text-sm gap-1"
                >
                  <FaEdit /> {appLanguage === 'en' ? "Edit" : "এডিট করুন" }
                </button>
                <button
                  onClick={() => handleDelete(obj._id, customerDetails._id)}
                  className="flex items-center text-sm gap-1"
                >
                  <FaTrash />
                  {appLanguage === 'en' ? "Delete" : "মুছে ফেলুন" }
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ManagePage;
