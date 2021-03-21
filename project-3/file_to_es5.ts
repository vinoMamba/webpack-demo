import {parse} from '@babel/parser';
import * as babel from '@babel/core';
import * as fs from 'fs';

//创建代码
const code = fs.readFileSync('./a.js').toString();
//code转换成ast
const ast = parse(code, {sourceType: 'module'});

//ast 转换成es5
const result = babel.transformFromAstAsync(ast, code, {
    presets: ['@babel/preset-env']
});

//打印结果
result.then(data => {
    fs.writeFileSync('./a_to_es5.js', data.code);
});
