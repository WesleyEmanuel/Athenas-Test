<template>
  <div>
    <b-button v-b-modal.modal-center class="btn btn-success">
      <i class="bi bi-plus-lg"></i>
      Add Person
    </b-button>

    <b-modal
      id="modal-center"
      ref="create-person-modal"
      centered
      title="BootstrapVue"
    >
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
      <template #modal-footer>
        <b-button class="btn btn-success" @click="createPerson">
          <i class="bi bi-plus-lg"></i>
          Add Person
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      form: {},
    };
  },
  beforeMount() {},
  methods: {
    createPerson() {
      console.log(this.form);
      const newPerson = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        adress_name: this.form.adress,
        gender: this.form.gender,
        birthday: this.form.birthday,
      };

      this.$http.post("/persons", newPerson).then(() => {
        this.$emit("updatePersonList");
        this.$refs["create-person-modal"].hide();
      });
    },
  },
};
</script>

<style></style>
