'use strict';

var objectToJsonProduct = function objectToJsonProduct(product) {
    return JSON.stringify({
        name: product.name,
        price: product.price,
        campaign: { id: product.campaign },
        category: { id: product.category }
    });
};

var Product_list = {
    name: 'product_list',
    path: '/products',
    component: {
        template: "#products",
        data: function data() {
            return {
                products: []
            };
        },
        mounted: function mounted() {
            var _this = this;

            axios.get(BASE_URL + '/products').then(function (response) {
                return _this.products = response.data;
            });
        },

        methods: {
            productDelete: function productDelete(key) {
                var _this2 = this;

                if (!confirm("Silmek istediğinize emin misiniz?")) {
                    return;
                }

                axios.delete(BASE_URL + '/products/' + this.products[key].productId).then(function (response) {
                    _this2.products.splice(key, 1);
                    alert("Başarıyla Silindi");
                }).catch(function (error) {
                    return alert("Hata Oluştu");
                });
            }
        }
    }
};

var Product_edit = {
    name: 'product_edit',
    path: '/products/:id',
    component: {
        template: "#product",
        data: function data() {
            return {
                product: {},
                categories: [],
                campaigns: [],
                show: false
            };
        },
        mounted: function mounted() {
            var _this3 = this;

            //chain the results
            axios.get(BASE_URL + '/categories').then(function (response) {
                _this3.categories = response.data;

                axios.get(BASE_URL + '/campaigns').then(function (response) {
                    _this3.campaigns = response.data;

                    axios.get(BASE_URL + '/products/' + _this3.$route.params.id).then(function (response) {
                        _this3.product = response.data;
                        _this3.show = true;
                    });
                });
            });
        },

        methods: {
            save: function save() {
                axios.patch(BASE_URL + '/products/' + this.$route.params.id, objectToJsonProduct(this.product), { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                    return alert("Başarıyla Kaydedildi");
                }).catch(function (error) {
                    return alert("Hata Oluştu");
                });
            }
        }
    }
};

var Product_create = {
    name: 'product_create',
    path: '/products/create',
    component: {
        template: "#product",
        data: function data() {
            return {
                product: {
                    category: "",
                    campaign: ""
                },
                categories: [],
                campaigns: [],
                show: true
            };
        },
        mounted: function mounted() {
            var _this4 = this;

            axios.get(BASE_URL + '/categories').then(function (response) {
                return _this4.categories = response.data;
            });
            axios.get(BASE_URL + '/campaigns').then(function (response) {
                return _this4.campaigns = response.data;
            });
        },

        methods: {
            save: function save() {
                axios.post(BASE_URL + '/products', objectToJsonProduct(this.product), { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                    return alert("Başarıyla Kaydedildi");
                }).catch(function (error) {
                    return alert("Hata Oluştu");
                });
            }
        }
    }
};