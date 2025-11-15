<script setup lang="ts">

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AppBarComponent from '@/components/AppBarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const isMobile = ref(false)
const route = useRoute()

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

// executa ao montar e desmontar
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => window.removeEventListener('resize', checkMobile))

// 🔹 Computed: mostra AppBar apenas quando NÃO estiver em login/cadastro
const showAppBar = computed(() => {
  const hiddenRoutes = ['/login', '/register', '/recovery', '/reset', '/editPerfil', '/mensageEmail', '/resetSenha', '/recovery-code']
  return !hiddenRoutes.includes(route.path)
})
</script>

<template>
  <!-- Só mostra o AppBar se não estiver em login/cadastro -->
  <AppBarComponent v-if="showAppBar" />

  <v-main :style="isMobile ? 'padding-bottom: 10px !important;' : ''">
    <router-view />
  </v-main>
  <FooterComponent v-if="showAppBar" />
</template>

<style scoped></style>
