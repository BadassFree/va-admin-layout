/*
 * @Author: 蚊子
 * @Date: 2023-01-31 11:32:59
 * @LastEditTime: 2023-01-31 14:59:42
 * @LastEditors: 蚊子
 * @Description: 
 * @FilePath: /va-admin-layout/vite.config.ts
 * 坚持就是........
 */
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import DefineOptions from 'unplugin-vue-define-options/dist/vite';
import unocss from 'unocss/vite';


export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, `.env.${configEnv.mode}`);

  const isVercel = viteEnv.VITE_IS_VERCEL === '1';

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      vue(),
      DefineOptions(),
      unocss({ include: ['src/App.vue'] }),
      dts({
        include: ['./src/index.ts', './src/index.vue'],
        beforeWriteFile(filePath, content) {
          return {
            filePath: filePath.replace('/dist/src/', '/dist/'),
            content
          };
        }
      })
    ],
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    build: isVercel
      ? {
          brotliSize: false
        }
      : {
          lib: {
            entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
            name: 'BadassAdminLayout',
            fileName: 'index'
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              globals: {
                vue: 'Vue'
              }
            }
          }
        }
  };
});