<template>
<b-row align-h="center">
    <b-col cols="8">
        <h3 v-if="!loggedIn">You are not logged in!!</h3>
        <b-card border-variant="info" v-else title="Edit Enrolment" tag="article">

            <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Date:" label-for="input-1">
                    <b-form-datepicker id="input-1" v-model="enrolment.date" type="date" required placeholder="Enter date">
                        </b-form-input>
                    </b-form-datepicker>
                </b-form-group>

                <b-form-group id="input-group-2" label="Time:" label-for="input-2">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="clock"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="input-2" v-model="enrolment.time" type="time" required placeholder="Enter time"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-3" label="Status:" label-for="input-3">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="list"></b-icon>
                        </b-input-group-prepend>

                        <b-form-select name='status' v-model='enrolment.status' class='form-control'>

                            <b-form-select-option value="interested">Interested</b-form-select-option>
                            <b-form-select-option value="assigned">Assigned</b-form-select-option>
                            <b-form-select-option value="career-break">Career-break</b-form-select-option>
                            <b-form-select-option value="associate">Associate</b-form-select-option>

                        </b-form-select>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-4" label="Course:" label-for="input-4">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="list"></b-icon>
                        </b-input-group-prepend>
                        <b-form-select name='course' v-model='enrolment.course_id' class='form-control'>
                            <option v-for="course in courses" v-bind:value='course.id'>
                                {{course.title}}
                            </option>
                        </b-form-select>
                    </b-input-group>
                </b-form-group>

                <b-form-group id="input-group-5" label="Lecturer:" label-for="input-5">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="list"></b-icon>
                        </b-input-group-prepend>
                        <b-form-select name='lecturer' v-model='enrolment.lecturer_id' class='form-control'>
                            <option v-for="lecturer in lecturers" v-bind:value='lecturer.id'>
                                {{lecturer.name}}
                            </option>
                        </b-form-select>
                    </b-input-group>
                </b-form-group>

                <b-row align-h="between">
                    <b-col cols="2">
                        <router-link to="/enrolments">
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
            enrolment: {},
            show: true,
            loggedIn: false,
            errors: [],
            courses: [],
            lecturers: []
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
        axios.get(`/api/enrolments/${app.$route.params.id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
                app.enrolment = response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
        axios.get('/api/courses', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
                console.log(response.data);
                app.courses = response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });

        axios.get('/api/lecturers', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
                console.log(response.data);
                app.lecturers = response.data.data;
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
            axios.put(`/api/enrolments/${app.$route.params.id}`, {
                    date: app.enrolment.date,
                    time: app.enrolment.time,
                    status: app.enrolment.status,
                    course_id: app.enrolment.course_id,
                    lecturer_id: app.enrolment.lecturer_id,
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    app.$router.push('/enrolments');
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
}
</script>

<style>
.d-block{
  font-weight: bold;
}
</style>
