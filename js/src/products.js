let objectToJsonProduct = (product) => {
    return JSON.stringify({
            name : product.name,
            price : product.price,
            campaign : { id : product.campaign},
            category : { id : product.category }
        });
};

let Product_list = {
    name: 'product_list',
    path: '/products',
    component: {
        template: "#products",
        data(){
            return {
                products : []
            }
        },
        mounted(){
            axios.get(BASE_URL+'/products').then(response => this.products = response.data);
        },
        methods:{
            productDelete(key) {
                if(!confirm("Silmek istediğinize emin misiniz?")){
                    return;
                }

                axios.delete(BASE_URL+'/products/'+this.products[key].productId)
                    .then((response) => {
                        this.products.splice(key, 1);
                        alert("Başarıyla Silindi");
                    }).catch(error => alert("Hata Oluştu"));
            }
        }
    }
};

let Product_edit = {
    name: 'product_edit',
    path: '/products/:id',
    component: {
        template: "#product",
        data(){
            return {
                product : {},
                categories : [],
                campaigns : [],
                show : false
            }
        },
        mounted(){
            //chain the results
            axios.get(BASE_URL+'/categories').then((response) => {
                this.categories = response.data;

                axios.get(BASE_URL+'/campaigns').then((response) => {
                    this.campaigns = response.data;

                    axios.get(BASE_URL+'/products/'+this.$route.params.id).then((response) => {
                        this.product = response.data;
                        this.show = true;
                    });
                });

            });

        },
        methods:{
            save(){
                axios.patch(BASE_URL+'/products/'+this.$route.params.id,objectToJsonProduct(this.product),{ headers: { 'Content-Type': 'application/json' } })
                    .then(response => alert("Başarıyla Kaydedildi"))
                    .catch(error => alert("Hata Oluştu"));
            }
        }
    }
};

let Product_create = {
    name: 'product_create',
    path: '/products/create',
    component: {
        template: "#product",
        data(){
            return {
                product : {
                    category : "",
                    campaign : ""
                },
                categories : [],
                campaigns : [],
                show : true
            }
        },
        mounted(){
            axios.get(BASE_URL+'/categories').then(response => this.categories = response.data);
            axios.get(BASE_URL+'/campaigns').then(response => this.campaigns = response.data);
        },
        methods:{
            save(){
                axios.post(BASE_URL+'/products',objectToJsonProduct(this.product),{ headers: { 'Content-Type': 'application/json' } })
                    .then(response => alert("Başarıyla Kaydedildi"))
                    .catch(error => alert("Hata Oluştu"));
            }
        }
    }
};
