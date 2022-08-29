import { Fragment, useContext, useState, useEffect } from 'react';
import ProductsContext from '../contexts/ProductsContext';
import { Carousel, Container, Badge, Button, Accordion, Placeholder, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export default function Variants(props) {
    // const BASE_URL = 'https://kicks-city.herokuapp.com/api/products/'
    const BASE_URL = 'https://8000-samuelpng-proj3express-iwcbe9cedes.ws-us63.gitpod.io/api/products/'


    const { productId } = useParams();
    const [variants, setVariants] = useState([]);
    const [product, setProduct] = useState("");
    const [selectedVariant, setSelectedVariant] = useState([]);

    // const context = useContext(ProductsContext);
    // const product = context.getProductById(parseInt(productId))
    // console.log(product)
    

    const getProductData = async (productId) => {
        let response = await axios.get(BASE_URL + productId)
        const variants = response.data.variants
        const product = response.data.product
        setVariants(variants)
        setProduct(product)
    }

    // const getProduct = async (productId) => {
    //     let response = await axios.get(BASE_URL + productId)
    //     const product = response.data.product
    //     setProduct(product)
    // }

    // useEffect(() => {

    //     const fetchVariants = async () => {
    //         await getVariants(productId)
    //     }
    //     fetchVariants();
    // }, [])

    useEffect(() => {
        console.log(productId)
        const fetchProductData = async () => {
            await getProductData(productId)
        }
        // const fetchVariants = async () => {
        //     await getVariants(productId)
        // }
        fetchProductData();
        // fetchVariants();
    }, [])




   

if (product) {
        return (
            <Fragment>
                {/* <h1>{product.name}</h1> */}
                <Container>
                    <div style={{ height: "30px" }}></div>
                    <div className="row">
                        <div className="col-md-7 mb-2">
                            <Carousel variant="dark">
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={product.image_url}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={product.image_url2}
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={product.image_url3}
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className="col-md-5 mb-2">
                            <h2 className="mt-3">{product.name}</h2>
                            {product.brand.brand_name} {product.collection.collection} Collection <br />
                            {product.surface.surface} Football Boot <br /> <br />
                            <h5>S$ {(product.cost / 100).toFixed(2)}</h5>
                            <br /><br />

                            <h5 className="mb-3">Sizes</h5>
                            <div className="sizeBox-container mt-1">
                                {variants.map(v => {
                                    return (
                                        <Fragment>
                                            {/* <Badge bg="success" text="dark" className="p-3" style={{ cursor: "pointer", borderColor: "black", fontSize: "17px" }}>
                                         {v.size.size}
                                    </Badge> */}
                                            <div className="sizeBox" style={{ cursor: "pointer" }}>
                                                {v.size.size}
                                            </div>

                                        </Fragment>
                                    )
                                })}
                            </div>
                            <Button variant="dark" className="mt-4 p-2">Add to Cart</Button>

                            {/* <Accordion className="mt-3">
                                <Accordion.Item>
                                    <Accordion.Header>Description</Accordion.Header>
                                    <Accordion.Body>
                                        {product.description}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion> */}
                            <div className="mt-4"> {product.description} </div>

                            <Accordion className="mt-3">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Product Details</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="details-container">
                                            <div> Brand: {product.brand.brand_name} </div>
                                            <div> Collection: {product.collection.collection} </div>
                                            <div> Upper Material: {product.material.material} </div>
                                            <div> Surface Type: {product.surface.surface} ({product.surface.surface_abbreviation}) </div>
                                            <div> Closure: {product.closure.closure} </div>
                                            <div> Cutting: {product.cutting.cutting} </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                        </div>
                    </div>
                    <div style={{ height: "30px" }}></div>
                </Container>
            </Fragment>
        )
    } else {
        return(
            <Container>
            <div className="row">
                <div className="col-md-7 mt-5 imagePlaceholder"></div>
                <div className="col-12 col-md-5 mt-5">     
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} className="mt-3" /> <Placeholder xs={8} />
                                <Placeholder xs={6} className="mt-3"/> <Placeholder xs={8} />
                                <Placeholder xs={6} className="mt-3"/> <Placeholder xs={8} />
                                <Placeholder xs={6} className="mt-3"/> <Placeholder xs={8} />
                                <Placeholder xs={6} className="mt-3"/> <Placeholder xs={8} />
                                <Placeholder xs={6} className="mt-3"/> <Placeholder xs={8} />
                                <Placeholder xs={9} className="mt-3"/> <Placeholder xs={3} />
                            </Placeholder>
                </div>
            </div>
        </Container>
        )
    }


}