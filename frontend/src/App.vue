<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AppHeader />
    <router-view class="flex-grow-1" />
    <AppFooter />
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>
/* Estilos globais */

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Elimina possíveis problemas de rolagem horizontal */
}

#app {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%; /* Define um limite de 100% da largura para evitar bordas */
  width: 100vw; /* Garante que a largura ocupe toda a viewport */
}

.container-fluid {
  padding-left: 0;
  padding-right: 0;
}

.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
