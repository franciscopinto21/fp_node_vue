import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import toastr from 'toastr';
import 'toastr/toastr.scss';
import 'toastr/build/toastr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from '@/components/Header.vue';
import AppFooter from '@/components/Footer.vue';

const app = createApp(App)

app.component('AppHeader', AppHeader);
app.component('AppFooter', AppFooter);

app.use(createPinia())
app.use(router)

toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
};

const style = document.createElement('style');
style.innerHTML = `
  .toast {
    background-color: #333 !important; /* Fundo escuro */
    color: #fff !important; /* Texto claro */
  }
  .toast-top-right {
    top: 90px !important; /* Ajuste para a margem superior */
    right: 12px;
  }
  .toast-success {
    background-color: #51a351 !important; /* Estilo para mensagens de sucesso */
  }
  .toast-error {
    background-color: #bd362f !important; /* Estilo para mensagens de erro */
  }
  .toast-warning {
    background-color: orange !important; /* Estilo para mensagens de erro */
  }    
`;
document.head.appendChild(style);

app.config.globalProperties.$toastr = toastr;

app.mount('#app')
