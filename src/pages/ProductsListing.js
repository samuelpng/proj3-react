import { Fragment, useContext, useState, useEffect } from "react";
import '../App.css';
import ProductsContext from '../contexts/ProductsContext';
import { Container, Card, Button, Placeholder, Offcanvas, Form, Accordion } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const options = [
    {
        name: 'Enable body scrolling',
        scroll: true,
        backdrop: false,
    }
]

export default function ProductsListing(props) {
    const context = useContext(ProductsContext);
    const brands = context.getBrands()

    const [globalSearch, setGlobalSearch] = useState('')
    const [brandSearch, setBrandSearch] = useState([])
    const [collectionSearch, setCollectionSearch] = useState([])
    const [materialSearch, setMaterialSearch] = useState([])
    const [colourSearch, setColourSearch] = useState([])
    const [surfaceSearch, setSurfaceSearch] = useState([])
    const [closureSearch, setClosureSearch] = useState([])
    const [cuttingSearch, setCuttingSearch] = useState([])
    const [positionSearch, setPositionSearch] = useState([])

    const [searchResults, setSearchResults] = useState([])

    //show products when page loaded
    useEffect(() => {
        search()
    }, [])

    // useEffect(() => {
    //     const brands = context.getBrands()
    //     setBrandSearch(brands)
    //     console.log("brands =>", brands)
    // }, [])

    // offCanvasSearch
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    const enterSearch = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }

    const updateGlobalSearch = (q) => {
        setGlobalSearch(q)
    }

    const updateBrandSearch = (e) => {

        if (brandSearch.includes(e.target.value)) {
            let clone = brandSearch.slice();
            let indexToRemove = brandSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1);
            setBrandSearch(clone)
        } else {
            let clone = brandSearch.slice()
            clone.push(e.target.value)

            setBrandSearch(clone)
        }
    }

    const search = async () => {
        let searchQuery = {}
        if (globalSearch) {
            searchQuery.name = globalSearch
        }
        if (brandSearch) {
            searchQuery.brand_id = brandSearch
        }

        console.log(searchQuery)

        const results = await context.search(searchQuery)

        setSearchResults(results)
    }




    if (searchResults) {
        return (
            <Fragment>
                <Container>
                    <h1>Football Boots</h1>

                    <input id='globalSearch' name='globalSearch' type="text" className='form-control mb-3'
                        value={globalSearch} onChange={(e) => { updateGlobalSearch(e.target.value) }}
                        onKeyUp={(e) => { enterSearch(e) }} />
                    <Button variant="primary" onClick={toggleShow} className="me-2">
                        Search Filters
                    </Button>

                    <div className='row'>
                        {searchResults.map(p => {
                            return (
                                <div className="col-12 col-md-6 col-lg-3 mb-2" key={p.id}>
                                    <Card style={{ cursor: "pointer", textDecoration: 'none', color: 'black' }} as={Link} to={`/products/${p.id}`}>
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

                <Offcanvas show={show} onHide={handleClose} {...props}
                    scroll={true} backdrop={true} placement={'end'}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        <Accordion defaultActiveKey="0" className="mt-3" alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Brands</Accordion.Header>
                                <Accordion.Body>
                                    {/* //todo: add checked */}
                                    {brands ?
                                        brands.map((b) => (
                                            <Form.Check inline key={b[0]} label={b[1]} name="brand" value={b[0]} onChange={updateBrandSearch} />
                                        ))
                                        : ""}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Collection</Accordion.Header>
                                <Accordion.Body>



                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Upper Material</Accordion.Header>
                                <Accordion.Body>


                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <button className="btn btn-dark rounded-0 p-2 mt-3" onClick={search}>Search</button>

                    </Offcanvas.Body>
                </Offcanvas>
            </Fragment>
        )
    } else {
        return (
            <Container>
                <h1>Football Boots</h1>
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
            </Container>
        )
    }

}