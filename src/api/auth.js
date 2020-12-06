import Axios from 'axios';
import * as Constants from "../utils/constants"
import { headers } from "../utils/utils"

export async function UserLogin(code) {
    try {
        var res = await Axios({
            method: 'post',
            url: Constants.BASE_URL + "/auth/login.php",
            validateStatus: () => true,
            data: {
                code: code
            }
        });

        if (!res.data['error']) {
            return res.data;
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


export async function UserRegister(data) {
    try {
        var res = await Axios({
            method: 'post',
            url: Constants.BASE_URL + "/auth/register.php",
            validateStatus: () => true,
            data: {
                full_name: data['fullname'],
                position: data['position'],
                access_type: data['accessType']
            }
        });
        console.log('res')
        if (!res.data['error']) {
            return res.data;
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