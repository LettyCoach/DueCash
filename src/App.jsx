import { useState, useEffect, useContext } from "react";
import LoginPage from "./pages/login/login-ui";
import SignupPage from "./pages/signup/signup-ui";
import DashboardPage from "./pages/dashboard/dashboard-ui";
import ManagePage from "./pages/dashboard/manage/manage-ui";
import VerifyPage from "./pages/verify/verify-ui";
import Header from "./components/Header";
import PageNotFound from "./components/PageNotFound";
import { useLocation,BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const API_URL = import.meta.env.VITE_API_URL;
import ProtectedRoute from "./utils/protected-route";
import ExcludedRoutefrom from "./utils/excluded-route";
import eruda from "eruda"
import Context from "./context-api/Context";

function App() {
  // Setup console
  eruda.init({
    container: document.getElementById('console'),
    tools: ["console"]
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const location = useLocation()
  const { darkTheme } = useContext(Context)
  
  useEffect(() => {
    if(darkTheme){
      document.body.classList.add("bg-gray-900")
    }
    else{
      document.body.classList.remove("bg-gray-900")
    }
    
    const token = localStorage.getItem("token");
    const checkLoginStatus = async () => {
      const res = await fetch(`${API_URL}/auth/login-status`, {
        method: "GET",
        headers: {
          "authorization": token || "",
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if(!res.ok){
        localStorage.removeItem("token")
        window.location.reload()
        return;
      }
      const response = await res.json();
      setUserName(response.username || null)
      setIsLoggedIn(res.ok);
      setIsLoading(false);
    };

    if (token) {
      checkLoginStatus();
    } else {
      setIsLoading(false);
    }
  }, [location.pathname, darkTheme]);

  return (
    <>
      <div id="console"></div>
      <Header isLoggedIn={isLoggedIn} />
      <main className={`main font-author`}>
        <Routes>
          <Route
            path="/"
            element={
              <ExcludedRoutefrom isLoggedIn={isLoggedIn} isLoading={isLoading}>
                {LoginPage}
              </ExcludedRoutefrom>
            }
          />
          <Route
            path="/signup"
            element={
              <ExcludedRoutefrom isLoggedIn={isLoggedIn} isLoading={isLoading}>
                {SignupPage}
              </ExcludedRoutefrom>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute userName={userName} isLoggedIn={isLoggedIn} isLoading={isLoading}>
                {DashboardPage}
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading}>
                {ManagePage}
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify"
            element={<VerifyPage />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
