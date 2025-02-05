<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
  
    const menuItems = [
      { name: 'Chicken Burger', soloPrice: '$8.99', menuPrice: '$12.99' },
      { name: 'Big King Burger', soloPrice: '$10.99', menuPrice: '$14.99' },
    ];
  </script>
  
  <Layout image="/images/commercial4.jpg" {menuItems} />