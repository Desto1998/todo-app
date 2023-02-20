<template>
  <div class="container">
    <h2>Liste des eleves</h2>
    <h4 class="text-center my-2">Formulaire de recherche</h4>
    <div id="reseach" class="row justify-content-end text-right mb-5 mt-2">
      <div class="form-group col-md-6">
        <input type="search" v-model="name" id="name" class="form-control" @change="searchByName" placeholder="Rechercher avec le nom"/>
      </div>
      <div class="form-group col-md-6"> 
        <input type="search" v-model="classe" id="classe" @change="searchByClass" class="form-control" placeholder="Rechercher avec la classe"/>
      </div>
      
    </div>
    <table class="table table-striped text-center">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Prenom</th>
          <th scope="col">E-mail</th>
          <th scope="col">Telephone</th>
          <th scope="col">date naissance</th>
          <th scope="col">Classe</th>
          <th scope="col">Age</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <!-- Diretiva "v-for" para pegar os usuários da API -->
        <tr v-for="(student, index) in students" :key="index" class="m-5">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ student.firstname }}</td>
          <td>{{ student.lastname }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone }}</td>
          <td>{{ student.datebirth }}</td>
          <td>{{ student.classe }}</td>
          <td>{{ student.age }}</td>

          <td>
            <form>
              <!-- <button v-on:click.prevent="emitShowModal(user)" class="btn btn-sm btn-info mr-1">Editar</button> -->
              <button
                v-on:click="deleteStudent(student.id)"
                type="submit"
                class="btn btn-sm btn-danger"
              >
                Supprimer
              </button>
              <router-link
                tag="button"
                class="btn btn-warning mx-2 btn-sm"
                :to="{ name: 'studentDetail', query: { id: student.id } }"
                ><i class="fa fa-edit">Editer</i></router-link
              >
            </form>
          </td>
        </tr>
        <!-- Fim "v-for" -->
      </tbody>
    </table>
  </div>
</template> 
<script>
import ApiService from "@/service/ApiService";
export default {
  name: "StudentList",
  data() {
    return {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      title: "",
      name : "",
      classe : ""
    };
  },
  methods: {
    retrieveStudents() {
      ApiService.getAll()
        .then((response) => {
          this.students = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveStudents();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveStudent(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllStudent() {
      ApiService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteStudent(id) {
      ApiService.delete(id)
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchByName() {
      if(this.name.length >= 1){
        ApiService.findByName(this.name)
        .then((response) => {
          this.students = response.data;
          console.log(response.data);
          if(this.students.length<1){
            alert("Aucune donnee trouvee pour: " + this.name)
            this.retrieveStudents();
          }
            
        })
        .catch((e) => {
          console.log(e);
        });
      }else{
        this.retrieveStudents();
      }
      
    },
    searchByClass() {
      if(this.classe.length >= 1){
        ApiService.findByClass(this.classe)
        .then((response) => {
          this.students = response.data;
          console.log(response.data);
          if(this.students.length < 1){
            alert("Aucune donnee trouvee pour: " + this.classe)
            this.retrieveStudents();
          }
            
        })
        .catch((e) => {
          console.log(e);
        });
      }else{
        this.retrieveStudents();
      }
      
    },
  },
  mounted() {
    this.retrieveStudents();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
 