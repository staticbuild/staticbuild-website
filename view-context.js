'use strict';

var fs = require('fs');
var lodash = require('lodash');
var hljs = require('highlight.js');

function highlightJS(js) {
	return hljs.highlight('javascript', js).value;
}
exports.highlightJS = highlightJS;

function readFile(filePath) {
	return fs.readFileSync(filePath, 'utf8');
}
exports.readFile = readFile;

function readClassAST(className) {
	var filePath = './ast/' + className + '.json';
	var ast = require(filePath);
	var result = {
		root: null,
		fields: [],
		functions: [],
		static: {
			fields: [],
			functions: []
		}
	};
	for (var i=0; i < ast.length; i++) {
		var entry = ast[i];
		if (entry.ignore)
			continue;
		// Class?
		if (
			entry.kind === "class" && 
			entry.name === className && 
			entry.scope === "global"
		) {
			result.root = entry;
			continue;
		}
		// Member?
		if (entry.memberof !== className)
			continue;
		if (entry.scope === "instance") {
			if (entry.kind === "member")
				result.fields.push(entry);
			else if (entry.kind === "function")
				result.functions.push(entry);
		} else if (entry.scope === "static") {
			if (entry.kind === "member")
				result.static.fields.push(entry);
			else if (entry.kind === "function")
				result.static.functions.push(entry);
		}
	}
	result.fields = lodash.sortBy(result.fields, 'name');
	result.functions = lodash.sortBy(result.functions, 'name');
	result.static.fields = lodash.sortBy(result.static.fields, 'name');
	result.static.functions = lodash.sortBy(result.static.functions, 'name');
	return result;
}
exports.readClassAST = readClassAST;

function methodParamNames(method) {
  if (!method || !method.params)
    return '';
  var names = [];
  for (var i = 0; i < method.params.length; i++) {
    names.push(method.params[i].name);
  }
  var joined = names.join(', ');
  return joined;
}
exports.methodParamNames = methodParamNames;
