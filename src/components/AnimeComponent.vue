<template>
  <v-container class="pa-6" v-if="anime">
    <v-row>

      <!-- Poster -->
      <v-col cols="12" md="4">
        <v-img :src="anime.img" height="380" class="rounded-lg" />
      </v-col>

      <!-- Informações -->
      <v-col cols="12" md="8">
        <h2>{{ anime.titulo }}</h2>

        <p class="text-caption mt-1">
          ⭐ {{ anime.stars }} — {{ anime.ano }}
        </p>

        <p class="mt-4">{{ anime.descricao }}</p>

        <v-btn color="red" class="mt-4" height="40">
          Assistir agora
        </v-btn>
        <v-btn
          color="blue"
          class="mt-4 ml-4"
          height="40"
          @click="irParaChat()"
        >
          Chat do Anime
        </v-btn>

        <!-- Lista de episódios -->
        <div class="mt-6">
          <p class="text-subtitle-1 mb-2">Episódios</p>

          <v-list v-if="anime.episodios?.length">
            <v-list-item
              v-for="ep in anime.episodios"
              :key="ep.id"
              prepend-icon="mdi-play-circle-outline"
            >
              <v-list-item-title>{{ ep.titulo }}</v-list-item-title>
            </v-list-item>
          </v-list>

          <p v-else class="text-grey">Nenhum episódio disponível.</p>
        </div>
      </v-col>
    </v-row>

    <!-- Recomendações -->
    <h3 class="mt-10 mb-4">Recomendados</h3>

    <v-row>
      <v-col
        v-for="rec in recomendados"
        :key="rec.id"
        cols="6" sm="4" md="3"
      >
        <v-card elevation="2" class="pa-2 rounded-lg">
          <v-img :src="rec.img" height="150" class="rounded-lg" cover />
          <p class="text-subtitle-2 mt-1">{{ rec.titulo }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Rodapé -->
    <div class="text-center mt-10 text-grey">
      © 2025 AniVerse — Todos os direitos reservados.
    </div>
  </v-container>

  <!-- Tela caso o ID não exista -->
  <v-container v-else class="d-flex align-center justify-center" style="height: 70vh;">
    <div class="text-center">
      <h2>Anime não encontrado</h2>
      <p class="text-grey">Verifique a URL ou volte para a página inicial.</p>

      <v-btn color="red" class="mt-4" @click="$router.push('/')">
        Voltar para Home
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// pega ID da URL
const route = useRoute();
const animeId = route.params.id;

// simulação do backend
const catalogo = [
  {
    id: 1,
    titulo: "Attack on Titan",
    stars: 5,
    ano: "2013",
    descricao: "A humanidade enfrenta titãs gigantes.",
    img: "/myhero.jpg",
    episodios: [
      { id: 1, titulo: "Episódio 1" },
      { id: 2, titulo: "Episódio 2" }
    ]
  },
  {
    id: 2,
    titulo: "Your Name",
    stars: 5,
    ano: "2016",
    descricao: "Dois jovens trocam de corpo misteriosamente.",
    img: "/one-punch-man.jpg",
    episodios: []
  },
  {
    id: 3,
    titulo: "Jujutsu Kaisen",
    stars: 5,
    ano: "2020",
    descricao: "Magos lutam contra maldições.",
    img: "/jujutsu.jpg",
    episodios: [
      { id: 1, titulo: "Ryoimen Sukuna" },
      { id: 2, titulo: "For Myself" }
    ]
  }
];

// estado
const anime = ref(null);

const recomendados = ref([
  { id: 99, titulo: "Steins;Gate", img: "/sg.jpg" },
  { id: 98, titulo: "Re:Zero", img: "/rz.jpg" },
  { id: 97, titulo: "Konosuba", img: "/kono.jpg" }
]);
function irParaChat() {
  router.push(`/anime/${animeId}/chat`);
}
// carrega o anime certo
onMounted(() => {
  anime.value = catalogo.find(a => a.id == animeId) || null;
});
</script>
