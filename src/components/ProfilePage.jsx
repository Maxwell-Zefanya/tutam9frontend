import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

import DashboardElement from "./elements/DashboardElement";

import { SetUser } from "./LoginPage";
import { isLoggedIn } from "./LoginPage";

export default function ProfilePage() {
  const navigate = useNavigate();

  let isLoginDataCorrect = isLoggedIn();
  useEffect(() => {
    handleProfilePage();
  }, []);

  const handleProfilePage = async () => {
      if(isLoginDataCorrect == false) {
          navigate("/home");
          swal.fire({
              icon: "error",
              iconColor: "#FFFFFF",
              text: "Harap login terlebih dahulu",
              color: "#FFFFFF",
              background: "#2A0803"
          });
      }
  }

  const EditPageLoader = () => {
    navigate("/edit_account")
  }

  if(isLoginDataCorrect) {
    const data = SetUser();
    return (
      <div className="bg-gradient-to-r from-[#e7e2db] to-[#2A0803] h-screen w-screen flex">
        <DashboardElement />
            <div className="bg-[#2A0803] w-[622px] h-[675px] m-auto rounded-2xl flex flex-col text-white">
                  <img src={data.profile_picture} className="w-[240px] h-[240px] mx-auto mt-24 object-contain" />
          
                  <p className="text-[30px] mx-auto mt-20">Welcome</p>
          
                  <div className="flex flex-col mx-auto mt-2">
                    <div className="flex flex-row justify-center">
                      <span className="mr-1 text-[25px]">Name: </span>
                      <span className="ml-1 rounded-2x1 text-white text-[25px]">
                        {data.username}
                      </span>
                    </div>
                    <div className="flex flex-row justify-center">
                      <span className="mr-1 text-[25px]">Email: </span>
                      <span className="ml-1 rounded-2x1 text-white text-[25px]">
                        {data.email}
                      </span>
                    </div>
          
                    <button
                      className="mt-10 hover:border-2 p-2 px-3 rounded-2xl hover:scale-[1.1]"
                      onClick={EditPageLoader}
                    >
                      Edit Profile
                    </button>
              </div>
        </div>
      </div>
    );
  }
}
