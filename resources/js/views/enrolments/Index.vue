<template>
  <b-row align-h="center">
    <b-col cols="12">

      <b-table-simple hover responsive>
        <b-head>
          <b-tr>
            <b-th>Date</b-th>
            <b-th>Time</b-th>
            <b-th>Status</b-th>
            <b-th>Course ID</b-th>
            <b-th>Lecturer ID</b-th>

          </b-tr>
        </b-head>
        <br/>
        <b-body>
          <b-tr v-for="item in items" :key="item.id">
            <b-td>{{ item.date }}</b-td>
            <b-td>{{ item.time }}</b-td>
            <b-td>{{ item.status }}</b-td>
            <b-td>{{ item.course_id }}</b-td>
            <b-td>{{ item.lecturer_id }}</b-td>
            <b-td><router-link :to="`/enrolments/edit/${item.id}`">Edit</router-link></b-td>
            <b-td><router-link :to="`/enrolments/view/${item.id}`">View</router-link></b-td>

          </b-tr>
        </b-body>

      </b-table-simple>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created(){
    let app = this;
    let token = localStorage.getItem('token');
    axios.get('/api/enrolments', {
      headers: { Authorization: "Bearer " + token}
    })
    .then(function (response) {
       console.log(response.data);
       app.items = response.data.data;
    })
    .catch(function (error) {
       console.log(error);
    })
  },
  methods: {

  }
}
</script>
<style>
</style>
