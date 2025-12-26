import { defineConfig } from 'tsup'
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'

export default defineConfig({
	entry: ['src/**/*.ts', 'src/**/*.tsx'],
	dts: {
		entry: 'src/index.ts',
	},
	format: ['cjs', 'esm'],
	sourcemap: true,
	clean: true,
	minify: true,
	target: 'esnext',
	keepNames: true,
	external: ['react', 'react-dom'],
	esbuildPlugins: [
		sassPlugin({
			filter: /\.module\.(s[ac]ss|css)$/,
			type: 'css',
			transform: postcssModules({
				generateScopedName: '[name]__[local]___[hash:base64:5]',
			}),
		}),
		sassPlugin({
			filter: /\.s[ac]ss$/,
			type: 'css',
		}),
	],
	splitting: true,
	treeshake: true,
	outDir: 'dist',
})
