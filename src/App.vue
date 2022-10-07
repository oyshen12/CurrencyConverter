<template>
  <v-app class="app__wrapper">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span class="header__title">Currency Converter</span>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <div class="converter__wrapper">
        <converter-component
          title="У меня есть"
          :availableCurrency="avaibleCurrencies"
          :wantBuyCurrencies="wantBuyCurrencies"
          :changeAvailableCurrency="setaAaibleCurrencies"
          :main="true"
        ></converter-component>
        <div class="converter-arrows"></div>
        <converter-component
          title="Хочу приобрести"
          :availableCurrency="wantBuyCurrencies"
          :wantBuyCurrencies="avaibleCurrencies"
          :changeAvailableCurrency="setwWantBuyCurrencies"
        ></converter-component>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import ConverterComponent from "@/components/ConverterComponent.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "App",

  components: { ConverterComponent },

  data: () => ({
    //
  }),
  methods: {
    ...mapMutations(["setaAaibleCurrencies", "setwWantBuyCurrencies"]),
    ...mapActions(["downloadCurrencies"]),
  },
  computed: {
    ...mapState(["avaibleCurrencies", "wantBuyCurrencies"]),
  },

  mounted() {
    this.downloadCurrencies();
  },
};
</script>

<style>
.app__wrapper {
  justify-content: center !important;
}
.converter__wrapper {
  display: flex;
  max-width: 930px;
  width: 100%;
  justify-content: space-between;
  height: 303px;
  align-items: center;
  margin-top: 64px;
}
.converter-arrows {
  width: 50px;
  height: 50px;
  background: url("@/assets/transfer-svgrepo-com.svg") no-repeat 50%;
  background-size: 50px;
  margin: 0 auto;
  margin-top: 50px;
}
@media (max-width: 930px) {
  .converter__wrapper {
    flex-direction: column;
    align-items: center;
    justify-content: unset;
    height: auto;
    margin-top: 24px;
  }
  .converter-arrows {
    transform: rotate(90deg);
    margin: 0;
  }
}
.v-main__wrap {
  display: flex;
  justify-content: center;
}
.v-menu__content {
  margin-top: 6px;
  left: auto !important;
  max-width: 930px;
  width: 100%;
}
.header__title {
  font-size: 24px;
}
</style>
