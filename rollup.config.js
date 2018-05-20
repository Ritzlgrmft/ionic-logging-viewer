export default {
	format: 'umd',
	moduleName: 'logging-viewer',
	external: [
		'@angular/core',
		'@angular/common',
		'ionic-angular',
		'ionic-configuration-service',
		'ionic-logging-service'
	],
	onwarn: (warning) => {
		const skip_codes = [
			'THIS_IS_UNDEFINED',
			'MISSING_GLOBAL_NAME',
			'DEPRECATED_OPTIONS'
		];
		if (skip_codes.indexOf(warning.code) != -1) return;
		console.error(warning);
	}
}