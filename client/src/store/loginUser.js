import * as loginServ from "../service/loginService";

export default {
    namespaced: true,
    state: {
        data: null,
        isLoading: false,
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
        setIsLoading(state, payload) {
            state.isLoading = payload;
        }
    },
    actions: {
        async login({ commit }, { loginId, loginPwd }) {
            commit("setIsLoading", true);
            const res = await loginServ.login(loginId, loginPwd);
            commit("setData", res.data);
            commit("setIsLoading", false);
            return res.data;

        },
        async loginout({ commit }) {
            commit("setData", null);
            loginServ.logout();
        },
        async whoami({ commit }) {
            commit("setIsLoading", true);
            try {
                const res = await loginServ.whoami()();
                commit("setData", res.data);
            }
            catch (err) {
                commit("setData", null);
            }

            commit("setIsLoading", false);
        }
    }
}