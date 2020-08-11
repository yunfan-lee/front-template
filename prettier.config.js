module.exports = {
    printWidth: 200,
    tabWidth: 4, // tab缩进大小,默认为2
    useTabs: false, // 使用tab缩进，默认false
    semi: true, // 使用分号, 默认true
    singleQuote: false, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    TrailingCooma: "none", // 行尾逗号，默认none,可选 none|es5|all
    bracketSpacing: true, // 对象中的空格，默认true
    arrowParens: "avoid", // 箭头函数参数括号，默认avoid 可选 avoid | always
    htmlWhitespaceSensitivity: "ignore", // html属性换行，可选 strict(严格执行行内属性) | ignore(可分行和行内)
    eslintIntegration: true
};
