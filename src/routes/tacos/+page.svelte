<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
  
    const menuItems = [
      { name: 'Chicken Taco', soloPrice: '$5.99', menuPrice: '$8.99' },
      { name: 'Beef Taco', soloPrice: '$6.99', menuPrice: '$9.99' },
    ];
  </script>
  
  <Layout image="/images/commercial1.jpg" {menuItems} />