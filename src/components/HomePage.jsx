import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import Filler from "./elements/TopBottomFiller";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#e7e2db] to-[#2A0803] h-screen w-screen flex lg:flex-row md:flex-col max-sm:flex-col">
      <Filler/>

      <div className="my-auto ml-auto mr-20 flex flex-col">
            <div className="flex flex-row mx-auto">
              <img src={Logo} className="w-[240px] mx-1" />
              <span className="text-[#2A0803] font-bold font-mono text-2xl flex left-0">
                UAP
              </span>
            </div>
            <p className="mt-10 text-[#2A0803] text-wrap text-3xl">
              The Best Games Store in South East Asia
            </p>
      </div>

      <div className="mr-auto ml-20 my-auto flex flex-col text-[#2A0803] h-screen">
            <div className="text-[#bdb3a6] text-md mt-auto" >
                Start exploring
            </div>
            <div
                className="mt-2 text-[#2A0803]"
                onClick={() => navigate("/login")}
            >
              <button className="hover:underline absolute bg-[#bdb3a6] p-3 w-[300px] rounded-2xl text-2xl">
                Login
              </button>
            </div>
            
            <div className="mt-20 text-[#bdb3a6] text-md" >
                Don't have an account?
            </div>
            <div
                className="mb-auto pb-20 mt-2 text-[#2A0803]"
                onClick={() => navigate("/register")}
            >
              <button className="hover:underline absolute bg-[#bdb3a6] p-3 w-[300px] rounded-2xl text-2xl">
                Register
              </button>
            </div>
      </div>
    </div>
  );
}
