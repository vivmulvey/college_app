<template>
<div>
    <b-row align-h="between">
        <b-col cols="6">
            <div>
                <h1> Courses </h1>
            </div>
        </b-col>
        <b-col cols="2">
            <router-link :to="`/courses/create`">
                Add Course<b-icon-plus font-scale="2"></b-icon-plus>
            </router-link>
        </b-col>
    </b-row>
    <b-row align-h="center">
        <b-col cols="12">
            <b-table-simple hover striped bordered responsive>
                <b-thead>
                    <b-tr>
                        <b-th>Title</b-th>
                        <b-th>Code</b-th>
                        <b-th>Actions</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="item in items" :key="item.id">
                        <b-td>{{ item.title }}</b-td>
                        <b-td>{{ item.code }}</b-td>
                        <b-td>
                            <router-link :to="`/courses/show/${item.id}`">
                                <b-icon-eye-fill font-scale="2" style="padding-right:5px"></b-icon-eye-fill>
                            </router-link>


                            <router-link :to="`/courses/edit/${item.id}`">
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
            items: [],
            show: true
        }
    },
    created() {
        if (this.loggedIn = true) {

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
        } else {

            this.$router.push('/');
        }
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
                    location.reload();
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
