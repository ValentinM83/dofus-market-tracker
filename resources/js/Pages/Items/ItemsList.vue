<template>
    <div class="container">
        <div class="input-group mb-3">
            <input v-model="searchString" type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
            <div class="input-group-append">
                <button class="btn btn-primary input-group-text bg-success" @click="fetchItemsByName(searchString)">Rechercher un item</button>
            </div>
        </div>

        <table v-if="items.length > 0" class="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>{{ item }}</td>
                <td>{{ item.name['fr'] }}</td>
                <td>@mdo</td>
                <td>@mdo</td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
export default {
    name: 'ItemsList',
    data() {
        return {
            items: [],
            searchString: ''
        }
    },

    methods: {
        fetchItemsByName(name) {
            axios.get('https://api.dofusdb.fr/items?name.fr=' + name)
                .then(response => {
                    this.items = response.data
                    console.log(this.items)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>

</style>
