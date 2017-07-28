#!/usr/bin/env node

global.FOAM_FLAGS = {
  'node': true,
  'swift': true,
  'debug': true,
};

var execSync = require('child_process').execSync

var dir = __dirname;
var root = dir + '/../..';
var genDir = dir + '/gen';

require(root + '/src/foam.js');
execSync('rm -rf ' + genDir);

var executor = foam.classloader.NodeJsModelExecutor.create({
  classpaths: [
    dir + '/../../src',
    dir + '/models',
  ],
  modelId: 'GenSwift',
  modelArgs: {
    models: [
      'foam.mlang.Expr',
    ],
    outdir: genDir,
  },
});
executor.execute();
