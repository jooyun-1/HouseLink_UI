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
      <nav class="navbar md:flex p-2 px-12 justify-between">
        <menu class="md:hidden">
          <div class="dropdown">
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><a href="#">공지사항</a></li>
              <li><a href="#">오늘의 뉴스</a></li>
              <li><a href="#">자유글</a></li>
              <li><a href="#">주변탐방</a></li>
              <li>
                <a>관심지역</a>
                <ul class="p-2">
                  <li><a href="#">관심지역 설정하기</a></li>
                  <li><a href="#">관심지역 둘러보기</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </menu>
        <img src="../assets/logo.jpg" class="w-[10rem] h-[3rem] object-cover" alt="" />

        <div class="">
          <button
            id="loginBtn"
            onclick="loginModal.showModal()"
            class="btn btn-primary btn-sm"
            style="margin-right: 10px"
          >
            로그인
          </button>
          <button id="loginBtn" onclick="loginModal.showModal()" class="btn btn-neutral btn-sm">
            회원가입
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
              <button class="btn btn-primary w-1/2" onclick="login()">로그인</button>
            </div>
          </div>
        </dialog>
        <dialog id="signInModal" class="modal">
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
              <button class="btn btn-primary w-1/2" style="margin: auto" @click="signIn()">
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
// router.push('/signin')
const moveSign = () => {
  let loginModal = document.querySelector('#loginModal')
  loginModal.close()

  let signInModal = document.querySelector('#signInModal')
  signInModal.showModal()
}

const signIn = () => {
  let signInModal = document.querySelector('#signInModal')
  signInModal.close()
}
</script>
<style lang=""></style>
