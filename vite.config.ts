import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	esbuild: {
		target: 'es2022' // Target ES2022 for top-level await support
	 }
});
