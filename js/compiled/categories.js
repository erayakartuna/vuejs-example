'use strict';

var objectToJsonCategory = function objectToJsonCategory(category) {
    return JSON.stringify({
        name: category.name,
        campaign: { id: category.campaign }
    });
};

var Category_list = {
    name: 'category_list',
    path: '/categories',
    component: {
        template: "#categories",
        data: function data() {
            return {
                categories: []
            };
        },
        mounted: function mounted() {
            var _this = this;

            axios.get(BASE_URL + '/categories').then(function (response) {
                return _this.categories = response.data;
            });
        },

        methods: {
            categoryDelete: function categoryDelete(key) {
                var _this2 = this;

                if (!confirm("Silmek istediğinize emin misiniz?")) {
                    return;
                }

                axios.delete(BASE_URL + '/categories/' + this.categories[key].id).then(function (response) {
                    _this2.categories.splice(key, 1);
                    alert("Başarıyla Silindi");
                }).catch(function (error) {
                    return alert("Hata Oluştu");
                });
            }
        }
    }
};

var Category_edit = {
    name: 'category_edit',
    path: '/categories/:id',
    component: {
        template: "#category",
        data: function data() {
            return {
                category: {},
                campaigns: [],
                show: false
            };
        },
        mounted: function mounted() {
            var _this3 = this;

            axios.get(BASE_URL + '/campaigns').then(function (response) {
                _this3.campaigns = response.data;

                axios.get(BASE_URL + '/categories/' + _this3.$route.params.id).then(function (response) {
                    _this3.category = response.data;
                    _this3.show = true;
                });
            });
        },

        methods: {
            save: function save() {
                axios.patch(BASE_URL + '/categories/' + this.$route.params.id, objectToJsonCategory(this.category), { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                    return alert("Başarıyla Kaydedildi");
                }).catch(function (error) {
                    return alert("Hata Oluştu");
                });
            }
        }
    }
};

var Category_create = {
    name: 'category_create',
    path: '/categories/create',
    component: {
        template: "#category",
        data: function data() {
            return {
                category: {
                    campaign: ""
                },
                campaigns: [],
                show: true
            };
        },
        mounted: function mounted() {
            var _this4 = this;

            axios.get(BASE_URL + '/campaigns').then(function (response) {
                return _this4.campaigns = response.data;
            });
        },

        methods: {
            save: function save() {
                axios.post(BASE_URL + '/categories', objectToJsonCategory(this.category), { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                    return alert("Başarıyla Kaydedildi");
                }).catch(function (error) {
                    return alert("Hata Oluştu");
                });
            }
        }
    }
};