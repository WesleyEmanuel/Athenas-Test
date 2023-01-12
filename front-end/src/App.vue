<template>
  <div
    class="m-auto d-flex flex-column align-items-center justify-content-center gap-5 mt-4"
  >
    <h2>Ajax CRUD with Bootstrap modals and Datatables</h2>
    <HomeTable />
  </div>
</template>

<script>
import HomeTable from "./components/HomeTable.vue";

export default {
  name: "App",
  components: {
    HomeTable,
  },
};
</script>

<style></style>
