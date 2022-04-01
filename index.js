#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const stringUtils = require('./string-utils');

const currentDirectory = process.cwd();
const componentNames = process.argv.slice(2);

componentNames.forEach((componentName) => {
    const componentNameCase = stringUtils.getCase(componentName);
    let componentNameTokens;
    let componentKebabCaseName;
    let componentCamelCaseName;
    switch (componentNameCase) {
        case stringUtils.Cases.KEBAB:
            componentNameTokens = stringUtils.parseKebabCase(componentName);
            componentKebabCaseName = componentName;
            componentCamelCaseName = stringUtils.camelize(componentNameTokens);
            break;
        default:
            componentNameTokens = stringUtils.parseCamelCase(componentName);
            componentCamelCaseName = componentName;
            componentKebabCaseName = stringUtils.kebabize(componentNameTokens);
    }

    const componentDirName = path.join(currentDirectory, componentKebabCaseName);

    fs.mkdir(componentDirName, err => {
        if (err) {
            throw err;
        }
        createComponentScriptFile(componentDirName, componentKebabCaseName, componentCamelCaseName);
        createComponentStyleFile(componentDirName, componentKebabCaseName);
        createComponentIndexFile(componentDirName, componentKebabCaseName, componentCamelCaseName);
    })
})


const createComponentScriptFile = (dirName, componentKebabCaseName, componentCamelCaseName) => {
    fs.writeFile(path.join(dirName, componentKebabCaseName + '.tsx'), `import React, { FC } from 'react';\nimport './${componentKebabCaseName}.scss';\n\nexport type ${componentCamelCaseName}Props = {};\n\nexport const ${componentCamelCaseName}: FC<${componentCamelCaseName}Props> = ({}) => <div className="${componentKebabCaseName}"></div>
`, err => {
        if (err) {
            throw err;
        }
    });

}

const createComponentStyleFile = (dirName, componentKebabCaseName) => {
    fs.writeFile(path.join(dirName, componentKebabCaseName + '.scss'),
        `.${componentKebabCaseName} {\n\n}`,
        err => {
            if (err) {
                throw err;
            }
        });
}

const createComponentIndexFile = (dirName, componentKebabCaseName, componentCamelCaseName) => {
    fs.writeFile(path.join(dirName, 'index.ts'),
        `import { ${componentCamelCaseName}, ${componentCamelCaseName}Props } from './${componentKebabCaseName}'\n\nexport { ${componentCamelCaseName} };\nexport type { ${componentCamelCaseName}Props };`,
        err => {
            if (err) {
                throw err;
            }
        });
}


