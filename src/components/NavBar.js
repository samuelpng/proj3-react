
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import CustomerContext from '../contexts/CustomerContext';

export default function NavBar() {

    const context = useContext(CustomerContext)
    const logout = async () => {
        await context.logout()
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home" className="ms-2">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="/products">Products</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                    {context.checkIfAuth() ?
                    <Nav.Link onClick={logout}>Log Out</Nav.Link>
                    :
                    <Nav.Link href="/login">Log In</Nav.Link>
                    }
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    <Nav.Link href="/orders">Orders</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
} 