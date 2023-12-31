import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './index.css'
import daisyui from 'daisyui-vue'
import Antd from 'ant-design-vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import router from './router/index.js'

const app = createApp(App)
app.use(daisyui)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(CKEditor)
app.mount('#app')
