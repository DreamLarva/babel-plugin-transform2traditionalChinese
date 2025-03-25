const chinese = require("./s2t");

function babelTranslatePlugin({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        const file = path.hub.file;
        // if (file) console.log(`当前节点所在文件：${file.opts.filename}`);
        const traditional = chinese.s2t(path.node.name);

        // a.b.简体 转换成 a.b["简体"]
        if (
          path.parentPath.isMemberExpression({ property: path.node }) &&
          traditional !== path.node.name
        ) {
          path.parentPath.node.computed = true;
          path.replaceWith(t.StringLiteral(path.node.name));
        }

        // {"简体": 1} 转换成 {["简体"]: 1}
        if (
          path.parentPath.isObjectProperty({ key: path.node }) &&
          traditional !== path.node.name
        ) {
          path.parentPath.node.computed = true;
          path.replaceWith(t.StringLiteral(path.node.name));
          // path.skip(); // 跳过
          // return;
        }
      },
      StringLiteral(path) {
        const originalValue = path.node.value;

        const callExpression = t.callExpression(
          t.identifier("window.Chinese.transform"), // 函数名
          [t.StringLiteral(originalValue)], // 将原字符串作为参数传递给函数
        );

        if (originalValue && originalValue.trim() !== "") {
          const traditional = chinese.s2t(originalValue);
          if (originalValue !== traditional) {
            //  <div key="简体"> 转换成  <div key={"简体"}>
            if (path.parentPath.isJSXAttribute()) {
              path.replaceWith(
                t.JSXExpressionContainer(t.StringLiteral(originalValue)),
              );
              // path.skip(); // 跳过
              // return;
            }

            // 字符串 "简体" 转换成 window.Chinese.s2t("简体")
            // path.replaceWith(callExpression);

            // 检查注释
            const isNoTranslate =
              path.find((p) => {
                // console.log(p)
                const c = p.node.leadingComments;

                return (
                  c &&
                  p.node.leadingComments.some((v) =>
                    /@no-translate/.test(v.value),
                  )
                );
              }) != null;

            if (isNoTranslate) {
              path.skip();
            } else {
              const file = path.hub.file;
              if (traditional)
                console.log(
                  `${file.opts.filename} \n ${originalValue} => ${traditional}`,
                );

              path.replaceWith(t.StringLiteral(traditional));
              path.skip();
            }
          }
        }
      },
    },
  };
}

module.exports = babelTranslatePlugin;
