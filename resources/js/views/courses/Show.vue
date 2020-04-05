<template>
<b-row align-h="center">
    <b-col cols="12">

        <b-table-simple hover responsive>
            <b-tr>
                <b-th>Title</b-th>
                <b-td>{{ course.title }}</b-td>

                <b-th>Code</b-th>
                <b-td>{{ course.code }}</b-td>

                <b-th>Description</b-th>
                <b-td>{{ course.description }}</b-td>

                <b-th>Points</b-th>
                <b-td>{{ course.level }}</b-td>

                <b-th>Level</b-th>
                <b-td>{{ course.points }}</b-td>

                <b-th>Enrolments</b-th>
                <b-td> {{ course.enrolments.length }} </b-td>

            </b-tr>

        </b-table-simple>

    </b-col>
    <div>
        <b-button id="show-btn" @click="showModal">Delete Course</b-button>

        <b-modal ref="my-modal" hide-footer title="Warning">
            <div class="d-block text-center">
                <h3>If you delete this course , you will delete all enrolments attached to it.</h3>
            </div>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
            <b-button class="mt-2" variant="outline-warning" block @click="checkEnrolments()">Continue</b-button>
        </b-modal>

    </div>
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
                console.log(app.course);
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        checkEnrolments() {
            if (this.course.enrolments.length === 0) {
                this.deleteCourse(this.course.id);
            } else {
                this.deleteEnrolments();
            }
        },
        deleteCourse(id) {

            let app = this;
            let token = localStorage.getItem('token');

            axios.delete(`/api/courses/` + id, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    console.log(response);
                    // app.items = app.items.filter(dat => dat.id !== id)
                    app.$router.push('/courses')
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        deleteEnrolments() {
            let app = this;
            let token = localStorage.getItem("token");

            // loop through enrolments and send delete request to delete them
            app.course.enrolments.forEach((enrolment) => {
                axios
                    .delete("/api/enrolments/" + enrolment.id, {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            });
            // delete course or lecturer
            axios
                .delete("/api/courses/" + app.course.id, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    console.log(response);
                    app.$router.push('/courses')
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    }
}
</script>
<style>
</style>
