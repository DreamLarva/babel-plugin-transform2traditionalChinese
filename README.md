# babel-plugin-transform2traditionalChinese

* 将代码中简体中文全部转换为繁体中文  

* 使用注释 `// @no-translate` 不转换当前层级之下的所有代码

### 会改动代码的点
1. `a.b.简体` 转换成 `a.b["简体"]`
2. `{"简体": 1}` 转换成 `{["简体"]: 1}`
3. `<div key="简体">` 转换成  `<div key={"简体"}>`
4. 最后 所有的 简体 StringLiteral(字符串) 和 TemplateElement(模板字符串) 会转换为繁体