import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import convertNumberToBn from "../utils/convertNumberToBn";
import Context from "src/context-api/Context";

function Card({ customer, handleDelete, handleModal: handleEdit }) {
  const { darkTheme, toggleDarkTheme, appLanguage } = useContext(Context);

  const details = customer.details;
  // const totalPrice = details.map()
  let totalPrice = 0;
  for (var obj of details) {
    const remaining = obj.dueAmount;
    totalPrice += parseInt(remaining);
  }
  totalPrice =
    appLanguage === "en" ? totalPrice : convertNumberToBn(totalPrice);

  function convertDate(dateString) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className={`card ${darkTheme && "darktheme"}`}>
      <p className="text-sm tracking-wider font-light ">🗓️ {convertDate(customer.createdOn)}</p>
      <h2 className="text-2xl my-2">{customer.name}</h2>
      <p className="my-2">
        {"🔥 "}{" "}
        {appLanguage === "en" ? "You have due money" : "আপনার পাওনা টাকা:"}{" "}
        {totalPrice}
      </p>
      <p className="my-2">{customer.address}</p>
      <Link to={`/dashboard/manage/${customer._id}`}>
        <button className="card_button rounded">
          {appLanguage === "en" ? "View Deatails" : "বিস্তারিত দেখুন"}
        </button>
      </Link>
      <div className="my-4 flex justify-center items-center gap-5">
        <Link>
          <button
            onClick={() => handleEdit("Edit", customer)}
            className="text-xl"
          >
            <FaEdit />
          </button>
        </Link>
        <Link>
          <button onClick={() => handleDelete(customer._id)}>
            <FaTrash />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
