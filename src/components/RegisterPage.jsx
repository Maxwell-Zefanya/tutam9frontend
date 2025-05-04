import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert2';
import Filler from "./elements/TopBottomFiller";

export default function RegisterPage(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const RegisterHandler = async() => {

        try{
            if(name.length === 0 || password.length === 0 || email.length === 0){
                swal.fire({
                    icon: "error",
                    iconColor: "#FFFFFF",
                    text: "Mohon masukkan nama, email dan password terlebih dahulu",
                    color: "#FFFFFF",
                    background: "#2A0803"
                });
                navigate("/register");
            }
            else{
                const response = await axios.post("https://maxwell-tutam9backend.vercel.app/users/register", null, {
                    params: {
                        email: email,
                        password: password,
                        name: name
                }});
                if(response.status === 200){
                    swal.fire({
                        icon: "success",
                        iconColor: "#FFFFFF",
                        text: "Registrasi berhasil",
                        color: "#FFFFFF",
                        background: "#2A0803"
                    });
                    navigate("/login");
                }

                else{
                    swal.fire({
                        icon: "error",
                        iconColor: "#FFFFFF",
                        text: "Registrasi gagal",
                        color: "#FFFFFF",
                        background: "#2A0803"
                    });
                    throw new Error("Register failed")
                }
            }
        }catch (error){
            console.error(error);
        }
    }


    return(
        <div className="bg-gradient-to-r from-[#e7e2db] to-[#2A0803] h-screen w-screen flex">
            <Filler/>
            <div className="bg-[#2A0803] w-[622px] h-[500px]  m-auto rounded-2xl flex flex-col text-[#bdb3a6]">
                <p className="mx-auto text-[#bdb3a6] mt-10 text-[30px]">Register</p>
                
                <div className="mx-auto mt-5">
                    <p className="text-[#bdb3a6] text-[20px]">Name</p>
                    <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="bg-[#e8e8ff] w-[343px] h-[41px] text-gray-800 px-2 rounded-md" 
                    />
                </div>

                
                <div className="mx-auto mt-5">
                    <p className="text-[#bdb3a6] text-[20px]">Email</p>
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="bg-[#e8e8ff] w-[343px] h-[41px] text-gray-800 px-2 rounded-md" 
                    />
                </div>

                <div className="mx-auto mt-5">
                    <p className="text-[#bdb3a6] text-[20px]">Password</p>
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="bg-[#e8e8ff] w-[343px] h-[41px] text-gray-800 px-2 rounded-md" 
                    />
                </div>

                <div className="mx-auto mt-8 space-y-4">
                    <span
                        className="mx-1"
                    >
                        Already have an account?
                    </span>
                    <span
                        className="mx-1 text-[#bdb3a6]"
                        onClick={() => navigate("/login")}
                    >
                        <button className="hover:underline">Login.</button>
                    </span>
                </div>

                <div className="mx-auto mt-3">
                    <button className="hover:border-2 p-2 px-3 rounded-2xl hover:scale-[1.1]" onClick={RegisterHandler}>Register</button>
                </div>
            </div>
        </div>
    )   
}