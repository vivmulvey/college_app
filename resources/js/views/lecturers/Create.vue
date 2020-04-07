<template>
<b-row align-h="center">
    <b-col cols="8">

        <b-card border-variant="info" title="Add Lecturer" tag="article">
            <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Name:" label-for="input-1">
                  <b-input-group>
                      <b-input-group-prepend is-text>
                          <b-icon icon="person"></b-icon>
                      </b-input-group-prepend>
                    <b-form-input id="input-1" type="text" required placeholder="Enter Name" v-model="form.name">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-2" label="Address:" label-for="input-2">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="house"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-2" type="text" required placeholder="Enter Address" v-model="form.address">
                        </b-form-input>
                      </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-3" label="Email:" label-for="input-3" class="mb-2">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="envelope"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-3" type="email" required placeholder="Enter Email" v-model="form.email">
                        </b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-4" label="phone:" label-for="input-4">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="phone"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-4" type="text" required placeholder="Enter phone" v-model="form.phone">
                        </b-form-input>
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
            form: {
                name: '',
                address: '',
                email: '',
                phone: ''
            },
            loggedIn: false,
            errors: []
        }
    },


    created() {
        if (localStorage.getItem('token')) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
            this.$router.push('/');
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            let app = this;
            let token = localStorage.getItem('token');

            axios.post('/api/lecturers', {
                    name: app.form.name,
                    address: app.form.address,
                    email: app.form.email,
                    phone: app.form.phone

                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(function(response) {
                    app.$router.push('/lecturers');
                })
                .catch(function(error) {
                    console.log(error.response.data);

                    app.errors = error.response.data.errors
                });

        }

    }
}
</script>
