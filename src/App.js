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

// === Providers ===
import ProductsProvider from './providers/ProductsProvider';

function App() {
  return (
    <Fragment>

        <Router>

        <NavBar />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsProvider><Products /></ProductsProvider>} />
            <Route path="/products/:productId" element={<ProductsProvider><Variants /></ProductsProvider>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>

    </Fragment>
 
  );
}

export default App;
