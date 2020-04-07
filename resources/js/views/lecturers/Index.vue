<template>
<div>
    <b-row align-h="between">
        <b-col cols="6">
            <div>
                <h1> Lecturers </h1>
            </div>
        </b-col>
        <b-col cols="2">
          <router-link :to="`/lecturers/create`">
              Add Lecturer<b-icon-plus font-scale="2"></b-icon-plus>
          </router-link>
        </b-col>
    </b-row>
    <b-row align-h="center">

        <b-col cols="12">

            <b-table-simple hover striped bordered responsive>
                <b-thead>
                    <b-tr>
                        <b-th>Name</b-th>

                        <b-th>Email</b-th>

                        <b-th>Actions</b-th>

                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="item in items" :key="item.id">

                        <b-td>{{ item.name }}</b-td>

                        <b-td>{{ item.email }}</b-td>

                        <b-td>
                            <router-link :to="`/lecturers/show/${item.id}`">
                                <b-icon-eye-fill font-scale="2" style="padding-right:5px"></b-icon-eye-fill>
                            </router-link>
                            <router-link :to="`/lecturers/edit/${item.id}`">
                                <b-icon-pencil font-scale="2"></b-icon-pencil>
                            </router-link>
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
        axios.get('/api/lecturers', {
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

}
</script>
<style>

</style>
