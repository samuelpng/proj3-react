import { Fragment, useContext, useEffect, useState } from "react";
import '../App.css';
import LandingCarousel from "../components/LandingCarousel";
import ProductsContext from "../contexts/ProductsContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function LandingPage() {

  const context = useContext(ProductsContext)
  const [newProducts, setNewProducts] = useState([])

  useEffect(() => {
    const fetchNewProducts = async () => {
      await getNewProducts()
    }

    fetchNewProducts();
  }, [])

  const getNewProducts = async () => {
    let response = await context.getNewProducts()

    setNewProducts(response)
    console.log(response)
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };



  return (
    <Fragment>
      <div>
        <LandingCarousel />
      </div>

      <div className="new-arrivals p-5">
        <h1 className="text-center">LATEST ARRIVALS</h1>
        <div >
          <Carousel responsive={responsive}>
            {newProducts ?
              newProducts.map(p => {
                return (
                  <Card style={{ cursor: "pointer", textDecoration: 'none', color: 'black' }} as={Link} to={`/products/${p.id}`} className="p-3">
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
                )
              })
              : null}
          </Carousel>
        </div>
      </div>

      <div>
        <h1 className="text-center">SHOP BRANDS</h1>
        <div className="row ">
          <div className="col-md-4 p-3">
            <img src="/images/puma.png" style={{ width: "100%" }}></img>
          </div>
          <div className="col-md-4 p-3">
            <img src="/images/adidas.png" style={{ width: "100%" }}></img>
          </div>
          <div className="col-md-4 p-3">
            <img src="/images/nike.png" style={{ width: "100%" }}></img>
          </div>
        </div>
      </div>

    </Fragment>
  )
}
