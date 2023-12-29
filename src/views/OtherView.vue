<template>
  <div>
    <AppNavbar />
    <div class="background">
      <div class="category-dropdown">
        <label for="category"></label>
        <select v-model="selectedCategory" @change="fetchData">
          <option value="other">Other</option>
        </select>
      </div>
      <div :class="{ 'men-category': isMenCategory, 'women-category': isWomenCategory }">
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
                      <h5 :class="{ 'men-title': isMenCategory, 'women-title': isWomenCategory }">{{ products[0].title }}</h5>
                      <p class="card-text">{{ products[0].category }}</p>
                      <hr />
                      <p class="card-text">{{ products[0].description }}</p>
                      <hr />
                      <p :class="{ 'men-price': isMenCategory, 'women-price': isWomenCategory }">${{ products[0].price }}</p>
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
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "OtherView",
  components: {
    AppNavbar,
  },
  data() {
    return {
      products: [],
      loading: true,
      currentIndex: 1,
      selectedCategory: "other",
    };
  },
  computed: {
    isMenCategory() {
      return this.selectedCategory === "men";
    },
    isWomenCategory() {
      return this.selectedCategory === "women";
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;

      //Tampilkan pesan "This product is unavailable to show" pada kategori "Other"
      if (this.selectedCategory === "other") {
        this.products = [
          {
            title: "Product Unavailable",
            category: "Other",
            description: "This product is unavailable to show.",
            price: 0,
            image: "https://via.placeholder.com/150",
          },
        ];
        this.loading = false;
        return;
      }
    },
    getNextProduct() {
      this.currentIndex++;
      this.fetchData();
    },
    buyNow() {
      console.log("Buy Now clicked");
    },
  },
};
</script>

<style>
.category-dropdown {
  margin-bottom: 20px;
  display: none;
}
.background {
  background: linear-gradient(180deg, #dfe3ea 60%, white 50%);
  padding: 20px;
}
</style>
