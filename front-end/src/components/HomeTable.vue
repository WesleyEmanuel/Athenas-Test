<template>
  <div style="width: 70%">
    <b-alert
      v-model="showAlert"
      class="position-fixed fixed-top m-auto mt-2 w-25 text-center"
      style="z-index: 2000"
      :variant="alert.alertColor"
    >
      {{ alert.alertMessage }}
    </b-alert>
    <h2 class="text-secondary">Person Data</h2>
    <div class="d-flex justify-content-between">
      <ModalCreatePerson @updatePersonList="updatePersonList" />
      <div>
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="search by id"
          v-model="search"
        />
      </div>
    </div>
    <DxDataGrid
      :data-source="dataSource"
      key-expr="id"
      :columns="columns"
      :show-borders="true"
      class="mt-2"
      :show-column-lines="true"
      :show-row-lines="true"
      :row-alternation-enabled="true"
    >
      <DxPaging :page-size="10" />
      <DxPager
        :visible="true"
        :allowed-page-sizes="pageSizes"
        :display-mode="displayMode"
        :show-page-size-selector="showPageSizeSelector"
        :show-info="showInfo"
        :show-navigation-buttons="showNavButtons"
      />
      <DxColumn data-field="id" width="70" />
      <DxColumn data-field="First Name" />
      <DxColumn data-field="Last Name" />
      <DxColumn data-field="Gender" />
      <DxColumn data-field="Adress" />
      <DxColumn data-field="Date of Birth" />
      <DxColumn
        :allow-sorting="false"
        data-field="Actions"
        cell-template="editButton"
      />
      <template #editButton="{ data }">
        <div class="d-flex gap-3">
          <b-button
            class="btn btn-warning btn-sm w-50"
            @click="openModal(data)"
          >
            Edit
          </b-button>
          <b-modal
            :id="data.data.id"
            :ref="data.data.id"
            centered
            title="Update Person"
          >
            <ModalUpdatePerson
              :person="data.data"
              class="w-50"
              @updatePersonList="updatePersonList"
              @hideUpdateModal="hideUpdateModal(data)"
            />
            <template #modal-footer>
              <div></div>
            </template>
          </b-modal>
          <b-button
            class="btn btn-danger btn-sm w-50"
            @click="openDeleteModal()"
          >
            Delete
          </b-button>
          <b-modal
            :id="data.data.id"
            ref="delete-modal"
            centered
            class="text-center"
          >
            Do you want to delete this person
            <template #modal-footer>
              <b-button
                class="btn btn-danger btn-sm btn-light"
                @click="hideDeleteModal()"
              >
                Cancel
              </b-button>
              <b-button
                class="btn btn-danger btn-sm"
                @click="deletePerson(data.data.id)"
              >
                Delete
              </b-button>
            </template>
          </b-modal>
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging,
} from "devextreme-vue/data-grid";
import ModalCreatePerson from "./ModalCreatePerson.vue";
import ModalUpdatePerson from "./ModalUpdatePerson.vue";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPager,
    DxPaging,
    ModalCreatePerson,
    ModalUpdatePerson,
  },
  data() {
    return {
      dataSource: [],
      columns: [
        "Id",
        "First Name",
        "Last Name",
        "Gender",
        "Adress",
        "Date of Birth",
        "Actions",
      ],
      search: "",
      showAlert: false,
      alert: {
        alertMessage: "",
        alertColor: "",
      },
      displayModes: [
        { text: "Display Mode 'full'", value: "full" },
        { text: "Display Mode 'compact'", value: "compact" },
      ],
      displayMode: "full",
      pageSizes: [5, 10, "all"],
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,
    };
  },
  watch: {
    search(value) {
      this.updatePersonList(value);
      console.log(this.dataSource);
    },
  },
  mounted() {
    this.updatePersonList();
  },
  methods: {
    async updatePersonList(search) {
      const url = search ? `/persons/${search}` : "/persons";
      await this.$http.get(url).then((resp) => {
        console.log(resp.data);
        this.dataSource = Array.isArray(resp.data.persons)
          ? resp.data.persons.map((person) => {
              return {
                id: person.id.toString(),
                "First Name": person.first_name,
                "Last Name": person.last_name,
                Gender: person.gender,
                Adress: person.adress_name,
                "Date of Birth": person.birthday,
              };
            })
          : [
              {
                id: resp.data.id.toString(),
                "First Name": resp.data.first_name,
                "Last Name": resp.data.last_name,
                Gender: resp.data.gender,
                Adress: resp.data.adress_name,
                "Date of Birth": resp.data.birthday,
              },
            ];
      });
    },
    openModal(data) {
      const id = data.data.id;
      this.$refs[id].show();
    },
    hideUpdateModal(data) {
      const id = data.data.id;
      this.$refs[id].hide();
    },
    deletePerson(id) {
      this.$http.delete(`/persons/${id}`).then((resp) => {
        if (resp.status == 200) {
          this.alertFeedBack("Successfully deleted person", "success");
          this.updatePersonList();
        }
      });
    },
    alertFeedBack(message, color) {
      this.showAlert = true;
      this.alert.alertMessage = message;
      this.alert.alertColor = color;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    },
    openDeleteModal() {
      this.$refs["delete-modal"].show();
    },
    hideDeleteModal() {
      this.$refs["delete-modal"].hide();
    },
  },
};
</script>

<style scoped></style>
