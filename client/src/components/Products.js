import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './Product';

export const productDatas = async () => {
    try {
        return await axios.get("http://localhost:5000/api/product");
    } catch (error) {
        console.log('Error while calling deletePet API ', error)
    }
}

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        let response = await productDatas();
        setProducts(response.data.data);
    };

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gap: "20px",
            padding: "20px"
        }}>
            {products.map((product) => (
                <Product product={product} key={product.product_sku} />
            ))}
        </div>
    );
};

export default Products;