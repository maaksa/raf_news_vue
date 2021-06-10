<template>
  <div class="pt-5">

    <h1 align="center" class="mt-4">All News</h1>

    <div class="row" style="display:inline;">
      <div class="col-4 mx-auto">

        <b-table
            id="my-table"
            :fields="fields"
            :items="news"
            :per-page="perPage"
            :current-page="currentPage"
        >
          <template #cell(action)="row">
            <b-button size="sm" @click="editNews(row.index)">Edit</b-button>
          </template>
          <template #cell(actionDelete)="row2">
            <b-button size="sm" @click="deleteNews(row2.index)">Delete</b-button>
          </template>
        </b-table>

        <b-pagination align="center"
                      v-model="currentPage"
                      :total-rows="news.length"
                      :per-page="perPage"
                      aria-controls="my-table"
        ></b-pagination>

        <p align="center" class="mt-3">Current Page: {{ currentPage }}</p>

                <form method="post" v-on:submit.prevent="addUser">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input style="margin-top: 10px;" required v-model="title" type="email" class="form-control" id="email"
                           placeholder="Enter Email">
                  </div>
                  <br>
                  <div class="form-group">
                    <label for="name" style="margin-top: 10px;">Name</label>
                    <textarea style="margin-top: 10px;" required v-model="content" type="name" class="form-control" id="name"
                              placeholder="Enter Name"></textarea>

                  </div>
                  <br>
                  <div class="form-group">
                    <label for="lastname" style="margin-top: 10px;">Surname</label>
                    <input style="margin-top: 10px;" required v-model="author" type="lastname" class="form-control"
                           id="lastname" placeholder="Enter Surname">
                  </div>
                  <br>
                  <div class="form-group">
                    <label for="password" style="margin-top: 10px;">Password</label>
                    <input style="margin-top: 10px;" required v-model="password" type="password" class="form-control"
                           id="password" placeholder="Enter Password">
                  </div>
                  <br>
                  <div class="form-group">
                    <label for="role" style="margin-top: 10px;">Role</label>
                    <input style="margin-top: 10px;" required v-model="role" type="number" class="form-control" id="role"
                           placeholder="Enter Role">
                  </div>
                  <br>
                  <button type="submit" class="btn btn-primary mt-2">Add User</button>
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
        'title',
        'content',
        'createdAt',
        'visits_num',
        'author',
        {key: 'action', label: 'Edit'},
        {key: 'actionDelete', label: 'Delete'}
      ],

      news: [],
      title: null,
      content: null,
      author: null,

      perPage: 4,
      currentPage: 1,
    }
  },
  mounted() {
    this.$axios.get(`/api/news/page-num/${this.currentPage}`).then((response) => {
      this.news = response.data;
      for (let i = 0; i < this.news.length; i++) {
        this.news[i].createdAt = new Date(this.news[i].createdAt).toISOString().split('T')[0]
        this.news[i].author = this.news[i].author.name
      }
      this.author = response.data.author;
      this.id = response.data.id
      this.createdAt = response.data.createdAt;

    });
  },
  methods: {
    editNews(index) {
      let user = this.users[index]
      this.$router.push(`/user/${user.email}`)
    },
    //TODO delete
    deleteNews(index) {
      this.$axios.delete(`/api/news/${this.news[index].id}`).then(() => {
        this.$axios.get('/api/news').then((response) => {
          this.news = response.data;
          for (let i = 0; i < this.news.length; i++) {
            this.news[i].createdAt = new Date(this.news[i].createdAt).toISOString().split('T')[0]
            this.news[i].author = this.news[i].author.name
          }
        });
      });
      window.location.reload()
    },
    addUser() {
      this.$axios.post('/api/user/add', {
        "email": this.email,
        "name": this.name,
        "surname": this.surname,
        "role": this.role,
        "hashedPassword": this.password,
      }).then(() => {
        window.location.reload()
      })
    },
  }
}
</script>

<style scoped>

</style>
