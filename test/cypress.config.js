const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // URL do Vue.js
    screenshotOnRunFailure: true,  // Já vem ativado para falhas
    video: true,  // Para gravar vídeos (opcional)
  },
  env: {
    captureSuccessScreenshots: true,  // Variável para habilitar screenshots de sucesso
  }
});