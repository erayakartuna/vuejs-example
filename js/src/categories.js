let objectToJsonCategory = (category) => {
    return JSON.stringify({
            name : category.name,
            campaign : { id : category.campaign},
        });
};


let Category_list = {
    name: 'category_list',
    path: '/categories',
    component: {
        template: "#categories",
        data(){
            return {
                categories : []
            }
        },
        mounted(){
            axios.get(BASE_URL+'/categories').then(response => this.categories = response.data);
        },
        methods:{
            categoryDelete(key) {
                if(!confirm("Silmek istediğinize emin misiniz?")){
                    return;
                }

                axios.delete(BASE_URL+'/categories/'+this.categories[key].id)
                    .then((response) => {
                        this.categories.splice(key, 1);
                        alert("Başarıyla Silindi");
                    }).catch(error => alert("Hata Oluştu"));
            }
        }
    }
};

let Category_edit = {
    name: 'category_edit',
    path: '/categories/:id',
    component: {
        template: "#category",
        data(){
            return {
                category : {},
                campaigns : [],
                show : false
            }
        },
        mounted(){
            axios.get(BASE_URL+'/campaigns').then((response) => {
                this.campaigns = response.data;

                axios.get(BASE_URL+'/categories/'+this.$route.params.id).then((response) => {
                    this.category = response.data;
                    this.show = true;
                });
            });
        },
        methods:{
            save(){
                axios.patch(BASE_URL+'/categories/'+this.$route.params.id,objectToJsonCategory(this.category),{ headers: { 'Content-Type': 'application/json' } })
                    .then(response => alert("Başarıyla Kaydedildi"))
                    .catch(error => alert("Hata Oluştu"));
            }
        }
    }
};

let Category_create = {
    name: 'category_create',
    path: '/categories/create',
    component: {
        template: "#category",
        data(){
            return {
                category : {
                    campaign : ""
                },
                campaigns : [],
                show : true
            }
        },
        mounted(){
            axios.get(BASE_URL+'/campaigns').then(response => this.campaigns = response.data);
        },
        methods:{
            save(){
                axios.post(BASE_URL+'/categories',objectToJsonCategory(this.category),{ headers: { 'Content-Type': 'application/json' } })
                    .then(response => alert("Başarıyla Kaydedildi"))
                    .catch(error => alert("Hata Oluştu"));
            }
        }
    }
};
