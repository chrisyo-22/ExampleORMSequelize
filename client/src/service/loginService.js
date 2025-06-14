
import request from "./request";

//1. When request, if there is token, attach to header
//2. When response comes in, if there is token, save the token(cookie or local storage)
//3. When response code is 403(no token, unauthorize, token expired), delete local token

function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration)
    })
}


export async function login(loginId, loginPwd) {
    await delay(2000);
    const res = await request().post("/api/admin/login", { loginId, loginPwd });
    return res.data
}

export async function logout() {
    await delay(2000);
    localStorage.removeItem("token");
}

export async function whoami() {
    await delay(2000);
    const resp = await request().get("/api/admin/whoami");
    return resp.data;
}


