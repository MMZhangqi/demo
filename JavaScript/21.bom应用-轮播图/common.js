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
function animate(element, target) {
    // 先清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function() {
        var flag = true;
        // 1.获取元素当前的位置
        var current = element.offsetLeft;
        // 2.div每次移动多少
        var step = 3;
        // 判断往哪边移动
        step = current <= target ? step : -step;
        // 3.每次移动后得距离
        current += step;
        // 4.判断移动后的位置是否达到目标位置
        if(Math.abs(target - current) > Math.abs(step)) {
            element.style.left = current + "px";
            flag = false;
        }else {
            // 清理定时器
            clearInterval(element.timeId);
            element.style.left = target + "px";
            flag = true;
        }
    }, 10)
}