<template>
  <div style="width: 70%">
    <h2 class="text-secondary">Person Data</h2>
    <div class="d-flex justify-content-between">
      <ModalCreatePerson @updatePersonList="updatePersonList" />
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
    >
      <DxColumn
        data-field="First Name"
      />
      <DxColumn
        data-field="Last Name"
      />
      <DxColumn
        data-field="Gender"
      />
      <DxColumn
        data-field="Adress"
      />
      <DxColumn
        data-field="Date of Birth"
        data-type="date"
      />
      <DxColumn
        :allow-sorting="false"
        data-field="Actions"
        cell-template="editButton"
      />
      <template #editButton="{data}">
        <div class="d-flex gap-3">
          <b-button class="btn btn-warning btn-sm w-50" @click="openModal(data)">
            Edit
          </b-button>
          <b-modal
            :id=data.data.id
            :ref=data.data.id
            centered
            title="Update Person"
          >
            <ModalUpdatePerson :person="data.data" class="w-50"/>
            <template #modal-footer>
              <div></div>
            </template>
          </b-modal>
          <b-button class="btn btn-danger btn-sm w-50">
            Delete
          </b-button>
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>

<script>
import { DxDataGrid, DxColumn} from "devextreme-vue/data-grid";
import ModalCreatePerson from "./ModalCreatePerson.vue";
import ModalUpdatePerson from "./ModalUpdatePerson.vue";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    ModalCreatePerson,
    ModalUpdatePerson
  },
  data() {
    return {
      dataSource: [],
      columns: ["First Name", "Last Name", "Gender", "Adress", "Date of Birth", "Actions"],
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
    teste(data){
      console.log(data.data)
    },
    openModal(data){
      const id = data.data.id;
      this.$refs[id].show();
    }
  },
};
</script>

<style scoped></style>
