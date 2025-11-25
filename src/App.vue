<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from './components/HelloWorld.vue'
import api from "./services/api";

// Estado reactivo
const cienrazones = ref([])

// Función para cargar cuando el usuario haga click
const cargarRazones = async () => {
  try {
    const res = await api.get("/api/products")
    cienrazones.value = res.data.body 
    console.log(cienrazones.value)
  } catch (e) {
    console.log("Error cargando razones", e)
  }
}
</script>

<template>
  <div>
    <img src="./assets/miamor.jpeg" class="logo vue" alt="MY LOVE" />
  </div>

  <HelloWorld msg="💖 100 RAZONES PARA AMARTE 💖" />

  <button class="btn1" type="button" @click="cargarRazones">APAPACHAME</button>

  <!-- Lista animada -->
  <div v-for="item in cienrazones" :key="item._id" class="razon animar">
    <p>{{ item.texto }}</p>
  </div>
  <div class="corazon" style="left: 10%;">❤️</div>
  <div class="corazon" style="left: 30%; animation-delay: 1s;">💗</div>
  <div class="corazon" style="left: 50%; animation-delay: 2s;">💖</div>
  <div class="corazon" style="left: 70%; animation-delay: 0.5s;">💕</div>
  <div class="corazon" style="left: 85%; animation-delay: 1.5s;">💘</div>
  <div class="corazon" style="left: 15%;">❤️</div>
  <div class="corazon" style="left: 25%; animation-delay: 1s;">💗</div>
  <div class="corazon" style="left: 32%; animation-delay: 2s;">💖</div>
  <div class="corazon" style="left: 45%; animation-delay: 0.5s;">💕</div>
  <div class="corazon" style="left: 82%; animation-delay: 1.5s;">💘</div>
</template>
<style>
:global(body) {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #ffd4e5, #ffeaf1, #ffd6e8);
}

/* Corazones flotando */
.corazon {
  position: fixed;
  bottom: -50px;
  font-size: 2rem;
  color: rgba(255, 0, 102, 0.6);
  animation: flotar 6s infinite ease-in;
  z-index: 1;
}

@keyframes flotar {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-120vh) translateX(20px) rotate(360deg);
    opacity: 0;
  }
}

/* Imagen principal */
.logo {
  height: 18em;
  margin: 20px auto;
  display: block;
  box-shadow: 0 0 20px rgba(255, 0, 102, 0.25);
  position: relative;
  z-index: 2;
}

/* Botón romántico */
.btn1 {
  display: block;
  margin: 20px auto;
  padding: 14px 30px;
  background: #ff4f9b;
  color: white;
  border: none;
  font-size: 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  transition: 0.3s;
  z-index: 2;
  position: relative;
}

.btn1:hover {
  background: #ff2b84;
  transform: scale(1.06);
  box-shadow: 0 6px 20px rgba(255, 0, 102, 0.3);
}

/* Tarjeta de razón */
.razon {
  width: 90%;
  max-width: 600px;
  margin: 12px auto;
  padding: 20px;
  background: white;
  color: #ff2b84;
  font-size: 1.2rem;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(255, 0, 102, 0.1);
  transform: translateY(20px);
  opacity: 0;
  animation: aparecer 0.8s forwards ease-out;
  position: relative;
  z-index: 2;
}

@keyframes aparecer {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>