let Campaign_list = {
    name: 'campaign_list',
    path: '/campaigns',
    component: {
        template: "#campaigns",
        data(){
            return {
                campaigns : []
            }
        },
        mounted(){
            axios.get(BASE_URL+'/campaigns').then(response => this.campaigns = response.data);
        },
        methods:{
            campaignDelete(key) {
                if(!confirm("Silmek istediğinize emin misiniz?")){
                    return;
                }

                axios.delete(BASE_URL+'/campaigns/'+this.campaigns[key].id)
                    .then((response) => {
                        this.campaigns.splice(key, 1);
                        alert("Başarıyla Silindi");
                    })
                    .catch(error => alert("Hata Oluştu"));
            }
        }
    }
};

let Campaign_edit = {
    name: 'campaign_edit',
    path: '/campaigns/:id',
    component: {
        template: "#campaign",
        data(){
            return {
                campaign : {
                    type : "r"
                },
                show : false
            }
        },
        mounted(){
            axios.get(BASE_URL+'/campaigns/'+this.$route.params.id).then((response) => {
                this.campaign = response.data;
                this.show = true;
            });
        },
        methods:{
            save(){
                let campaign = JSON.stringify(this.campaign);
                axios.patch(BASE_URL+'/campaigns/'+this.$route.params.id,campaign,{ headers: { 'Content-Type': 'application/json' } })
                    .then(response => alert("Başarıyla Kaydedildi"))
                    .catch(error => alert("Hata Oluştu"));
            }
        }
    }
};

let Campaign_create = {
    name: 'campaign_create',
    path: '/campaigns/create',
    component: {
        template: "#campaign",
        data(){
            return {
                campaign : {
                    type : "r"
                },
                show : true
            }
        },
        methods:{
            save(){
                let campaign = JSON.stringify(this.campaign);
                axios.post(BASE_URL+'/campaigns',campaign,{ headers: { 'Content-Type': 'application/json' } })
                    .then((response) => {
                        alert("Başarıyla Kaydedildi");
                        this.campaign = {};
                    }).catch(error => alert("Hata Oluştu"));
            }
        }
    }
};
