import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import showToast from "src/utils/showToast";

function headerLogic() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_URL}/auth/logout`, {
          method: "GET",
          headers: {
            authorization: token,
          },
        });
        const response = await res.json();
        showToast(response.message);
        /*
          Token will clear automatically
          from localStorage when checking
          login-sratus from "App.js"
        */

        // Refresh page
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } catch (e) {
        alert("Logout failed.Something went wrong!");
      }
    }
  };

  const logoutFromAllDevice = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_URL}/auth/logout?all=true`, {
          method: "GET",
          headers: {
            authorization: token,
          },
        });
        const response = await res.json();
        showToast(response.message);
        /*
          Token will clear automatically
          from localStorage when checking
          login-sratus from "App.js"
        */

        // Refresh page
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } catch (e) {
        alert("Logout failed.Something went wrong!");
      }
    }
  };
  
  const refreshPage = () => {
    window.location.reload();
  }
  
  return { isOpen, toggleMenu, logout, logoutFromAllDevice };
}

export default headerLogic;
