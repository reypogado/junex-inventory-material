import MaterialTable from 'material-table'
import React, { useContext, useEffect, useState } from 'react'

import { tableIcons, tablePageSizeoptions } from '../../utils/utils'

//contexts
import { CategoryContext } from '../../context/CategoryContext'
import { ProductContext } from '../../context/ProductsContext'
import { SizeContext } from '../../context/SizeContext'

function Products(props) {

    const { products, productsLoading } = useContext(ProductContext)
    const { sizes } = useContext(SizeContext)
    const { categories } = useContext(CategoryContext)

    const sizeLookup = {}
    const categoryLookup = {}

    const [columns, setColumns] = useState([]);

    useEffect(() => {
        sizes.map(size => {
            sizeLookup[size.id] = size.name
        })
        console.log(sizeLookup);

        categories.map(category => {
            categoryLookup[category.id] = category.name
        })
        console.log(categoryLookup)

        setColumns([
            { title: "ID", field: "id", editable: "never" },
            { title: "Product Name", field: "name" },
            { title: "Size", field: "size", lookup: sizeLookup },
            { title: "Category", field: "category", lookup: categoryLookup },
            { title: "Price", field: "price" },
            { title: "Date Created", field: "created_at", editable: "never" },
          ]);

    }, [products])









    return (
        <MaterialTable
            isLoading={productsLoading}
            icons={tableIcons}
            options={tablePageSizeoptions}
            title="Products"
            columns={columns}
            data={products}
            editable={{
                onRowAdd: newData =>
                    new Promise(async (resolve, reject) => {
                        console.log(newData)
                        reject()
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        reject()
                    }),
                onRowDelete: (oldData) =>
                    new Promise(async (resolve, reject) => {
                        reject()
                    })
            }}
        />
    )
}

export default Products
