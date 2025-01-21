import React from "react";
import MyForm from "./components/MyForms/MyForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Singin from "./components/MyForms/Singin";
import PageNoteFound from "./pages/PageNoteFound";
import HeaderNav from "./components/MyNavbars/HeaderNav";
import { useSelector } from "react-redux";
import { PublicRoute } from "./components/PublicRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import AddProduct from "./components/Products/AddProduct";
import { ProductList } from "./components/Products/ProductList";
import CreateUser from "./components/UserComponets/CreateUser";
import Showusers from "./components/UserComponets/Showusers";
import Spiner from "./components/Spiner";
import ForgotPassword from "./components/PasswordAPI/ForgotPassword";
import { ChangePassword } from "./components/PasswordAPI/ChangePassword";
import { Cart } from "./pages/Cart";
import { ViewDetails } from "./pages/ViewDetails";
import "./pages/Home.css"

function App() {
  const { loading } = useSelector(state => state.alert);
  return (
    <Router future={{ v7_startTransition: true }}>
      <HeaderNav />
      {loading ? <Spiner /> :
        <Routes>
          <Route path="/registration" element={
            <PublicRoute>
              <MyForm />
            </PublicRoute>

          } />
          <Route path="/singIn" element={
            <PublicRoute>
              <Singin />
            </PublicRoute>

          } />

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          } />
          <Route path="/changePassword" element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          } />

          <Route path="/addProduct" element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } />

          <Route path="/listProduct" element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          } />
          <Route path="/createuser" element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          } />

          <Route path="/showusers" element={
            <ProtectedRoute>
              <Showusers />
            </ProtectedRoute>
          } />
          <Route path="/cartdata" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/viewDetails" element={
            <ProtectedRoute>
              <ViewDetails/>
            </ProtectedRoute>
          } />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
      }
    </Router>
  );
}

export default App;
