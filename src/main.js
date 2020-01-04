/**
 * Created by 孟艳丽 on 2020/1/4.
 */
import Vue from 'vue'
import Demo from './demo.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(Demo),
}).$mount('#app')
