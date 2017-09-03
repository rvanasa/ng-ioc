'use strict'

var camelize = require('camelize');

module.exports = function(app, path, config)
{
	if(!config) config = {};
	
	register('component', require.context(path, true, /\.component\.js$/i));
	register('directive', require.context(path, true, /\.directive\.js$/i));
	register('provider', require.context(path, true, /\.provider\.js$/i));
	register('constant', require.context(path, true, /\.constant\.js$/i));
	register('value', require.context(path, true, /\.value\.js$/i));
	register('service', require.context(path, true, /\.service\.js$/i));
	register('factory', require.context(path, true, /\.factory\.js$/i));
	register('filter', require.context(path, true, /\.filter\.js$/i));
	
	registerSpecial('run', require.context(path, true, /\.run\.js$/i));
	registerSpecial('config', require.context(path, true, /\.config\.js$/i));
	
	function requireAll(context)
	{
		return context.keys().map(path =>
		{
			let index = path.lastIndexOf('/') + 1;
			return {
				name: camelize(path.substring(index, path.indexOf(path, index))),
				exports: context(path), 
			};
		});
	}
	
	function register(type, context)
	{
		for(let file of requireAll(context))
		{
			app[type](file.exports.name || file.name, file.exports);
		}
	}
	
	function registerSpecial(type, context)
	{
		for(let file of requireAll(context))
		{
			app[type](file.exports);
		}
	}
	
	return app;
}