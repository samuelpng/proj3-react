
import { useContext, useEffect, useState, Fragment } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import CustomerContext from '../contexts/CustomerContext';

export default function NavBar() {

    const [loggedIn, setLoggedIn] = useState(false)


    const context = useContext(CustomerContext)
    const logout = async () => {
        await context.logout()
    }

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [])

    return (
        <Fragment>
            <Navbar bg="light" expand="lg" sticky="top" className="lg-navbar">
                <Container>
                    <Navbar.Brand href="/" className="ms-2"><img src="/images/kickscity-logo.png" style={{ height: "40px" }}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/boots/room" className="me-3">Boot Room</Nav.Link>
                            <NavDropdown title="Shop Brands" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/boots/1">Nike</NavDropdown.Item>
                                <NavDropdown.Item href="/boots/2">Adidas</NavDropdown.Item>
                                <NavDropdown.Item href="/boots/3">Puma</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ms-auto">
                            {loggedIn ?
                                <Nav.Link onClick={logout}>Log Out</Nav.Link>
                                :
                                <Nav.Link href="/login">Log In</Nav.Link>
                            }
                            <Nav.Link href="/cart">Cart</Nav.Link>
                            <Nav.Link href="/orders">Orders</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
} 