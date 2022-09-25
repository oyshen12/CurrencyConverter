import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
Vue.config.productionTip = false;

const handlers = new Map();
function updateHandler(el, binding) {
  el.removeEventListener("input", handlers.get(el));

  const childInput = el.querySelector("input");
  const handler = () => {
    const value = childInput.value.replace(/\D/g, "").slice(0, binding.value);
    if (value !== childInput.value) {
      childInput.value = value;
      childInput.dispatchEvent(new Event("input"));
    }
  };
  handler();
  handlers.set(childInput, handler);

  el.addEventListener("input", handler);
}
Vue.directive("maxlen", {
  bind: updateHandler,
  update: updateHandler,
  unbind(el) {
    el.removeEventListener("input", handlers.get(el));
    handlers.delete(el);
  },
});

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
