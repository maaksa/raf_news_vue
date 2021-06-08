<template>
  <div class="col-4 mx-auto">
    <h2 class="mt-4">Edit User: {{ this.user.name }}</h2>
    <br>

    <form method="post" v-on:submit.prevent="updateUser()">
      <div class="form-group">
        <label for="email">Email</label>
        <input style="margin-top: 10px;" required v-model="email" v-text="user.email" type="email"
               class="form-control" id="email">
      </div>
      <br>
      <div class="form-group">
        <label for="name" style="margin-top: 10px;">Name</label>
        <input style="margin-top: 10px;" required v-model="name" v-text="user.name" type="name"
               class="form-control" id="name" placeholder="Enter name">

      </div>
      <br>
      <div class="form-group">
        <label for="surname" style="margin-top: 10px;">Surname</label>
        <input style="margin-top: 10px;" required v-model="surname" v-text="user.surname" type="lastname"
               class="form-control" id="surname" placeholder="Enter lastname">
      </div>
      <br>
      <div class="form-group">
        <label for="password" style="margin-top: 10px;">Password</label>
        <input style="margin-top: 10px;" required v-model="password" type="password" class="form-control"
               id="password" placeholder="Enter password">
      </div>
      <br>
      <div class="form-group">
        <label for="role" style="margin-top: 10px;">Role</label>
        <input style="margin-top: 10px;" required v-model="role" type="number" class="form-control" id="role"
               placeholder="Enter type">
      </div>
      <br>

      <button type="submit" class="btn btn-primary mt-2">Save Changes</button>
    </form>
  </div>
</template>
<script>

export default {
  name: "EditUser",
  data() {
    return {
      user: null,
      email: null,
      name: null,
      surname: null,
      password: null,
      role: null,
    }
  },
  created() {
    this.$axios.get(`/api/user/${this.$route.params.email}`).then((response) => {
      this.user = response.data;
      this.name = response.data.name;
      this.surname = response.data.surname;
      this.email = response.data.email;
      this.password = response.data.password;
      this.role = response.data.role;
    });
  },
  methods: {
    updateUser() {
      this.$axios.put(`/api/user/${this.$route.params.email}`, {
        "email": this.email,
        "name": this.name,
        "surname": this.surname,
        "role": this.role,
        "hashedPassword": this.password,
      }).then(() => {
        this.$router.push(`/user`);
      })
    }
  }
}
</script>

<style scoped>

</style>
