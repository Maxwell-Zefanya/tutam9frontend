import { BrowserRouter, Routes, Route, Navigate, redirect } from "react-router-dom";

import ItemPage from "./components/Items";
import Library from "./components/Library";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import AccountEdit from "./components/AccountEdit";
import Wallet from "./components/WalletPage";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="*"
            element={<Navigate to="/home" replace />}
        />

        <Route path="/home" element={<HomePage />} />

        <Route path="/browse" element={<ItemPage />} />

        <Route path="/library" element={<Library />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/login" element={<LoginPage />} />
      
        <Route path="/register" element={<RegisterPage />} />
      
        <Route path="/edit_account" element={<AccountEdit />} />
      
        <Route path="/wallet" element={<Wallet />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
