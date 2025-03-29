// test/example.js
const babel = require("@babel/core");

const code = `
export default {
  证证: "证证",
  a1: 1,
};

if (index < 3) {
  delete obj[key];

  sdLog("证证- " + key + "证证，证证");
} else {

}

// Comment on first line
function a() {
  return (
    <div a="证证" b={"证证"}>
      证证 span <span>证证</span>
      <div>{"证证"}</div>
      证证
    </div>
  );
}

rodType == ProdEnum.证证;
a.证证;
a.证证.证证;
// @no-translate
a.b["证证"];
const j = "证证".startWith("证证");
const i = window.chinese.s2t("证证");
const h = true ? "证证" : "证证";
const f = "123";
const g = "321";
// comment2
const aa = {
  证证: "证证",
};

// comment3
const e = \`证证 \${aa.证证}证证${"证证"}证证\`;

// comment4
const d = {
  title: "title",
  content: "content",
  showCancel: !0,
  cancelText: "取消",
  // coimment5
  cancelColor: "#000000",
  confirmText: "证证",
  confirmColor: "#3CC51F",
  aa: 12,
};

`;

const result = babel.transformSync(code, {
    presets: ["@babel/preset-react"],
    plugins: ["../src/index.js"]
});

console.log(result.code);