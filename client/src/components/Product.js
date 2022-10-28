import React from "react"
import Edit from './Edit'
import { separator } from "../helpers/generalHelpers"

export const Product = ({ product }) => {
    var img
    product.product_image === "" ? img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png' : img = product.product_image

    return (
        <div className="card mt-4">
            <Edit>asda</Edit>
            <div className="card-header text-center font-weight-bold">
                <div>[{product.product_sku}]</div>
                {/* <img className="border border-dark" src='https://id-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c07768157.png' style={{ width: '10%' }}></img> */}

                <img className="border border-dark" src={img.toString()} alt={product.product_image} style={{ width: '30%' }}></img>
            </div>
            <div className="row my-1">
                <div className="col text-center">
                    <div>{product.product_name}</div>
                    <div>Rp. {separator(product.product_price)}</div>
                    {/* <div>{product.product_description}</div> */}
                    {product.product_description}
                </div>
            </div>
        </div>
    )

}

export default Product