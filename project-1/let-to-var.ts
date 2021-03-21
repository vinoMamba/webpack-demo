import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

//定义代码
const code = `let a = 'let'; let b = 2`;
//将代码转换成ast
const ast = parse(code, {sourceType: 'module'});
//遍历ast，将节点上的let变成var
traverse(ast, {
    enter: item => {
        if (item.node.type === 'VariableDeclaration') {
            if (item.node.kind === 'let') {
                item.node.kind = 'const';
            }
        }
    }
});

//将ast变成 code2
const result = generate(ast, {}, code);
//打印结果
console.log(result.code);