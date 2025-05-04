import DashboardElement from "./elements/DashboardElement";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import React from "react";
import { isLoggedIn } from "./LoginPage";

let employee_data;

export function EmployeeData(employee){
  if(employee){
    employee_data = employee;
  }
  return employee_data;
}

export default function HomePage() {
  
  const [data, setData] = useState([{}]);
  const navigate = useNavigate();
  let isPurchasingItem = false;
  let isEditingItem = false;
  let isAddingItem = false;
  let isLoginDataCorrect = isLoggedIn();
  
  const handleRemoveItem = async(data) => {
    console.log(data.name);
    return 0;
  }

  const handlePurchaseItem = async(data) => {
    console.log("BUY: ", isPurchasingItem);
    return 0;
  }

  const handleEditItem = async(data) => {
    console.log("EDIT: ", isEditingItem);
    return 0;
  }

  const handleAddItem = async() => {
    console.log("ADD: ", isAddingItem);
    return 0;
  }

  useEffect(() => {
    handleHomePage();
  }, [
    isEditingItem,
    isAddingItem,
    isPurchasingItem
  ]);

  
  const handleHomePage = async () => {
    
    if(isLoginDataCorrect == false) {
      navigate("/login");
      swal.fire({
        icon: "error",
        iconColor: "#FFFFFF",
        text: "Harap login terlebih dahulu",
        color: "#FFFFFF",
        background: "#2A0803"
      });
    }
    try {
      const response = await axios.get("https://maxwell-tutam9backend.vercel.app/item/")
      setData(response.data.payload.map((data) => data));
      console.log("RESPMAP: ", response.data.payload.map((data) => data));
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className="bg-gradient-to-r from-[#e7e2db] to-[#2A0803] flex">
      <DashboardElement />
      <div className="text-white overflow-y-scroll flex flex-col h-screen m-auto flex-1" >
        <div className="flex flex-row w-full py-3 items-center justify-center mx-auto">
          <button className="bg-[#737CCF] p-2 px-3 my-1 rounded-2xl hover:bg-[#2A0803] text-sm" onClick={() => {isAddingItem = true; handleAddItem}}>Add a New Item</button>
        </div>
        <ol className="w-full">
          {data.map((data) => (
            <li
              key={data.id}
              className="text-[20px] p-3 flex flex-row bg-[#737CCF] m-2 rounded-2xl hover:bg-[#505794]"
            >
              <div className="flex flex-col ml-2 my-auto">
                <p className="font-bold underline">{data.name}</p>
                <p>Price: {data.price}</p>
                <p>Stock: {data.stock}</p>
                <p>ID: {data.id}</p>
              </div>
              <div className="flex flex-col ml-auto">
                <button className="bg-[#798DC5] p-2 px-3 my-1 rounded-2xl hover:bg-[#2A0803] text-sm" onClick={() => {isPurchasingItem = true; handlePurchaseItem(data)}}>Purchase</button>
                <button className="bg-[#798DC5] p-2 px-3 my-1 rounded-2xl hover:bg-[#2A0803] text-sm" onClick={() => {isEditingItem = true; handleEditItem(data)}}>Edit</button>
                <button className="bg-[#798DC5] p-2 px-3 my-1 rounded-2xl hover:bg-[#2A0803] text-sm" onClick={() => handleRemoveItem(data)}>Remove</button>
              </div>
            </li>
          ))}

        </ol>
        
      </div>
    </div>
  );
}