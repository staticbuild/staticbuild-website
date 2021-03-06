'use strict';

var fs = require('fs');
var lodash = require('lodash');
var hljs = require('highlight.js');
var marked = require('marked');
var path = require('path');

var ExamplesPath = 'examples/api';

exports.marked = marked;

function findConfigurable(astNode) {
  if (!astNode || !astNode.tags || astNode.tags.length < 1)
    return undefined;
  var tag = lodash.find(astNode.tags, function(value) {
    return value.title === "configurable";
  });
  return tag;
}
exports.findConfigurable = findConfigurable;

function getExamples(moduleName, memberName) {
  var dirPath = path.join(ExamplesPath, moduleName, memberName);
  var fileNames = fs.existsSync(dirPath) ? fs.readdirSync(dirPath) : [];
  var examples = lodash.map(fileNames, function (value, index) {
    return {
      name: value,
      path: path.join(dirPath, value),
      ext: path.extname(value)
    };
  });
  return examples;
}
exports.getExamples = getExamples;

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

function renderMDFile(filePath) {
  var contents = readFile(filePath);
  return marked(contents);
}
exports.renderMDFile = renderMDFile;

function renderJSFile(filePath) {
  var contents = readFile(filePath);
  return highlightJS(contents);
}
exports.renderJSFile = renderJSFile;

function memberTypeNames(member) {
  if (member && member.type && member.type.names)
    return member.type.names.join(', ');
  return '';
}
exports.memberTypeNames = memberTypeNames;

function methodParamNames(method) {
  if (!method || !method.params)
    return '';
  var names = [];
  for (var i = 0; i < method.params.length; i++) {
    var name = method.params[i].name;
    if (name.indexOf('.') < 0)
      names.push(name);
  }
  var joined = names.join(', ');
  return joined;
}
exports.methodParamNames = methodParamNames;
