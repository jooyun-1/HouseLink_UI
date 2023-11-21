<script setup>
import axios from 'axios'
const props = defineProps({ r: Object })

const toDetail = () => {
  const detailModal = document.querySelector('#detailModal')
  detailModal.showModal()
  axios
    .get('http://localhost:8080/review/' + props.r.aptCode + '/' + props.r.reviewId)
    .then((res) => {
      let emailInput = document.querySelector('#emailInput')
      emailInput.value = res.data.email
      console.log(emailInput.value)
      let content = document.querySelector('#content')
      content.textContent = res.data.content
      let date = document.querySelector('#date')
      console.log(res.data)
      date.value = res.data.createdAt[0] + '.' + res.data.createdAt[1] + '.' + res.data.createdAt[2]
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <tr v-if="r.content.length > 10">
    <td class="text-center"></td>
    <td class="text-center">
      {{ r.email }}
    </td>
    <td class="text-center">{{ r.content.substring(0, 10) }}...</td>
    <td class="text-center">{{ r.createdAt[0] }}.{{ r.createdAt[1] }}.{{ r.createdAt[2] }}</td>
    <td>
      <button id="toDetail" class="btn btn-sm" @click="toDetail">상세보기</button>
    </td>
  </tr>
  <tr v-else>
    <td class="text-center"></td>
    <td class="text-center">
      {{ r.email }}
    </td>
    <td class="text-center">{{ r.content }}</td>
    <td class="text-center">{{ r.createdAt[0] }}.{{ r.createdAt[1] }}.{{ r.createdAt[2] }}</td>
    <td>
      <button id="toDetail" class="btn btn-sm" @click="toDetail">상세보기</button>
    </td>
  </tr>
  <dialog id="detailModal" class="modal">
    <div class="modal-box flex flex-col justify-center w-[25rem]">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        type="text"
        id="emailInput"
        placeholder="Email"
        maxlength="50"
        class="input input-bordered w-full max-w-md"
        readonly
      />
      <label class="label">
        <span class="label-text">내용</span>
      </label>
      <textarea
        id="content"
        class="textarea textarea-bordered h-24"
        placeholder="내용"
        readonly
      ></textarea>
      <label class="label">
        <span class="label-text">날짜</span>
      </label>
      <input
        type="text"
        id="date"
        placeholder="날짜"
        maxlength="20"
        class="input input-bordered w-full max-w-md"
        readonly
      />
    </div>
  </dialog>
</template>

<style scoped></style>
