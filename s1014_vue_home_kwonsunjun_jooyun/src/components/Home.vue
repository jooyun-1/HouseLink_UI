<script setup>
import Header from './Header.vue'
import Search from './Search.vue'
import Footer from './Footer.vue'
// import {useRouter} from "vue-router";
// const router = useRouter();
</script>

<template>
  <Header />
  <Search />
  <Footer />
</template>

<style>
.menus {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1.3rem;
  line-height: 1.25rem;
  padding: 0.5rem;
  margin: auto;
}

.menus-item {
  margin-right: 55px;
}
</style>
