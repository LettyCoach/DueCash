import { useState, useEffect, useContext } from "react";
import showToast from "src/utils/showToast";
import Context from "src/context-api/Context"
import { useLocation } from "react-router-dom"
const API_URL = import.meta.env.VITE_API_URL;

function dashboardLogic() {
  const [searchValue, setSearchValue] = useState("");
  const [customersDataReserved, setCustomersDataReserved] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [modalType, setModalType] = useState("Create");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCard, setIsLoadingCard] = useState(true);
  const [error, setError] = useState(false);
  
  const location = useLocation()
  
  const { darkTheme, appLanguage } = useContext(Context)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getCustomers = async () => {
      try {
        const res = await fetch(`${API_URL}/get-customers`, {
          method: "GET",
          headers: {
            authorization: token,
          },
        });
        const response = await res.json();
        if (response.customers) {
          response.customers.reverse();
          setCustomersDataReserved(response.customers);
          setCustomersData(response.customers);
          setIsLoading(false);
          setIsLoadingCard(false);
        }
        else{
          setIsLoading(false)
          setIsLoadingCard(false)
        }
      } catch (e) {
        setIsLoading(false);
        setIsLoadingCard(false);
        setError(true);
      }
    };
    
    getCustomers();
  }, [isLoadingCard,location.pathname]);

  /* Search Customer By Filter Method */
  const onSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const filteredData = customersDataReserved.filter((obj) =>
      obj.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setCustomersData(filteredData);
  };

  /* Delete Button Click Handler */
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeletePrompt(true);
  };

  /* Delete Customer When Yes Button Pressed */
  const deleteRecord = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_URL}/delete-customer-record?id=${deleteId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      const response = await res.json();
      
      if (response.success) {
        showToast(response.message);
        setShowDeletePrompt(false);
        setIsLoadingCard(true);
      }
    } catch (e) {
      showToast("Something went wrong! Please try again.", "error");
    }
  };

  /* Handle Create/Edit Customer Modal */
  const handleModal = (type, data = null) => {
    if (data) {
      setEditData(data);
    }
    // When creating record clear form
    else {
      setEditData({
        name: "",
        phone: "",
        address: "",
      });
    }
    setModalType(type);
    setIsOpen(true);
  };

  /* Create Customer In Database */
  const createCustomer = async (data) => {
    try {
      setIsLoadingCard(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/create-customer-record`, {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          address: data.address,
        }),
        headers: {
          authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (res.ok) {
        setIsOpen(false)
      }
      const response = await res.json();
      showToast(response.message);
      setIsLoadingCard(false);
    } catch (e) {
      showToast(e.message);
    }
  };

  /* Edit Customer In Database */
  const editCustomer = async (data) => {
    try {
      setIsLoadingCard(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/update-customer-record`, {
        method: "POST",
        body: JSON.stringify({
          customerId: editData._id,
          name: data.name,
          phone: data.phone,
          address: data.address,
        }),
        headers: {
          authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (res.ok) {
        setIsOpen(false)
      }
      const response = await res.json();
      showToast(response.message);
      setIsLoadingCard(false);
    } catch (e) {
      showToast(e.message);
    }
  };

  return {
    customersData,
    customersDataReserved,
    searchValue,
    onSearch,
    isOpen,
    setIsOpen,
    handleDelete,
    showDeletePrompt,
    setShowDeletePrompt,
    deleteRecord,
    editCustomer,
    handleModal,
    modalType,
    createCustomer,
    editData,
    isLoading,
    isLoadingCard,
    error,
    appLanguage,
    darkTheme
  };
}

export default dashboardLogic;
