import React, { createContext, useState } from 'react';
import { AddSize, FetchSizes, UpdateSize } from '../api/sizes';

export const SizeContext = createContext();



function SizeContextProvider(props) {
    const [sizes, setSize] = useState([])
    const [sizeLoading, setSizeLoading] = useState(true)


    const fetchSizes = async () => {
        setSizeLoading(true)
        let data = await FetchSizes();
        setSizeLoading(false)
        if (data != null) {
            setSize(data)
        }
    }

    const addSizes = async (newData) => {
        setSizeLoading(true)
        let data = await AddSize(newData);
        setSizeLoading(false)
        if (data != null) {
            data.name = newData['name']
            console.log(data)
            setSize([...sizes, data])
        } else {
            alert('Something went wrong adding sizes. Make sure size name is unique')
        }
    }

    const updateSizes = async (oldData, newData) => {
        setSizeLoading(true)
        let data = await UpdateSize(newData);
        setSizeLoading(false)
        if (data != null) {
            var prevState = [...sizes];
            var index = prevState.indexOf(oldData)
            prevState[index] = newData
            setSize(prevState)
        } else {
            alert('Something went wrong updating size. Make sure size name is unique')
        }
    }



    return (
        <SizeContext.Provider value={{
            sizes, fetchSizes, addSizes,
            sizeLoading, updateSizes
        }}>
            {props.children}
        </SizeContext.Provider>
    )
}

export default SizeContextProvider
