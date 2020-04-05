<template>
<b-row align-h="center">
    <b-col cols="12">

        <b-table-simple hover responsive>
            <b-tr>
                <b-th>Name</b-th>
                <b-td>{{ lecturer.name }}</b-td>

                <b-th>Address</b-th>
                <b-td>{{ lecturer.address }}</b-td>

                <b-th>Email</b-th>
                <b-td>{{ lecturer.email }}</b-td>

                <b-th>Phone</b-th>
                <b-td>{{ lecturer.phone }}</b-td>


            </b-tr>

        </b-table-simple>
    </b-col>
    <div>
        <b-button id="show-btn" @click="showModal">Delete Leturer</b-button>

        <b-modal ref="my-modal" hide-footer title="Warning">
            <div class="d-block text-center">
                <h3>If you delete this lecturer , you will delete all enrolments attached to it.</h3>
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
            lecturer: {},
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
        axios.get(`/api/lecturers/${app.$route.params.id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
                app.lecturer = response.data.data;
                console.log(app.lecturer);
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
            if (this.lecturer.enrolments.length === 0) {
                this.deleteLecturer(this.lecturer.id);
            } else {
                this.deleteEnrolments();
            }
        },

        deleteLecturer(id) {

            let app = this;
            let token = localStorage.getItem('token');

            axios.delete(`/api/lecturers/` + id, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    console.log(response);
                    app.items = app.items.filter(dat => dat.id !== id)
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteEnrolments() {
            let app = this;
            let token = localStorage.getItem("token");

            // loop through enrolments and send delete request to delete them
            app.lecturer.enrolments.forEach((enrolment) => {
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
                .delete("/api/lecturers/" + app.lecturer.id, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    console.log(response);
                    app.$router.push('/lecturers')
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
