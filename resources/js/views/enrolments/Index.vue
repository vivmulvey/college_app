<template>
  <div>
    <b-row align-h="between">
        <b-col cols="6">
            <div>
                <h1> Enrolments </h1>
            </div>
        </b-col>
        <b-col cols="2">
          <router-link :to="`/enrolments/create`">
              Add Enrolment<b-icon-plus font-scale="2"></b-icon-plus>
          </router-link>
        </b-col>
    </b-row>

<b-row align-h="center">
  
    <b-col cols="12">

        <b-table-simple  hover striped bordered responsive>
            <b-thead>
                <b-tr>
                    <b-th>Date</b-th>
                    <b-th>Time</b-th>
                    <b-th>Actions</b-th>

                </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="item in items" :key="item.id">
                    <b-td>{{ item.date }}</b-td>
                    <b-td>{{ item.time }}</b-td>

                      <b-td>
                          <router-link :to="`/enrolments/show/${item.id}`"><b-icon-eye-fill font-scale="2" style="padding-left:4px"></b-icon-eye-fill></router-link>
                          <router-link :to="`/enrolments/edit/${item.id}`"><b-icon-pencil font-scale="2" style="padding-left:4px"></b-icon-pencil></router-link>

                      </b-td>
                    </b-tr>
            </b-tbody>

        </b-table-simple>
    </b-col>
</b-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            items: []
        }
    },
    created() {
        let app = this;
        let token = localStorage.getItem('token');
        axios.get('/api/enrolments', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
                console.log(response.data);
                app.items = response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            })
    },
    methods: {

        deleteEnrolment(id) {

            let app = this;
            let token = localStorage.getItem('token');

            axios.delete(`/api/enrolments/`+ id, {
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
              }
            }

        }


</script>
<style>
</style>
