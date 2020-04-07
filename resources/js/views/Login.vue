<template>
<div>
    <div class="card text-center">
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <a class="nav-link active" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/register">Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/login">Login</a>
                </li>
            </ul>
        </div>

        <div class="card-body">
            <h4 class="card-title">-Login-</h4>
            <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Email Address:" label-for="input-1" description="We'll never share your email with anyone else.">
                  <b-input-group>
                    <b-input-group-prepend is-text>
                      <b-icon icon="envelope"></b-icon>
                  </b-input-group-prepend>
                    <b-form-input id="input-1" type="email" required placeholder="Enter email" v-model="form.email">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                  <b-input-group>
                    <b-input-group-prepend is-text>
                      <b-icon icon="eye-slash-fill"></b-icon>
                  </b-input-group-prepend>
                    <b-form-input id="input-2" type="password" required placeholder="Enter password" v-model="form.password">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>

                <b-button type="submit" variant="outline-info">Submit</b-button>
            </b-form>

        </div>
    </div>


</div>
</template>
<script>
export default {
    name: 'login',
    components: {

    },
    data() {
        return {
            form: {
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

            axios.post('/api/login', {
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
.card-title{
  font-weight: bold;
}
</style>
