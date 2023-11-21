<template lang="">
  <div>
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
    <header>
      <nav class="navbar md:flex p-2 px-12 max-w-7xl justify-between">
        <img
          src="../assets/logo.jpg"
          class="w-[10rem] h-[3rem] object-cover"
          alt=""
          @click="goHome()"
        />
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li>
              <RouterLink to="/"><a href="#">홈</a></RouterLink>
            </li>
            <li>
              <RouterLink to="/detailsearch"><a href="#">상세 검색</a></RouterLink>
            </li>
            <li><a href="#">리뷰 게시판</a></li>

            <li>
              <details>
                <summary>관심지역</summary>
                <ul class="p-2 bg-base-100">
                  <li><a>설정하기</a></li>
                  <li><a>둘러보기</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div class="">
          <button
            v-if="!loggedIn"
            id="loginBtn"
            onclick="loginModal.showModal()"
            class="btn btn-primary btn-sm"
            style="margin-right: 10px"
          >
            로그인
          </button>

          <button
            v-if="loggedIn"
            id="logoutBtn"
            @click="logout"
            class="btn btn-primary btn-sm"
            style="margin-right: 10px"
          >
            로그아웃
          </button>

          <button
            v-if="!loggedIn"
            id="signUpBtn"
            onclick="signUpModal.showModal()"
            class="btn btn-neutral btn-sm"
          >
            회원가입
          </button>
          <button
            v-if="loggedIn"
            id="deleteUserBtn"
            onclick="signUpModal.showModal()"
            class="btn btn-neutral btn-sm"
          >
            회원탈퇴
          </button>
        </div>
        <dialog id="loginModal" class="modal">
          <div class="modal-box flex flex-col justify-center w-[25rem]">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <label class="label">
              <span class="label-text">아이디</span>
            </label>
            <input
              type="text"
              id="loginid"
              placeholder="ID"
              maxlength="20"
              class="input input-bordered w-full max-w-md"
            />
            <label class="label">
              <span class="label-text">비밀번호</span>
            </label>
            <input
              type="password"
              id="loginpw"
              placeholder="PW"
              maxlength="20"
              class="input input-bordered w-full max-w-md"
            />
            <div class="flex gap-[10px] p-4 pl-0 pb-0">
              <button class="btn w-1/2" @click="moveSign">회원가입</button>
              <button class="btn btn-primary w-1/2" @click="login">로그인</button>
            </div>
          </div>
        </dialog>
        <dialog id="signUpModal" class="modal">
          <div class="modal-box flex flex-col justify-center w-[25rem]">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <label class="label">
              <span class="label-text">아이디</span>
            </label>
            <input
              type="text"
              id="signupid"
              placeholder="ID"
              maxlength="20"
              class="input input-bordered w-full max-w-md"
            />
            <label class="label">
              <span class="label-text">비밀번호</span>
            </label>
            <input
              type="password"
              id="signuppw"
              placeholder="PW"
              maxlength="20"
              class="input input-bordered w-full max-w-md"
            />
            <label class="label">
              <span class="label-text">이름</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름"
              maxlength="20"
              class="input input-bordered w-full max-w-md"
            />
            <label class="label">
              <span class="label-text">생년월일</span>
            </label>
            <input
              type="text"
              id="birth"
              placeholder="yy.mm.dd"
              maxlength="20"
              class="input input-bordered w-full max-w-md"
            />
            <div class="flex gap-[10px] p-4 pl-0 pb-0">
              <button class="btn btn-primary w-1/2" style="margin: auto" @click="signUp()">
                회원가입
              </button>
              <!-- <button class="btn btn-primary w-1/2" onclick="login()">로그인</button> -->
            </div>
          </div>
        </dialog>
      </nav>
    </header>
  </div>
</template>
<script setup>
import router from '../router'

import axios from 'axios'
import { ref, onMounted } from 'vue'

const loggedIn = ref(false)
const isAdmin = ref(false)
onMounted(() => {
  if (localStorage.getItem('Authorization')) {
    loggedIn.value = true
  } else {
    loggedIn.value = false
  }
})

// router.push('/signin')
const moveSign = () => {
  let loginModal = document.querySelector('#loginModal')
  loginModal.close()

  let signUpModal = document.querySelector('#signUpModal')
  signUpModal.showModal()
}

const signUp = () => {
  const signUpModal = document.querySelector('#signUpModal')
  const loginId = document.querySelector('#signupid').value
  const loginPass = document.querySelector('#signuppw').value
  const name = document.querySelector('#name').value
  const birth = document.querySelector('#birth').value

  const saveData = {}
  saveData.userId = loginId
  saveData.userPass = loginPass
  saveData.userName = name
  saveData.birth = birth

  try {
    axios
      .post('http://localhost:8080/users/signup', JSON.stringify(saveData), {
        headers: {
          'Content-Type': `application/json`
        }
      })
      .then((res) => {
        if (res.status === 200) {
          loggedIn.value = true
          console.log(res)
        }
      })
  } catch (error) {
    console.error(error)
  }
  signUpModal.close()
}

const goHome = () => {
  router.push('/')
}

const login = () => {
  const loginModal = document.querySelector('#loginModal')
  const loginId = document.querySelector('#loginid').value
  const loginPass = document.querySelector('#loginpw').value

  const saveData = {}
  saveData.userId = loginId
  saveData.userPass = loginPass

  try {
    axios
      .post('http://localhost:8080/users/login', JSON.stringify(saveData), {
        headers: {
          'Content-Type': `application/json`
        }
      })
      .then((res) => {
        console.log(res.headers.role)
        if (res.status === 200) {
          loggedIn.value = true
          localStorage.setItem('Authorization', res.headers.get('Authorization'))
          localStorage.setItem('email', loginId)
          if (res.headers.role === 'admin') {
            isAdmin.value = true
          }
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          alert('아이디 혹은 비밀번호를 확인해주세요')
        } else if (e.response.status === 400) {
          alert('아이디 혹은 비밀번호 형식을 확인해주세요')
        }
      })
  } catch (error) {
    console.error(error)
  }

  loginModal.close()
}

const logout = () => {
  const loginId = document.querySelector('#loginid').value
  const data = null
  loggedIn.value = false
  try {
    axios
      .post('http://localhost:8080/users/logout', data, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          withCredentials: true
        }
      })
      .then((res) => {
        //// console.log(res)
        if (res.status === 200) {
          loggedIn.value = false
          localStorage.removeItem('Authorization')
          localStorage.removeItem('email')
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          alert('아이디 혹은 비밀번호를 확인해주세요')
        } else if (e.response.status === 400) {
          alert('아이디 혹은 비밀번호 형식을 확인해주세요')
        }
      })
  } catch (error) {
    console.error(error)
  }
}
</script>
<style lang=""></style>
