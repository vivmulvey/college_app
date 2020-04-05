<template>
<b-row align-h="center">
    <b-col cols="12">

        <b-table-simple hover responsive dark>
            <b-thead>
                <b-tr>
                    <b-th>Title</b-th>
                    <b-th>Code</b-th>
                    <!-- <b-th>Description</b-th>
                    <b-th>Points</b-th>
                    <b-th>Level</b-th> -->
                    <b-th>Actions</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="item in items" :key="item.id">
                    <b-td>{{ item.title }}</b-td>
                    <b-td>{{ item.code }}</b-td>
                    <!-- <b-td>{{ item.description }}</b-td>
                    <b-td>{{ item.points }}</b-td>
                    <b-td>{{ item.level }}</b-td> -->
                    <b-td>
                        <router-link :to="`/courses/edit/${item.id}`">Edit</router-link>
                    </b-td>
                    <b-td>
                        <router-link :to="`/courses/show/${item.id}`">View</router-link>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </b-col>
</b-row>
</template>
<script>
export default {
    data() {
        return {
            items: [] ,
            show : true
        }
    },
    created() {
        let app = this;
        let token = localStorage.getItem('token');
        axios.get('/api/courses', {
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
