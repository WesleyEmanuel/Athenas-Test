<template>
  <div>
    <h2 class="text-secondary">Person Data</h2>
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-success h-75">
        <i class="bi bi-plus-lg"></i>
        Add Person
      </button>

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
      key-expr="ID"
      :columns="columns"
      :show-borders="true"
      class="mt-2"
    />
  </div>
</template>

<script>
import DxDataGrid from "devextreme-vue/data-grid";
import { customers } from "../data";

export default {
  components: {
    DxDataGrid,
  },
  data() {
    return {
      dataSource: customers,
      columns: ["CompanyName", "City", "State", "Phone", "Fax"],
    };
  },
};
</script>

<style scoped></style>
