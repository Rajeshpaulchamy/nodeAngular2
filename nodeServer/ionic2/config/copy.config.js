// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
	copyAssets: {
		src: ['{{SRC}}/assets/**/*'],
		dest: '{{WWW}}/assets'
	},
	copyIndexContent: {
		src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
		dest: '{{WWW}}'
	},
	copyFonts: {
		src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
		dest: '{{WWW}}/assets/fonts'
	},
	copyPolyfills: {
		src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
		dest: '{{BUILD}}'
	},
	copySwToolbox: {
		src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
		dest: '{{BUILD}}'
	},

	copyLibFonts: {
		src: [
			'{{ROOT}}/libs/font-awesome/fonts/**/*'
		],
		dest: '{{WWW}}/assets/fonts/'
	},


	copyLibCss: {
		src: [
			'{{ROOT}}/src/assets/css/iconic-override.css', 
			'{{ROOT}}/libs/bootstrap/css/bootstrap.4.0.css', 
			'{{ROOT}}/libs/gridstack/css/gridstack.css',
			'{{ROOT}}/libs/gridstack/css/gridstack-extra.css',
			'{{ROOT}}/libs/dragndrop/css/dragNdropWidgets.css',
			'{{ROOT}}/libs/datatable/css/dataTables.bootstrap4.min.css',
			'{{ROOT}}/libs/font-awesome/css/font-awesome.min.css'
		],
		dest: '{{WWW}}/assets/css/'
	},

	copyLibJs: {
		src: [
			'{{ROOT}}/libs/jquery/js/jquery-3.1.1.js',
			'{{ROOT}}/libs/jqueryui/js/jquery-ui.1.12.js',
			'{{ROOT}}/libs/bootstrap/js/bootstrap.3.3.min.js',
			'{{ROOT}}/libs/lodash/js/lodash.min.js',
			'{{ROOT}}/libs/gridstack/js/gridstack.js',
			'{{ROOT}}/libs/gridstack/js/gridstack.jQueryUI.js',
			'{{ROOT}}/libs/dragndrop/js/dragNdropWidgets.js',
			'{{ROOT}}/libs/datatable/js/jquery.dataTables.min.js',
			'{{ROOT}}/libs/datatable/js/dataTables.bootstrap4.min.js',
			'{{ROOT}}/libs/chart/js/Chart.bundle.min.js'
		],
		dest: '{{BUILD}}/js/'
	},

}

