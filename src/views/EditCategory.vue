<template>
  <div class="col-4 mx-auto">
    <h2 class="mt-4">Edit Category: {{ this.category.name }}</h2>
    <br>

    <form method="post" v-on:submit.prevent="editCategory()">
      <div class="form-group">
        <label for="name">Name</label>
        <input style="margin-top: 10px;" required v-model="category.name" v-text="category.email" type="text"
               class="form-control" id="name" placeholder="Change name" aria-required="true">
      </div>
      <div class="form-group">
        <label for="description" style="margin-top: 10px;">Description</label>
        <textarea style="margin-top: 10px;" required v-model="category.description" v-text="category.description"
                  type="text" class="form-control" id="description" placeholder="Change description"
                  aria-required="true"></textarea>

      </div>
      <br>

      <button type="submit" class="btn btn-primary mt-2">Save Changes</button>
    </form>
  </div>
</template>
<script>

export default {
  name: "EditCategory",
  data() {
    return {
      category: null,
      name: null,
      description: null,
    }
  },
  created() {
    this.$axios.get(`/api/category/${this.$route.params.name}`).then((response) => {
      this.category = response.data;
    });
  },
  methods: {
    editCategory() {
      this.$axios.put(`/api/category/${this.category.name}`, {
        "name": this.category.name,
        "description": this.category.description
      }).then(() => {
        this.$router.push(`/category`);
      });
    },
  }
}
</script>

<style scoped>

</style>
