// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   // server: {
//   //   proxy: {
//   //     '/api': 'http://localhost:8080'
//   //   }
//   // },
//   plugins: [react()],
// })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['core-js-pure'],
//   },
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['core-js-pure/stable/object/assign.js']
    }
  },
  optimizeDeps: {
    exclude: ['core-js-pure'],
  },
});





// import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';
// import nodeResolve from '@rollup/plugin-node-resolve';

// export default defineConfig({
//   plugins: [reactRefresh(), nodeResolve()],
//   optimizeDeps: {
//     exclude: ['core-js-pure'],
//   },
// });

// import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';

// export default defineConfig({
//   plugins: [reactRefresh()],
//   optimizeDeps: {
//     exclude: ['core-js-pure'],
//   },
// });









