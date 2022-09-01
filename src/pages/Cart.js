import { Fragment, useContext, useState, useEffect } from "react";
import '../App.css';
import CustomerContext from "../contexts/CustomerContext";
import { Container, CloseButton, Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CardPlaceholder from "../components/CardPlaceholer";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";

export default function Cart() {

  const [loggedIn, setLoggedIn] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [quantity, setQuantity] = useState({})
  const [total, setTotal] = useState([])
  const [selectedVariant, setSelectedVariant] = useState({})

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
    const response = await context.getCartItems()
    console.log('hi', response)
    setCartItems(response)
    const qty = {}
    for (let r of response) {
      qty[r.variant.id] = r.quantity
    }
    console.log('qty', qty)
    setQuantity(qty)

    const subtotal = []
    for (let r of response) {
      subtotal.push(r.variant.product.cost * r.quantity)
    }
    const total = subtotal.reduce((partialSum, a) => partialSum + a, 0)
    setTotal(total)

    console.log('hihi', quantity)
  }


  const updateCartItem = async (e) => {
    setQuantity({
      ...quantity,
      [e.target.name]: e.target.value
    })
    const variantId = e.target.name
    const customerId = customerData.id
    // const qty = quantity[variantId]
    const qty = e.target.value

    console.log(customerId, variantId, qty)

    let response = await context.updateCartItem(customerId, variantId, qty)
    if (response) {
      toast.success('Cart updated')
      await getCartItems()
      return true
    } else {
      toast.error('Something went wrong')
      return false
    }
  }

  const deleteCartItem = async (variantId) => {
    const customerId = customerData.id
    console.log('delete', variantId)
    let response = await context.deleteCartItem(customerId, variantId)
    if (response) {
      toast.success('Product removed from cart')
      await getCartItems()
      return true
    } else {
      toast.error('Something went wrong')
      return false
    }
  }

  const addTest = async () => {
    return 5
  }

  return (
    <Fragment>
      <Container>
        <div className="row">
          <h1 className="px-5">My Cart</h1>
          {loggedIn ?

            <Fragment>
              {cartItems.length !== 0 ?
                <div className="row mt-3 px-4 px-lg-5">
                  <div className="col-12 col-lg-7">

                    {cartItems.map((c) => (

                      <div className="d-flex cartItem-container mb-3">
                        <div className="col-5">
                          <img src={c.variant.product.image_url} style={{ width: "100%" }} />
                        </div>
                        <div className="col-6 ps-3 pt-2 pt-md-3">
                          <h4 className="cartItemName pe-1">{c.variant.product.name}</h4>
                          <div className="mt-1">S$ {(c.variant.product.cost / 100).toFixed(2)}</div>
                          <div>Size: {c.variant.size.size}</div>
                          {/* <div className="mt-2">
                            {c.quantity}
                          </div> */}
                          <CloseButton style={{ position: "absolute", top: "10px", right: "10px" }} onClick={() => { deleteCartItem(c.variant.id) }} />
                          <Form.Select className="cart-select py-0 rounded-0" aria-label="Default select example" name={c.variant.id} onChange={updateCartItem} value={quantity[c.variant.id]}>
                            {parseInt(c.variant.stock) <= 10 ?
                              Array.from({ length: parseInt(c.variant.stock) }).map((a, b) => (
                                <option value={b + 1} className="qty-box">{b + 1}</option>
                              )) :
                              Array.from({ length: 10 }).map((a, b) => (
                                <option className="qty-box">{b + 1}</option>
                              ))
                            }
                          </Form.Select>
                          {parseInt(c.variant.stock) <= 5 ?
                            <div className="cart-stock">Only {c.variant.stock} left</div>
                            : null}
                        </div>
                      </div>
                    ))}

                  </div>
                  <div className="col-12 col-lg-5 pt-4 ps-4" >

                    <h4 className="mb-5">Order Summary</h4>
                    <div className="cartItem-container" style={{ border: "none" }}>
                      {
                        cartItems.map(c => (
                          <Fragment>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <div>{c.variant.product.name}</div>
                              <div>S${(c.variant.product.cost * c.quantity / 100).toFixed(2)}</div>
                            </div>
                            <p className="mb-3">x{c.quantity}</p>
                          </Fragment>
                        ))
                      }
                    
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>Total</div>
                      <div>S$ {(total / 100).toFixed(2)}</div>
                    </div>
                    </div>
                    <div className="d-grid my-4 mx-2">
                      <Button variant="dark" className="rounded-0 py-2" type="button" >CHECKOUT</Button>
                    </div>



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
