import React, { createContext, useState } from 'react';
import { FetchProducts } from '../api/products';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [products, setProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState([])

    const fetchProducts = async () => {
        setProductsLoading(true)
        let data = await FetchProducts();
        setProductsLoading(false)
        if (data != null) {
            setProducts(data)
        }
    }


    return (
        <ProductContext.Provider value={{
            products, productsLoading, fetchProducts
        }}>
            {props.children}

        </ProductContext.Provider>
    )
}


export default ProductContextProvider;