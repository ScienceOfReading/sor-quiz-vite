import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
library.add(faCircleQuestion)
library.add(faCircleXmark)
library.add(faCircleCheck)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
