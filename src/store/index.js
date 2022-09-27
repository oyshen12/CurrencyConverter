import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const RUB = { CharCode: "RUR", Name: "Российский рубль", ID: "ID_RUR" };
const popularCurrencies = (cur) =>
  cur.CharCode === "EUR" || cur.CharCode === "USD" || cur.CharCode === "RUR";

export default new Vuex.Store({
  state: {
    currencies: [RUB],
  },
  getters: {
    popularCurrencies(state) {
      return state.currencies.filter((cur) => popularCurrencies(cur));
    },
    allCurrencies(state) {
      return state.currencies.filter((cur) => !popularCurrencies(cur));
    },
  },
  mutations: {
    setCurrencies(state, payload) {
      state.currencies = [RUB, ...payload];
    },
  },
  actions: {
    async downloadCurrencies({ commit }) {
      const { data } = await axios.get(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      );
      const currenciesObj = data.Valute;
      const currencies = [];
      for (const cur in currenciesObj) {
        currencies.push(currenciesObj[cur]);
      }
      commit("setCurrencies", currencies);
    },
  },
  modules: {},
});
