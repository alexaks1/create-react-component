const Cases = {
    KEBAB: 0,
    CAMEL: 1,
};

const parseKebabCase = str => str.split('-');
const kebabize = tokens => tokens.join('-');

const parseCamelCase = str => {
    let newToken = '';
    const tokens = [];
    for (let i = 0; i < str.length; ++i) {
        const currentChar = str[i];
        if (currentChar === currentChar.toUpperCase()) {
            if (i !== 0)
                tokens.push(newToken);
            newToken = currentChar.toLowerCase();
        } else {
            newToken += currentChar;
        }
    }
    tokens.push(newToken);
    return tokens;
};

const camelize = tokens => tokens.reduce((prev, current, index) => {
    const capitalizedCurrent = current.charAt(0).toUpperCase() + current.slice(1);
    return prev + capitalizedCurrent;
}, '');


const getCase = str => {
    if (str.includes('-')) {
        return Cases.KEBAB;
    }
    return Cases.CAMEL;
}

module.exports = {
    Cases,
    getCase,
    parseCamelCase,
    camelize,
    parseKebabCase,
    kebabize,
};