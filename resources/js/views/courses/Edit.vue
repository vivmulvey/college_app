<template>
<b-row align-h="center">
    <b-col cols="8">
        <h3 v-if="!loggedIn">You are not logged in!!</h3>
        <b-card border-variant="info" title="Edit Course" tag="article">

            <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Title:" label-for="input-1">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="blank"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-1" v-model="course.title" type="text" required placeholder="Enter title"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-2" label="Code:" label-for="input-2">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="blank"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-2" v-model="course.code" type="text" required placeholder="Enter code"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-3" label="Description:" label-for="input-3">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="blank"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-3" v-model="course.description" type="text" required placeholder="Enter description"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-5" label="Level:" label-for="input-5">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="list"></b-icon>
                        </b-input-group-prepend>
                        <b-form-select name='level' v-model='course.level' class='form-control'>
                            <b-form-select-option value="6">6</b-form-select-option>
                            <b-form-select-option value="7">7</b-form-select-option>
                            <b-form-select-option value="8">8</b-form-select-option>
                        </b-form-select>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-4" label="Points:" label-for="input-4">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="blank"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-4" v-model="course.points" type="number" required placeholder="Enter points"></b-form-input>
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
            course: {},
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
        axios.get(`/api/courses/${app.$route.params.id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
                app.course = response.data.data;
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
            axios.put(`/api/courses/${app.$route.params.id}`, {
                    title: app.course.title,
                    code: app.course.code,
                    description: app.course.description,
                    points: app.course.points,
                    level: app.course.level,
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    app.$router.push('/courses');
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
}
</script>
