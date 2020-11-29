import MaterialTable from 'material-table'
import React, { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../../context/CategoryContext'
import { tableIcons, tablePageSizeoptions } from '../../utils/utils'

function Categories(props) {

    const [columns, setColumns] = useState([
        { title: 'ID', field: 'id', editable: 'never' },
        { title: 'Category Name', field: 'name' },
        { title: 'Date Created', field: 'created_at', editable: 'never' },
    ])


    const {fetchCategories, categories, addCategories, updateCategories, categoryLoading } = useContext(CategoryContext)


    return (
        <MaterialTable
            isLoading={categoryLoading}
            icons={tableIcons}
            options={tablePageSizeoptions}
            title="Product Categories"
            columns={columns}
            data={categories}
            editable={{
                onRowAdd: newData =>
                    new Promise(async (resolve, reject) => {
                        console.log(newData)
                        await addCategories(newData)
                        resolve();
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        await updateCategories(oldData, newData)
                        resolve();
                    }),
                onRowDelete: (oldData) =>
                    new Promise(async (resolve, reject) => {
                        reject()
                    })
            }}
        />
    )
}

export default Categories
