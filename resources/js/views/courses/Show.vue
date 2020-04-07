<template>
<b-row align-h="center">
    <b-col cols="8">

        <b-card class="myCard" border-variant="info">

            <b-form-group>
                <h2> {{course.title}} </h2>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="ID Number:">
                <p> {{course.id}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Code:">
                <p> {{ course.code }} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Description:">
                <p> {{course.description}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Points:">
                <p> {{course.points}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="Level:">
                <p> {{course.level}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-form-group label="No. of Enrolments:">
                <p> {{course.enrolments.length}} </p>
            </b-form-group>

            <b-dropdown-divider class="divider"></b-dropdown-divider>

            <b-row align-h="between">
                <b-col cols="2">
                    <div>
                        <router-link to="/courses">
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
                                <h3>If you delete this course , you will delete all enrolments attached to it.</h3>
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
                    // app.items = app.items.filter(dat => dat.id !== id) only needed for index
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
.divider {
    display: block;
    height: 2px;
    width: 100%;
    margin: 10px;
}

.col-form-label {
    font-weight: bold;
    font-size: 15px;
}
</style>
