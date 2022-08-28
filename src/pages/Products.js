import { Fragment, useContext, useEffect } from "react";
import '../App.css';
import ProductsContext from '../contexts/ProductsContext';
import { Container, Card, Button, Placeholder } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function Products(props) {

  const context = useContext(ProductsContext);
  const products = context.getProducts()

  console.log(products)
  if (products) {
    return (
      <Fragment>
        <Container>
          <h1>Football Boots</h1>
          <div className='row'>
            {products.map(p => {
              return (
                <div className="col-12 col-md-6 col-lg-3 mb-2" key={p.id}>
                  <Card style={{ cursor: "pointer", textDecoration: 'none', color: 'black' }} as={Link} to={`/products/${p.id}`}>
                    {/* to add onclick in card tag */}
                    <Card.Img variant="top" src={p.image_url} />
                    <Card.Img variant="top" className="back-img" src={p.image_url2} />
                    <Card.Body>
                      <Card.Title>{p.name}</Card.Title>
                      <Card.Text>
                        {p.surface.surface} Boots <br />
                        S$ {(p.cost / 100).toFixed(2)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
          <div style={{ height: "50px" }}></div>
        </Container>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3 mb-2">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                  <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
              </Card.Body>
            </Card>
          </div>
        </div>
      </Fragment>
    )
  }
}
