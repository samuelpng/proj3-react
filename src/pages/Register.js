import React, { Fragment, useContext, useState } from 'react';
import CustomerContext from '../contexts/CustomerContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import '../App.css';

export default function Register() {

  const context = useContext(CustomerContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    contact_number: ''
  })

  const [formError, setFormError] = useState([])

  //set email validation check

  const updateFormField = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return true
    } else {
      return false
    }
  }
  const validateContactNumber = (number) => {
    if (/[a-zA-Z]/.test(number)) {
      return false
    } else {
      return true
    }
  }


  const formValidation = () => {
    let errors = []

    let email = validateEmail(formData.email)
    if (!email) {
      errors.push('email')
    }
    if (!formData.username || formData.username.length > 45) {
      errors.push('username')
    }
    if (!formData.first_name || formData.first_name.length > 45) {
      errors.push('first_name')
    }
    if (!formData.last_name || formData.first_name.length > 45) {
      errors.push('last_name')
    }
    let contact_number = validateContactNumber(formData.contact_number)
    if (!contact_number) {
      errors.push('contact_number');
    }
    if (!formData.password || formData.password.length < 8) {
      errors.push('password')
    }
    if (formData.confirm_password !== formData.password) {
      errors.push('confirm_password')
    }

    //setState
    setFormError(errors)
    return errors

  }

  const registerCustomer = async () => {
    const errors = formValidation()
    if (errors.length) {
      return
    }

    await context.register(formData)
    navigate('/login')

  }

  return (
    <Fragment>
      <Container>
        <div className="row mt-3">
          <div className="form mx-auto col-md-6 col-lg-5 mt-4 p-4" style={{ border: "1px solid lightslategray" }}>
            <h1 className="text-center">Register</h1>
            <p className="text-center">Lets us create your account</p>
            <Form className="register-form my-4">
              <Form.Control type="text" name="email" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="Email *" value={formData.email} onChange={updateFormField} />
              <Form.Control type="text" name="username" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="Username *" value={formData.username} onChange={updateFormField} />
              <Form.Control type="text" name="first_name" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="First Name *" value={formData.first_name} onChange={updateFormField} />
              <Form.Control type="text" name="last_name" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="Last Name *" value={formData.last_name} onChange={updateFormField} />
              <Form.Control type="text" name="contact_number" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="Contact No." value={formData.contact_number} onChange={updateFormField} />
              <Form.Control type="password" name="password" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="Password *" value={formData.password} onChange={updateFormField} />
              <Form.Control type="password" name="confirm_password" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="Confirm Password *" value={formData.confirm_password} onChange={updateFormField} />

              <div className="d-grid mt-4">
                <Button variant="dark" className="rounded-0 py-2" type="button" onClick={registerCustomer}>CREATE ACCOUNT</Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
