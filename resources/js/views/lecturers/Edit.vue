<template>
<b-row align-h="center">
    <b-col cols="8">
        <h3 v-if="!loggedIn">You are not logged in!!</h3>
        <b-card border-variant="info" title="Edit Lecturer" tag="article">

            <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Name:" label-for="input-1">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="person"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-1" v-model="lecturer.name" type="text" required placeholder="Enter Name"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-2" label="Address:" label-for="input-2">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="house"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-2" v-model="lecturer.address" type="text" required placeholder="Enter address"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-3" label="Email:" label-for="input-3">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="envelope"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-3" v-model="lecturer.email" type="text" required placeholder="Enter Email"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-4" label="Phone:" label-for="input-4">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="phone"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-4" v-model="lecturer.phone" type="text" required placeholder="Enter Phone Number"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-row align-h="between">
                    <b-col cols="2">
                        <router-link to="/lecturers">
                            <b-icon-box-arrow-left font-scale="3"></b-icon-box-arrow-left>
                        </router-link>
                    </b-col>
                    <b-col cols="2">
                        <b-button type="submit" variant="outline-info">Submit</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-card>
    </b-col>
</b-row>
</template>


<script>
export default {
    data() {
        return {
            lecturer: {},
            show: true,
            loggedIn: false
        }
    },
    created() {
        // console.log(localStorage.getItem('token'));
        if (localStorage.getItem('token')) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }

        let app = this;
        let token = localStorage.getItem('token');
        axios.get(`/api/lecturers/${app.$route.params.id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
                app.lecturer = response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });

    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            let app = this;
            let token = localStorage.getItem('token');
            axios.put(`/api/lecturers/${app.$route.params.id}`, {
                    name: app.lecturer.name,
                    address: app.lecturer.address,
                    email: app.lecturer.email,
                    phone: app.lecturer.phone,

                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    app.$router.push('/lecturers');
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
}
</script>
