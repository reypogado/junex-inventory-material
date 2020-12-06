import MaterialTable from 'material-table'
import React, { useContext, useEffect, useState } from 'react'
import { SizeContext } from '../../context/SizeContext'
import { tableIcons, tablePageSizeoptions } from '../../utils/utils'

function Sizes(props) {

    const [columns, setColumns] = useState([
        { title: 'ID', field: 'id', editable: 'never' },
        { title: 'Size Name', field: 'name' },
        { title: 'Date Created', field: 'created_at', editable: 'never' },
    ])


    const {fetchSizes, sizes, addSizes, updateSizes, sizeLoading } = useContext(SizeContext)


    return (
        <MaterialTable
            isLoading={sizeLoading}
            icons={tableIcons}
            options={tablePageSizeoptions}
            title="Product Sizes"
            columns={columns}
            data={sizes}
            editable={{
                onRowAdd: newData =>
                    new Promise(async (resolve, reject) => {
                        console.log(newData)
                        await addSizes(newData)
                        resolve();
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        await updateSizes(oldData, newData)
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

export default Sizes
