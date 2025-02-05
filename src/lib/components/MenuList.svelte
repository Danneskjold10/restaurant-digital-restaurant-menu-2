<script lang="ts">
    export let image: string;
    export let menuType: string; // Header for the menu type (e.g., "Tacos", "Burgers")
    export let items: Array<{ name: string; soloPrice: string; menuPrice: string; ingredients: string }> = [];
  </script>
  
  <div class="flex h-screen">
    <!-- Left Side: Image -->
    <div class="w-1/2">
      <img src={image} alt="Menu Image" class="w-full h-full object-cover" />
    </div>
  
    <!-- Right Side: Menu List -->
    <div class="w-1/2 p-8">
      <!-- Header for the menu type -->
      <h1 class="text-5xl font-bold mb-12 text-center">{menuType}</h1>
  
      <!-- Table for menu items -->
      <div class="space-y-6">
        <!-- Table headers -->
        <div class="flex justify-between font-bold text-3xl">
          <span>Item</span>
          <div class="flex gap-8">
            <span>Solo</span>
            <span>Menu</span>
          </div>
        </div>
  
        <!-- Menu items -->
        {#each items as item}
          <div class="flex flex-col text-2xl">
            <div class="flex justify-between">
              <span>{item.name}</span>
              <div class="flex gap-8">
                <span>{item.soloPrice}</span>
                <span>{item.menuPrice}</span>
              </div>
            </div>
            <p class="text-xl text-gray-600">{item.ingredients}</p> <!-- Ingredients -->
          </div>
        {/each}
      </div>
    </div>
  </div>