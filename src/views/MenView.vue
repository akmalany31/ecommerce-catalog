<template>
  <div>
    <AppNavbar />
    <div class="gradient-background">
      <div class="container my-4 product-container">
        <div class="product-box">
          <!-- Data Loading -->
          <div v-if="loading" class="text-center">Loading...</div>
          <!-- Informasi produk, data termuat -->
          <div v-else>
            <div v-if="products.length > 0" :key="products[0].id" class="row">
              <div class="col-md-4">
                <img :src="products[0].image" alt="Product Image" class="img-fluid mx-auto d-block product-image" />
              </div>
              <div class="col-md-8">
                <div class="product-info">
                  <div class="product-details">
                    <h5 class="card-title product-title">{{ products[0].title }}</h5>
                    <p class="card-text">{{ products[0].category }}</p>
                    <hr />
                    <p class="card-text">{{ products[0].description }}</p>
                    <hr />
                    <p class="card-text product-price">${{ products[0].price }}</p>
                    <div class="d-flex justify-content-between mt-3">
                      <!-- BUY (Belum bisa) -->
                      <button @click="buyNow" class="btn btn-success btn-buy-now">Buy Now</button>
                      <!-- API NEXT PRODUCT -->
                      <button @click="getNextProduct" class="btn btn-primary">Next Product</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "MenView",
  components: {
    AppNavbar,
  },
  data() {
    return {
      products: [],
      loading: true,
      currentIndex: 1, //Index awal
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.fetchProduct();
    },
    fetchProduct() {
      fetch(`https://fakestoreapi.com/products/${this.currentIndex}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }
          return response.json();
        })
        .then((data) => {
          if (data.category === "men's clothing") {
            this.products = [data];
          } else {
            //Jika bukan kategori yang diinginkan, fetch lagi
            this.currentIndex++;
            if (this.currentIndex > 20) {
              this.currentIndex = 1;
            }
            this.fetchProduct();
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getNextProduct() {
      //Increment index
      this.currentIndex++;
      //Jika index sudah mencapai 21, kembalikan ke 1
      if (this.currentIndex > 20) {
        this.currentIndex = 1;
      }
      //Fetch data untuk index yang baru
      this.fetchProduct();
    },
    buyNow() {
      //Belum ya
      console.log("Buy Now clicked");
    },
  },
};
</script>

<style>
.gradient-background {
  background: linear-gradient(180deg, #d6e6ff 60%, white 50%);
  padding: 20px;
}
.product-title {
  font-size: 20px;
  font-weight: bold;
  color: #002772; /* Pink Text Color */
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  color: #002772; /* Pink Text Color */
}
</style>
