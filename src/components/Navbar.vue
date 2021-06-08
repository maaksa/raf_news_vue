<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">RAF News</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Home'}">
                Home
              </router-link>
            </li>
            <li class="nav-item" @click="topNews()">
              <router-link :to="{name: 'TopNews'}" tag="a" class="nav-link"
                           :class="{active: this.$router.currentRoute.name === 'TopNews'} ">Top News
              </router-link>
            </li>

            <b-dropdown text="Categories" variant="primary" class="e-auto mb-2 mb-lg-0"
                        style="height: 35px; margin-top: 5px">
              <b-dropdown-item href="#" v-for="category in categories" :key="category.name"
                               @click="find(category.name)">{{ category.name }}
              </b-dropdown-item>
            </b-dropdown>

            <li v-if="canLogout" class="nav-item" @click="cms()">
              <router-link :to="{name: 'Cms'}" tag="a" class="nav-link"
                           :class="{active: this.$router.currentRoute.name === 'Cms'}">CMS
              </router-link>
            </li>
          </ul>

          <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
            <button class="btn btn-outline-secondary" type="submit">Logout</button>
          </form>
          <form v-if="canLogout" class="d-flex">
            <router-link :to="{name: 'Login'}" tag="a" class="nav-link"
                         :class="{active: this.$router.currentRoute.name === 'Login'}">Login
            </router-link>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      categories: [],
    }
  },
  computed: {
    canLogout() {
      return this.$route.name !== 'Login';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push({name: 'Login'});
    },
    find(category) {
      this.$router.push(`/news/category/${category}`)
    },
    topNews() {
      this.$router.push(`/top-news`)
    },
    cms() {
      this.$router.push(`/cms`)
    },
  },
  mounted() {
    this.$axios.get('/api/category').then((response) => {
      this.categories = response.data;
      console.log(response)
    });
  },
}
</script>

<style scoped>

</style>
