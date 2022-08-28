import { Fragment, useContext, useState, useEffect } from "react";
import '../App.css';
import ProductsContext from '../contexts/ProductsContext';
import { Container, Card, Button, Placeholder } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


export default function ProductsListing(props) {
    const context = useContext(ProductsContext);
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const enterSearch = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }

    const updateSearchQuery = (q) => {
        setSearchQuery(q)
    }

    const search = async () => {
        let searchParams = {}
        if (searchQuery) {
            searchParams.name = searchQuery
        }

        console.log(searchParams)

        const results = await context.search(searchParams)

        setSearchResults(results)
    }



    return (
        <Fragment>
            <Container>
                <h1>Football Boots</h1>
                <input id='searchQuery' name='searchQuery' type="text" className='form-control mb-3' 
                value={searchQuery} onChange={(e)=>{updateSearchQuery(e.target.value)}} 
                onKeyUp={(e)=>{enterSearch(e)}}/>

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
        </Fragment>
    )

}