import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()]
	// resolve: {
	// 	alias: {
	// 		'@bitterroot/core/call-numbers/api': path.resolve(
	// 			__dirname,
	// 			'../core/src/api/http.web.ts'
	// 		)
	// 	}
	// }
});
