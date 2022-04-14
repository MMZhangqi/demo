// 全选
var cheAll = document.getElementById("checkAll");
var check = document.getElementsByClassName("check2");
cheAll.onclick = function() {
    for(var i = 0; i < check.length; i++) {
        check[i].checked = this.checked;
    }
    getPrices();
    getJifen();
}
for(var i = 0; i < check.length; i++) {
    check[i].onclick = function() {
        var flag = true;
        for(var j = 0; j < check.length; j++) {
            if(!check[j].checked) {
                flag = false;
            }
        }
        cheAll.checked = flag;
        getPrices();
        getJifen();
    }
}

// 删除宝贝
var dels = document.getElementsByClassName("detel");
for(var i = 0; i < dels.length; i++) {
    dels[i].onclick = function() {
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.previousElementSibling);
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        getXiaoji();
        getPrices();
        getJifen();
    }
}

// 删除选中
var delAll = document.getElementById("del_btn");
delAll.onclick = function() {
    for(var i = 0; i < check.length; i++) {
        if(check[i].checked) {
            check[i].parentNode.parentNode.parentNode.removeChild(check[i].parentNode.parentNode.previousElementSibling);
            check[i].parentNode.parentNode.parentNode.removeChild(check[i].parentNode.parentNode);
            i--;
            getXiaoji();
            getPrices();
            getJifen();
        }
    }
}

// 数量加减
var less = document.getElementsByClassName("jian");
var add = document.getElementsByClassName("jia");
for(var i = 0; i < less.length; i++) {
    less[i].onclick = function() {
        if(this.nextElementSibling.innerHTML == 1) {
            this.nextElementSibling.innerHTML = 1;
        }else {
            this.nextElementSibling.innerHTML-=1;
        }
        getXiaoji();
        getPrices();
        getJifen();
    }
}
for(var i = 0; i < add.length; i++) {
    add[i].onclick = function() {
        if(this.previousElementSibling.innerHTML == 20) {
            this.previousElementSibling.innerHTML = 20;
        }else {
            this.previousElementSibling.innerHTML++;
        }
        getXiaoji();
        getPrices();
        getJifen();
    }
}

// 小计
var price = document.getElementsByClassName("xiaoji");
var danjia = document.getElementsByClassName("price");
var prices = document.getElementById("prices");
function getXiaoji() {
    for(var i = 0; i < price.length; i++) {
        price[i].innerHTML = parseInt(danjia[i].innerHTML) * price[i].parentNode.previousElementSibling.children[1].innerHTML;
    }
}

// 总价格
function getPrices() {
    var sum = 0;
    for(var i = 0; i < price.length; i++) {
        if(check[i].checked) {
            sum += parseInt(price[i].innerHTML);
        }
    }
    prices.innerHTML = sum;
}
getPrices();

// 总积分
function getJifen() {
    var jifens = document.getElementsByClassName("integral");
    var sum1 = 0; 
    for(var i = 0; i < jifens.length; i++) {
        if(check[i].checked) {
            sum1 += jifens[i].innerHTML * jifens[i].nextElementSibling.nextElementSibling.children[1].innerHTML;
        }
    }
    document.getElementById("zongjifen").innerHTML = sum1;
}