<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
// ✅ v-model
const ckeditor = CKEditor.component

// ✅ :editor
const editor = ClassicEditor

// ✅ :textarea Data
const editorData = ref('<textarea></textarea>')
// ✅ :config
const editorConfig = ref({
  toolbar: [
    'heading',
    '|',
    'fontBackgroundColor',
    'fontColor',
    'fontSize',
    'bold',
    'italic',
    '|',
    'alignment',
    'bulletedList',
    'numberedList',
    'indent',
    'outdent',
    '|',
    'imageUpload',
    'insertTable',
    'link',
    '|',
    'undo',
    'redo'
  ],
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties'
    ]
  },
  image: {
    resize: true,
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
      'imageStyle:inline',
      'imageStyle:side'
    ]
  }
})
const router = useRouter()
const route = useRoute()

const props = defineProps({ type: String })

const isUseId = ref(false)
const editorContent = ref('')

const article = ref({
  articleNo: 0,
  subject: '',
  content: '',
  userId: '',
  userName: '',
  hit: 0,
  registerTime: ''
})

if (props.type === 'modify') {
  let { articleno } = route.params
  console.log(articleno + '번글 얻어와서 수정할거야')
  // API 호출
  isUseId.value = true
}

const subjectErrMsg = ref('')
const contentErrMsg = ref('')
watch(
  () => article.value.subject,
  (value) => {
    let len = value.length
    if (len == 0 || len > 30) {
      subjectErrMsg.value = '제목을 확인해 주세요!!!'
    } else subjectErrMsg.value = ''
  },
  { immediate: true }
)
watch(
  () => article.value.content,
  (value) => {
    let len = value.length
    if (len == 0 || len > 500) {
      contentErrMsg.value = '내용을 확인해 주세요!!!'
    } else contentErrMsg.value = ''
  },
  { immediate: true }
)

const goList = () => {
  const housename = document.querySelector('#housename').textContent
  router.push('/detail/' + housename)
}

const regist = () => {
  const content = editorContent.value.replace(/(<([^>]+)>)/gi, '')
  const housename = document.querySelector('#housename').textContent
  let aptcode = 0
  axios
    .get('http://localhost:8080/house/' + housename)
    .then((res) => {
      aptcode = res.data
      axios
        .post('http://localhost:8080/review/' + aptcode, {
          email: localStorage.getItem('email'),
          apartmentName: housename,
          content: content
        })
        .then((res) => {
          console.log(res)
          router.push('/detail/' + housename)
        })
        .catch(function (error) {
          console.log(error)
        })
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>

<template>
  <Header />
  <div>
    <section>
      <div class="bg-black relative">
        <img src="../assets/banner.jpg" alt="" class="w-screen max-h-96 object-cover opacity-60" />
        <div
          class="w-full flex flex-wrap gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center"
        >
          <h1 style="color: ivory; font-size: 2rem; font-weight: bold">리뷰 작성</h1>
        </div>
      </div>
    </section>
  </div>
  <section>
    <main class="pt-10 w-screen bg-neutral-50 flex flex-col justify-center">
      <h1 id="housename" class="font-bold text text-center text-2xl">{{ $route.params.name }}</h1>
    </main>
    <ckeditor
      id="content"
      v-model="editorContent"
      :editor="editor"
      :config="editorConfig"
      :data="editorData"
    />
    <button id="regist" class="btn btn-primary btn-sm" @click="goList">목록</button>
    <button id="list" class="btn btn-primary btn-sm" @click="regist">등록</button>
  </section>

  <Footer style="margin-top: 500px" />
</template>

<style scoped>
#regist {
  margin-top: 10px;
  margin-left: 3px;
  float: right;
}
#list {
  margin-top: 10px;

  float: right;
}
#housename {
  margin-bottom: 50px;
}
</style>
