<template>
  <v-footer padless class="footer-root">
    <v-container class="footer-container">
      <!-- Main content -->
      <v-row class="footer-main" align="start" justify="space-between">
        <!-- Logo + text (left) -->
        <v-col cols="12" md="4" class="footer-col logo-col">
          <v-img width="60" height="60" class="logo-img" style="border-radius: 8px; object-fit: cover;" src="@/assets/LogoAniverseVERMELHA.png" />
          <div class="logo-wrap">
              <p class="brand-sub">
                Follow our entire anime library, constant updates and a growing catalog.
              </p>
          </div>
        </v-col>

        <!-- Social / contact (right) -->
        <v-col cols="12" md="6" class="footer-col social-col">
            <div class="bottom-links">
              <span class="small-link">POLITICA DE PRIVACIDADE</span>
              <span class="sep">•</span>
              <span class="small-link">TERMOS E CONDIÇÕES</span>
              <span class="sep">•</span>
              <span class="small-link">SOBRE</span>
              <span class="sep">•</span>
              <span class="small-link">FAQ</span>
            </div>
          <div class="social-icons">
            <v-btn icon variant="text" class="social-btn">
              <v-icon size="20">mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon variant="text" class="social-btn">
              <v-icon size="20">mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon variant="text" class="social-btn">
              <v-icon size="20">mdi-youtube</v-icon>
            </v-btn>
            <v-btn icon variant="text" class="social-btn">
              <v-icon size="20">mdi-twitter</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- Divider -->
      <v-divider class="footer-divider" />

      <!-- Bottom bar with copyright and smaller links -->
      <v-row align="center" class="bottom-bar">
        <v-col cols="12" md="6">
          <div class="copyright">© 2025 AnimeVerse — All rights reserved</div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
// No script needed for this component
</script>

<style scoped>
.footer-root {
  background: #0b0b0b; /* preto intenso como na imagem */
  color: #d8d8d8;
  padding-top: 10px;
  padding-bottom: 0;
  font-family: "Inter", "Roboto", sans-serif;
}

.footer-main {
  padding-bottom: 28px;
}

/* Logo e texto */
.logo-wrap {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.logo-img {
  border-radius: 8px;
  object-fit: cover;
}
.brand {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
}
.brand-sub {
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.4;
  color: #bfbfbf;
  max-width: 320px;
}
.footer-col {
  display: flex;
  flex-direction: column;
}
.social-col {
  display: flex;
  flex-direction: column;
}

.links-list li {
  margin-bottom: 8px;
  cursor: pointer;
  transition: color .15s;
}
.links-list li:hover { color: #ffffff; }

.social-btn {
  font-weight: 700;
  font-size: 13px;
  color: #ffffff;
  margin-bottom: 10px;
}
.social-icons {
  gap: 8px;
  margin-top: 100px;
  display: flex;
  justify-content: flex-end;
}
.social-btn .v-icon { color: #d1d1d1; }
.social-btn:hover .v-icon { color: #ffffff; }

/* Divider escuro maior */
.footer-divider {
  background-color: rgba(255,255,255,0.04);
  height: 1px;
  margin: 18px 0;
}

/* bottom bar */
.bottom-bar {
  display: flex;
  justify-content: center;
}

/* textos pequenos da faixa inferior */
.copyright {
  font-size: 12px;
  color: #9f9f9f;
  display: flex;
  justify-content: center;
}
.bottom-links {
  gap: 1px;
  font-size: 12px;
  color: #bdbdbd;
  display: flex;
  justify-content: flex-end;
}
.small-link { cursor: pointer; }
.sep { color: #5b5b5b; margin: 0 16px; }

/* icones pequenos à direita */
.mini-icon .v-icon { color: #bdbdbd; }
.mini-icon:hover .v-icon { color: #ffffff; }

/* responsividade */
@media (max-width: 960px) {
  .footer-container { padding-left: 12px; padding-right: 12px; }
  .bottom-right { justify-content:flex-start; margin-top: 12px; }
  .logo-wrap { align-items:center; }
  .brand-sub { max-width: none; }
}
</style>
