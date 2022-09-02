import { Fragment } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

//=== Components ===
import NavBar from "./components/NavBar"

//=== Pages ===
import LandingPage from './pages/LandingPage'
import Products from './pages/Products';
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

function App() {
  return (
    <Fragment>

      <Router>
        <CustomerProvider>
          <ProductsProvider>
            <NavBar />

            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<ProductsListing />} />
              <Route path="/boots" element={<Products />} />
              <Route path="/products/:productId" element={<Variants />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/stripe" element={<Stripe />} />
            </Routes>
          </ProductsProvider>
        </CustomerProvider>
      </Router>

    </Fragment>

  );
}

export default App;
