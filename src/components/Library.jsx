import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardElement from "./elements/DashboardElement";
import axios from 'axios';
import swal from "sweetalert2";
import { isLoggedIn } from "./LoginPage";
import { SetUser } from "./LoginPage";


export default function StorePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = SetUser();
  let isLoginDataCorrect = isLoggedIn();

  useEffect(() => {
    handleStorePage();
  }, []);

  const handleStorePage = async() =>{
    if(isLoginDataCorrect == false) {
      swal.fire({
        icon: "error",
        iconColor: "#FFFFFF",
        text: "Harap login terlebih dahulu",
        color: "#FFFFFF",
        background: "#2A0803"
      });
      navigate("/home")
    } else {
      try {
        const html = "https://maxwell-tutam9backend.vercel.app/library/"+user.id;
        const response = await axios.get(html);
        setData(response.data.payload.map((data) => data));
        
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  const RefundHandler = async(user_id, game_id) => {
    try {
      const response = await axios.delete("https://maxwell-tutam9backend.vercel.app/games/refund", {
        "user_id": user_id,
        "game_id": game_id,
      },);
      console.log(response)
      if(response.status === 200) {
        swal.fire({
          icon: "success",
          iconColor: "#FFFFFF",
          text: "Game Berhasil di-Refund",
          color: "#FFFFFF",
          background: "#2A0803"
        });
        setData(response.data.payload.map((data) => data));
      } else {
        swal.fire({
          icon: "success",
          iconColor: "#FFFFFF",
          text: "Game Gagal di-Refund",
          color: "#FFFFFF",
          background: "#2A0803"
        });
      }
      navigate("/library");
    } catch (error) {
      console.error(error);
    }
  }

  const WalletHandler = async() => {
    navigate("/wallet")
  }

  if(user !== undefined) {
    return (
      <div className="bg-gradient-to-r from-[#e7e2db] to-[#2A0803] flex">
        <DashboardElement />
        <div className="text-white overflow-y-scroll flex flex-col h-screen m-auto flex-1" >
          <div className="flex flex-row w-full py-3 bg-opacity-75 bg-[#2A0803] justify-between">
            <text className="text-xl ml-10">
              Balance: {user.balance}
            </text>
            <button className="flex mr-10 hover:bg-red-950 h-full px-4 rounded-md text-xl" onClick={WalletHandler}>
              Add to Wallet
            </button>
          </div>
          <ol className="w-full">
            {data.map((data) => (
              <li
                key={data.id}
                className="text-[20px] p-3 flex flex-row bg-[#2A0803] m-2 rounded-2xl bg-opacity-50 hover:bg-opacity-100"
              >
                <img src={data.image_url} className="w-[80px] h-[80px] mx-2 my-auto object-contain"/>
                <div className="flex flex-col ml-2 my-auto">
                  <p className="font-bold underline">{data.name}</p>
                  <p>ID: {data.id}</p>
                </div>
                <div className="flex flex-col ml-auto">
                  <button className="bg-opacity-0 p-2 px-3 my-1 rounded-2xl hover:bg-red-950 hover:bg-opacity-100 text-sm">PLAY</button>
                  <button
                    className="bg-opacity-0 p-2 px-3 my-1 rounded-2xl hover:bg-red-950 hover:bg-opacity-100 text-sm"
                    onClick={() => {RefundHandler(user.id, data.id)}}
                  >
                    REFUND
                  </button>
                </div>
              </li>
            ))}
  
          </ol>
          
        </div>
      </div>
    );
  }
  
}

