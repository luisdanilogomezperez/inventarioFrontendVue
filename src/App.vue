<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from './components/HelloWorld.vue';
import api from "./services/api";

// Tipado
type Razon = {
  _id: string;
  texto: string;
};

// Datos reales (traídos de la API)
const razones = ref<Razon[]>([]);

// Textos que se muestran en pantalla (se rellenan letra por letra)
const mostrados = ref<string[]>([]);

// Estado
const cargando = ref(false);
const reproduciendo = ref(false);

// Audio
const audioId = "bg-music";

// Utility: sleep
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Genera corazones con posiciones y duración aleatoria
const hearts = Array.from({ length: 18 }).map((_, i) => {
  const left = Math.round(Math.random() * 90); // porcentaje
  const delay = +(Math.random() * 4).toFixed(2);
  const dur = +(6 + Math.random() * 6).toFixed(2); // 6-12s
  const size = Math.round(14 + Math.random() * 30); // px
  return { id: i, left, delay, dur, size };
});

// Reproducir/pausar música
const toggleMusic = () => {
  const audio = document.getElementById(audioId) as HTMLAudioElement | null;
  if (!audio) return;
  if (reproduciendo.value) {
    audio.pause();
    reproduciendo.value = false;
  } else {
    audio.volume = 0.35;
    audio.play().catch(() => {
      // autoplay puede fallar si no hubo interacción; ignoramos
    });
    reproduciendo.value = true;
  }
};

// Función principal: trae razones y las va tipeando una por una
const cargarRazones = async () => {
  try {
    toggleMusic();
    cargando.value = true;
    // iniciar música
    const audio = document.getElementById(audioId) as HTMLAudioElement | null;
    if (audio && !reproduciendo.value) {
      audio.volume = 0.35;
      audio.play().catch(()=>{});
      reproduciendo.value = true;
    }

    const res = await api.get("/api/products");
    const datos: Razon[] = res.data?.body ?? [];

    // reset
    razones.value = datos;
    mostrados.value = [];

    // recorrer y escribir letra por letra
    for (let i = 0; i < datos.length; i++) {
      const texto = datos[i].texto ?? "";
      mostrados.value.push(""); // reserva el lugar para este index
      // velocidad por carácter (ajusta 20-40 ms según prefieras)
      const velocidad = 25;
      for (let c = 0; c < texto.length; c++) {
        mostrados.value[i] += texto[c];
        // pequeña espera entre letras
        await sleep(velocidad);
      }
      // espera corta entre razones (puedes ajustar)
      await sleep(220);
    }
  } catch (e) {
    console.error("Error cargando razones", e);
  } finally {
    cargando.value = false;
  }
};
</script>

<template>
  <div class="page">
    zones flotando (fondo) -->
    <div class="hearts" aria-hidden="true">
      <span
        v-for="h in hearts"
        :key="h.id"
        class="heart"
        :style="{
          left: h.left + '%',
          animationDelay: h.delay + 's',
          animationDuration: h.dur + 's',
          fontSize: h.size + 'px'
        }"
      >❤</span>
    </div>

    <div class="container">
      <img src="./assets/miamor.jpeg" class="logo" alt="MY LOVE" />
      
      <HelloWorld msg="💖 100 RAZONES PARA AMARTE 💖" />

      <div class="controls">
        <button class="btn1" type="button" @click="cargarRazones" :disabled="cargando">
          {{ cargando ? "Apapachando..." : "APAPÁCHAME" }}
        </button>

      </div>

      <div class="list">
        <div
          v-for="(item, index) in mostrados"
          :key="razones[index]?._id ?? index"
          class="razon card"
        >
          <p class="texto">
            <!-- caret animado solo mientras la razón sigue escribiéndose -->
            <span>{{ item }}</span>
            <span v-if="razones[index] && item.length < (razones[index].texto ?? '').length" class="caret">|</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fondo y tipografía */
:global(body) {
  margin: 0;
  padding: 0;
  font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: linear-gradient(135deg, #fff0f4, #ffeef6 30%, #fff7fb);
  overflow-x: hidden;
}

/* Página y contenedor */
.page {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 28px 20px;
  text-align: center;
  position: relative;
  z-index: 2;
}

/* logo */
.logo {
  height: 12.5rem;
  width: 12.5rem;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto 12px auto;
  display: block;
  box-shadow: 0 12px 40px rgba(255, 80, 140, 0.15);
  transform: translateZ(0);
}

/* controles */
.controls {
  display: flex;
  gap: 14px;
  justify-content: center;
  align-items: center;
  margin: 18px 0 8px;
  flex-wrap: wrap;
}

.btn1 {
  background: linear-gradient(90deg, #ff6fa5, #ff4f9b);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 28px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 28px rgba(255, 60, 130, 0.18);
  transition: transform .25s ease, box-shadow .25s ease;
}

.btn1:active { transform: translateY(1px) scale(.995); }
.btn1:hover { transform: translateY(-4px) scale(1.02); }

.btn1[disabled] {
  opacity: 0.7;
  cursor: default;
  transform: none;
  box-shadow: none;
}

/* boton musica */
.btn-music {
  background: transparent;
  border: 2px solid rgba(255,80,140,0.15);
  color: #ff4f9b;
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background .2s, transform .2s;
}
.btn-music:hover { transform: translateY(-3px); background: rgba(255,80,140,0.03); }

/* Lista */
.list {
  margin-top: 18px;
  padding-bottom: 60px;
}

/* tarjeta razon */
.card.razon {
  width: 92%;
  max-width: 720px;
  margin: 12px auto;
  padding: 18px 20px;
  background: linear-gradient(180deg, #ffffff, #fff8fb);
  color: #ff2b84;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(255, 20, 90, 0.06);
  text-align: left;
  opacity: 0;
  transform: translateY(18px);
  animation: appear 0.55s forwards ease-out;
}

/* Stagger: small delay based on index via nth-child */
.card:nth-child(1) { animation-delay: 0.05s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.15s; }
/* more nth-child rules not necessary; animationDelay set by JS sequence anyway */

@keyframes appear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* estilo del texto y caret (tipo máquina) */
.texto {
  font-size: 1.15rem;
  line-height: 1.5;
  margin: 0;
  word-break: break-word;
  white-space: pre-wrap;
  display: inline-block;
}

.caret {
  display: inline-block;
  margin-left: 3px;
  color: #ff2b84;
  animation: blink 0.8s steps(1) infinite;
  font-weight: 700;
}
@keyframes blink {
  50% { opacity: 0; }
}

/* corazones flotando (fondo) */
.hearts {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.heart {
  position: absolute;
  bottom: -20vh;
  color: rgba(255, 70, 140, 0.12);
  text-shadow: 0 4px 14px rgba(255, 70, 140, 0.06);
  will-change: transform, opacity;
  filter: drop-shadow(0 6px 16px rgba(255, 70, 140, 0.06));
  animation-name: floatUp;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes floatUp {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  6% { opacity: 1; }
  100% { transform: translateY(-130vh) rotate(360deg); opacity: 0; }
}

/* responsive */
@media (max-width: 640px) {
  .logo { height: 10.5rem; width: 10.5rem; }
  .btn1 { padding: 12px 18px; font-size: 1rem; }
  .texto { font-size: 1rem; }
}
</style>
