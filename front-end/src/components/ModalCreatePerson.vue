<template>
  <div>
    <b-alert
      v-model="showAlert"
      class="position-fixed fixed-top m-auto mt-2 w-25 text-center"
      style="z-index: 2000"
      :variant="alert.alertColor"
    >
      {{ alert.alertMessage }}
    </b-alert>
    <b-button v-b-modal.modal-center class="btn btn-success" @click="clearForm">
      <i class="bi bi-plus-lg"></i>
      Add Person
    </b-button>

    <b-modal
      id="modal-center"
      ref="create-person-modal"
      centered
      title="Create Person"
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
        <b-button
          class="btn btn-success"
          @click="createPerson"
          :disabled="loadingCreatingPerson"
        >
          <b-spinner small v-if="loadingCreatingPerson"></b-spinner>
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
      showAlert: false,
      alert: {
        alertMessage: "",
        alertColor: "",
      },
      loadingCreatingPerson: false,
    };
  },
  beforeMount() {},
  methods: {
    createPerson() {
      this.loadingCreatingPerson = true;
      if (
        !this.form.first_name ||
        !this.form.last_name ||
        !this.form.adress ||
        !this.form.gender ||
        !this.form.birthday
      ) {
        this.alertFeedBack("All fields are mandatory", "danger");
        this.loadingCreatingPerson = false;
        return;
      }
      const newPerson = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        adress_name: this.form.adress,
        gender: this.form.gender,
        birthday: this.form.birthday,
      };

      this.$http
        .post("/persons", newPerson)
        .then((resp) => {
          if (resp.status == 201) {
            this.$emit("updatePersonList");
            this.$refs["create-person-modal"].hide();
            this.alertFeedBack("Registration done successfully", "success");
            this.loadingCreatingPerson = false;
          } else {
            this.alertFeedBack("Error when registering", "danger");
            this.loadingCreatingPerson = false;
          }
        })
        .catch(() => {
          this.loadingCreatingPerson = false;
          this.alertFeedBack("Error when registering", "danger");
        });
    },
    clearForm() {
      this.form = {};
    },
    alertFeedBack(message, color) {
      this.showAlert = true;
      this.alert.alertMessage = message;
      this.alert.alertColor = color;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    },
  },
};
</script>

<style></style>
