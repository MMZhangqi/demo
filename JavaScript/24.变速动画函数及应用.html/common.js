// 通过id名获取元素
function my$(id) {
    return document.getElementById(id);
}

// 通过class名获取元素
function cl$(cla) {
    return document.getElementsByClassName(cla);
}

// 通过标签名获取元素
function ele$(el) {
    return document.getElementsByTagName(el);
}

// 元素绑定事件兼容处理
// function addEventListener(element, type, fn) {
//     // 判断是不是支持这个方法
//     if(element.addEventListener) {
//         element.addEventListener(type, fn, false);
//     }else if(element.attachEvent) {
//         element.attachEvent("on" + type, fn);
//     }else {
//         element["on" + type] = fn;
//     }
// }

// 封装匀速动画函数--->任意一个元素移动到指定的目标位置
// @params：元素 目标位置
function animate(element, target) {
    // 先清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        // 1.获取元素当前的位置
        var current = element.offsetLeft;
        // 2.div每次移动多少
        var step = 10;
        // 判断往哪边移动
        step = current <= target ? step : -step;
        // 3.每次移动后得距离
        current += step;
        // 4.判断移动后的位置是否达到目标位置
        if (Math.abs(target - current) > Math.abs(step)) {
            element.style.left = current + "px";
            flag = false;
        } else {
            // 清理定时器
            clearInterval(element.timeId);
            element.style.left = target + "px";
            flag = true;
        }
    }, 5)
}

// 简化：封装获取页面向上或者向左卷曲出去的距离值
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft,
        top: window.pageYOffset || document.documentElement.scrollTop
    }
}

// 封装变速动画函数--->任意一个元素移动到指定的目标位置
// @params：元素 目标位置
function animateBian(element, target) {
    // 先清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        // 1.获取元素当前的位置
        var current = element.offsetLeft;
        // 2.div每次移动多少
        var step = (target - current) / 10;
        // 判断步数 > 0 向上取整，否则向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 3.每次移动后得距离
        current += step;
        element.style.left = current + "px";
        if (current == target) {
            clearInterval(element.timeId);
        }
        // console.log("目标位置：" + target);
        // console.log("每步的距离：" + step);
        // console.log("当前位置：" + current);
    }, 10)
}

// 获取任意一个元素的任意一个样式属性值
// @params：element（元素）   attr（属性名）
function getStyle(element, attr) {
    // 判断是否支持该方法
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    } else {
        return element.currentStyle[attr];
    }
}
// 设置任意一个元素的任意一个样式属性值打到任意一个目标位置
// @params：
//          element --- 元素
//          json --- 对象
//          fn --- 回调函数：函数当作参数使用
function animateStyle(element, json, fn) {
    // 先清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        // 开关：假设全部到达目标位置
        var flag = true;
        // 遍历的去设置目标位置
        for (var attr in json) {
            // 判断这个属性attr是不是opacity
            if (attr == "opacity") {
                // 先获取元素当前的属性值
                var current = getStyle(element, attr) * 100;// 转化为数字类型 1*100=100
                // 存储的是每一个的目标位置
                var target = json[attr] * 100;// 0.2*100=20
                // 2.变化的数值
                var step = (target - current) / 10;// -8
                // 判断步数 > 0 向上取整，否则向下取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);// -8
                // 3.移动后元素当前的属性值
                current += step;// 92
                // 给元素设置对应属性值
                element.style[attr] = current / 100;// 92 / 100
            } else if (attr == "zIndex") {
                // 直接改变这个属性的值
                element.style[attr] = json[attr];
            } else {
                // 先获取元素当前的属性值
                var current = parseInt(getStyle(element, attr));// 转化为数字类型
                // 存储的是每一个的目标位置
                var target = json[attr];
                // 2.变化的数值
                var step = (target - current) / 10;
                // 判断步数 > 0 向上取整，否则向下取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                // 3.移动后元素当前的属性值
                current += step;
                element.style[attr] = current + "px";
            }
            // 某一个的当前属性 == 目标属性，条件成立
            // 问题：只判断一个属性达到目标位置就会清理定时器
            // if (current == target) {
            //     clearInterval(element.timeId);
            // }
            // 判断有一个没有达到目标位置，立马让flag = false;
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            // 清理定时器
            clearInterval(element.timeId);
            // 判断用户有没有传fn函数
            if (fn) {
                fn();
            }
        }
    }, 20)
}