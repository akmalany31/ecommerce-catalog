<template>
  <div>
    <AppNavbar />
    <div class="gradient-w-background">
      <div class="container my-4 woman-container">
        <div class="woman-box">
          <!-- Data Loading -->
          <div v-if="loading" class="text-center">Loading...</div>
          <!-- Informasi produk, data termuat -->
          <div v-else>
            <div v-if="products.length > 0" :key="products[0].id" class="row">
              <div class="col-md-4">
                <img :src="products[0].image" alt="Women Image" class="img-fluid mx-auto d-block woman-image" />
              </div>
              <div class="col-md-8">
                <div class="woman-info">
                  <div class="woman-details">
                    <h5 class="card-title woman-title">{{ products[0].title }}</h5>
                    <p class="card-text">{{ products[0].category }}</p>
                    <hr />
                    <p class="card-text">{{ products[0].description }}</p>
                    <hr />
                    <p class="card-text woman-price">${{ products[0].price }}</p>
                    <div class="d-flex justify-content-between mt-3">
                      <!-- BUY (Belum bisa) -->
                      <button @click="buyNow" class="btn btn-success btn-buy-now">Buy Now</button>
                      <!-- API NEXT PRODUCT (button) -->
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
  name: "WomenView",
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
          if (data.category === "women's clothing") {
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
      //gadisuruh (?)
      console.log("Buy Now clicked");
    },
  },
};
</script>

<style>
.gradient-w-background {
  background: linear-gradient(180deg, #fde2ff 60%, white 50%);
  padding: 20px;
}

.woman-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.woman-info {
  text-align: left;
}

.woman-details {
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: white;
}

.woman-title {
  font-size: 20px;
  font-weight: bold;
  color: #720060;
}

.woman-price {
  font-size: 20px;
  font-weight: bold;
  color: #720060;
}

.woman-image {
  max-height: 300px;
}

.btn-buy-now {
  border-radius: 8px;
}
</style>
