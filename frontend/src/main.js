window.ResizeObserver = class ResizeObserver extends window.ResizeObserver {
    constructor(callback) {
      let timer = null;
      const debouncedCallback = function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, 16); // 16ms 对应约 60fps
      };
      super(debouncedCallback);
    }
  };

import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');