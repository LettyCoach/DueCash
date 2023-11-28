import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import showToast from "src/utils/showToast"
import Context from "src/context-api/Context"
const API_URL = import.meta.env.VITE_API_URL;

function loginLogic() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedinSuccess, setLoggedinSuccess] = useState(false)
  
  const location = useLocation();
  const navigate = useNavigate()
  const { darkTheme } = useContext(Context)
  
  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!username || !password){
      showToast("Please enter currect information", "error")
      return;
    }
    setIsLoading(true)
    
    const bodyData = {
      password
    }
    
    if(!username.includes('@')){
      bodyData.username = username
    }else{
      bodyData.email = username
    }
    
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const response = await res.json();
    setIsLoading(false)
    console.log(response)
    if(response.success){
      localStorage.setItem("token", response.user.authtoken)
      showToast("Logged in successful",'success')
      setLoggedinSuccess(true);
      // navigate("/dashboard")
      /*setTimeout(function() {
        navigate("/dashboard")
      }, 200);*/
    }else{
      showToast(response.message,"error")
    }
  };
  
  useEffect(() => {
    if(loggedinSuccess){
      setTimeout(function() {
      navigate("/dashboard")
    }, 200);
    }
    
  },[loggedinSuccess]);
  
  return {
    username,
    password,
    onChange,
    onSubmit,
    passwordVisible,
    handlePasswordVisible,
    isLoading,
    darkTheme
  };
}

export default loginLogic;
