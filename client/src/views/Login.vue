!<template>
    <div>
        <p>Account: <input type="text" v-model="loginId">
        </p>
        <p>Password: <input type="password" v-model="loginPwd">
        </p>
        <p>Login: <button @click="handleClick">Log me IN</button>
        </p>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    data() {
        return {
            loginId: "",
            loginPwd: "",
        };
    },
    methods: {
        async handleClick() {
            const user = await this.$store.dispatch("loginUser/login", {
                loginId: this.loginId,
                loginPwd: this.loginPwd,
            });
            if (user) {
                alert("Login OK!");
                this.$router.push("/");
            }
            else {
                alert("Not good :(");
            }
        }
    }
};
</script>
