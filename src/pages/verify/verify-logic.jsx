import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
const API_URL = import.meta.env.VITE_API_URL
import showToast from "src/utils/showToast"

function verifyLogic() {
  const [confirmed, setConfirmed] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const location = useLocation()
  
  useEffect(() => {
    const queryText = location.search
    const params = new URLSearchParams(queryText)
    const authtoken = params.get('key')
    
    const confirmAccount = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/verify?key=${authtoken}`)
        const response = await res.json()
        console.log(response)
        if(!res.ok){
          setError("Oops! something went wrong.")
        }
        if(response.message.includes('confirmed')){
          setConfirmed(response.message)
        }
        setIsLoading(false)
        // showToast(response.message)
      } catch (e) {
        showToast(e.message)
      }
    }
    
    confirmAccount()
  },[]);
  
  return { isLoading, confirmed, error }
}

export default verifyLogic
