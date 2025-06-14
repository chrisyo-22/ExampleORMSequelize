//1. When request, if there is token, attach to header

//3. When response code is 403(no token, unauthorize, token expired), delete local token

import axios from "axios";

export default function () {
    const token = localStorage.getItem("token");
    let instance = axios;
    if (token) {
        instance = axios.create({
            headers: {
                authorization: "bearer " + token
            },
        });
    }

    // instance.interceptors.request.use()

    instance.interceptors.response.use(response => {
        //2. When response comes in, if there is token, 
        // save the token(cookie or local storage)
        if (response.headers.authorization) {
            localStorage.setItem("token", response.headers.authorization)
        }
        return response;
    },
        (err) => {
            if (err.response.status === 403) {
                localStorage.removeItem("token");
            }
            return Promise.reject(err);
        })
    return instance;
}