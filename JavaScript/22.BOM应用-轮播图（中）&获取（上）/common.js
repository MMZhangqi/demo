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
function addEventListener(element, type, fn) {
    // 判断是不是支持这个方法
    if(element.addEventListener) {
        element.addEventListener(type, fn, false);
    }else if(element.attachEvent) {
        element.attachEvent("on" + type, fn);
    }else {
        element["on" + type] = fn;
    }
}

// 封装匀速动画函数--->任意一个元素移动到指定的目标位置
// @params：元素 目标位置
// function animate(element, target) {
//     // 先清理定时器
//     clearInterval(element.timeId);
//     element.timeId = setInterval(function() {
//         var flag = true;
//         // 1.获取元素当前的位置
//         var current = element.offsetLeft;
//         // 2.div每次移动多少
//         var step = 30;
//         // 判断往哪边移动
//         step = current <= target ? step : -step;
//         // 3.每次移动后得距离
//         current += step;
//         // 4.判断移动后的位置是否达到目标位置
//         if(Math.abs(target - current) > Math.abs(step)) {
//             element.style.left = current + "px";
//             flag = false;
//         }else {
//             // 清理定时器
//             clearInterval(element.timeId);
//             element.style.left = target + "px";
//             flag = true;
//         }
//     }, 10)
// }
/**
 * 
 * @param {*} Element 元素对象
 * @param {*} target 移动目标位置
 */
function animate (Element, target) {
    // 第一步----清除定时器
    clearInterval(Element.timeId);
    // 第二部----创建定时器
    Element.timeId = setInterval(function () {
        // 第三步-----获取元素当前位置
        var current = Element.offsetLeft;//获取当前位置的偏移量
        // 第四步-----设置每一次移动的距离
        var step = 30;
        // 第五步-----判断往那边走
        // 当前位置current 大于目标位置 target 则往反方向走step为负，否则为正
        step = current <= target ? step : -step;
        // 第六步-----当前位置（current）+移动的的距离（step）= 新的位置
        current += step;
        // 第七步-----判断移动后的位置是否到达目标位置
        if(Math.abs(current - target) >= Math.abs(step)) {
            Element.style.left = current + "px";
        }else {
            // 清理当前定时器
            clearInterval(Element.timeId);
            // 将目标位置给到Element
            Element.style.left = target + "px";
        }
    })
}