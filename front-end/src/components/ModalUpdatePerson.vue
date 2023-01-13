<template>
  <div class="w-100">
    <b-alert
      v-model="showAlert"
      class="position-fixed fixed-top m-auto mt-2 w-25 text-center"
      style="z-index: 2000"
      :variant="alert.alertColor"
    >
      {{ alert.alertMessage }}
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
      <b-button
        class="btn btn-success w-25"
        @click="updatePerson"
        :disabled="loadingUpdatingPerson"
      >
        <b-spinner small v-if="loadingUpdatingPerson"></b-spinner>
        Save
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: Object,
  },
  data() {
    return {
      showModal: false,
      form: {},
      showAlert: false,
      alert: {
        alertMessage: "",
        alertColor: "",
      },
      loadingUpdatingPerson: false,
    };
  },
  beforeMount() {
    this.loadPersonForm();
  },
  methods: {
    updatePerson() {
      this.loadingUpdatingPerson = true;
      if (
        !this.form.first_name ||
        !this.form.last_name ||
        !this.form.adress ||
        !this.form.gender ||
        !this.form.birthday
      ) {
        this.alertFeedBack("All fields are mandatory", "danger");
        this.loadingUpdatingPerson = false;
        return;
      }

      const updatePerson = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        adress_name: this.form.adress,
        gender: this.form.gender,
        birthday: this.form.birthday,
      };

      this.$http
        .patch(`/persons/${this.person.id}`, updatePerson)
        .then((resp) => {
          if (resp.status == 200) {
            this.$emit("updatePersonList");
            this.$emit("hideUpdateModal");
            this.alertFeedBack("Edition registered successfully", "success");
            this.loadingUpdatingPerson = false;
          } else {
            this.alertFeedBack("Error registering edition", "danger");
            this.loadingUpdatingPerson = false;
          }
        })
        .catch(() => {
          this.loadingUpdatingPerson = false;
          this.alertFeedBack("Error registering edition", "danger");
        });
    },
    loadPersonForm() {
      this.form = {
        first_name: this.person["First Name"],
        last_name: this.person["Last Name"],
        adress: this.person.Adress,
        gender: this.person.Gender,
        birthday: this.person["Date of Birth"],
      };
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
