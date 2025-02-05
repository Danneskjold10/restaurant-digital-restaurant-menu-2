<script lang="ts">
    import MenuList from './MenuList.svelte'; // Import the MenuList component
  
    export let image: string;
    export let menuItems: Array<{ name: string; soloPrice: string; menuPrice: string }>;
  </script>
  
  <div class="flex h-screen">
    <!-- Left Side: Image -->
    <div class="w-1/2">
      <img src={image} alt="Menu Image" class="w-full h-full object-cover" />
    </div>
  
    <!-- Right Side: Menu List -->
    <div class="w-1/2 p-8">
      <MenuList items={menuItems} />
    </div>
  </div>