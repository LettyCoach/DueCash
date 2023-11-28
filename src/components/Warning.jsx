import { useContext } from "react";
import Context from "src/context-api/Context";

function Warning({
  showDeletePrompt,
  setShowDeletePrompt,
  deleteRecord,
  isLoadingCard,
}) {
  const { darkTheme, toggleDarkTheme, appLanguage } = useContext(Context);

  return (
    <div
      className={`${showDeletePrompt ? "visible" : "hidden"} 
      fixed z-10 top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.75)] h-[100vh] w-[100vw] p-10`}
    >
      <div
        className={`bg-white py-5 px-5 rounded rounded-2xl ${
          darkTheme && "darktheme border-[1px] border-white"
        }`}
      >
        <h2 className="text-2xl font-bold tracking-wide">
          {appLanguage === "en" ? "Are you sure?" : "আপনি কী নিশ্চিত? "}
        </h2>
        <p className="font-light my-2">
          {appLanguage === "en"
            ? "Once this data is deleted, you won't be able to recover it. So, be careful and think before deleting it."
            : "একবার আপনি এটা মুছে ফেললে আর পুনরায় উদ্ধার করতে পারবেন না।এটা স্থায়ীভাবে মুছে যাবে।"}
        </p>
        <div className="flex gap-3 mt-5">
          <button
            disabled={isLoadingCard}
            onClick={() => deleteRecord()}
            className="disabled:bg-blue-300 text-white bg-gradient-to-r from-blue-500 to-purple-600 px-6 rounded"
          >
            {appLanguage === "en" ? "Yes" : "হ্যা নিশ্চিত" }
          </button>
          <button
            onClick={() => setShowDeletePrompt(false)}
            className="py-1 px-4 rounded"
          >
            {appLanguage === 'en' ? "Cancel" : "বাতিল" }
          </button>
        </div>
      </div>
    </div>
  );
}

export default Warning;
