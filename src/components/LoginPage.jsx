import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2"
import Filler from "./elements/TopBottomFiller";

let isLoginDataCorrect = false;
let data;

export function SetUser(input) {
  if(input) {
    data = input
  }
  return data;
}

export function isLoggedIn(status) {
  if(status) {isLoginDataCorrect = status;}
  return isLoginDataCorrect;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  isLoginDataCorrect = false;
  const navigate = useNavigate();

  const handleLogin = async () => {   

    if(email.length === 0 || password.length === 0) {
      swal.fire({
        icon: "error",
        iconColor: "#FFFFFF",
        text: "Silahkan masukkan nama dan password terlebih dahulu",
        color: "#FFFFFF",
        background: "#2A0803"
      });
      navigate("/login");
    } else {
      try {
        const response = await axios.post("https://maxwell-tutam9backend.vercel.app/users/login", null, {
          params: {
            email: email,
            password: password
          }});
          
        if(response.status == 200) {
          const html = "https://maxwell-tutam9backend.vercel.app/users/"+email;
          const response = await axios.get(html);
          
          isLoggedIn(true);
          SetUser(response.data.payload);
          swal.fire({
            icon: "success",
            iconColor: "#FFFFFF",
            text: "Login Successful",
            color: "#FFFFFF",
            background: "#2A0803"
          });
          navigate('/profile');
        } else {
          swal.fire({
            icon: "error",
            iconColor: "#FFFFFF",
            text: "Login Failed",
            color: "#FFFFFF",
            background: "#2A0803"
          });
        }
  
  
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#e7e2db] to-[#2A0803] h-screen w-screen flex">
      <Filler/>
      <div className="bg-[#2A0803] w-[622px] h-[500px] m-auto rounded-2xl flex flex-col text-[#bdb3a6]">
        <p className="text-[30px] mx-auto mt-10">Login</p>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#e8e8ff] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#e8e8ff] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-10">
          <span
              className="mx-1"
          >
              Don't have an account?
          </span>
          <span
              className="mx-1 text-[#bdb3a6]"
              onClick={() => navigate("/register")}
          >
            <button className="hover:underline">Register.</button>
          </span>
        </div>

        <div className="mx-auto mt-5 space-y-4">
          <button className="hover:border-2 p-2 px-3 rounded-2xl hover:scale-[1.1]" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>

    </div>
    
  );
}
