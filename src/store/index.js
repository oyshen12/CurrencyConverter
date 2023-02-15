import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { fx } from "money";

Vue.use(Vuex);

const RUB = {
  CharCode: "RUR",
  Name: "Российский рубль",
  ID: "ID_RUR",
};
const popularCurrencies = (cur) =>
  cur.CharCode === "EUR" || cur.CharCode === "USD" || cur.CharCode === "RUR";

export default new Vuex.Store({
  state: {
    currencies: [RUB],
    avaibleCurrencies: {},
    wantBuyCurrencies: {},
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
    setaAaibleCurrencies(state, payload) {
      state.avaibleCurrencies = { ...state.avaibleCurrencies, ...payload };
    },
    setwWantBuyCurrencies(state, payload) {
      state.wantBuyCurrencies = { ...state.wantBuyCurrencies, ...payload };
    },
  },
  actions: {
    async downloadCurrencies({ commit, state }) {
      const link = "https://www.cbr-xml-daily.ru/daily_json.js";
      try {
        const { data } = await axios.get(link);
        const currenciesObj = data.Valute;
        const currencies = [];
        fx.base = "RUR";
        for (const cur in currenciesObj) {
          currencies.push({ ...currenciesObj[cur] });
          fx.rates[cur] = currenciesObj[cur].Value;
        }
        fx.rates["RUR"] = 1;
        if (Object.keys(state.avaibleCurrencies).length === 0) {
          const Usd = currencies.find((el) => el.CharCode === "USD");
          commit("setaAaibleCurrencies", RUB);
          commit("setwWantBuyCurrencies", Usd);
        }
        commit("setCurrencies", currencies);
      } catch (e) {
        console.Error(e);
      }
    },
  },
  modules: {},
});
