<template>
<div>
    <b-form @submit="onSubmit">
        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
            <b-form-input id="input-2" type="name" required placeholder="Enter name" v-model="form.name">
            </b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Email address:" label-for="input-1" description="We'll never share your email with anyone else.">
            <b-form-input id="input-1" type="email" required placeholder="Enter email" v-model="form.email">
            </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input id="input-2" type="password" required placeholder="Enter password" v-model="form.password">
            </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>

        </b-form>

</div>
</template>

<script>
export default {
    name: 'register',
    components: {

    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            },
            loggedIn: false
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
    },
    methods: {

        onSubmit(evt) {
            evt.preventDefault();

            let app = this;

            axios.post('/api/register', {
                    name: app.form.name,
                    email: app.form.email,
                    password: app.form.password

                })
                .then(function(response) {
                    localStorage.setItem('token', response.data.token)
                    app.loggedIn = true;
                    app.$emit('login');
                    app.$router.push('/courses')
                })
                .catch(function(error) {
                    console.log(error.response.data);
                });
        }
    }
}
</script>

<style>
</style>
