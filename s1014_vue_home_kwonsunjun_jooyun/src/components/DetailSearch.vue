<script setup>
import Header from '../components/Header.vue'
</script>

<template lang="">
  <head>
    <link
      rel="stylesheet"
      as="style"
      crossorigin
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable.css"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/daisyui@3.6.4/dist/full.css"
      rel="stylesheet"
      type="text/css"
    />
  </head>
  <Header />
  <div>
    <section>
      <div class="bg-black relative">
        <img src="../assets/banner.jpg" alt="" class="w-screen max-h-96 object-cover opacity-60" />
        <div
          class="w-full flex flex-wrap gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center"
        >
          <input
            type="text"
            placeholder="아파트 또는 지역명을 입력하세요"
            id="searchInput"
            class="input input-bordered input-md w-full max-w-xs"
          />
        </div>
        <button
          id="search"
          @click="search()"
          class="bg-indigo-500 hover:bg-indigo-400 px-10 py-2 font-semibold text-white rounded-full absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          검색하기
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
#searchInput {
  width: 800px;
}
</style>
