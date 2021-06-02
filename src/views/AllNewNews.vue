<template>
  <div>
    <h1 class="mt-4">News</h1>

    <div class="row">
      <div>
        <div v-for="news in newsList" :key="news.id">
          <br>
          <div>
            <b-jumbotron border-variant="dark">
              <template v-slot:header><h1>{{ news.title | capitalize }}</h1></template>
              <template v-slot:lead><h3>{{ news.category.name }}</h3></template>
              <p>Posted on: {{ new Date(news.createdAt).toISOString().split('T')[0] }}</p>
              <hr class="my-4">
              <p>{{ news.content | shortText }}</p>
              <b-button variant="primary" href="#" @click="findById(news.id)">More Info
              </b-button>
            </b-jumbotron>
          </div>
        </div>
      </div>
    </div>
    <br>

    <b-pagination @change="handlePageChange" size="lg" align="center"
                  v-model="currentPage"
                  :per-page="perPage"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

  </div>
</template>

<script>

export default {
  filters: {
    shortText(value) {
      if (value.length < 30) {
        return value;
      }
      return value.slice(0, 30) + '...'
    }
  },
  data() {
    return {
      newsList: [],

      perPage: 2,
      currentPage: 1,
    }
  },
  methods: {
    handlePageChange(value) {
      this.currentPage = value;
    },
    findById(id) {
      this.$router.push(`/news/${id}`)
    }
  },
  // updated() {
  //   this.$axios.get(`/api/news/page-num/${this.currentPage}`).then((response) => {
  //     this.newsList = response.data;
  //   });
  // },
  mounted() {
    this.$axios.get(`/api/news/page-num/${this.currentPage}`).then((response) => {
      this.newsList = response.data;
    });
  },
}
</script>
