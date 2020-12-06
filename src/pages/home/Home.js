import React, { useContext, useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import MainDrawer from '../../components/MainDrawer'
import { CategoryContext } from '../../context/CategoryContext'
import { ProductContext } from '../../context/ProductsContext'
import { SizeContext } from '../../context/SizeContext'
import { headers } from '../../utils/utils'
import Categories from '../categories/Categories'
import Dashboard from '../dashboard/Dashboard'
import NewEntry from '../entries/NewEntry'
import Products from '../products/Products'
import Reports from '../reports/Reports'
import Sizes from '../sizes/Sizes'

function Home(props) {
    var history = useHistory();

    const { window, location } = props;
    const { pathname } = props.location;
    var prevData;

    const { isLogin, setLogin } = useState(false)

    const { fetchCategories } = useContext(CategoryContext)
    const { fetchSizes } = useContext(SizeContext)
    const { fetchProducts } = useContext(ProductContext)


    useEffect(() => {
        Promise.all([fetchCategories(), fetchSizes()]).then((values) => {
            fetchProducts()
        });
    }, [])

    if (!localStorage.getItem('userData')) {
        return (
            <button onClick={() => history.replace('/')}>
                Please Login to continue
            </button>
        )
    } else {
        return (
            <MainDrawer pathName={pathname} >
                <Switch>
                    <Route path="/home" exact component={Dashboard} />
                    <Route path="/home/Categories" component={Categories} />
                    <Route path="/home/Sizes" component={Sizes} />
                    <Route path="/home/Products" component={Products} />
                    <Route path="/home/Entries" component={NewEntry} />
                    <Route path="/home/Reports" component={Reports} />
                    {/* <Route path="/home/Grocery" component={Grocery} /> */}
                </Switch>
            </MainDrawer>

        )
    }


}

export default Home
