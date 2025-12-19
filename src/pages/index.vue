<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import AppBarComponent from '@/components/AppBarComponent.vue'
  import FooterComponent from '@/components/FooterComponent.vue'

  const isMobile = ref(false)
  const route = useRoute()
  const router = useRouter()

  function checkMobile (): void {
    isMobile.value = window.innerWidth < 768
  }

  // Mount and unmount listeners
  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    router.push('/home')
  })
  // evento para remover o listener ao desmontar o componente
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
