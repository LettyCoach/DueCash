import { useState, useEffect } from "react"
import Context from "./Context"
import LanguageChoosenAlert from '../utils/languageChoosenAlert'
import showToast from "src/utils/showToast"

function AppProvider({children}) {
  const [darkTheme, setDarkTheme] = useState(false)
  const [appLanguage, setAppLanguage] = useState('en')
  const [isOpenLangDialog, setIsOpenLangDialog] = useState(false)
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("darktheme")
    const savedLanguage = localStorage.getItem("appLanguage")
    const isChoosedLang = JSON.parse(localStorage.getItem("islangchoosed"));
    
    // Todo: set dark mode automatically
    
    if(savedTheme){
      setDarkTheme(JSON.parse(savedTheme))
    }
    
    if(savedLanguage){
      setAppLanguage(savedLanguage)
    }
    
    if(isChoosedLang){
      setIsOpenLangDialog(false)
    }else{
      setIsOpenLangDialog(true)
    }
  },[]);
  
  const toggleDarkTheme = () => {
    showToast(`${darkTheme ? "Light mode enabled" : "Dark mode enabled" }`)
    setDarkTheme(!darkTheme)
    localStorage.setItem("darktheme", JSON.stringify(!darkTheme))
  }
  
  const toggleAppLanguage = () => {
    showToast(`Language Changed to ${appLanguage === 'en' ? "Bangla" : "English"}`)
    setIsOpenLangDialog(false)
    localStorage.setItem("islangchoosed", JSON.stringify(true))
    if(appLanguage === 'en'){
      setAppLanguage('bn')
      localStorage.setItem("appLanguage", "bn")
    }
    else{
      setAppLanguage('en')
      localStorage.setItem("appLanguage", "en")
    }
  }
  
  return (
    <Context.Provider value={{
      darkTheme,toggleDarkTheme,
      appLanguage, toggleAppLanguage
    }} >
      <LanguageChoosenAlert isOpenLangDialog={isOpenLangDialog} toggleAppLanguage={toggleAppLanguage} />
      {children}
    </Context.Provider>
  )
}

export default AppProvider
