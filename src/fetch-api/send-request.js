import * as fetchConstants from "../constants/fetch-api.constants"
import { getLocalStorage } from "../handle-local-storage"
function connnectAPI(method, path, data) {
    const accessToken = getLocalStorage('user')?.data?.accessToken
    let config = {}
    if (method == fetchConstants.HTTP_GET || method == fetchConstants.HTTP_DELETE) {
        config = {
            method,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        }
    } else {
    config = {
        method: method,
        headers: {
            ...fetchConstants.HEADERS,
            'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify(data)
    }
    }
    return new Promise((reslove, reject) => {
        const domain = fetchConstants.DOMAIN + path
        fetch(domain, config)
            .then(res => reslove(res.json()))
            .catch(err => reject(err))
    })
}
export default connnectAPI