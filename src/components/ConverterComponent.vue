<template>
  <div class="converter-wrap d-flex flex-column">
    <span>У меня есть</span>
    <div class="d-flex">
      <my-btn nameCurrency="qwe">Rub</my-btn>
      <my-btn nameCurrency="qwe">Usd</my-btn>
      <my-btn nameCurrency="qwe">Dol</my-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">↓</v-btn>
        </template>
        <v-list class="list-wrap">
          <v-list-item v-for="item in 10">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <my-input></my-input>
  </div>
</template>

<script>
import MyBtn from "@/components/MyBtn.vue";
import MyInput from "@/components/MyInput.vue";

export default {
  components: {
    MyBtn,
    MyInput,
  },
  data() {
    return {};
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
.v-list-item {
  cursor: pointer;
  width: 245px;
}
</style>
