import { Fragment, useContext, useState, useEffect } from "react";
import '../App.css';
import CustomerContext from "../contexts/CustomerContext";
import { Container, CloseButton, Form } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CardPlaceholder from "../components/CardPlaceholer";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";

export default function Cart() {

  const [loggedIn, setLoggedIn] = useState(true)
  const [cartItems, setCartItems] = useState([])

  const context = useContext(CustomerContext)
  const customerData = JSON.parse(localStorage.getItem("customer"))


  useEffect(() => {
    const auth = context.checkIfAuth()
    if (auth) {
      getCartItems()
    } else {
      setLoggedIn(false)
      toast.error("You need to log in to access your shopping cart")
    }
  }, [])

  const getCartItems = async () => {
    const customerId = customerData.id
    console.log(customerData)
    console.log('customer id', customerId)
    const response = await context.getCartItems(customerId)
    console.log(response)
    setCartItems(response)
  }
  console.log('cartitems', cartItems.map(c => c.id))


  return (
    <Fragment>
      <Container>
        <div className="row">
          <h1>My Cart</h1>
          {loggedIn ?

            <Fragment>
              {cartItems.length !== 0 ?
                <div className="row mt-3">
                  <div className="col-12 col-md-8">

                    {cartItems.map((c) => (

                      <div style={{ border: "1px solid black", position:"relative" }} className="d-flex">
                        <div className="col-5">
                          <img src={c.variant.product.image_url} style={{ width: "100%" }} />
                        </div>
                        <div className="col-7 p-3">
                          <h5>{c.variant.product.name}</h5>
                          <span>S$ {(c.variant.product.cost/100).toFixed(2)}</span> <br />
                          <span>Size: {c.variant.size.size}</span>
                            <CloseButton style={{position:"absolute", top:"10px", right:"10px"}}/>   
                            <div>
                              {c.quantity}
                            </div>                  
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                :
                <p>There are no items in your shopping</p>
              }
            </Fragment>

            :
            <div>
              <p className="cart-message py-4 lead text-center">Please log in to view or add items to your shopping cart.</p>
            </div>
          }
        </div>
      </Container>
    </Fragment>
  );
}
