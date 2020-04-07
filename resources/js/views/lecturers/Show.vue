<template>
<b-row align-h="center">
    <b-col cols="8">
        <b-card class="myCard" border-variant="info">

            <b-form-group>
                <h2> {{lecturer.name}} </h2>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="ID Number:">
                <p> {{lecturer.id}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Address:">
                <p> {{ lecturer.address }} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Email:">
                <p> {{lecturer.email}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Phone:">
                <p> {{lecturer.phone}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="No. of Enrolments:">
                <p> {{lecturer.enrolments.length}} </p>

                <b-dropdown-divider class="divider"></b-dropdown-divider>

            </b-form-group>

            <b-row align-h="between">
                <b-col cols="2">
                    <div>
                        <router-link to="/lecturers">
                            <b-icon-box-arrow-left font-scale="3"></b-icon-box-arrow-left>
                        </router-link>
                    </div>
                </b-col>

                <b-col cols="2">
                    <div>
                        <b-button variant="outline-info" id="show-btn" @click="showModal">
                            <b-icon-trash font-scale="1"></b-icon-trash>
                        </b-button>


                        <b-modal ref="my-modal" hide-footer title="Warning!">
                            <div class="d-block text-center">
                                <h3>If you delete this lecturer , you will delete all enrolments attached to them.</h3>
                            </div>
                            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Back</b-button>
                            <b-button class="mt-2" variant="outline-info" block @click="checkEnrolments()">Continue</b-button>
                        </b-modal>
                    </div>
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
                    // app.items = app.items.filter(dat => dat.id !== id)
                    app.$router.push('/lecturers');
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
.col-form-label{
  font-weight: bold;
  font-size: 15px;
}
</style>
