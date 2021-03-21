import {parse} from '@babel/parser';
import * as babel from '@babel/core';

//创建代码
const code = `let a = 'vino'; let b = 'kobe'; const c = 'mamba'`;
//code转换成ast
const ast = parse(code, {sourceType: 'module'});

//ast 转换成es5
const result = babel.transformFromAstAsync(ast, code, {
    presets: ['@babel/preset-env']
});

//打印结果
result.then(data => {
    console.log(data.code);
});
