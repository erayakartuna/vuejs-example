'use strict';

var Campaign_list = {
    name: 'campaign_list',
    path: '/campaigns',
    component: {
        template: "#campaigns",
        data: function data() {
            return {
                campaigns: []
            };
        },
        mounted: function mounted() {
            var _this = this;

            axios.get(BASE_URL + '/campaigns').then(function (response) {
                return _this.campaigns = response.data;
            });
        },

        methods: {
            campaignDelete: function campaignDelete(key) {
                var _this2 = this;

                if (!confirm("Silmek istediğinize emin misiniz?")) {
                    return;
                }

                axios.delete(BASE_URL + '/campaigns/' + this.campaigns[key].id).then(function (response) {
                    _this2.campaigns.splice(key, 1);
                    alert("Başarıyla Silindi");
                }).catch(function (error) {
                    return alert("Hata Oluştu");
                });
            }
        }
    }
};

var Campaign_edit = {
    name: 'campaign_edit',
    path: '/campaigns/:id',
    component: {
        template: "#campaign",
        data: function data() {
            return {
                campaign: {
                    type: "r"
                },
                show: false
            };
        },
        mounted: function mounted() {
            var _this3 = this;

            axios.get(BASE_URL + '/campaigns/' + this.$route.params.id).then(function (response) {
                _this3.campaign = response.data;
                _this3.show = true;
            });
        },

        methods: {
            save: function save() {
                var campaign = JSON.stringify(this.campaign);
                axios.patch(BASE_URL + '/campaigns/' + this.$route.params.id, campaign, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                    return alert("Başarıyla Kaydedildi");
                }).catch(function (error) {
                    return alert("Hata Oluştu");
                });
            }
        }
    }
};

var Campaign_create = {
    name: 'campaign_create',
    path: '/campaigns/create',
    component: {
        template: "#campaign",
        data: function data() {
            return {
                campaign: {
                    type: "r"
                },
                show: true
            };
        },

        methods: {
            save: function save() {
                var _this4 = this;

                var campaign = JSON.stringify(this.campaign);
                axios.post(BASE_URL + '/campaigns', campaign, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                    alert("Başarıyla Kaydedildi");
                    _this4.campaign = {};
                }).catch(function (error) {
                    return alert("Hata Oluştu");
                });
            }
        }
    }
};