import Vue from 'vue';
import iView from 'iview';
import axios from 'axios'
import CONST from '@/utils/CONST'
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueAxios from 'vue-axios'
import $http from '@/api/index'

CONST()
Vue.use(VueAxios, $http)
// Vue.use(iView);

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});
