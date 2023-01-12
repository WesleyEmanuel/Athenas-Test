import Vue from "vue";
import App from "./App.vue";
// import "./assets/style.css";
import { bootstrap, bootstrapIcons } from "./bootstrap";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./plugins/axios";

Vue.config.productionTip = false;

Vue.use(bootstrap);
Vue.use(bootstrapIcons);
Vue.use(BootstrapVue);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
