import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert2';
import Filler from "./elements/TopBottomFiller";
import { SetUser } from "./LoginPage";
import { isLoggedIn } from "./LoginPage";

export default function RegisterPage(){
    const data = SetUser();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let isLoginDataCorrect = isLoggedIn();
    useEffect(() => {
        handleEditPage();
    }, []);
    
    const handleEditPage = async () => {
        if(isLoginDataCorrect == false) {
            console.log(isLoginDataCorrect)
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

    const EditHandler = async() => {
        try{
            if(name.length === 0 || password.length === 0 || email.length === 0){
                swal.fire({
                    icon: "error",
                    iconColor: "#FFFFFF",
                    text: "Mohon masukkan nama, email dan password terlebih dahulu",
                    color: "#FFFFFF",
                    background: "#2A0803"
                });
                navigate("/edit_account");
            }
            else{
                const init = await axios.get("https://maxwell-tutam9backend.vercel.app/users/"+data.email);
                let id = init.data.payload.id
                if (init.data) {
                    const response = await axios.put("https://maxwell-tutam9backend.vercel.app/users/", {
                        "id": id,
                        "username": name,
                        "password": password,
                        "email": email
                    },);
                    console.log(response);
                    if(response.status === 201){
                        const final = await axios.get("https://maxwell-tutam9backend.vercel.app/users/"+email);
                        swal.fire({
                            icon: "success",
                            iconColor: "#FFFFFF",
                            text: "Data Berhasil Diubah",
                            color: "#FFFFFF",
                            background: "#2A0803"
                        });
                        SetUser(final.data.payload)
                        navigate("/profile");
                    }
                    else{
                        swal.fire({
                            icon: "error",
                            iconColor: "#FFFFFF",
                            text: "Data Gagal Diubah",
                            color: "#FFFFFF",
                            background: "#2A0803"
                        });
                        throw new Error("Register failed")
                    }
                }
                else{
                    swal.fire({
                        icon: "error",
                        iconColor: "#FFFFFF",
                        text: "Data Tidak Ditemukan",
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

    const ReturnHandler = () => {
        navigate("/profile")
    }

    const DeleteHandler = async() => {
        const response = await axios.delete("https://maxwell-tutam9backend.vercel.app/users/"+data.id);
        console.log(response)
        if(response.status === 201){
            swal.fire({
                icon: "success",
                iconColor: "#FFFFFF",
                text: "Profile Berhasil Dihapus",
                color: "#FFFFFF",
                background: "#2A0803"
            });
            navigate("/home");
        }
    };

    return(
        <div className="bg-gradient-to-r from-[#e7e2db] to-[#2A0803] h-screen w-screen flex">
            <Filler/>
            <div className="bg-[#2A0803] w-[622px] h-[500px]  m-auto rounded-2xl flex flex-col text-[#bdb3a6]">
                <p className="mx-auto text-[#bdb3a6] mt-10 text-[30px]">Edit Your Account</p>
                <p className="mx-auto text-[#bdb3a6] mt-1 text-sm">Fill in your original data if you don't want it to change</p>
                
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
                <div className="flex flex-row">
                    <span className="ml-auto mr-2 mt-10">
                        <button className="hover:border-2 p-2 px-3 rounded-2xl hover:scale-[1.1]" onClick={ReturnHandler}>Return</button>
                    </span>
                    <span className="ml-2 mr-2 mt-10">
                        <button className="hover:border-2 p-2 px-3 rounded-2xl hover:scale-[1.1]" onClick={EditHandler}>Save</button>
                    </span>
                    <span className="mr-auto ml-2 mt-10">
                        <button className="hover:bg-red-950 p-2 px-3 rounded-2xl hover:scale-[1.1]" onClick={DeleteHandler}>Delete</button>
                    </span>
                </div>
            </div>
        </div>
    )   
}