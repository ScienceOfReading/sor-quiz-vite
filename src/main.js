import { createApp } from 'vue'
import { createPinia } from 'pinia'
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
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'

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
library.add(faExternalLinkAlt)
library.add(faBook)
const app = createApp(App)
const pinia = createPinia(); // Create a Pinia store instance

app.config.globalProperties.$userAnswers = []
app.use(Vue3Lottie)
app.component(LiteYouTubeEmbed)
app.component('font-awesome-icon', FontAwesomeIcon)

import { createRouter, createWebHistory } from 'vue-router'; // Import the router
//import App from './App.vue'; // Import the main App component
import NewItem from './components/NewItem.vue'; // Import the new component

// Define your routes
const routes = [
    { path: '/', component: App }, // Main application route
    { path: '/new-item', component: NewItem }, // New item route
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

app.use(router); // Use the router
app.use(pinia);
app.mount('#app')
