import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faFlaskVial } from '@fortawesome/free-solid-svg-icons'
import { faPodcast } from '@fortawesome/free-solid-svg-icons'

import { inject } from '@vercel/analytics';

//import * as LottiePlayer from "@lottiefiles/lottie-player";
import Vue3Lottie from 'vue3-lottie'

import LiteYouTubeEmbed from 'vue-lite-youtube-embed';
import 'vue-lite-youtube-embed/style.css'

inject();

library.add(faUserSecret)
library.add(faCircleQuestion)
library.add(faCircleMinus)
library.add(faCircleXmark)
library.add(faCircleCheck)
library.add(faCheck)
library.add(faFlaskVial)
library.add(faPodcast)
const app = createApp(App)
app.config.globalProperties.$userAnswers = []
app.use(Vue3Lottie)
app.component(LiteYouTubeEmbed)
app.component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

