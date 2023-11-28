import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import showToast from "src/utils/showToast";
import Context from "src/context-api/Context"
const API_URL = import.meta.env.VITE_API_URL;

function signupLogic() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate()
  const { darkTheme } = useContext(Context)
  
  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "name") {
      setName(value);
    } 
    else if(name == "username"){
      setUsername(value)
    }
    else if(name == "email"){
      setEmail(value)
    }
    else{
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!name || !username || !email || !password){
      showToast("Please enter currect information", "error")
      return;
    }
    setIsLoading(true);
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const response = await res.json();
    if (response.success) {
      showToast(response.message, "success", 4000);
      setTimeout(function () {
        setIsLoading(false);
        navigate("/");
      }, 4000);
    } else {
      showToast(response.message, "error");
      setIsLoading(false)
    }
  };

  return {
    name,
    username,
    email,
    password,
    onChange,
    onSubmit,
    passwordVisible,
    handlePasswordVisible,
    darkTheme,
    isLoading
  };
}

export default signupLogic;
