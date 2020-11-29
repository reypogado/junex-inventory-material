import Axios from 'axios';
import * as Constants from "../utils/constants"
import { headers } from '../utils/utils';

export async function FetchCategories(code) {
    try {
        var res = await Axios({
            method: 'get',
            headers: headers(),
            url: Constants.BASE_URL + "/categories/get_categories.php",
            validateStatus: () => true,
        });

        console.log(res)
        if (!res.data['error']) {
            return res.data['data'];
        } else {
            return null;
        }
        // return response.data
        // alert(res);
    } catch (error) {
        // console.log(res);
        return null;
    }
}

export async function AddCategory(data) {
    try {
        var res = await Axios({
            method: 'post',
            headers: headers(),
            url: Constants.BASE_URL + "/categories/add_category.php",
            validateStatus: () => true,
            data: {
                category_name: data['name']
            }
        });
        console.log(res)
        if (!res.data['error']) {
            return { "id": res.data['id'], "created_at": res.data['date'] };
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}


export async function UpdateCategory(data) {
    try {
        var res = await Axios({
            method: 'post',
            headers: headers(),
            url: Constants.BASE_URL + "/categories/update_category.php",
            validateStatus: () => true,
            data: {
                category_id: data['id'],
                category_name: data['name']
            }
        });
        console.log(res)
        if (!res.data['error']) {
            return true
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
