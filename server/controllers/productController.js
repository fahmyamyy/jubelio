import DB from '../db/connection.js';
import { Response, countTime } from '../helpers/generalHelpers.js';

var response;

export const getProduct = () => {
    var start = new Date();
    const datas = DB.any(`SELECT * FROM public.products`)
        .then((result) => {
            response = new Response(200, "OK", countTime(start, new Date()), result.length, result)
            return response
        })
        .catch((err) => {
            throw err
        });

    return datas
}

export const getDetails = (id) => {
    var start = new Date();
    const datas = DB.any(`SELECT * FROM urls WHERE id = ${id}`)
        .then((result) => {
            response = new Response(200, "OK", countTime(start, new Date()), result.length, result)
            return response
        })
        .catch((err) => {
            throw err
        });
    return datas
}

export const createProduct = (param) => {
    DB.oneOrNone('INSERT INTO public.products (product_sku, product_name, product_image, product_price, product_description) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        [param.sku, param.name, param.image, param.price, param.description]
    ).then(() => {
        console.log('Product Created');
    }).catch(err => {
        console.log('ERROR:', err);
    });
}

export const updateProduct = (param) => {
    DB.oneOrNone('UPDATE public.products SET product_name=$1, product_price=$2, product_description=$3 WHERE product_sku=$4',
        [param.name, param.price, param.description, param.sku,]
    ).then(() => {
        console.log('Product Updated');
    }).catch(err => {
        console.log('ERROR:', err);
    });
}

export const deleteProduct = (param) => {
    DB.oneOrNone(`DELETE FROM public.products WHERE product_sku='${param}'`
    ).then(() => {
        console.log('Product Deleted');
    }).catch(err => {
        console.log('ERROR:', err);
    });
}