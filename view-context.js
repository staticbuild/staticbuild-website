'use strict';

var fs = require('fs');
var hljs = require('highlight.js');

function highlightJS(js) {
	return hljs.highlight('javascript', js).value;
}
exports.highlightJS = highlightJS;

function readFile(filePath) {
	return fs.readFileSync(filePath, 'utf8');
}
exports.readFile = readFile;
