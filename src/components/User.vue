<template>
  <div class="container">
    <h1 class="text-center"> Lista de Clientes</h1>

    <form @submit.prevent="addUser">
      <div class="row">
        <div class="col-md-4 mb-3">
          <label for="userName" class="form-label">Nome</label>
          <input v-model="newUser.name" type="text" class="form-control" id="userName" required/>
        </div>
        <div class="col-md-4 mb-3">
          <label for="userProducts" class="form-label">Procedimento</label>
          <input v-model="newUser.products" type="text" class="form-control" id="userProducts" required/>
        </div>
        <div class="col-md-4 mb-3">
          <label for="procedurePrices" class="form-label">Preço</label>
          <input
              v-model="newUser.prices"
              type="number"
              class="form-control"
              id="procedurePrices"
              required
              step="0.01"
              min="0"
          />
        </div>
      </div>
      <button style="float:right;" type="submit" class="btn btn-success">Salvar Cliente</button>
    </form>
    <table class="table table-striped">
      <thead>
      <tr>
        <th> ID</th>
        <th> Nome</th>
        <th> Procedimento</th>
        <th> Preço</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" v-bind:key="user.id">
        <td>{{ user.id }}</td>
        <td>
          <input v-if="user.editable" v-model="user.name"/>
          <span v-else>{{ user.name }}</span>
        </td>
        <td>
          <input v-if="user.editable" v-model="user.products"/>
          <span v-else>{{ user.products }}</span>
        </td>
        <td>
          <input v-if="user.editable" v-model="user.prices" />
          <span v-else>{{ user.prices }}</span>
        </td>
        <td>
          <button v-if="!user.editable" @click="toggleEdit(user)" class="btn btn-primary">Editar</button>
          <button v-else @click="saveChanges(user)" class="btn btn-success">Salvar</button>
          <button
              @click="confirmDelete(user.id)"
              class="btn btn-danger"
          >
            Deletar
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: 'UsersList',
  data() {
    return {
      users: [],
      showAddForm: false,
      newUser: {
        name: "",
        products: "",
        prices: ""
      }
    };
  },
  methods: {
    getAllUsers() {
      UserService.getAllUsers().then((response) => {
        this.users = response.data;
      });
    },
    deleteUser(userId) {
      UserService.deleteUser(userId).then(() => {
        this.getAllUsers();
      });
    },
    toggleEdit(user) {
      user.editable = !user.editable;
      this.$forceUpdate();
    },
    saveChanges(user) {
      const updatedUser = {
        id: user.id,
        name: user.name,
        products: user.products,
        prices: user.prices
      };

      UserService.updateUser(user.id, updatedUser).then(() => {
        this.toggleEdit(user);
        this.getAllUsers();
      });
    },
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
      this.resetNewUser();
    },
    resetNewUser() {
      this.newUser = {
        name: "",
        products: "",
        prices: ""
      };
    },
    addUser() {
      UserService.create(this.newUser).then(() => {
        this.toggleAddForm();
        this.resetNewUser();
        this.getAllUsers();
      });
    },
    confirmDelete(userId) {
      if (window.confirm("Tem certeza que deseja deletar?")) {
        this.deleteUser(userId);
      }
    },
    created() {
      this.getAllUsers();
    }
  }
};
</script>

