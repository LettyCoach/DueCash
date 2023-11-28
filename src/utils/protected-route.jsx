import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Loading from "src/components/Loading"

function ProtectedRoute(props) {
  const {userName,isLoggedIn, isLoading} = props
  const navigate = useNavigate()
  
  if(isLoading){
    return <Loading />
  }
  
  if(isLoggedIn){
    return <props.children userName={userName} />
  }
  else{
    navigate('/')
  }
  
  /*useEffect(() => {
    console.log("Navigated")
    if(!isLoading && !isLoggedIn){
      navigate("/")
    }
  },[]);*/
  
}

export default ProtectedRoute
