import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

window.checkAndAttachMapScript = (callback) => {
  if (window.google) {
    callback();
    return true;
  }

  const key = process.env.VUE_APP_GOOGLE_KEY;
  const script = document.createElement('script');
  window.mapApiInitialized = callback;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,geometry&callback=mapApiInitialized`;
  document.body.appendChild(script);
  return null;
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
