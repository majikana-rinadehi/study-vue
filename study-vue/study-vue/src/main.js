import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
const vm = app.mount('#app');
console.log(vm.$data.rowHtml); 
console.log(vm.rowHtml);
// App.vue の data は拾えるが、それ以外のコンポーネントの data プロパティは undefined となる
