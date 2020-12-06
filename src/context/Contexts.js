import React from 'react'
import AuthContextProvider from './AuthContext'
import CategoryContextProvider from './CategoryContext'
import ProductContextProvider from './ProductsContext'
import SizeContextProvider from './SizeContext'

function Contexts(props) {
    return (
        <AuthContextProvider>
            <CategoryContextProvider>
                <SizeContextProvider>
                    <ProductContextProvider>
                        {props.children}
                    </ProductContextProvider>
                </SizeContextProvider>
            </CategoryContextProvider>
        </AuthContextProvider>
    )
}

export default Contexts
