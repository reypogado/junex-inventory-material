import React, { createContext, useState } from 'react';
import { FetchCategories, AddCategory, UpdateCategory } from '../api/categories';

export const CategoryContext = createContext();



function CategoryContextProvider(props) {
    const [categories, setCategory] = useState([])
    const [categoryLoading, setCategoryLoading] = useState(true)


    const fetchCategories = async () => {
        setCategoryLoading(true)
        let data = await FetchCategories();
        setCategoryLoading(false)
        if (data != null) {
            setCategory(data)
        }
    }

    const addCategories = async (newData) => {
        setCategoryLoading(true)
        let data = await AddCategory(newData);
        setCategoryLoading(false)
        if (data != null) {
            data.name = newData['name']
            console.log(data)
            setCategory([...categories, data])
        } else {
            alert('Something went wrong adding category. Make sure category name is unique')
        }
    }

    const updateCategories = async (oldData, newData) => {
        setCategoryLoading(true)
        let data = await UpdateCategory(newData);
        setCategoryLoading(false)
        if (data != null) {
            var prevState = [...categories];
            var index = prevState.indexOf(oldData)
            prevState[index] = newData
            setCategory(prevState)
        } else {
            alert('Something went wrong updating category. Make sure category name is unique')
        }
    }

    const addCategoryData = async (data) => {
        setCategory(data)
    }

    return (
        <CategoryContext.Provider value={{
            categories, fetchCategories, addCategories,
            categoryLoading, updateCategories
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider
