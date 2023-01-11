<template>
  <div
    class="w-75 m-auto d-flex flex-column align-items-center justify-content-center gap-5 mt-4"
  >
    <h1>Ajax CRUD with Bootstrap modals and Datatables</h1>
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
