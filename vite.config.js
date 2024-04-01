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

import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import nodeResolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [
    reactRefresh(),
    nodeResolve(),
  ],
});



