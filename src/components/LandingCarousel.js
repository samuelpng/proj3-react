import '../App.css';
import { Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../App.css';


export default function LandingCarousel() {


    return (
        <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/1.png"
                alt="xSpeed"
              />
              <Carousel.Caption className="landing-carousel">
                <h3>X SPEED PORTAL</h3>
                <h5>UNLOCK SPEED IN ALL DIMENSIONS WITH THE NEW X SPEEDPORTAL.</h5>
                <a className="button-dark" href="/products/3">Shop Now</a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/4.png"
                alt="Second slide"
              />

              <Carousel.Caption className="landing-carousel">
                <h3>FAST IS IN THE AIR</h3>
                <h5>THE NIKE AIR ZOOM MERCURIAL LUCENT PACK. AVAILABLE NOW.</h5>
                <a className="button-dark" href="/products/2">Shop Now</a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/13.png"
                alt="Puma Future"
              />

              <Carousel.Caption className="landing-carousel">
                <h3>PUMA FUTURE 1.3</h3>
                <h5>LOCK IN. DRIVE THEM CRAZY.</h5>
                <a className="button-dark" href="/products/5">Shop Now</a>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
    )
} 