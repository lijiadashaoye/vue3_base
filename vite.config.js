import {
    defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
    let env = process.env.NODE_ENV;
    return {
        base: env === 'development' ? '/' : './',
        plugins: [vue()],
        server: {
            port: 4444,
            open: true,
            proxy: {
                '/api': {
                    target: 'http://jsonplaceholder.typicode.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
            }
        },
        resolve: {
            alias: {
                '@': __dirname + "/src",
            }
        }
    }
})