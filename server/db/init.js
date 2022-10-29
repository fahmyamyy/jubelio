import xmlJs from 'xml-js';
import axios from 'axios';
import DB from '../db/connection.js';
import { createProduct } from '../controllers/productController.js';

async function fetchApi(url) {
    const config = {
        method: 'GET',
        url: url,
        headers: {
            'openapikey': '721407f393e84a28593374cc2b347a98'
        }
    };
    return axios(config)
        .then((response) => JSON.parse(xmlJs.xml2json(response.data, { compact: true, spaces: 4 }))
        )
        .catch((err) => {
            throw err
        })
}

export const migrate = () => {
    DB.any(`SELECT EXISTS(
                SELECT * 
                FROM information_schema.tables 
                WHERE 
                    table_name = 'products')`
    ).then((res) => {
        res[0]['exists'] ? console.log('Products Table Ready') : initialFetch()
    }).catch((err) => {
        throw err
    });
}

export const initialFetch = async () => {
    DB.any(`CREATE TABLE public.products (
        product_sku varchar NULL,
        product_name varchar NULL,
        product_image varchar NULL,
        product_price int NULL,
        product_description varchar NOT NULL,
        CONSTRAINT products_pk PRIMARY KEY (product_sku))`)
        .then(async () => {
            var temp, img, desc;
            var sku = []

            const datas = await fetchApi('http://api.elevenia.co.id/rest/prodservices/product/listing')
            const product = datas['Products']['product']

            Object.keys(product).forEach(async key => {
                var productNumber = product[key].prdNo['_text']

                temp = await fetchApi(`http://api.elevenia.co.id/rest/prodservices/product/details/${productNumber}`)

                temp['Product'].hasOwnProperty('prdImage01') ? img = temp['Product']['prdImage01']['_text'] : img = ''
                temp['Product'].hasOwnProperty('htmlDetail') ? desc = temp['Product']['htmlDetail']['_text'] : desc = ''

                if (!sku.includes(product[key].sellerPrdCd['_text'])) {
                    sku.push(product[key].sellerPrdCd['_text'])

                    var productTemp = {
                        'sku': product[key].sellerPrdCd['_text'],
                        'name': product[key].prdNm['_text'],
                        'price': product[key].selPrc['_text'],
                        'image': img,
                        'description': desc
                    }
                    createProduct(productTemp)
                }
            });
        })
        .catch((err) => {
            throw err
        });
}

export default migrate