<template>
  <div class="converter-wrap d-flex flex-column">
    <span class="my-3">{{ title ?? "Валюта" }}</span>
    <div class="btn__wrapper">
      <MainBtn
        v-for="currency in popularCurrencies"
        :changeAvailableCurrency="listCurrencyClick"
        :currency="currency"
        :key="currency.ID"
        :active="availableCurrency.ID === currency.ID"
      />
      <MainBtn
        :currency="defaultLastCurrencie"
        :changeAvailableCurrency="listCurrencyClick"
        :active="defaultLastCurrencie.ID === availableCurrency.ID"
        >{{ defaultLastCurrencie.CharCode }}</MainBtn
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
    <ConverterInput
      :wantBuyCurrencies="wantBuyCurrencies"
      :availableCurrency="availableCurrency"
      :changeAvailableCurrency="changeAvailableCurrency"
      v-model="inputValue"
      class="my-6"
    />
  </div>
</template>

<script>
import MainBtn from "@/components/MainBtn.vue";
import ConverterInput from "@/components/ConverterInput.vue";
import { mapGetters, mapState } from "vuex";
import { fx } from "money";

export default {
  props: [
    "title",
    "availableCurrency",
    "changeAvailableCurrency",
    "wantBuyCurrencies",
    "main",
  ],
  components: {
    MainBtn,
    ConverterInput,
  },
  data() {
    return {
      defaultLastCurrencie: {},
      inputValue: "",
      colorBtn: "white",
      currencyChange: false,
    };
  },
  methods: {
    listCurrencyClick(currency, popular = false) {
      if (!this.main) {
        currency.currencyChange = true;
        this.currencyChange = true;
        const value = this.calculationCourse(
          this.wantBuyCurrencies.inputValue,
          currency,
          this.wantBuyCurrencies
        );
        this.inputValue = value ? this.readbleNumber(value) : "";
      }
      if (!popular) {
        this.defaultLastCurrencie = currency;
      }
      this.changeAvailableCurrency(currency);
    },
    calculationCourse(
      num,
      availableCurrency = this.availableCurrency,
      wantBuyCurrencies = this.wantBuyCurrencies
    ) {
      const result = fx.convert(num, {
        from: availableCurrency.CharCode,
        to: wantBuyCurrencies.CharCode,
      });
      return isNaN(result) ? "" : result;
    },
    readbleNumber(num) {
      return Number.isInteger(num) ? num : num.toFixed(4);
    },
  },
  computed: {
    ...mapState(["currencies"]),
    ...mapGetters(["popularCurrencies", "allCurrencies"]),
  },
  provide: function () {
    return {
      calculationCourse: this.calculationCourse,
      readbleNumber: this.readbleNumber,
    };
  },
  watch: {
    availableCurrency(newvVal) {
      if (Object.keys(this.defaultLastCurrencie).length === 0) {
        this.defaultLastCurrencie = this.currencies.find(
          (el) => el.CharCode === "GBP"
        );
      }
    },
    wantBuyCurrencies(newVal) {
      if (this.main && newVal.currencyChange) {
        return;
      }
      const correctNumber = this.calculationCourse(newVal.inputValue);
      const expression = Math.abs(
        Number.parseFloat(correctNumber) -
          Number.parseFloat(this.inputValue === "" ? 0 : this.inputValue)
      );
      if (expression > 0.005) {
        this.inputValue =
          correctNumber !== 0 ? this.readbleNumber(correctNumber) : "";
      }
    },
    inputValue(newVal) {
      if (!this.main && this.currencyChange) {
        this.currencyChange = false;
        return;
      }
      this.changeAvailableCurrency({
        inputValue: newVal,
        currencyChange: false,
      });
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
