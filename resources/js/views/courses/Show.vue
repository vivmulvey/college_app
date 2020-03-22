<template>
  <b-row align-h="center">
    <b-col cols="12">

      <b-table-simple hover responsive>

        <b-tr v-for="item in items" :key="item.id">

          <b-tr>
            <b-th>Title</b-th>
            <b-td>{{ item.title }}</b-td>

            <b-th>Code</b-th>
            <b-td>{{ item.code }}</b-td>

            <b-th>Description</b-th>
            <b-td>{{ item.description }}</b-td>

            <b-th>Points</b-th>
            <b-td>{{ item.level }}</b-td>

            <b-th>Level</b-th>
            <b-td>{{ item.points }}</b-td>

          </b-tr>
        </b-tr>

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
    axios.get(`/api/courses/${app.$route.params.id}`, {
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
