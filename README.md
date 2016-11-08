# gulp-rn-css-js
在react native 使用css scss，用gulp编译成js

## 安装
```
npm install gulp-rn-css-js --save-dev
```
## 使用方法
```

var gulp = require('gulp');
var rnCssJs = require('gulp-rn-css-js');

// 编译scss|css
gulp.task('scss', function() {
   return gulp.src('./css/**/!(_)*.{scss,css}')
        .pipe(rnCssJs({
           prettyPrint: true,   // 是否进行格式化打印
           useEs6: true,        // 以es6输出
           tsAble:false,        // 是否支持typescript
           literalObject: true, // 不包括reactnative StyleSheet处理
           specialParse: []     // 特殊处理
        }))
        .pipe(gulp.dest('./built'));
});

```

## 编译前后
### 编译前css
```
.test{
    border:1px solid #fff;
    padding:1px 2px 4px 3px;
    transform: scale(.9, 8) rotate(7deg);
    color: #000;
    font-size: 12px;
    margin:1px 3px 4px 5px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 10px 10px 5px #888888;
}
```
### 编译后js
```
module.exports = {
    test:{
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderColor": "#fff",
        "paddingTop": 1,
        "paddingRight": 2,
        "paddingBottom": 4,
        "paddingLeft": 3,
        "color": "#000",
        "fontSize": 12,
        "marginTop": 1,
        "marginRight": 3,
        "marginBottom": 4,
        "marginLeft": 5,
        "borderRadius": 10,
        "textAlign": "center",
        "shadowColor": "#888888",
        "shadowOpacity": 1,
        "shadowRadius": 5,
        "transform": [
                {
                        "scale": 0.9
                },
                {
                        "rotate": "7deg"
                }
        ],
        "shadowOffset": {
                "width": 10,
                "height": 10
        },
    },
}
```
### 关于
Licensed under MIT. Based off of the works of [rn-css-js](https://github.com/nt-team/rn-css-js).
