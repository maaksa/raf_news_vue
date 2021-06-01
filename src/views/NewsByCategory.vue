<template>
  <div>
    <h1 class="mt-4">Tag: {{ this.$route.params.word }}</h1>

    <div class="row">
      <div class="col-6">
        <div v-for="news in newsList" :key="news.id">
          <br>
          <div>
            <b-jumbotron border-variant="dark">
              <template v-slot:header><h1>{{ news.title | capitalize }}</h1></template>
              <template v-slot:lead><h3>{{ news.category.name }}</h3></template>
              <p>Posted on: {{ new Date(news.createdAt).toISOString().split('T')[0] }}</p>
              <hr class="my-4">
              <p>{{ news.content | shortText }}</p>
              <b-button variant="primary" @click="selectedNews = news" v-on:click="scrollToTop">More Info
              </b-button>
            </b-jumbotron>
          </div>
        </div>
      </div>

      <div class="col-6">
        <single-news v-if="selectedNews" :single-news="selectedNews"></single-news>
      </div>

    </div>
    <br>
    <b-pagination size="lg" align="center"
                  v-model="currentPage"
                  :per-page="perPage"
                  aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import SingleNews from "../components/SingleNews";

export default {
  name: "NewsByCategory",
  components: {SingleNews},
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
      selectedNews: null,
      newsList: []
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    this.$axios.get(`/api/news/category/${this.$route.params.category}`).then((response) => {
      this.newsList = response.data;
    });
  },
  updated() {
    this.$axios.get(`/api/news/category/${this.$route.params.category}`).then((response) => {
      this.newsList = response.data;
    });
  },
}
</script>
