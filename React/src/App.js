import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Admin from "./component/Admin/Admin";
import AdminLogin from "./component/Admin/AdminLogin";
import AdminReg from "./component/Admin/AdminReg";
import AdminHome from "./component/Admin/AdminHome";
import Offer from "./component/Admin/Offer";
import LoginPage from "./component/LoginPage";
import EditPost from "./component/Admin/EditPost";
import PlayerHome from "./component/Player/PlayerHome";


export default function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} ></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/admin/login" element={<AdminLogin/>}></Route>
        <Route path="/admin/reg" element={<AdminReg/>}></Route>
        <Route path="/admin/home" element={<AdminHome/>}></Route>
        <Route path="/offer" element={<Offer/>}></Route>
        <Route path="/offer/edit" element={<EditPost/>}></Route>

        <Route path="/player/home" element={<PlayerHome/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
