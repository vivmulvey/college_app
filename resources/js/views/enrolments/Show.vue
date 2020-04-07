<template>
<b-row align-h="center">
    <b-col cols="8">

        <b-card class="myCard" border-variant="info">

            <b-form-group>
                <h2> Enrolment ID : {{enrolment.id}} </h2>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Date:">
                <p> {{enrolment.date}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Time:">
                <p> {{enrolment.time}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Status:">
                <p> {{ enrolment.status }} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Course:">
                <p> {{enrolment.course_id}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Lecturer:">
                <p> {{enrolment.lecturer_id}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-row align-h="between">
                <b-col cols="2">
                    <router-link to="/enrolments">
                        <b-icon-box-arrow-left font-scale="3"></b-icon-box-arrow-left>
                    </router-link>
                </b-col>
                <b-col cols="2">
                    <b-button type="delete" variant="outline-info" @click="deleteEnrolment()">
                        <b-icon-trash font-scale="1"></b-icon-trash>
                    </b-button>
                </b-col>
            </b-row>
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
            loggedIn: false
        }
    },
    created() {

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
                console.log(app.enrolment);
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    methods: {

        deleteEnrolment() {

            let app = this;
            let token = localStorage.getItem('token');

            axios.delete(`/api/enrolments/` + app.enrolment.id, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    console.log(response);
                    // app.items = app.items.filter(dat => dat.id !== id) only needed on index page
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
.col-form-label{
  font-weight: bold;
  font-size: 15px;
}
</style>
