<template>
  <div class="pt-5">

    <h1 align="center" class="mt-4">All Users</h1>

    <div class="row" style="display:inline;">
      <div class="col-4 mx-auto">

        <b-table
            id="my-table"
            :fields="fields"
            :items="users"
            :per-page="perPage"
            :current-page="currentPage"
        >
          <template #cell(action)="row">
            <b-button size="sm" @click="editUser(row.index)">Edit</b-button>
          </template>
          <template #cell(actionDelete)="row2">
            <b-button size="sm" @click="changeStatus(row2.index)">Status</b-button>
          </template>
        </b-table>

        <b-pagination align="center"
                      v-model="currentPage"
                      :total-rows="users.length"
                      :per-page="perPage"
                      aria-controls="my-table"
        ></b-pagination>

        <p align="center" class="mt-3">Current Page: {{ currentPage }}</p>

        <form method="post" v-on:submit.prevent="addUser">
          <div class="form-group">
            <label for="email">Email</label>
            <input style="margin-top: 10px;" required v-model="email" type="email" class="form-control" id="email"
                   placeholder="Enter Email">
          </div>
          <br>
          <div class="form-group">
            <label for="name" style="margin-top: 10px;">Name</label>
            <input style="margin-top: 10px;" required v-model="name" type="name" class="form-control" id="name"
                   placeholder="Enter Name">

          </div>
          <br>
          <div class="form-group">
            <label for="lastname" style="margin-top: 10px;">Surname</label>
            <input style="margin-top: 10px;" required v-model="surname" type="lastname" class="form-control"
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
        'email',
        'name',
        'surname',
        'status',
        {key: 'action', label: 'Edit'},
        {key: 'actionDelete', label: 'Delete'}

      ],
      date: '',

      users: [],

      email: null,
      name: null,
      surname: null,
      password: null,
      status: null,
      role: null,

      perPage: 4,
      currentPage: 1,
    }
  },
  mounted() {
    this.$axios.get('/api/user').then((response) => {
      this.users = response.data;
    });
  },
  methods: {
    editUser(index) {
      let user = this.users[index]
      this.$router.push(`/user/${user.email}`)
    },
    changeStatus(index) {
      this.$axios.put(`/api/user/status/${this.users[index].email}`).then(() => {
        this.$axios.get('/api/user').then((response) => {
          this.users = response.data;
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
