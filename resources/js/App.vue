<template>
<div>
    <MyNavbar :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
    <b-container>
        <transition name="slide" mode="out-in">
            <router-view :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
        </transition>
    </b-container>

</div>
</template>
<script>
import MyNavbar from './components/MyNavbar'

export default {
    name: 'app',
    components: {
        MyNavbar
    },
    data() {
        return {
            loggedIn: false

        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.loggedIn = true;
            console.log("APP: ", this.loggedIn);
        } else {
            this.loggedIn = false;
        }
    },
    methods: {
        setLoggedIn() {
            this.loggedIn = true;
        },
        setLoggedOut() {
            this.loggedIn = false;
        }
    }
}
</script>
<style>
.container {
    height: 100%;
}


.slide-enter-active,
.slide-leave-active {
    transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-30%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
