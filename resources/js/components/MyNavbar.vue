<template>
<div>

    <b-navbar toggleable="sm" type="dark" variant="dark">
        <a class="navbar-brand" href="#">
            EduCo
        </a>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav v-if="loggedIn">
            <b-nav-item to="/courses">Courses</b-nav-item>
            <b-nav-item to="/lecturers">Lecturers</b-nav-item>
            <b-nav-item to="/enrolments">Enrolments</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto" v-if="loggedIn">
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>My Account</em>
                    </template>
                    <b-dropdown-item @click="logout"><b-icon-power></b-icon-power>Log Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>
<script>
export default {
    name: "myNavbar",
    props: {
        loggedIn: Boolean
    },
    methods: {
        logout() {
            let app = this;
            let token = localStorage.getItem('token')
            console.log(token);
            axios.get(`api/logout`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    console.log(response.data);
                    app.$router.push('/');
                })
                .catch(function(error) {
                    console.log(error);
                });
            console.log("user logged out")
            localStorage.removeItem("token");
            this.$emit('logout');
        }
    }
};
</script>
<style>
.navbar {
    margin-bottom: 40px;
}
</style>
