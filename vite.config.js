import { defineConfig } from 'vite';

export default defineConfig({
  // Vite automatically handles .env files starting with VITE_
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        screen: 'Screen.html',
        admin: 'admin.html',
        recipes: 'recipes.html',
        nutrition: 'nutration.html',
        mission: 'mission.html'
      }
    }
  }
});
