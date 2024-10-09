import React from "react";
import './App.css';
import Navbar from './components/Navbar'

import './App.css'
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import TempOrder from "./pages/TempOrder";

import FavoriteItems from "./pages/FavoriteItems";
import SecondSearchBar from "./components/SecondSearchBar";
import { Route, Routes } from "react-router-dom";
import Register from "./components/registration/Register";
import Login from "./components/registration/Login";
import Logout from "./components/registration/Logout";
import DeleteAccount from "./components/DeleteAccount";

import { AuthProvider } from "./components/context/AuthProvider";


import FavoritePage from "./pages/FavoritePage";
import OrderPage from "./pages/OrderPage";
import TempOrders from "./pages/TempOrders";
import CloseOrders from "./pages/CloseOrders";




function App() {

      return (
            <>
                  <AuthProvider>

<Navbar />
                        <div className="container">
                              <Routes>
                                    <Route path="/" element={<MainPage />} />
                                    <Route path="/Home" element={<Home />} />
                                    <Route path="/favoriteItems" element={<FavoriteItems />} />
                                    <Route path="/SecondSearchBar" element={<SecondSearchBar />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signUp" element={<Register />} />
                                    <Route path="/logout" element={<Logout />} />
                                    <Route path="/deleteAccount" element={<DeleteAccount />} />

                                    <Route path="/tempOrder" element={<TempOrder />} />
                                    
                                    <Route path="/tempOrders" element={<TempOrders />} />
                                    <Route path="/closeOrders" element={<CloseOrders />} />


                                    <Route path="/favoritePage" element={<FavoritePage />} />
                                    <Route path="/orderPage" element={<OrderPage />} />



                              </Routes>
                        </div>

                  </AuthProvider>


            </>



      )
}







export default App;

