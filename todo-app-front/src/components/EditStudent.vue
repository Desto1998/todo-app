<template>
  <div class="submit-form">
    <h3>Editer un eleve</h3>
    <div v-if="!submitted">
      <form>
        <div class="row">
          <div class="form-group col-md-6">
        <label for="firstname">Nom</label>
        <input type="text" class="form-control" id="title" required v-model="student.firstname" name="firstname" />
      </div>

      <div class="form-group col-md-6">
        <label for="lastname">Prenom</label>
        <input class="form-control" id="description" required v-model="student.lastname" name="lastname"/>
      </div>
      </div>

        <div class="row">
          <div class="form-group col-md-6">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" required v-model="student.email" name="email" />
      </div>

      <div class="form-group col-md-6">
        <label for="phone">Phone</label>
        <input class="form-control" id="phone" required v-model="student.phone" name="phone"/>
      </div>

      </div>
        <div class="row">
          <div class="form-group col-md-6">
        <label for="adresse">Adresse</label>
        <input type="text" class="form-control" id="adresse" required v-model="student.adresse" name="adresse" />
      </div>

      <div class="form-group col-md-6">
        <label for="phone">Ville</label>
        <input type="tel" class="form-control" id="phone" required v-model="student.phone" name="phone"/>
      </div>
      </div>
      <div class="row">
          <div class="form-group col-md-6">
        <label for="age">Age</label>
        <input type="number" class="form-control" id="age" required v-model="student.age" name="age" />
      </div>

      <div class="form-group col-md-6">
        <label for="datebirth">Date de naissance</label>
        <input type="date" class="form-control" id="datebirth" required v-model="student.datebirth" name="datebirth"/>
      </div>
      </div>
      <div class="row">
          <div class="form-group col-md-6">
        <label for="sexe">Sexe</label>
        <select name="sexe" id="sexe" class="form-control" v-model="student.sexe">
          <option>M</option>
          <option>F</option>
        </select>
      </div>

      <div class="form-group col-md-6">
        <label for="description">Classe</label>
        <input type="text" class="form-control" id="classe" required v-model="student.classe" name="classe"/>
      </div>
      </div>
      <button @click="saveStudent" class="btn btn-success mt-3">Enregistrer</button>
      </form>
    
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newStudent">Nouveau</button>
    </div>
  </div>
  </template>
  <script>

  import ApiService from '@/service/ApiService';
  export default {
    name: 'EditStudent',
    data() {
    return {
      student: {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        adresse: "",
        town: "",
        age: "",
        datebirth: "",
        sexe: "",
        classe: ""
      },
      submitted: false
    }
  },

  methods: {
    studentID () {
      return this.$route.query.id
    },
    getStudent () {
      ApiService.get(this.studentID())
        .then(response => {
          // this.student.id = response.data.id;
          this.student.firstname = response.data.firstname;
          this.student.lastname = response.data.lastname;
          this.student.email = response.data.email;
          this.student.phone = response.data.phone;
          this.student.adresse = response.data.adresse;
          this.student.town = response.data.town;
          this.student.age = response.data.age;
          this.student.datebirth = response.data.datebirth;
          this.student.sexe = response.data.sexe;
          this.student.classe = response.data.classe;
          // this.student = response.data;
          console.log(this.student);
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveStudent() {
      var data = this.student
    console.log(data);
      ApiService.update(this.$route.query.id , data)
        .then(response => {
          this.student.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newStudent() {
      this.submitted = false;
      this.stutdent = {};
    }
  },
  mounted() {
   this.studentID(),
   this.getStudent()
  },
};
</script>

<style>
</style>
  
  
  