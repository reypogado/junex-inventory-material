import React from 'react'
import AuthContextProvider from './AuthContext'
import CategoryContextProvider from './CategoryContext'
import EntryContextProvider from './Entries'
import ProductContextProvider from './ProductsContext'
import SizeContextProvider from './SizeContext'

function Contexts(props) {
    return (
        <AuthContextProvider>
            <CategoryContextProvider>
                <SizeContextProvider>
                    <ProductContextProvider>
                        <EntryContextProvider>
                            {props.children}
                        </EntryContextProvider>
                    </ProductContextProvider>
                </SizeContextProvider>
            </CategoryContextProvider>
        </AuthContextProvider>
    )
}

export default Contexts
