<template>
  <div class="pt-5">

    <h1 align="center" class="mt-4">All Categories</h1>

    <div class="row" style="display:inline;">
      <div class="col-4 mx-auto">

        <b-table
            id="my-table"
            :fields="fields"
            :items="categories"
            :per-page="perPage"
            :current-page="currentPage"
        >
          <template #cell(action)="row">
            <b-button size="sm" @click="editCategory(row.index)">Edit</b-button>
          </template>
          <template #cell(actionDelete)="row2">
            <b-button size="sm" @click="deleteCategory(row2.index)">Delete</b-button>
          </template>
        </b-table>

        <b-pagination align="center"
                      v-model="currentPage"
                      :total-rows="categories.length"
                      :per-page="perPage"
                      aria-controls="my-table"
        ></b-pagination>

        <p align="center" class="mt-3">Current Page: {{ currentPage }}</p>

        <form method="post" v-on:submit.prevent="addCategory()">
          <div class="form-group">
            <label for="name">Name</label>
            <input style="margin-top: 10px;" required v-model="name" type="text" class="form-control" id="name"
                   placeholder="Enter name" aria-required="true">
          </div>
          <div class="form-group">
            <label for="description" style="margin-top: 10px;">Content</label>
            <textarea style="margin-top: 10px;" required v-model="description" type="text" class="form-control"
                      id="description"
                      placeholder="Enter description" aria-required="true"></textarea>
          </div>
          <br>

          <button type="submit" class="btn btn-primary mt-2">Add Category</button>
        </form>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: "NewCategory",
  data() {
    return {
      fields: [
        'name',
        'description',
        {key: 'action', label: 'Edit'},
        {key: 'actionDelete', label: 'Delete'}

      ],
      date: '',
      name: null,
      description: null,
      categories: [],

      perPage: 2,
      currentPage: 1,
    }
  },
  mounted() {
    this.$axios.get('/api/category').then((response) => {
      this.categories = response.data;
    });
  },
  methods: {
    editCategory(index) {
      let category = this.categories[index]
      this.$router.push(`/category/${category.name}`)
    },
    deleteCategory(index) {
      this.$axios.delete(`/api/category/${this.categories[index].name}`).then(() => {

        this.$axios.get('/api/category').then((response) => {
          this.categories = response.data;
        });
      });
      window.location.reload()
    },
    addCategory() {
      this.$axios.post('/api/category', {
        "name": this.name,
        "description": this.description
      }).then(() => {
        window.location.reload()
      })
    },
  }
}
</script>

<style scoped>

</style>
