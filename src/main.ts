import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import './styles/main.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
NProgress.start()

createApp(App).mount('#app')

// Finish loading and show app
setTimeout(() => {
  NProgress.done()
  const appElement = document.getElementById('app')
  if (appElement) {
    appElement.classList.add('loaded')
  }
}, 100)
