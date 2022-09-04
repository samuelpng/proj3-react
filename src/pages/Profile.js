import { useEffect, useState, Fragment, useContext } from "react";
import { Link, Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from 'axios'
import CustomerContext from "../contexts/CustomerContext";

const BASE_URL = "https://kicks-city.herokuapp.com/api"

export default function Profile(props) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    const context = useContext(CustomerContext)

    useEffect(() => {
        // check if user is logged in
        const customerData = JSON.parse(localStorage.getItem("customer"))

        // console.log('bye', customerData.id)
        if (localStorage.getItem("accessToken") !== null) {
            const fetchProfile = async () => {
                // let response = await axios.get(BASE_URL + "/customers/profile", {
                //     headers: {
                //         authorization: "Bearer " + localStorage.getItem('accessToken')
                //     }
                // })

                setUsername(customerData.username)
                setEmail(customerData.email)

                // console.log("USER PROFILE", response.data)
            }
            fetchProfile();
            setLoggedIn(true)
        }
    }, [])

    return (
        <Fragment>
        
            <Container>
                <div className="row">
                    <div className="mx-auto col-md-4 mt-4">
                        <h1 className="text-center page-title-large">Profile</h1>

                        <div className="profile-section mt-3">
                            <p className="section-title text-center">Account Information</p>
                            <div className="mt-5">
                                <p className="m-0 text-center profile-details-username">Username: {username}</p>
                                <p className="m-0 text-center profile-details">Email: {email}</p>
                            </div>
                        </div>

                        {/* <div className="mt-5 d-flex justify-content-center">
                            <a className="btn shop-btn px-5 rounded-0" href="/products" type="button">Start Shopping</a>
                        </div>
                        <p className="mt-3 text-center page-subtitle">or</p> */}
                    </div>

                </div>
            </Container>
            
        </Fragment>
    )

}

