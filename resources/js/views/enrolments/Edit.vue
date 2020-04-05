<template>
  <b-row align-h="center">
    <b-col cols="8">
      <h3 v-if="!loggedIn">You are not logged in!!</h3>
      <b-card
        v-else
        title="Edit Enrolment"
        tag="article"
      >

        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Date:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="enrolment.date"
              type="date"
              required
              placeholder="Enter date"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Time:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="enrolment.time"
              type="time"
              required
              placeholder="Enter time"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Course ID:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="enrolment.course_id"
              type="text"
              required
              placeholder="Enter course ID"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Lecturer ID:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="enrolment.lecturer_id"
              type="text"
              required
              placeholder="Enter lecturer ID"
            ></b-form-input>
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
        enrolment: {},
        show: true,
        loggedIn: false
      }
    },
    created() {
      // console.log(localStorage.getItem('token'));
      if (localStorage.getItem('token')) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }

      let app = this;
      let token = localStorage.getItem('token');
      axios.get(`/api/enrolments/${app.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function (response) {
        app.enrolment = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()

        let app = this;
        let token = localStorage.getItem('token');
        axios.put(`/api/enrolments/${app.$route.params.id}`, {
            date: app.course.date,
            time: app.course.time,
            status: app.course.status,
            course_id: app.course.course_id,
            leturer_id: app.course.lecturer_id,
        },
        {
          headers: { Authorization: "Bearer " + token }
        })
        .then(function (response) {
          app.$router.push('/enrolments');
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>
