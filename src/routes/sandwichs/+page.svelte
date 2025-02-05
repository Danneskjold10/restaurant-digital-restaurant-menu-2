<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
  
    const menuItems = [
      { name: 'Maxi Kebab', soloPrice: '$7.99', menuPrice: '$11.99' },
      { name: 'Galette Kebab', soloPrice: '$6.99', menuPrice: '$10.99' },
      { name: 'Kebab', soloPrice: '$7.99', menuPrice: '$11.99' },
      { name: 'Kofte', soloPrice: '$6.99', menuPrice: '$10.99' },
      { name: 'Escalope', soloPrice: '$7.99', menuPrice: '$11.99' },
      { name: 'Steak', soloPrice: '$6.99', menuPrice: '$10.99' },
      { name: 'Suisse', soloPrice: '$7.99', menuPrice: '$11.99' },
      { name: 'Panini viande', soloPrice: '$6.99', menuPrice: '$10.99' },
      { name: 'Panini 3 fromage', soloPrice: '$7.99', menuPrice: '$11.99' },
      { name: 'Panini Nutella', soloPrice: '$6.99', menuPrice: '$10.99' },
    ];
  </script>
  
  <Layout image="/images/commercial2.jpg" {menuItems} />