import { getProduct, getDetails, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

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

export const detailRoutes = () => {
    const res = {
        method: 'POST',
        path: path + '/{sku}',
        handler: (req, h) => {
            const id = req.params.sku
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

export const updateRoutes = () => {
    const res = {
        method: 'POST',
        path: path + '/{sku}',
        handler: (req, h) => {
            return updateProduct(req.payload)
        }
    }
    return res
}

export const deleteRoutes = () => {
    const res = {
        method: 'POST',
        path: path + '/{sku}',
        handler: (req, h) => {
            return deleteProduct(req.payload)
        }
    }
    return res
}