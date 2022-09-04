import { Fragment, useContext, useState } from 'react';
import CustomerContext from '../contexts/CustomerContext';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export default function Login() {

  const context = useContext(CustomerContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const updateFormField = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const login = async () => {
    let email = formData.email;
    let password = formData.password
    let response = await context.login(email, password)
    console.log("login =>", response)

    if (response) {
      navigate('/')
    }
  }

  return (
    <Fragment>
      <Container>
        <div className="row mt-3">
          <div className="form mx-auto col-md-6 col-lg-5 mt-4 p-4 shadow-lg" style={{ border: "1px solid lightslategray" }}>
            <h1 className="text-center" style={{ fontFamily: "Righteous" }}>Sign In</h1>
            <img src="/images/kickscity-logo.png" style={{ width: "50%", marginLeft: "25%" }}></img>

            {/* <p className="text-center">Lets us create your account</p> */}
            <Form className="register-form my-4">
              <Form.Control type="text" name="email" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="Email" value={formData.email} onChange={updateFormField} />
              {/* <Form.Control type="text" name="username" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="Username *" value={formData.username} onChange={updateFormField} />              */}
              <Form.Control type="password" name="password" className="form-input bg-transparent rounded-0 mb-3"
                placeholder="Password" value={formData.password} onChange={updateFormField} />


              <div className="d-grid mt-4">
                <Button variant="dark" className="rounded-0 py-2" type="button" onClick={login}>SIGN IN</Button>
              </div>
            </Form>
            <p class="text-center">Don't have an account? <a href="/register">Register here</a></p>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
