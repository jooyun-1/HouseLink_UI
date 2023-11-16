<script setup>
import Header from './Header.vue'
import Search from './Search.vue'

// import {useRouter} from "vue-router";
// const router = useRouter();
</script>

<template>
  <Header />
  <Search />
  <footer class="bg-slate-200 w-screen min-h-[5rem] h-[5rem] flex justify-center items-center">
    <span class="text-xs text-slate-500">Copyright © SAFFY 14반 권순준 주윤</span>
  </footer>
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
