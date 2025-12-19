<template>
  <v-container class="py-10" style="max-width: 600px">
    <h2 class="text-h5 font-weight-bold mb-6 text-center">Change Photo</h2>

    <div class="d-flex justify-center mb-6">
      <v-avatar size="120">
        <img :src="previewPhoto || currentPhoto">
      </v-avatar>
    </div>

    <v-file-input
      v-model="selectedFile"
      accept="image/*"
      class="mb-4"
      label="Select an image"
      variant="outlined"
      @update:model-value="handleFileSelect"
    />

    <v-btn
      block
      class="mb-4"
      color="red"
      height="48"
      @click="handleSavePhoto"
    > Save Photo </v-btn>
    <v-btn block height="48" variant="tonal" @click="$router.push('/profile')">
      Cancel
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const currentPhoto = ref<string>('/perfil.png')
  const previewPhoto = ref<string>('')
  const selectedFile = ref<File | null>(null)

  function handleFileSelect (files: File[]): void {
    if (files && files.length > 0) {
      const file = files[0]

      // Validate file is image
      if (!file.type.startsWith('image/')) {
        console.warn('Please select a valid image file')
        return
      }

      // Create preview URL
      const reader = new FileReader()
      reader.addEventListener('load', e => {
        if (e.target?.result) {
          previewPhoto.value = e.target.result as string
        }
      })
      reader.readAsDataURL(file)
    }
  }

  async function handleSavePhoto (): Promise<void> {
    if (!selectedFile.value) {
      console.warn('No file selected')
      return
    }

    try {
      // TODO: Implement API call to upload photo
      console.log('Uploading photo:', selectedFile.value.name)

      // Redirect back to profile after successful upload
      router.push('/profile')
    } catch (error) {
      console.error('Photo upload failed:', error)
    }
  }
</script>
