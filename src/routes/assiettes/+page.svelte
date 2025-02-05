<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
  
    const menuItems = [
      { name: 'Chicken Assiette', soloPrice: '$10.99', menuPrice: '$15.99' },
      { name: 'Beef Assiette', soloPrice: '$12.99', menuPrice: '$17.99' },
    ];
  </script>
  
  <Layout image="/images/commercial3.jpg" {menuItems} />