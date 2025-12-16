<template>
  <v-container class="py-6">
    <!-- Banner -->
    <v-img
      aspect-ratio="16/9"
      class="mb-6"
      contain
      cover
      height="240"
      :src="banner"
    />

    <!-- Profile Section -->
    <div class="profile-header mb-8">
      <div class="profile-info">
        <v-avatar class="mb-3" size="90">
          <img :src="avatar">
        </v-avatar>
        <div class="profile-details">
          <h2 class="font-weight-bold">{{ username }}</h2>
          <v-icon
            class="edit-btn"
            icon="mdi-pencil-outline"
            size="20"
            @click="editProfile()"
          />
        </div>
      </div>

      <!-- Tabs for Favorites/Recent -->
      <div class="tabs-section">
        <div class="tab-item" :class="{ active: activeTab === 'favorites' }">
          <v-icon
            class="tab-icon"
            :color="activeTab === 'favorites' ? 'red' : 'gray'"
            icon="mdi-heart"
            size="28"
            @click="activeTab = 'favorites'"
          />
          <p class="tab-label">Favorites</p>
        </div>

        <div class="tab-item" :class="{ active: activeTab === 'recent' }">
          <v-icon
            class="tab-icon"
            :color="activeTab === 'recent' ? 'black' : 'gray'"
            icon="mdi-book-open-page-variant"
            size="28"
            @click="activeTab = 'recent'"
          />
          <p class="tab-label">Recent</p>
        </div>
      </div>
    </div>

    <!-- Content Section - Toggle between Favorites and Recent -->
    <div v-if="activeTab === 'favorites'">
      <h3 class="text-h6 mb-3">Favorites</h3>
      <v-row v-if="animeFavoriteList?.length">
        <v-col v-for="anime in animeFavoriteList" :key="anime.id" cols="6" md="3">
          <v-card class="anime-card rounded-lg" elevation="0">
            <v-img aspect-ratio="1" cover :src="anime.image">
              <template #placeholder>
                <v-row
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
                >
                  <v-progress-circular
                    color="grey-lighten-5"
                    indeterminate
                  />
                </v-row>
              </template>
            </v-img>
            <p class="pa-2 text-center text-subtitle-2" style="font-size: 12px; display: flex; justify-content: space-between">{{ anime.title }} <v-icon class="edit-btn" icon="mdi-delete" size="20" @click="removeFavorite(anime.id)" /></p>
          </v-card>
        </v-col>
      </v-row>
      <div v-else class="text-center text-gray mt-6">
        <p>No favorites yet</p>
      </div>
    </div>

    <div v-else>
      <h3 class="text-h6 mb-3">Recent</h3>
      <v-row v-if="animeRecentList?.length">
        <v-col v-for="anime in animeRecentList" :key="anime.id" cols="6" md="3">
          <v-card class="anime-card rounded-lg" elevation="2">
            <v-img aspect-ratio="1" cover :src="anime.image">
              <template #placeholder>
                <v-row
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
                >
                  <v-progress-circular
                    color="grey-lighten-5"
                    indeterminate
                  />
                </v-row>
              </template>
            </v-img>
            <p class="pa-2 text-center text-subtitle-2">{{ anime.title }}</p>
          </v-card>
        </v-col>
      </v-row>
      <div v-else class="text-center text-gray mt-6">
        <p>No recent animes</p>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  interface Anime {
    id: number
    title: string
    image: string
  }

  const router = useRouter()

  const banner = ref<string>('/jujutsu.jpg')
  const avatar = ref<string>('/sakamotoD.jpg')
  const username = ref<string>('User_xd')
  const activeTab = ref<'favorites' | 'recent'>('favorites')
  const animeFavoriteList = ref<Anime[]>([
    { id: 1, title: 'Jujutsu Kaisen', image: '/jujutsu.jpg' },
    { id: 2, title: 'Attack on Titan', image: '/myhero.jpg' },
    { id: 3, title: 'Your Name', image: '/sakamotoD.jpg' },
    { id: 4, title: 'Horimiya', image: '/one-punch-man.jpg' },
  ])

  const animeRecentList = ref<Anime[]>([
    { id: 5, title: 'Demon Slayer', image: '/one-punch-man.jpg' },
    { id: 6, title: 'My Hero Academia', image: '/myhero.jpg' },
  ])

  function editProfile (): void {
    router.push('/profile/edit')
  }

  function removeFavorite (id: number): void {
    animeFavoriteList.value = animeFavoriteList.value.filter(anime => anime.id !== id)
  }

</script>

<style scoped>
/* Profile Header */
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-details {
  display: flex;
  align-items: center;
  gap: 8px;
}

.edit-btn {
  cursor: pointer;
  transition: color 0.2s ease;
}

.edit-btn:hover {
  color: #1976d2;
}

/* Tabs Section */
.tabs-section {
  display: flex;
  gap: 50px;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  opacity: 0.6;
}

.tab-item.active {
  opacity: 1;
}

.tab-icon {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.tab-icon:hover {
  transform: scale(1.1);
}

.tab-label {
  font-size: 0.875rem;
  margin: 0;
  font-weight: 500;
}

/* Anime Cards */
.anime-card {
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.anime-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}

.anime-image {
  width: 100%;
  height: 180px;
  background-color: #f0f0f0;
}

/* Rounded */
.rounded-lg {
  border-radius: 8px;
}

/* Text Gray */
.text-gray {
  color: #999;
}
</style>
