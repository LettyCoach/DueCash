import React from 'react'

function LanguageChoosenAlert({isOpenLangDialog,toggleAppLanguage}) {
  return (
    <div className={`${!isOpenLangDialog && "hidden"} fixed w-full z-10 flex justify-center items-center h-[100vh] bg-[rgba(0,0,0,.75)] `}>
      <div className="bg-white w-[80%] py-4 pb-5 px-4 rounded">
        <h2 className="text-2xl font-bold font-satoshi">Choose your language</h2>
        <p className="text-gray-600 font-light">You can always change language from top translate icon when you are logged in to your account</p>
        <div className="space-y-2 mt-4">
          <button onClick={() => toggleAppLanguage()} className="block blue_gradient_btn" type="button">Bangla</button>
          <button onClick={() => toggleAppLanguage()} className="block outline_btn w-full" type="button">English</button>
        </div>
      </div>
    </div>
  )
}

export default LanguageChoosenAlert
