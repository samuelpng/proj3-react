import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
    return (
        <div className='row'>
            {props.products.map(p => {
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
    )
}