import Axios from 'axios';
import * as Constants from "../utils/constants"
import { headers } from '../utils/utils';

export async function FetchSizes(code) {
    try {
        var res = await Axios({
            method: 'get',
            headers: headers(),
            url: Constants.BASE_URL + "/sizes/get_sizes.php",
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

export async function AddSize(data) {
    try {
        var res = await Axios({
            method: 'post',
            headers: headers(),
            url: Constants.BASE_URL + "/sizes/add_size.php",
            validateStatus: () => true,
            data: {
                size_name: data['name']
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


export async function UpdateSize(data) {
    try {
        var res = await Axios({
            method: 'post',
            headers: headers(),
            url: Constants.BASE_URL + "/sizes/update_size.php",
            validateStatus: () => true,
            data: {
                size_id: data['id'],
                size_name: data['name']
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
