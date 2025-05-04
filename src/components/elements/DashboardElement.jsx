import { useNavigate } from "react-router-dom";

import homeIcon from "../../assets/home.svg";
import itemIcon from "../../assets/items.svg";
import myInfoIcon from "../../assets/person.svg";
import logoutIcon from "../../assets/logout.svg";

import { isLoggedIn } from "../LoginPage";
import swal from "sweetalert2";

export default function DashboardElement() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#2A0803] h-screen flex-col border-r-4 border-[#111111] py-8 w-[390px]">
      <button className="flex mx-auto items-center w-[300px] hover:outline hover:outline-[#FFFFFF] outline-offset-8 rounded-2xl" onClick={() => navigate("/profile")}>
        <img src={myInfoIcon} />

        <p className="my-auto text-white ml-5 text-[20px]">Profile</p>
      </button>

      <button className="flex mx-auto items-center mt-5 w-[300px] hover:outline hover:outline-[#FFFFFF] outline-offset-8 rounded-2xl" onClick={() => navigate("/library")}>
        <img src={itemIcon} className=""/>

        <p className="my-auto text-white ml-5 text-[20px]">Library</p>
      </button>

      <button className="flex mx-auto items-center mt-5 w-[300px] hover:outline hover:outline-[#FFFFFF] outline-offset-8 rounded-2xl" onClick={() => navigate("/browse")}>
        <img src={itemIcon} className=""/>

        <p className="my-auto text-white ml-5 text-[20px]">Browse</p>
      </button>

      <button className="flex mx-auto items-center mt-5 w-[300px] hover:outline hover:outline-[#FFFFFF] outline-offset-8 rounded-2xl" onClick={() => 
        {
          navigate('/home');
          swal.fire({
            icon: "success",
            iconColor: "#FFFFFF",
            text: "Anda telah log-out",
            color: "#FFFFFF",
            background: "#2A0803"
          });
          isLoggedIn(false);
        }}>
      <img src={logoutIcon} />

      <p className="my-auto text-white ml-5 text-[20px]">Logout</p>
      </button>
    </div>
  );
}
