<template>
    <div class="container">
        <div class="input-group mb-3">
            <input v-model="searchString" type="text" class="form-control">
            <div class="input-group-append">
                <button class="btn btn-primary input-group-text bg-success" @click="fetchItemsByName(searchString)">Rechercher un item</button>
            </div>
        </div>
        <p>{{ itemsCount }} items trouvés</p>
        <table v-if="itemsCount > 0" class="table table-striped">
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
                <td><img :src="item.img"  :alt="'Image Item No. ' + item.id"/></td>
                <td>{{ item.name.fr }}</td>
                <td>{{ item.description.fr }}</td>
                <td>
                    <button v-if="item.hasRecipe" @click="fetchItemsRecipes(item.id)" class="btn btn-primary"><i class="bi bi-book-half"></i></button>
                </td>
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
            itemsCount: 0,
            searchString: ''
        }
    },

    methods: {
        async fetchItemsByName(name) {
            try {
                const LIMIT = 10;

                // Récupérer les premiers résultats
                const initialReq = await axios.get(
                    `https://api.dofusdb.fr/items?slug.fr[$search]=${name}&$limit=${LIMIT}&$skip=0`
                );
                const data = initialReq.data;

                this.items = [...data.data];
                this.itemsCount = data.total;

                // Calculer les pages restantes
                const remainingPages = [];
                for (let skip = LIMIT; skip < this.itemsCount; skip += LIMIT) {
                    remainingPages.push(
                        axios.get(
                            `https://api.dofusdb.fr/items?slug.fr[$search]=${name}&$limit=${LIMIT}&$skip=${skip}`
                        )
                    );
                }

                // Résoudre toutes les requêtes en parallèle
                const results = await Promise.all(remainingPages);

                // Ajouter les données des pages restantes
                results.forEach((response) => {
                    this.items.push(...response.data.data);
                });

                console.log('Items récupérés :', this.items);
            } catch (error) {
                console.error('Erreur lors de la récupération des items :', error);
            }
        },

        async fetchItemsRecipes(itemId) {
            try {
                const response = await axios.get(
                    `https://api.dofusdb.fr/recipes/${itemId}`
                );

                console.log('Recettes récupérées :', response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des recettes :', error);
            }
        },
    }
}
</script>

<style>

</style>
