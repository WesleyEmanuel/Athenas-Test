import Vue from "vue";
import App from "./App.vue";
// import "./assets/style.css";
import { bootstrap, bootstrapIcons } from "./bootstrap";

Vue.config.productionTip = false;

Vue.use(bootstrap);
Vue.use(bootstrapIcons);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
