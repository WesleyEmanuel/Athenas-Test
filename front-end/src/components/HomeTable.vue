<template>
  <div style="width: 70%">
    <h2 class="text-secondary">Person Data</h2>
    <div class="d-flex justify-content-between">
      <ModalCreateUser @updatePersonList="updatePersonList" />
      <div>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="search"
        />
      </div>
    </div>
    <DxDataGrid
      :data-source="dataSource"
      key-expr="id"
      :columns="columns"
      :show-borders="true"
      class="mt-2"
      style="max-height: 500px"
    />
  </div>
</template>

<script>
import DxDataGrid from "devextreme-vue/data-grid";
import ModalCreateUser from "./ModalCreateUser.vue";

export default {
  components: {
    DxDataGrid,
    ModalCreateUser,
  },
  data() {
    return {
      dataSource: [],
      columns: ["First Name", "Last Name", "Gender", "Adress", "Date of Birth"],
    };
  },
  mounted() {
    this.updatePersonList();
  },
  methods: {
    updatePersonList() {
      this.$http.get("/persons").then((resp) => {
        const persons = resp.data.persons.map((person) => {
          return {
            id: person.id,
            "First Name": person.first_name,
            "Last Name": person.last_name,
            Gender: person.gender,
            Adress: person.adress_name,
            "Date of Birth": person.birthday,
          };
        });

        this.dataSource = persons;
      });
    },
  },
};
</script>

<style scoped></style>
