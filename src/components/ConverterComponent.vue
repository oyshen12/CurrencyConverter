<template>
  <div class="converter-wrap d-flex flex-column">
    <span class="my-3">{{ title ?? "Валюта" }}</span>
    <div class="btn__wrapper">
      <my-btn
        v-for="currency in popularCurrencies"
        :changeAvailableCurrency="changeAvailableCurrency"
        :currency="currency"
        :key="currency.ID"
        :active="availableCurrency.ID === currency.ID"
      ></my-btn>
      <my-btn
        :currency="defaultLastCurrencie"
        :changeAvailableCurrency="changeAvailableCurrency"
        :active="defaultLastCurrencie.ID === availableCurrency.ID"
        >{{ defaultLastCurrencie.CharCode }}</my-btn
      >
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed color="white" v-bind="attrs" v-on="on">↓</v-btn>
        </template>
        <v-list class="list-wrap px-4">
          <v-list-item
            v-for="currency in allCurrencies"
            :key="currency.ID"
            @click="listCurrencyClick(currency)"
          >
            <v-tooltip top v-if="currency.Name.length > 22">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-title v-bind="attrs" v-on="on">{{
                  currency.Name
                }}</v-list-item-title>
              </template>
              <span>{{ currency.Name }}</span>
            </v-tooltip>
            <v-list-item-title v-else>{{ currency.Name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <my-input
      :wantBuyCurrencies="wantBuyCurrencies"
      :availableCurrency="availableCurrency"
      :changeAvailableCurrency="changeAvailableCurrency"
      class="my-6"
    ></my-input>
  </div>
</template>

<script>
import MyBtn from "@/components/MyBtn.vue";
import MyInput from "@/components/MyInput.vue";
import { mapGetters, mapState } from "vuex";

export default {
  props: [
    "title",
    "availableCurrency",
    "changeAvailableCurrency",
    "wantBuyCurrencies",
  ],
  components: {
    MyBtn,
    MyInput,
  },
  data() {
    return {
      defaultLastCurrencie: {},
    };
  },
  methods: {
    listCurrencyClick(currency) {
      this.defaultLastCurrencie = currency;
      this.changeAvailableCurrency(currency);
    },
  },
  computed: {
    ...mapState(["currencies"]),
    ...mapGetters(["popularCurrencies", "allCurrencies"]),
  },
  watch: {
    availableCurrency(newvVal) {
      if (Object.keys(this.defaultLastCurrencie).length === 0) {
        this.defaultLastCurrencie = this.currencies.find(
          (el) => el.CharCode === "GBP"
        );
      }
    },
  },
};
</script>

<style scoped>
.converter-wrap {
  max-width: 405px;
}
.list-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
@media (max-width: 930px) {
  .list-wrap {
    grid-template-columns: 1fr;
    border: 1px solid #cdcdcd;
    padding: 0;
    margin: 200px 16px 8px 16px;
  }
}
.v-list-item {
  cursor: pointer;
  width: 245px;
}
.v-btn {
  border-radius: 0;
  border: 1px solid #cdcdcd !important;
  width: 100%;
  height: auto !important;
}
.btn__wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.v-list-item {
  border-radius: 4px;
}
.v-list-item:hover {
  background-color: lightblue;
}
</style>
