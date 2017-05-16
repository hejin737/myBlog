//document.write('来自main.js的问候！')
import Vue from 'vue';
import VueRouter from 'vue-router';
const App = require('./app.vue');
import store from './store'
Vue.use(VueRouter);
const router = new VueRouter(require('./router'))
new Vue({
    el: '#app',
    store,
    router: router,
    render: h => h(App)
});
