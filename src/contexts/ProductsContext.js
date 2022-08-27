
import {createContext} from 'react';

const ProductsContext = createContext({

});

export default ProductsContext;

// export const ProductsProvider = ({ children }) => {

//     BASE_API_URL = "https://kicks-city.herokuapp.com/api"

//     const [products, setProducts] = useState([])

//     useEffect(() => {
//         getProducts()
//     }, [])

//     const getProducts = async () => {
//         try {
//             const response = await axios.get('/products', products)
//        } catch (error) {
//             console.log(error)
//         }
//     }
// }