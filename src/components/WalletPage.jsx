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
    const [wallet, setWallet] = useState("");
    let isLoginDataCorrect = isLoggedIn();
    useEffect(() => {
        handleWalletPage();
    }, []);
    
    const handleWalletPage = async () => {
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

    const WalletHandler = async() => {
        try{
            const response = await axios.post("https://maxwell-tutam9backend.vercel.app/users/topUp", null, {
                params: {
                    id: data.id,
                    amount: wallet
            }});
            if(response.status === 200){
                const final = await axios.get("https://maxwell-tutam9backend.vercel.app/users/"+data.email);
                swal.fire({
                    icon: "success",
                    iconColor: "#FFFFFF",
                    text: "Wallet Berhasil Ditambah",
                    color: "#FFFFFF",
                    background: "#2A0803"
                });
                SetUser(final.data.payload)
                navigate("/library");
            }else{
                swal.fire({
                    icon: "error",
                    iconColor: "#FFFFFF",
                    text: "Wallet Gagal Ditambah",
                    color: "#FFFFFF",
                    background: "#2A0803"
                });
                throw new Error("Wallet failed")
            }
        }catch (error){
            console.error(error);
        }
    }

    const ReturnHandler = () => {
        navigate("/library")
    }

    return(
        <div className="bg-gradient-to-r from-[#e7e2db] to-[#2A0803] h-screen w-screen flex">
            <Filler/>
            <div className="bg-[#2A0803] w-[622px] h-[300px]  m-auto rounded-2xl flex flex-col text-[#bdb3a6]">
                <p className="mx-auto text-[#bdb3a6] mt-10 text-[30px]">Add to Your Wallet</p>
                
                <div className="mx-auto mt-5">
                    <p className="text-[#bdb3a6] text-[20px]">Amount</p>
                    <input 
                        value={wallet} 
                        onChange={(e) => setWallet(e.target.value)} 
                        className="bg-[#e8e8ff] w-[343px] h-[41px] text-gray-800 px-2 rounded-md" 
                    />
                </div>
                <div className="flex flex-row">
                    <span className="ml-auto mr-2 mt-10">
                        <button className="hover:border-2 p-2 px-3 rounded-2xl hover:scale-[1.1]" onClick={ReturnHandler}>Return</button>
                    </span>
                    <span className="ml-2 mr-auto mt-10">
                        <button className="hover:border-2 p-2 px-3 rounded-2xl hover:scale-[1.1]" onClick={WalletHandler}>Add</button>
                    </span>
                </div>
            </div>
        </div>
    )   
}