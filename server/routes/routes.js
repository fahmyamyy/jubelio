import { getProduct, createProduct } from "../controllers/productController.js";

const path = '/api/product'

export const getRoutes = () => {
    const res = {
        method: 'GET',
        path: path,
        handler: (req, h) => {
            return getProduct()
        }
    }
    return res
}

export const getDetails = () => {
    const res = {
        method: 'POST',
        path: path + '/{id}',
        handler: (req, h) => {
            const id = req.params.id
            return getDetails(id)
        }
    }
    return res
}

export const createRoutes = () => {
    const res = {
        method: 'POST',
        path: path,
        handler: (req, h) => {
            return createProduct(req.payload)
        }
    }
    return res
}