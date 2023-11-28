import { useState, useEffect, useContext } from "react";
import showToast from "src/utils/showToast";
import Context from "src/context-api/Context"
const API_URL = import.meta.env.VITE_API_URL;

function manageLogic(location) {
  const [openMenu, setOpenMenu] = useState({
    id: null,
    shouldOpen: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("Create");
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState({});
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCard, setIsLoadingCard] = useState(false);
  
  const { appLanguage } = useContext(Context)

  let pathName = location?.pathname;
  let id = pathName?.split("/").reverse()[0];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getCustomerDetails = async () => {
      try {
        const res = await fetch(`${API_URL}/get-customer-details?id=${id}`, {
          method: "GET",
          headers: {
            authorization: token,
          },
        });
        const response = await res.json();
        if (response.details) {
          response.details.details.reverse();
          setCustomerDetails(response.details);
          setIsLoading(false);
          setIsLoadingCard(false);
        }
      } catch (e) {
        alert(e.message);
        // alert("error occured");
      }
    };

    getCustomerDetails();
  }, [isLoadingCard]);

  /* Create New Bought Details */
  const createRecord = async (data) => {
    setIsLoadingCard(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/create-bought-record`, {
        method: "POST",
        body: JSON.stringify({
          _id: id,
          boughtProducts: data.boughtProducts,
          totalPrice: data.totalPrice,
          givenAmount: data.givenAmount,
        }),
        headers: {
          authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await res.json();
      showToast("New record added successful");
      setIsOpen(false);
      setIsLoadingCard(false);
    } catch (e) {
      showToast(response.message);
      setIsLoadingCard(false);
    }
  };

  const handleModal = (type, data = null, id) => {
    if (data) {
      data.customerId = id;
      setEditData(data);
    } else {
      setEditData({});
    }
    // Close menu adter item clicked
    setOpenMenu({
      ...openMenu,
      shouldOpen: !openMenu.shouldOpen,
    });
    setType(type);
    setIsOpen(true);
  };

  /* Edit Bought Record */
  const editRecord = async (data) => {
    setIsLoadingCard(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/update-bought-record`, {
        method: "POST",
        body: JSON.stringify({
          customerId: editData.customerId,
          boughtRecordId: editData._id,
          boughtProducts: data.boughtProducts,
          totalPrice: data.totalPrice,
          givenAmount: data.givenAmount,
        }),
        headers: {
          authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await res.json();
      showToast("Record updated successful");
      setIsOpen(false);
      setIsLoadingCard(false);
    } catch (e) {
      showToast(response.message);
      setIsLoadingCard(false);
    }
  };

  const handleDelete = (boughtRecordId,customerId) => {
    setDeleteId({
      boughtRecordId,
      customerId
    });
    setShowDeletePrompt(true);
    setOpenMenu({
      ...openMenu,
      shouldOpen: !openMenu.shouldOpen,
    });
  };

  /* Delete Bought Record */
  const deleteRecord = async () => {
    setShowDeletePrompt(false)
    setIsLoadingCard(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/delete-bought-record`, {
        method: "POST",
        body: JSON.stringify({
          customerId: deleteId.customerId,
          boughtRecordId: deleteId.boughtRecordId,
        }),
        headers: {
          authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await res.json();
      showToast(response.message)
      setIsLoadingCard(false);
    } catch (e) {
      showToast(response.message);
      setIsLoadingCard(false);
    }
  };

  return {
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
  };
}

export default manageLogic;
