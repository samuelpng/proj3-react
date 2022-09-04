import { Fragment } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

//=== Components ===
import NavBar from "./components/NavBar"

//=== Pages ===
import LandingPage from './pages/LandingPage'
import Variants from './pages/Variants';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsListing from './pages/ProductsListing';
import Profile from './pages/Profile';
import Stripe from './components/Stripe'
// === Providers ===
import ProductsProvider from './providers/ProductsProvider';
import CustomerProvider from './providers/CutomerProvider';
import Orders from './pages/Orders';

function App() {
  return (
    <Fragment>

      <Router>
        <CustomerProvider>
          <ProductsProvider>
            <NavBar />

            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/boots/:brand_id" element={<ProductsListing />} />
              <Route path="/products/:productId" element={<Variants />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/stripe" element={<Stripe />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </ProductsProvider>
        </CustomerProvider>
      </Router>

    </Fragment>

  );
}

export default App;
