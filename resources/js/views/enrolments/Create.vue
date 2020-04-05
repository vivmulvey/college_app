<template>
<b-row>
    <b-col cols="8">

        <b-card title="Add Enrolment" tag="article">
            <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Date"   label-for="input-1">
                    <b-form-input id="input-1" type="date" required placeholder="Enter date" v-model="form.date">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Time:" label-for="input-2">
                    <b-form-input id="input-2" type="time" required placeholder="Enter time" v-model="form.time">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Status:" label-for="input-2">
                    <b-form-select name='status' v-model='form.status' class='form-control'>

                            <b-form-select-option value="interested">Interested</b-form-select-option>
                            <b-form-select-option value="assigned">Assigned</b-form-select-option>
                            <b-form-select-option value="career-break">Career-break</b-form-select-option>
                            <b-form-select-option value="associate">Associate</b-form-select-option>

                    </b-form-select>
                </b-form-group>

                <b-form-group id="input-group-4" label="Course:" label-for="input-4">
                    <b-form-select name='course' v-model='form.course_id' class='form-control'>
                        <option placeholder="Choose a course" v-for="course in courses" v-bind:value='course.id'>
                            {{course.title}}
                        </option>
                    </b-form-select>
                </b-form-group>

                <b-form-group id="input-group-4" label="Lecturer:" label-for="input-4">
                    <b-form-select name='lecturer' v-model='form.lecturer_id' class='form-control'>
                        <option placeholder="Choose a lecturer" v-for="lecturer in lecturers" v-bind:value='lecturer.id'>
                            {{lecturer.name}}
                        </option>
                    </b-form-select>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
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
                date: '',
                time: '',
                status: '',
                course_id: '',
                lecturer_id: ''
            },
            loggedIn: false,
            errors: [],
            courses: [],
            lecturers: []
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

            let app = this;
            let token = localStorage.getItem('token');
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

            axios.post('/api/enrolments', {
                    date: app.form.date,
                    time: app.form.time,
                    status: app.form.status,
                    course_id: app.form.course_id,
                    lecturer_id: app.form.lecturer_id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(function(response) {
                    app.$router.push('/enrolments');
                })
                .catch(function(error) {
                    console.log(error.response.data);

                    app.errors = error.response.data.errors
                });

        }
    }
}
</script>
