import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Loading from "src/components/Loading"

function ExcludedRoute(props) {
  const {isLoggedIn, isLoading} = props
  const navigate = useNavigate()
  
  /*useEffect(() => {
    if(!isLoading && isLoggedIn){
      navigate("/dashboard")
    }
  },[]);*/
  
  if(isLoading){
    return <Loading />
  }
  
  if(!isLoggedIn){
    return <props.children />
  }else{
    navigate("/dashboard")
  }
  
  /*if(isLoggedIn){
    navigate("/dashboard")
  }
  else{
    
  }*/
  
}

export default ExcludedRoute
