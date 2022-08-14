import {
    defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(() => {
    let env = process.env.NODE_ENV;
    return {
        base: env === 'development' ? '/' : './',
        plugins: [vue()],
        server: {
            port: 4444,
            open: true,
            proxy: {
                '/sse': {
                    target: 'http://localhost:2342',
                    changeOrigin: true,
                    // rewrite: (path) => path.replace(/^\/sse/, '')
                },
            }
        },
        resolve: {
            alias: {
                '@/': `${path.resolve(__dirname, 'src')}/`,
            }
        },

    }
})