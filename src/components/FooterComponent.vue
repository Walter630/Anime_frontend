<template>
  <v-footer padless class="footer-root">
    <v-container fluid class="footer-container">
      <!-- Conteúdo principal -->
      <v-row no-gutters class="footer-main" align="start" justify="space-between">
        <!-- Logo + texto (esquerda) -->
        <v-col cols="12" md="4" class="footer-col logo-col">
          <div class="logo-wrap">
            <v-img  width="60" height="60" class="logo-img" />
            <div>
              <div class="brand">AnimeVerse</div>
              <p class="brand-sub">
                Acompanhe toda a biblioteca de animes, atualizações constantes e um catálogo em crescimento.
              </p>
            </div>
          </div>
        </v-col>

        <!-- Links (centro) -->
        <v-col cols="12" sm="6" md="3" class="footer-col links-col">
          <div class="links-grid">
            <div>
              <div class="links-title">Navegação</div>
              <ul class="links-list">
                <li>Home</li>
                <li>Animes</li>
                <li>Minha Conta</li>
                <li>Recomendações</li>
              </ul>
            </div>

            <div>
              <div class="links-title">Empresa</div>
              <ul class="links-list">
                <li>Sobre</li>
                <li>Carreiras</li>
                <li>Parcerias</li>
                <li>Contato</li>
              </ul>
            </div>
          </div>
        </v-col>

        <!-- Redes / contato (direita) -->
        <v-col cols="12" md="4" class="footer-col social-col">
          <div class="social-title">Fale conosco</div>

          <div class="contact">
            <div class="contact-line">Email: <span class="muted">suporte@animeverse.com</span></div>
            <div class="contact-line">Telefone: <span class="muted">+55 (11) 9xxxx-xxxx</span></div>
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
      <v-divider class="footer-divider"></v-divider>

      <!-- Faixa inferior com copyright e links menores -->
      <v-row no-gutters align="center" class="bottom-bar">
        <v-col cols="12" md="6" class="bottom-left">
          <div class="copyright">© 2025 AnimeVerse — Todos os direitos reservados</div>
        </v-col>

        <v-col cols="12" md="6" class="bottom-right">
          <div class="bottom-links">
            <span class="small-link">Política de Privacidade</span>
            <span class="sep">•</span>
            <span class="small-link">Termos</span>
            <span class="sep">•</span>
            <span class="small-link">Ajuda</span>

            <!-- ícones à direita -->
            <div class="bottom-icons">
              <v-btn icon variant="text" class="mini-icon"><v-icon size="18">mdi-email</v-icon></v-btn>
              <v-btn icon variant="text" class="mini-icon"><v-icon size="18">mdi-instagram</v-icon></v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
// sem script necessário por enquanto
</script>

<style scoped>
.footer-root {
  background: #0b0b0b; /* preto intenso como na imagem */
  color: #d8d8d8;
  padding-top: 40px;
  padding-bottom: 0;
  font-family: "Inter", "Roboto", sans-serif;
}

/* container com largura mais restrita (como na imagem) */
.footer-container {
  max-width: 1100px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

/* MAIN */
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

/* Links centrais */
.links-grid {
  display: flex;
  gap: 40px;
}
.links-title {
  font-weight: 700;
  font-size: 13px;
  color: #ffffff;
  margin-bottom: 8px;
}
.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #cfcfcf;
  font-size: 12px;
}
.links-list li {
  margin-bottom: 8px;
  cursor: pointer;
  transition: color .15s;
}
.links-list li:hover { color: #ffffff; }

/* Social / contato direita */
.social-title {
  font-weight: 700;
  font-size: 13px;
  color: #ffffff;
  margin-bottom: 10px;
}
.contact {
  font-size: 12px;
  color: #bfbfbf;
  margin-bottom: 14px;
}
.contact-line { margin-bottom: 6px; }
.muted { color: #9e9e9e; font-weight: 500; }

.social-icons {
  display: flex;
  gap: 8px;
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
  padding: 12px 0 28px;
}
.bottom-left { display:flex; align-items:center; }
.bottom-right { display:flex; justify-content:flex-end; align-items:center; }

/* textos pequenos da faixa inferior */
.copyright {
  font-size: 12px;
  color: #9f9f9f;
}
.bottom-links {
  display:flex;
  align-items:center;
  gap: 12px;
  font-size: 12px;
  color: #bdbdbd;
}
.small-link { cursor: pointer; }
.sep { color: #5b5b5b; margin: 0 6px; }

/* icones pequenos à direita */
.bottom-icons { display:inline-flex; margin-left: 12px; gap: 6px; }
.mini-icon .v-icon { color: #bdbdbd; }
.mini-icon:hover .v-icon { color: #ffffff; }

/* responsividade */
@media (max-width: 960px) {
  .footer-container { padding-left: 12px; padding-right: 12px; }
  .links-grid { gap: 24px; flex-wrap:wrap; }
  .bottom-right { justify-content:flex-start; margin-top: 12px; }
  .logo-wrap { align-items:center; }
  .brand-sub { max-width: none; }
}
</style>
