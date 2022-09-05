import { Fragment, useState, useEffect } from 'react';

import { Carousel, Container, Button, Accordion, Placeholder, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function Variants(props) {

    const BASE_URL = 'https://kicks-city.herokuapp.com/api/'
 

    const { productId } = useParams();
    const [variants, setVariants] = useState("");
    const [product, setProduct] = useState("");
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState("");


    const getProductData = async (productId) => {
        let response = await axios.get(BASE_URL + `products/${productId}`)
        const variants = response.data.variants
        const product = response.data.product
        setVariants(variants)
        setProduct(product)

        if (product) {
            const fetchSimilarProducts = async () => {
                await getSimilarProducts(product.brand.id)
            }
            fetchSimilarProducts()
        }
    }

    const getSimilarProducts = async (brandId) => {
        console.log(brandId)
        let response = await axios.get(BASE_URL + `products/similar/${brandId}`)
        const products = response.data
        console.log(products)
        setSimilarProducts(products)
    }

    const updateVariant = (e) => {
        setSelectedVariant(e.target.value)
    }


    useEffect(() => {
        const fetchProductData = async () => {
            await getProductData(productId)
        }

        fetchProductData();

    }, [])


    const addToCart = async () => {
        // check if user is logged in
        if (localStorage.getItem("accessToken")) {

            const customerData = JSON.parse(localStorage.getItem("customer"))
            let customerId = customerData.id
            let variantId = selectedVariant

            try {
                console.log(BASE_URL + `cart/${variantId}/add`)
                let response = await axios.post(BASE_URL + `cart/${variantId}/add`,
                    {
                        customer_id: customerId,
                        variant_id: variantId
                    },
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        },
                    })
                toast.success('Successfully added to cart')
                return true
            } catch (error) {
                toast.error("Maximum items in cart exceeded")
                return false
            }
        } else {
            toast.error('You have to log in to add to cart')
        }
    }



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
                                        parseInt(v.stock) > 0 ?
                                            <Fragment>
                                                <span key={v.id}>
                                                    <input type="radio" name="sizeVariant" id={v.id} className="sizeRadio"
                                                        value={v.id} onChange={updateVariant} checked={selectedVariant === `${v.id}`} />
                                                    <label htmlFor={v.id} key={v.name} style={{ cursor: "pointer" }}>
                                                        <span className={selectedVariant === `${v.id}` ? 'checkedSize' : 'sizeBox'}
                                                        >{v.size.size}</span>
                                                    </label>
                                                </span>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <span className="size-soldOut">{v.size.size}</span>
                                            </Fragment>
                                    )
                                })}
                            </div>
                            {variants.map(v => <div className="mt-2">{selectedVariant === `${v.id}` ?

                                (parseInt(v.stock) > 5) ?
                                    null :
                                    <span key={v.id} style={{ color: 'red' }}> Only {v.stock} stocks left </span>

                                : null}</div>)}
                            <div className="d-grid mt-4 me-2">
                                <Button variant="dark" className="rounded-0 py-2" type="button" onClick={addToCart}>ADD TO CART</Button>
                            </div>
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

                    <div style={{ height: "20px" }}></div>

                    <div style={{ fontFamily: "Righteous" }} className="mt-5">
                        <h3 className="text-center mb-2">More boots like this</h3>
                        <div className='row d-flex justify-content-center'>
                            {similarProducts.map(p => {
                                return (
                                    <Fragment>
                                        {p.id !== product.id ?
                                            <div className="col-12 col-md-6 col-lg-3 mb-2" key={p.id}>
                                                <a href={`/products/${p.id}`} style={{textDecoration:"none"}}>
                                                <Card style={{ cursor: "pointer", textDecoration: 'none', color: 'black' }}>
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
                                                </a>
                                            </div>
                                            : null}
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ height: "30px" }}></div>

                </Container>
            </Fragment >
        )

    } else {
        return (
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
                            <Placeholder xs={6} className="mt-3" /> <Placeholder xs={8} />
                            <Placeholder xs={6} className="mt-3" /> <Placeholder xs={8} />
                            <Placeholder xs={6} className="mt-3" /> <Placeholder xs={8} />
                            <Placeholder xs={6} className="mt-3" /> <Placeholder xs={8} />
                            <Placeholder xs={6} className="mt-3" /> <Placeholder xs={8} />
                            <Placeholder xs={9} className="mt-3" /> <Placeholder xs={3} />
                        </Placeholder>
                    </div>
                </div>
                <ToastContainer />
            </Container>
        )
    }


}