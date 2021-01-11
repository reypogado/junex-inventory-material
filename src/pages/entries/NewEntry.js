import React, { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ProductContext } from '../../context/ProductsContext';
import MaterialTable from 'material-table';
import { tableIcons, tablePageSizeoptions } from '../../utils/utils';
import { EntryContext } from '../../context/Entries';

function NewEntry() {
    const { products, productsLoading } = useContext(ProductContext)
    const { localEntries, saveLocalEntry, removeLocalEntry, getLocalEntries } = useContext(EntryContext)

    const [qtyDialogOpen, setQtyDialogOpen] = React.useState(false);
    const [qty, setQty] = React.useState()
    const [autoCompleteValue, setAutoCompleteValue] = React.useState('')
    const [autoCompleteKey, setAutoCompleteKey] = React.useState(Date.now())

    const [selectedIndex, setSelectedIndex] = React.useState([])

    const [productsData, setProductsData] = React.useState([])

    const [columns, setColumns] = React.useState([])

    useEffect(() => {
        const productsDataHolder = []
        products.map((data, index) => {
            // console.log(data);
            productsDataHolder.push({
                id: data['id'],
                name: data['name'],
                size: data['Size_name'],
                category: data['Category_name'],
                size_id: data['size'],
                category_id: data['category']
            });

        });
        setProductsData(productsDataHolder);

        setColumns([
            { title: "Product Name", field: "name", },
            { title: "Category", field: "category", },
            { title: "Size", field: 'size', },
            { title: "Quantity", field: "qty" }
            // { title: "Date Created", field: "created_at", editable: "never" },
        ]);

        console.log('test')
        getLocalEntries()

    }, [products])


    const handleAddEntry = () => {
        const productData = productsData[selectedIndex]
        productData['qty'] = qty
        saveLocalEntry(productData)
        closeDialog()
    }

    const handleQtyChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setQty(parseInt(e.target.value))
        }
    }

    const closeDialog = () => {
        setAutoCompleteValue('')
        setAutoCompleteKey(Date.now())
        setQtyDialogOpen(false)
        setQty()

    }

    const classes = useStyles();
    return (
        <div>
            <div style={{display:'flex',alignItems:'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Autocomplete
                    key={autoCompleteKey}
                    options={productsData}
                    getOptionLabel={(option) => `${option.id} ${option.name} (${option.category}, ${option.size})`}
                    style={{ width: 300 }}
                    autoHighlight
                    clearOnBlur
                    // value={autoCompleteValue}
                    inputValue={autoCompleteValue}
                    margin="normal"
                    className={classes.entrySelection}
                    onChange={(event, newValue) => {
                        if (newValue != null) {
                            setQtyDialogOpen(true)
                            console.log(qtyDialogOpen)
                            let index = productsData.findIndex(productData => productData.id === newValue.id);
                            setAutoCompleteValue(`${newValue.id} ${newValue.name} (${newValue.category}, ${newValue.size})`)
                            setSelectedIndex(index)
                        }
                    }}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Select Product"
                        variant="outlined"
                        onChange={(event) => {
                            setAutoCompleteValue(event.target.value)
                        }}
                    />}
                />

                <Button variant="contained" color="primary"  size="large" disabled={localEntries.length == 0}>
                    Submit Entries
                </Button>
            </div>

            <MaterialTable
                // isLoading={productsLoading}
                icons={tableIcons}
                options={tablePageSizeoptions}
                title="Entries"
                columns={columns}
                data={localEntries}
                editable={{
                    onRowDelete: (oldData) =>
                        new Promise(async (resolve, reject) => {
                            removeLocalEntry(oldData)
                            resolve()
                        })
                }}
            />


            {/* Input Quantity Dialog */}
            <Dialog open={qtyDialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter Quantity</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Enter Quantity.
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={qty}
                        onChange={handleQtyChange}
                        type="tel"
                        label="Quantity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEntry} color="primary" disabled={qty ? false : true}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    entrySelection: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default NewEntry
