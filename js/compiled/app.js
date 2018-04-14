'use strict';

var router = new VueRouter({
    mode: 'hash',
    base: 'localhost:8080/',
    routes: [Product_list, Product_create, Product_edit, Category_list, Category_create, Category_edit, Campaign_list, Campaign_create, Campaign_edit]
});

var app = new Vue({
    router: router
}).$mount('#app');