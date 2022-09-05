import { Fragment, useContext, useState, useEffect, useLayoutEffect } from "react";
import '../App.css';
import ProductsContext from '../contexts/ProductsContext';
import { Container, Card, Button, Placeholder, Offcanvas, Form, Accordion } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import CardPlaceholder from "../components/CardPlaceholer";
import ProductCard from "../components/ProductCard";


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

    const [globalSearch, setGlobalSearch] = useState('')
    const [brandSearch, setBrandSearch] = useState([])
    const [collectionSearch, setCollectionSearch] = useState([])
    const [materialSearch, setMaterialSearch] = useState([])
    const [colourSearch, setColourSearch] = useState([])
    const [surfaceSearch, setSurfaceSearch] = useState([])
    const [closureSearch, setClosureSearch] = useState([])
    const [cuttingSearch, setCuttingSearch] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [isFetched, setisFetched] = useState(false)

  
    // const params = useParams()
    const { brand_id } = useParams()

    //show products when page loaded
    useEffect(() => {
        initialBrandSearch(brand_id)
    }, [])
    //reset search when state changes 
    useEffect(() => {
        if( isFetched ){
           search();
        }
    }, [brandSearch, collectionSearch, materialSearch, colourSearch, surfaceSearch, closureSearch, cuttingSearch])

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

    const initialBrandSearch = (brand_id) => {
        if(brand_id === "1" || brand_id === "2" || brand_id === "3" ) {
            let brand = brandSearch.slice()
            brand.push(brand_id)
            setBrandSearch(brand)
            setisFetched(true)
        } else {
            setisFetched(true)
            search()
        }
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
    
    const clearFilters = () => {
        setGlobalSearch('');
        setBrandSearch([]);
        setCollectionSearch([]);
        setMaterialSearch([]);
        setColourSearch([]);
        setSurfaceSearch([]);
        setClosureSearch([]);
        setCuttingSearch([]);
    }

   
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


        const results = await context.search(searchQuery)


        setSearchResults(results)
    }




    if (searchResults) {
        return (
            <Fragment>
                 <div>
                        <img src="/images/bootroom.png" style={{width:"100%"}} className="mb-3"></img>
                    </div>
                <Container>
                   
                    <div className="row">
                        <div className="col-lg-9 d-flex">
                            <input id='globalSearch' name='globalSearch' type="text" className='form-control rounded-0 mb-3' style={{ width: "80%" }}
                                value={globalSearch} onChange={(e) => { updateGlobalSearch(e.target.value) }}
                                onKeyUp={(e) => { enterSearch(e) }} />
                            <Button variant="dark rounded-0" onClick={search} className=" mb-3 " style={{ width: "20%" }}> Search
                            </Button>
                        </div>
                        <div className="col-lg-3">
                            <Button variant="dark rounded-0 mb-3" onClick={toggleShow} style={{ width: '100%' }}>
                                Filters
                            </Button>
                        </div>
                    </div>
                    {brands ?

                        <ProductCard products={searchResults} />
                        : 
                        
                        <CardPlaceholder />
 
                        }
                        
                    <div style={{ height: "50px" }}></div>
                </Container>

                <Offcanvas show={show} onHide={handleClose} {...props}
                    scroll={true} backdrop={true} placement={'end'}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Filter <span className="resetFilters" onClick={clearFilters}>Clear All</span></Offcanvas.Title>
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

                                    {colours ?
                                        colours.map((c) => (
                                            <span className="me-3" key={c[0]}>
                                                <input type="checkbox" key={c[1]} name="colourSearch" id={c[1]} className="colourCheckbox"
                                                    value={c[0]} checked={colourSearch.includes(c[0].toString())} onChange={updateColourSearch} />
                                                <label htmlFor={c[1]} key={c[0]} >
                                                    <span className={colourSearch.includes(c[0].toString()) ? 'colourBox' : 'colourBox uncheckColour'}
                                                        style={{ backgroundColor: c[1] }}></span>
                                                </label>
                                            </span>
                                        ))
                                        : ""}

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

                        </Accordion>

                    </Offcanvas.Body>
                </Offcanvas>
            </Fragment>
        )
    }
}