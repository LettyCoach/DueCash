import { useState, useEffect, useContext } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Context from "src/context-api/Context";

function DashboardModal({
  type,
  isOpen,
  setIsOpen,
  createCustomer,
  editCustomer,
  editData,
  isLoadingCard
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const { darkTheme, toggleDarkTheme, appLanguage } = useContext(Context)
  
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setPhone(editData.phone);
      setAddress(editData.address);
    }
  }, [editData]);
  
  const createText = (type === 'Create') && appLanguage === 'en' ? "Create New Customer" : "নতুন কাস্টমার তৈরী করুন"
  const editText = (type !== 'Create') && appLanguage === 'en' ? "Edit Customer" : "কাস্টমার এডিট করুন"
  
  return (
    <div
      className={`${
        isOpen ? "visible" : "hidden"
      } fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.75)] h-[100vh] w-[100vw] p-10 overflow-scroll`}
    >
      <div className={`relative bg-white py-10 px-5 w-full rounded ${darkTheme && "darktheme"} `}>
        <span
          className="absolute right-5 top-2 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          <FaRegWindowClose />
        </span>
        <h1 className="title my-5">
          {type === 'Create' ? createText : editText}
        </h1>
        <div className="">
          <input
            onChange={(e) => setName(e.target.value)}
            className={`text_input my-2 ${darkTheme && "darkthemeDim"} `}
            placeholder={`${appLanguage === 'en' ? "Enter name" : "নাম লিখুন " }`}
            type="text"
            name="name"
            value={name}
          />
        </div>
        <div className="">
          <input
            onChange={(e) => setPhone(e.target.value)}
            className={`text_input my-2 ${darkTheme && "darkthemeDim"}`}
            placeholder={`${appLanguage === 'en' ? "Enter phone" : "ফোন নাম্বার লিখুন " }`}
            type="number"
            name="phone"
            value={phone}
          />
        </div>
        <div className="">
          <input
            onChange={(e) => setAddress(e.target.value)}
            className={`text_input my-2 ${darkTheme && "darkthemeDim"}`}
            placeholder={`${appLanguage === 'en' ? "Enter address" : "ঠিকানা লিখুন " }`}
            type="text"
            name="address"
            value={address}
          />
        </div>
        <div className="relative">
          <span className={`${date && "hidden"} absolute top-4 left-[6px] text-gray-400`}>
            {appLanguage === 'en' ? "Select date" : "তারিখ" }
          </span>
          <input
            onChange={(e) => setDate(e.target.value)}
            className={`text_input my-2 bg-white ${darkTheme && "darkthemeDim"}`}
            type="date"
            name="date"
            value={date}
          />
        </div>
        <button
          disabled={isLoadingCard}
          onClick={() =>
            type === "Create"
              ? createCustomer({
                  name,
                  phone,
                  address,
                  date,
                  setName,
                  setPhone,
                  setAddress,
                  setDate,
                })
              : editCustomer({
                  name,
                  phone,
                  address,
                  date,
                  setName,
                  setPhone,
                  setAddress,
                  setDate,
                })
          }
          className="blue_gradient_btn mt-4"
        >
          {appLanguage === 'en' ? "Save" : "সংরক্ষণ করুন" }
        </button>
      </div>
    </div>
  );
}

export default DashboardModal;
