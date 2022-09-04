import { useEffect, useState, Fragment, useContext } from "react";
import { Link, Router } from "react-router-dom";
import { Container, Table, ListGroup, Button } from "react-bootstrap";
import axios from 'axios';
import { toast } from "react-toastify";
import CustomerContext from "../contexts/CustomerContext";

export default function Orders() {

  const context = useContext(CustomerContext)
  const [orderItems, setOrderItems] = useState(([]));
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    const auth = context.checkIfAuth()
    if (auth) {
      getOrders()
    } 
  }, [])

  const getOrders = async () => {
    const response = await context.getOrders()
    setOrderItems(response)
    console.log('mer', response)
  }

  return (
    <Fragment>
      <Container>
        <h2 className="text-center mt-4" style={{fontFamily:"Righteous"}}>My Orders</h2>
        {loggedIn ?
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#Order Id</th>
              <th>Order Date</th>
              <th>Shipping Address</th>
              <th>Order Status</th>
              <th>Details</th>
            </tr>
          </thead>
          {orderItems.length ?
            <tbody>
              {orderItems.map(o => (
               <tr>
                  <td> {o.id} </td>
                  <td> {o.order_date.slice(0, 10)} </td>
                  <td> {o.shipping_address_line1} <br /> 
                  {o.shipping_address_line2 ? <div>o.shipping_address_line2 </div> :null} 
                  {o.shipping_address_postal} </td>
                  <td>{o.orderStatus.order_status}</td>
                  <td><a href={o.receipt_url} target="_blank">View Receipt</a></td>
                </tr>            
              ))}
            </tbody>
            : <h4>You have no order items</h4>}
        </Table>

        : <p className="py-4 lead text-center">Please log in to view your Order History</p>}
      </Container>
    </Fragment>
  )
}