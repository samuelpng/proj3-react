import { Fragment, useContext, useState, useEffect } from "react";
import '../App.css';
import ProductsContext from '../contexts/ProductsContext';
import { Container, Card, Button, Placeholder, Offcanvas, Form, Accordion } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CardPlaceholder from "../components/CardPlaceholer";


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
    const collections = context.getCollections()
    const materials = context.getMaterials()
    const colours = context.getColours()
    const surfaces = context.getSurfaces()
    const closures = context.getClosures()
    const cuttings = context.getCuttings()
    const positions = context.getPositions()

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
    const updateCollectionSearch = (e) => {
        if (collectionSearch.includes(e.target.value)) {
            let clone = collectionSearch.slice();
            let indexToRemove = collectionSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1);
            setCollectionSearch(clone)
        } else {
            let clone = collectionSearch.slice()
            clone.push(e.target.value)
            setCollectionSearch(clone)
        }
    }
    const updateMaterialSearch = (e) => {
        if (materialSearch.includes(e.target.value)) {
            let clone = materialSearch.slice();
            let indexToRemove = materialSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1);
            setMaterialSearch(clone)
        } else {
            let clone = materialSearch.slice()
            clone.push(e.target.value)
            setMaterialSearch(clone)
        }
    }
    const updateColourSearch = (e) => {
        if (colourSearch.includes(e.target.value)) {
            let clone = colourSearch.slice();
            let indexToRemove = colourSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1);
            setColourSearch(clone)
        } else {
            let clone = colourSearch.slice()
            clone.push(e.target.value)
            setColourSearch(clone)
        }
    }
    const updateSurfaceSearch = (e) => {
        if (surfaceSearch.includes(e.target.value)) {
            let clone = surfaceSearch.slice();
            let indexToRemove = surfaceSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1);
            setSurfaceSearch(clone)
        } else {
            let clone = colourSearch.slice()
            clone.push(e.target.value)
            setSurfaceSearch(clone)
        }
    }
    const updateClosureSearch = (e) => {
        if (closureSearch.includes(e.target.value)) {
            let clone = closureSearch.slice();
            let indexToRemove = closureSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1);
            setClosureSearch(clone)
        } else {
            let clone = closureSearch.slice()
            clone.push(e.target.value)
            setClosureSearch(clone)
        }
    }
    const updateCuttingSearch = (e) => {
        if (cuttingSearch.includes(e.target.value)) {
            let clone = cuttingSearch.slice();
            let indexToRemove = cuttingSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1);
            setCuttingSearch(clone)
        } else {
            let clone = cuttingSearch.slice()
            clone.push(e.target.value)
            setCuttingSearch(clone)
        }
    }
    const updatePositionSearch = (e) => {
        if (positionSearch.includes(e.target.value)) {
            let clone = positionSearch.slice();
            let indexToRemove = positionSearch.findIndex(i => i === e.target.value);
            clone.splice(indexToRemove, 1);
            setPositionSearch(clone)
        } else {
            let clone = positionSearch.slice()
            clone.push(e.target.value)
            setPositionSearch(clone)
        }
    }


    useEffect(() => {
        search();
    }, [brandSearch, collectionSearch, materialSearch, colourSearch, surfaceSearch, closureSearch, cuttingSearch, positionSearch])


    const search = async () => {
        let searchQuery = {}
        if (globalSearch) {
            searchQuery.name = globalSearch
        }
        if (brandSearch && brandSearch.length !== 0) {
            searchQuery.brand_id = brandSearch
        }
        if (collectionSearch && collectionSearch.length !== 0) {
            searchQuery.collection_id = collectionSearch
        }
        if (materialSearch && materialSearch.length !== 0) {
            searchQuery.material_id = materialSearch
        }
        if (colourSearch && colourSearch.length !== 0) {
            searchQuery.colour_id = colourSearch
        }
        if (surfaceSearch && surfaceSearch.length !== 0) {
            searchQuery.surface_id = surfaceSearch
        }
        if (closureSearch && closureSearch.length !== 0) {
            searchQuery.closure_id = closureSearch
        }
        if (cuttingSearch && cuttingSearch.length !== 0) {
            searchQuery.cutting_id = cuttingSearch
        }
        if (positionSearch && positionSearch.length !== 0) {
            searchQuery.postion_id = positionSearch
        }


        // console.log(searchQuery)

        const results = await context.search(searchQuery)

        setSearchResults(results)
    }




    if (searchResults) {
        return (
            <Fragment>
                <Container>
                    {/* {brandSearch ? <span className="mb-3">Applied: {brandSearch} </span>: ""}  */}
                    <h1>Boot Room</h1>
                    <div className="row">
                        <div className="col-lg-9 d-flex">
                            <input id='globalSearch' name='globalSearch' type="text" className='form-control rounded-0 mb-3' style={{ width: "80%" }}
                                value={globalSearch} onChange={(e) => { updateGlobalSearch(e.target.value) }}
                                onKeyUp={(e) => { enterSearch(e) }} />
                            <Button variant="dark rounded-0" onClick={search} className=" mb-3 " style={{ width: "20%" }}> Search
                            </Button>
                        </div>
                        {/* <div className="col-lg-3">
                            <Button variant="dark rounded-0" onClick={toggleShow} py-0 className=" mb-3 "> Search
                            </Button>
                        </div> */}
                        <div className="col-lg-3">
                            <Button variant="dark rounded-0 mb-3" onClick={toggleShow} style={{ width: '100%' }}>
                                Filters
                            </Button>
                        </div>
                    </div>
                    {brands ?
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
                        : 
                        
                        <CardPlaceholder />
 
                        }
                        
                    <div style={{ height: "50px" }}></div>
                </Container>

                <Offcanvas show={show} onHide={handleClose} {...props}
                    scroll={true} backdrop={true} placement={'end'}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Filter <span className="resetFilters">Clear All</span></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        <Accordion defaultActiveKey="0" className="mt-3" alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Brands {brandSearch.length !== 0 ? <span className="ms-1">({brandSearch.length})</span> : ""}</Accordion.Header>
                                <Accordion.Body>

                                    {brands ?
                                        brands.map((b) => (
                                            <Form.Group className="mb-1" controlId={b[1]} key={b[0]}>
                                                <Form.Check type="checkbox" inline key={b[0]} label={b[1]} name="brandSearch"
                                                    value={b[0]} checked={brandSearch.includes(b[0].toString())}
                                                    onChange={updateBrandSearch} />
                                            </Form.Group>
                                        ))
                                        : ""}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Collections {collectionSearch.length !== 0 ? <span className="ms-1">({collectionSearch.length})</span> : ""}</Accordion.Header>
                                <Accordion.Body>

                                    {collections ?
                                        collections.map((b) => (
                                            <Form.Group className="mb-1" controlId={b[1]} key={b[0]}>
                                                <Form.Check type="checkbox" inline key={b[0]} label={b[1]} name="collectionSearch"
                                                    value={b[0]} checked={collectionSearch.includes(b[0].toString())}
                                                    onChange={updateCollectionSearch} />
                                            </Form.Group>
                                        ))
                                        : ""}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Upper Materials {materialSearch.length !== 0 ? <span className="ms-1">({materialSearch.length})</span> : ""}</Accordion.Header>
                                <Accordion.Body>

                                    {materials ?
                                        materials.map((b) => (
                                            <Form.Group className="mb-1" controlId={b[1]} key={b[0]}>
                                                <Form.Check type="checkbox" inline key={b[0]} label={b[1]} name="materialSearch"
                                                    value={b[0]} checked={materialSearch.includes(b[0].toString())}
                                                    onChange={updateMaterialSearch} />
                                            </Form.Group>
                                        ))
                                        : ""}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Colours {colourSearch.length !== 0 ? <span className="ms-1">({colourSearch.length})</span> : ""}</Accordion.Header>
                                <Accordion.Body>

                                    {/* {colours ?
                                        colours.map((b) => (
                                         
                                            <Form.Check type="checkbox" id="colourCheckbox" inline key={b[0]} label={b[1]} name="colourSearch"
                                            value={b[0]} checked={colourSearch.includes(b[0].toString())}
                                            onChange={updateColourSearch}><span className="colourCircle" style={{backgroundColor: b[1] }}></span></Form.Check>
               
                                        ))
                                        : ""} */}

                                    {colours ?
                                        colours.map((c) => (
                                            <span class="me-3" key={c[0]}>
                                                <input type="checkbox" key={c[1]} name="colourSearch" id={c[1]} className="colourCheckbox"
                                                    value={c[0]} checked={colourSearch.includes(c[0].toString())} onChange={updateColourSearch} />
                                                <label htmlFor={c[1]} key={c[0]} >
                                                    <span className={colourSearch.includes(c[0].toString()) ? 'colourBox' : 'colourBox uncheckColour'}
                                                        style={{ backgroundColor: c[1] }}></span>
                                                </label>
                                            </span>
                                        ))
                                        : ""}



                                    {/* {colours ?
                                        colours.map((c) => {
                                            <div>
                                                <input type="checkbox" id="colourCheckbox" key={c[0]} name="colourSearch" 
                                                value={c[0]} checked={colourSearch.includes(c[0].toString())} />
                                                <label for="colourSearch" ><span className="colourCircle" style={{backgroundColor: c[1] }}></span></label>
                                            </div>
                                        }) : ""
                                    } */}


                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Surface Type {surfaceSearch.length !== 0 ? <span className="ms-1">({surfaceSearch.length})</span> : ""}</Accordion.Header>
                                <Accordion.Body>

                                    {surfaces ?
                                        surfaces.map((b) => (
                                            <Form.Group className="mb-1" controlId={b[1]} key={b[0]}>
                                                <Form.Check type="checkbox" inline key={b[0]} label={b[1]} name="surfaceSearch"
                                                    value={b[0]} checked={surfaceSearch.includes(b[0].toString())}
                                                    onChange={updateSurfaceSearch} />
                                            </Form.Group>
                                        ))
                                        : ""}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Boot Closures {closureSearch.length !== 0 ? <span className="ms-1">({closureSearch.length})</span> : ""}</Accordion.Header>
                                <Accordion.Body>

                                    {closures ?
                                        closures.map((b) => (
                                            <Form.Group className="mb-1" controlId={b[1]} key={b[0]}>
                                                <Form.Check type="checkbox" inline key={b[0]} label={b[1]} name="closureSearch"
                                                    value={b[0]} checked={closureSearch.includes(b[0].toString())}
                                                    onChange={updateClosureSearch} />
                                            </Form.Group>
                                        ))
                                        : ""}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="6">
                                <Accordion.Header>Boot Cuttings {cuttingSearch.length !== 0 ? <span className="ms-1">({cuttingSearch.length})</span> : ""}</Accordion.Header>
                                <Accordion.Body>

                                    {cuttings ?
                                        cuttings.map((c) => (
                                            <Form.Group className="mb-1" controlId={c[1]} key={c[0]}>
                                                <Form.Check type="checkbox" inline key={c[0]} label={c[1]} name="cuttingSearch"
                                                    value={c[0]} checked={cuttingSearch.includes(c[0].toString())}
                                                    onChange={updateCuttingSearch} />
                                            </Form.Group>
                                        ))
                                        : ""}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="7">
                                <Accordion.Header>Recommended Positions {positionSearch.length !== 0 ? <span className="ms-1">({positionSearch.length})</span> : ""}</Accordion.Header>
                                <Accordion.Body>

                                    {positions ?
                                        positions.map((b) => (
                                            <Form.Group className="mb-1" controlId={b[1]} key={b[0]}>
                                                <Form.Check type="checkbox" inline key={b[0]} label={b[1]} name="positionSearch"
                                                    value={b[0]} checked={positionSearch.includes(b[0].toString())}
                                                    onChange={updatePositionSearch} />
                                            </Form.Group>
                                        ))
                                        : ""}

                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>

                        {/* <button className="btn btn-dark rounded-0 p-2 mt-3" onClick={search}>Search</button> */}

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