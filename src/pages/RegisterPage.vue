<template>
  <v-container class="register-wrapper d-flex align-center justify-center">
    <v-card class="register-card pa-8 d-flex flex-column align-center" elevation="4">
      <div class="text-center mb-6">
        <img alt="Logo" src="/LogoAniverseVERMELHAPARAFOOTER.png" width="140" />
        <p class="text-subtitle-2 mt-1">Fill in your details</p>
      </div>

      <v-form @submit.prevent="register" class="w-100 d-flex flex-column align-center">
        <!-- Name -->
        <div class="w-100">
          <label class="field-label">Name</label>
          <v-text-field
            v-model="formData.name"
            variant="outlined"
            density="comfortable"
            class="mb-2"
            placeholder="Name"
            required
          />
        </div>

        <!-- Email -->
        <div class="w-100">
          <label class="field-label">Email</label>
          <v-text-field
            v-model="formData.email"
            type="email"
            variant="outlined"
            placeholder="Email"
            density="comfortable"
            class="mb-2"
            required
          />
        </div>

        <!-- Password -->
        <div class="w-100">
          <label class="field-label">Password</label>
          <v-text-field
            v-model="formData.password"
            type="password"
            variant="outlined"
            density="comfortable"
            placeholder="Password"
            class="mb-4"
            required
          />
        </div>

        <!-- Register button -->
        <v-btn type="submit" class="register-btn mb-4" height="42" block> SIGN UP </v-btn>

        <div style="align-items: start">
          <p style="text-align: start">Already have an account?</p>
        </div>

        <!-- Back to login -->
        <v-btn variant="tonal" height="42" block @click="$router.push('/login')">
          SIGN IN
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import type { User } from "@/plugins/apiConnect";
  export default {
    name: 'RegisterPage',
    data () {
      return {
        formData: {
          name: '',
          email: '',
          password: '',
          isActive: true,
        },
      }
    },
    //component lifecycle ele é o hook que é chamado quando o component é montado e acesso ao DOM

    methods: {
      async register () {
        try {
          const response = await this.$api.post<User>('/auth/register', this.formData);
          if (response.status === 201) {
            this.$router.push('/login')
          } else {
            console.log('Erro no registro:', response)
          }
        } catch (error) {
          console.error('Erro no registro:', error)
          alert('Erro no registro: ' + error)
        }
      },
    },
  }
</script>

<style scoped>
/* General background */
.register-wrapper {
  background: #f1dfc2;
  min-height: 100vh;
  width: 100%;
}

/* Central card */
.register-card {
  width: 460px;
  border-radius: 12px;
}

/* Labels */
.field-label {
  font-size: 14px;
  font-weight: 600;
  margin-left: 3px;
  margin-bottom: 4px;
  display: block;
}

/* Main button */
.register-btn {
  background-color: #f44336;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
