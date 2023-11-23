<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
import ReviewListItem from './ReviewListItem.vue'
import router from '../router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const reviews = ref([])
onMounted(() => {
  getAllList()
})

const getAllList = () => {
  // const apartmentname = getApartName()

  axios
    .get('http://localhost:8080/review')
    .then((response) => {
      reviews.value = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

const myReview = () => {
  const email = localStorage.getItem('email')
  if (email) {
    axios
      .get('  http://localhost:8080/review/myreview/' + email)
      .then((response) => {
        reviews.value = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  } else {
    alert('로그인이 필요합니다!!')
  }
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

        <!-- <button
          id="review"
          @click="goForm()"
          class="bg-indigo-500 hover:bg-indigo-400 px-10 py-2 font-semibold text-white rounded-full absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          리뷰 작성
        </button> -->
      </div>
    </section>
    <section id="reviewSection">
      <main id="reviewMain" class="pt-10 w-screen bg-neutral-50 flex flex-col justify-center">
        <h1 id="apartmentname" class="font-bold text text-center text-2xl">전체 리뷰</h1>

        <div>
          <button id="myReviewBtn" class="btn btn-neutral btn-sm" @click="myReview">
            내 리뷰 보기
          </button>
          <div>
            <h2 class="font-bold text-center text-2xl"></h2>
            <table id="reviewTable" class="table text-center">
              <thead>
                <tr class="text-center">
                  <th class="text-center"></th>
                  <th class="text-center">Email</th>
                  <th class="text-center">아파트명</th>
                  <th class="text-center">내용</th>
                  <th class="text-center">날짜</th>
                </tr>
              </thead>
              <tbody id="tb">
                <ReviewListItem v-for="review in reviews" :r="review" />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  </div>
  <Footer id="footer" />
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
#reviewTable {
  margin-top: 50px;
}
#reviewSection {
  flex-grow: 1;
}
#myReviewBtn {
  position: absolute;
  right: 0;
  width: 150px;
}
</style>
