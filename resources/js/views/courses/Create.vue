<template>
<b-row align-h="center">
    <b-col cols="8">

        <b-card border-variant="info" title="Add Course" tag="article">
            <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Title:" label-for="input-1">
                  <b-input-group>
                      <b-input-group-prepend is-text>
                          <b-icon icon="blank"></b-icon>
                      </b-input-group-prepend>
                    <b-form-input id="input-1" type="text" required placeholder="Enter title" v-model="form.title">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-2" label="Code:" label-for="input-2">
                  <b-input-group>
                      <b-input-group-prepend is-text>
                          <b-icon icon="blank"></b-icon>
                      </b-input-group-prepend>
                    <b-form-input id="input-2" type="text" required placeholder="Enter code" v-model="form.code">
                    </b-form-input>
                    <b-form-invalid-feedback :state="codeValid">
                        The code may not be greater than 5 characters.
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="codeValid">
                        Looks Good.
                    </b-form-valid-feedback>
                  </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-3" label="Description:" label-for="input-3">
                  <b-input-group>
                      <b-input-group-prepend is-text>
                          <b-icon icon="blank"></b-icon>
                      </b-input-group-prepend>
                    <b-form-input id="input-3" type="text" required placeholder="Enter description" v-model="form.description">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-4" label="Level:" label-for="input-4">
                  <b-input-group>
                      <b-input-group-prepend is-text>
                          <b-icon icon="list"></b-icon>
                      </b-input-group-prepend>
                    <b-form-select name='level' v-model='form.level' class='form-control'>
                        <b-form-select-option value="6">6</b-form-select-option>
                        <b-form-select-option value="7">7</b-form-select-option>
                        <b-form-select-option value="8">8</b-form-select-option>
                    </b-form-select>
                  </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-5" label="Points:" label-for="input-5">
                  <b-input-group>
                      <b-input-group-prepend is-text>
                          <b-icon icon="blank"></b-icon>
                      </b-input-group-prepend>
                    <b-form-input id="input-5" type="number" required placeholder="Enter Points" v-model="form.points">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>

                <b-row align-h="between">
                    <b-col cols="2">
                        <router-link to="/courses">
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
                title: '',
                code: '',
                description: '',
                points: '',
                level: ''
            },
            loggedIn: false,
            errors: []
        }
    },
    computed: {
        codeValid() {
            return this.form.code.length <= 5 && this.form.code.length > 0
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

            axios.post('/api/courses', {
                    title: app.form.title,
                    code: app.form.code,
                    description: app.form.description,
                    points: app.form.points,
                    level: app.form.level
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(function(response) {
                    app.$router.push('/courses');
                })
                .catch(function(error) {
                    console.log(error.response.data);

                    app.errors = error.response.data.errors
                });

        }
    }
}
</script>
