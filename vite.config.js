import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: process.env.NODE_ENV === 'production' ? '/opensinta/' : '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            }
        }
    },
    server: {
        proxy: {
            '/api/ai-detection': {
                target: 'https://semenjana.biz.id',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/ai-detection/, '/api/ai-detection.php')
            },
            '/api/ai-detection-result': {
                target: 'https://semenjana.biz.id',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/ai-detection-result/, '/api/ai-detection-result.php')
            }
        }
    },
    worker: {
        format: 'es'
    },
    optimizeDeps: {
        include: ['pdfjs-dist']
    }
})
