<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
import ReviewListItem from './ReviewListItem.vue'
import router from '../router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const reviews = ref([])
onMounted(() => {
  getAll()
})

const getApartName = () => {
  const str = document.querySelector('#apartmentname').textContent
  const apartmentname = str.replace('리뷰', '').substring(0, str.length - 4)
  return apartmentname
}
const getAll = () => {
  const apartmentname = getApartName()
  let aptcode = 0
  axios
    .get('http://localhost:8080/house/' + apartmentname)
    .then((res) => {
      console.log(res)
      aptcode = res.data
      axios.get('http://localhost:8080/review/' + aptcode).then((response) => {
        reviews.value = response.data
        console.log(response)
      })
    })
    .catch(function (error) {
      console.log(error)
    })
}
const toDetail = () => {
  const detailModal = document.querySelector('#detailModal')
  detailModal.showModal()
}
const goForm = () => {
  const apartmentname = getApartName()
  let aptcode = 0
  axios
    .get('http://localhost:8080/house/' + apartmentname)
    .then((res) => {
      console.log(res)
      aptcode = res.data
    })
    .catch(function (error) {
      console.log(error)
    })

  router.push({ name: 'reviewform', params: { name: apartmentname, aptcode: aptcode } })
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
    <section id="reviewSection">
      <main id="reviewMain" class="pt-10 w-screen bg-neutral-50 flex flex-col justify-center">
        <h1 id="apartmentname" class="font-bold text text-center text-2xl">
          {{ $route.params.name }} 리뷰
        </h1>
        <div>
          <div>
            <h2 class="font-bold text-center text-2xl"></h2>
            <table id="reviewTable" class="table text-center">
              <thead>
                <tr class="text-center">
                  <th class="text-center"></th>
                  <th class="text-center">Email</th>
                  <th class="text-center">내용</th>
                  <th class="text-center">날짜</th>
                </tr>
              </thead>
              <tbody id="tb">
                <ReviewListItem v-for="review in reviews" :r="review" />
                <!-- <tr >
                  <td class="text-center" v-for="review in reviews" :key="review">
                    {{ review.email }}
                  </td>
                  <td class="text-center" v-for="review in reviews" :key="review">
                    {{ review.content }}
                  </td>
                  <td class="text-center" v-for="review in reviews" :key="review">
                    {{ review.createdAt[0] }}.{{ review.createdAt[1] }}.{{ review.createdAt[2] }}
                  </td>
                  <td>
                    <button id="toDetail" class="btn btn-sm" @click="toDetail">상세보기</button>
                  </td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>


    <Footer id="footer" />
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
#reviewTable {
  margin-top: 50px;
}
#reviewSection {
  flex-grow: 1;
}
#footer {
  position: absolute;
  bottom: 0;
}
</style>
