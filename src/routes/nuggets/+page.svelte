<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
  
    const menuItems = [
      { name: 'Chicken Nuggets', soloPrice: '$6.99', menuPrice: '$9.99' },
      { name: 'Spicy Nuggets', soloPrice: '$7.99', menuPrice: '$10.99' },
    ];
  </script>
  
  <Layout image="/images/commercial3.jpg" {menuItems} />