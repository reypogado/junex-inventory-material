import Axios from 'axios';
import * as Constants from "../utils/constants"
import { headers } from '../utils/utils';

export async function FetchProducts() {
    try {
        var res = await Axios({
            method: 'get',
            headers: headers(),
            url: Constants.BASE_URL + "/products/get_products.php",
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


