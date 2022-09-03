import { useEffect, useState, Fragment, useContext } from "react";
import { Link, Router } from "react-router-dom";
import { Container, Table, ListGroup, Button } from "react-bootstrap";
import axios from 'axios';
import { toast } from "react-toastify";
import CustomerContext from "../contexts/CustomerContext";

export default function Orders() {

  const context = useContext(CustomerContext)
  const [orderItems, setOrderItems] = useState(([]));
  const [loggedIn, setLoggedIn] = useState(true)

  useEffect(() => {
    const auth = context.checkIfAuth()
    if (auth) {
      getOrders()
    } else {
      setLoggedIn(false)
      toast.error("You need to log in to access your order page")
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
        <h1>Order History</h1>
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
            : <h1>You have no order items</h1>}
        </Table>



        {/* <h4>Orders</h4>
        <ListGroup variant="flush">
          {orderItems ?

            <ListGroup.Item>
              <div className="row">
                hu
              </div>
            </ListGroup.Item>

            : <h1>You have no order items</h1>}
        </ListGroup> */}
      </Container>
    </Fragment>
  )
}