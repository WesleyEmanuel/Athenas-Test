<template>
    <div class="w-100">
      <b-alert
        v-model="showErrorAlert"
        class="position-fixed fixed-top m-auto mt-2 w-25"
        style="z-index: 2000;"
        variant="danger"
      >
        Todos os campos são obrigatórios
      </b-alert>
        <div class="mb-3">
          <label class="form-label">First Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            v-model="form.first_name"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Last Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Last Name"
            v-model="form.last_name"
          />
        </div>
        <div class="mb-3 d-flex align-items-center gap-3">
          <div class="w-50">
            <label class="form-label">Gender</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="form.gender"
            >
              <option value="Female" selected>Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div class="w-50">
            <label for="exampleFormControlInput1" class="form-label"
              >Birthday</label
            >
            <input type="date" class="form-control" v-model="form.birthday" />
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Adress</label>
          <input
            type="tex"
            class="form-control"
            placeholder="Adress"
            v-model="form.adress"
          />
        </div>
        <div class="w-100 d-flex flex-row-reverse mt-3">
            <b-button class="btn btn-success w-25" @click="updatePerson">
                Save
            </b-button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props:{
        person: Object
    },
    data() {
      return {
        showModal: false,
        form: {},
        showErrorAlert: false
      };
    },
    beforeMount() {
        console.log(this.person)
        this.loadPersonForm();
    },
    methods: {
        updatePerson(){

        },
        loadPersonForm(){
            this.form = {
                first_name: this.person["First Name"],
                last_name: this.person["Last Name"],
                adress: this.person.Adress,
                gender: this.person.Gender,
                birthday: this.person["Date of Birth"],
            }
        }
    },
  };
  </script>
  
  <style></style>
  