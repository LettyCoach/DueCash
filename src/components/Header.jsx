import { useContext } from "react";
import { FaMoon, FaArrowLeft } from "react-icons/fa";
import {
  BiArrowBack,
  BiTrash,
  BiMoon,
  BiSun,
  BiMenuAltLeft,
} from "react-icons/bi";
// import { HiMiniBars3CenterLeft } from "react-icons/hi";
import { GrMoney, GrMenu } from "react-icons/gr";
import { BsTranslate } from "react-icons/bs";
// import { GiTakeMyMoney } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "src/context-api/Context";
import headerLogic from "./hooks/header-logic";

function Header({ isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkTheme, toggleDarkTheme, appLanguage, toggleAppLanguage } =
    useContext(Context);

  const { isOpen, toggleMenu, logout, logoutFromAllDevice } = headerLogic();

  return (
    <header className="header relative">
      <p className="font-satoshi flex items-center gap-2 text-white">
        <a
          href="/"
          className="flex justify-center items-center gap-2"
        >
          💰 DueCash
        </a>
      </p>

      <div className="flex gap-2 justify-between items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className={`${
            location.pathname.includes("manage") ? "visible" : "hidden"
          } text-md mr-2`}
        >
          <FaArrowLeft />
        </button>
        <div className="flex gap-2">
          {isLoggedIn && (
            <button onClick={toggleAppLanguage}>
              <BsTranslate />
            </button>
          )}
          <div className="flex items-center justify-center">
            <button
              onClick={() => toggleDarkTheme(!darkTheme)}
              className={`text-xl ${darkTheme ? "hidden" : "visible"} `}
            >
              <BiMoon />
            </button>
            <button
              onClick={() => toggleDarkTheme(!darkTheme)}
              className={`text-xl ${darkTheme ? "visible" : "hidden"} `}
            >
              <BiSun />
            </button>
          </div>
          {
            isLoggedIn && (
                <button onClick={() => toggleMenu()} className="text-2xl">
                  <BiMenuAltLeft />
                </button>
              )
          }
        </div>
      </div>
      <nav className={`${isOpen ? "nav visible z-10" : "hidden"}`}>
        <ul
          className={`${
            darkTheme && "darktheme border-[1px]"
          } menu space-y-2 relative`}
        >
          <span onClick={() => toggleMenu()} className="absolute right-4 top-2">
            ✖️
          </span>
          <h2 className="text-2xl font-satoshi font-extrabold mb-4 text-center">Options</h2>
          {isLoggedIn ? (
            <>
              <li
                onClick={() => logout()}
                className="font-satoshi active:text-blue-600 active:font-bold"
              >
                🔥 Logout
              </li>
              <li
                onClick={() => logoutFromAllDevice()}
                className="font-satoshi active:text-blue-600 active:font-bold"
              >
                🚀 Logout from all device
              </li>
              <li
                onClick={() => toggleMenu()}
                className="font-satoshi active:text-blue-600 active:font-bold"
              >
                📦 <Link to="/dashboard/trash">Trash</Link>
              </li>
            </>
          ) : (
            <p className={`${darkTheme ? "text-gray-200" : "text-gray-600" } text-sm`}>
              When you are logged in then you will be able to see all options!
            </p>
          )}
        </ul>
        )
      </nav>
    </header>
  );
}

export default Header;
