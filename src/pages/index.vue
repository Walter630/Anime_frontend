<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AppBarComponent from '@/components/AppBarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const isMobile = ref(false)
const route = useRoute()

function checkMobile(): void {
  isMobile.value = window.innerWidth < 768
}

// Mount and unmount listeners
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => window.removeEventListener('resize', checkMobile))

// Computed: show AppBar only when NOT on login/register pages
const showAppBar = computed(() => {
  const hiddenRoutes = ['/login', '/register', '/recovery', '/reset', '/editProfile', '/messageEmail', '/resetPassword', '/recovery-code']
  return !hiddenRoutes.includes(route.path)
})
</script>

<template>
  <!-- Show AppBar only if not on login/register -->
  <AppBarComponent v-if="showAppBar" />

  <v-main :style="isMobile ? 'padding-bottom: 10px !important;' : ''">
    <router-view />
  </v-main>

  <FooterComponent v-if="showAppBar" />
</template>

<style scoped></style>
