<script setup>
import Header from './Header.vue'
import router from '../router'

const toDetail = () => {}
const goForm = () => {
  router.push('/boardform')
}
</script>

<template>
  <Header />
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
  <div>
    <section>
      <div class="bg-black relative">
        <img src="../assets/banner.jpg" alt="" class="w-screen max-h-96 object-cover opacity-60" />
        <div
          class="w-full flex flex-wrap gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center"
        >
          <h1 style="color: ivory; font-size: 2rem; font-weight: bold">리뷰 게시판</h1>
        </div>

        <button
          id="review"
          @click="goForm()"
          class="bg-indigo-500 hover:bg-indigo-400 px-10 py-2 font-semibold text-white rounded-full absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          리뷰 작성
        </button>
      </div>
    </section>
    <section>
      <main class="pt-10 w-screen bg-neutral-50 flex flex-col justify-center">
        <div>
          <div>
            <h2 class="font-bold text-center text-2xl"></h2>
            <table class="table text-center">
              <thead>
                <tr>
                  <th class="text-center">번호</th>
                  <th class="text-center">제목</th>

                  <th class="text-center">날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td>1</td>
                  <td>완전 만족!</td>
                  <td>2023.11.16</td>
                  <td>
                    <button id="toDetail" class="btn btn-sm" @click="toDetail">상세보기</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<style scoped>
/* div {
  width: 100%;
  height: 300px;
} */
div.left {
  width: 50%;
  float: left;
  box-sizing: border-box;
}
div.right {
  width: 50%;
  float: right;
  box-sizing: border-box;
}
</style>
