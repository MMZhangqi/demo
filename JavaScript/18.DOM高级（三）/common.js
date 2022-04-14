// 通过id名获取元素
function my$(id) {
    return document.getElementById(id);
}

// 通过class名获取元素
function cl$(cla) {
    return document.getElementsByClassName(cla);
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