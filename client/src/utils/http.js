import axios from 'axios';


export default function AxiosInstanceCreator() {
    let instance = axios.create({
        baseURL: `http://localhost:30000/api`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers':
                'Origin, Content-Type, X-Auth-Token, Authorization'
        }
    });

    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    function select() {
        const userData = localStorage.getItem("token");
        return userData;
    }

    let currentValue = select();
    if (
        currentValue !== null &&
        currentValue !== undefined &&
        currentValue !== ''
    ) {
        instance.defaults.headers = {
            authorization: 'Bearer ' + currentValue
        };
    } else {
        instance.defaults.headers = {
            authorization: ''
        };
    }

    return instance;
}
