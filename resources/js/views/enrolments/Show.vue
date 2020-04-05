<template>
<b-row align-h="center">
    <b-col cols="12">

        <b-table-simple hover responsive>


            <b-tr>
                <b-th>Date</b-th>
                <b-td>{{ enrolment.date }}</b-td>

                <b-th>Time</b-th>
                <b-td>{{ enrolment.time }}</b-td>

                <b-th>Status</b-th>
                <b-td>{{ enrolment.status }}</b-td>

                <b-th>Course ID</b-th>
                <b-td>{{ enrolment.course_id }}</b-td>

                <b-th>Lecturer ID</b-th>
                <b-td>{{ enrolment.lecturer_id }}</b-td>

            </b-tr>

        </b-table-simple>
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
    }
}
</script>
<style>
</style>
