import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@views': '/src/views',
      '@store': '/src/store',
      '@assets': '/src/assets',
      '@utils': '/src/utils',
      '@types': '/src/types',
      '@api': '/src/api',
      '@styles': '/src/styles',
      '@hooks': '/src/hooks',
      '@constants': '/src/constants'
    }
  }
})
