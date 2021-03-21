import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import {readFileSync} from 'fs';
import {resolve, relative, dirname} from 'path';

//设置根目录
const projectRoot = resolve(__dirname, 'project-5');

//声明类型
type DepRelation = { [key: string]: { deps: string[], code: string } }
//初始化一个空的depRelation,用于收集依赖
const depRelation: DepRelation = {};

//将入口文件的绝对路径传入函数
collectCodeAndDeps(resolve(projectRoot, 'index.js'));

console.log(depRelation);
console.log('done');

function collectCodeAndDeps(filePath: string) {
    const key = getProjectPath(filePath); //获取文件的路径；index.js
    const code = readFileSync(filePath).toString();
    //初始化depRelation
    depRelation[key] = {deps: [], code};
    //将代码转化成ast
    const ast = parse(code, {sourceType: 'module'});
    //遍历ast
    traverse(ast, {
        enter: path => {
            if (path.node.type === 'ImportDeclaration') {
                //将path.node.source.value转换成绝对路径
                const depAbsolutePath = resolve(dirname(filePath), path.node.source.value);
                //转换成项目路径
                const depProjectPath = getProjectPath(depAbsolutePath);
                //把依赖写进depRelation
                depRelation[key].deps.push(depProjectPath);
                collectCodeAndDeps(depAbsolutePath);
            }
        }
    });
}

//获取文件的相对路径
function getProjectPath(path: string) {
    return relative(projectRoot, path).replace(/\\/g, '/');
}
