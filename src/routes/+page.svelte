<script lang="ts">
    import Slideshow from '$lib/components/Slideshow.svelte';
    import MenuList from '$lib/components/MenuList.svelte';
  
    // Slideshow items
    const slideshowItems = [
  {
    image: '/images/commercial1.jpg',
    name: 'Special Taco',
    price: '$12.99',
    description: 'A delicious taco with grilled chicken, fresh veggies, and our signature sauce.',
  },
  {
    image: '/images/commercial2.jpg',
    name: 'Big King Burger',
    price: '$12.99',
    description: 'A juicy beef patty with melted cheese, crispy bacon, and a special BBQ sauce.',
  },
  {
    image: '/images/commercial3.jpg',
    name: 'Spicy Nuggets',
    price: '$7.99',
    description: 'Crispy and spicy chicken nuggets served with ranch dressing.',
  },
  {
    image: '/images/commercial4.jpg',
    name: 'Maxi Kebab',
    price: '$10.99',
    description: 'A hearty kebab wrap filled with grilled meat, fresh veggies, and tangy sauce.',
  },
];
  
    // Menu items for each category
    const menuCategories = [
      {
        name: 'Tacos',
        image: '/images/tacos/tacos_2.jpg',
        items: [
          {
            name: 'Kebab',
            soloPrice: '$5.99',
            menuPrice: '$8.99',
            ingredients: 'Grilled chicken, lettuce, cheese, salsa',
          },
          {
            name: 'Steak',
            soloPrice: '$6.99',
            menuPrice: '$9.99',
            ingredients: 'Seasoned beef, onions, cilantro, lime',
          },
          {
            name: 'Tacos Kofte',
            soloPrice: '$5.99',
            menuPrice: '$8.99',
            ingredients: 'Grilled chicken, lettuce, cheese, salsa',
          },
          {
            name: 'Cordon Bleu',
            soloPrice: '$6.99',
            menuPrice: '$9.99',
            ingredients: 'Seasoned beef, onions, cilantro, lime',
          },
          {
            name: 'Escalope',
            soloPrice: '$5.99',
            menuPrice: '$8.99',
            ingredients: 'Grilled chicken, lettuce, cheese, salsa',
          },
          {
            name: 'Tacos Chicken',
            soloPrice: '$6.99',
            menuPrice: '$9.99',
            ingredients: 'Seasoned beef, onions, cilantro, lime',
          },
          {
            name: 'Tacos Nuggets',
            soloPrice: '$6.99',
            menuPrice: '$9.99',
            ingredients: 'Seasoned beef, onions, cilantro, lime',
          },
          {
            name: 'Tacos 2 Viandes',
            soloPrice: '$6.99',
            menuPrice: '$9.99',
            ingredients: 'Seasoned beef, onions, cilantro, lime',
          },
          {
            name: 'Tacos 3 Viandes',
            soloPrice: '$6.99',
            menuPrice: '$9.99',
            ingredients: 'Seasoned beef, onions, cilantro, lime',
          },
        ],
      },
      {
        name: 'Burgers',
        image: '/images/burgers/burger_4.jpg',
        items: [
          {
            name: 'Cheese Burger',
            soloPrice: '$8.99',
            menuPrice: '$12.99',
            ingredients: 'Grilled chicken, lettuce, tomato, mayo',
          },
          {
            name: 'Chicken Burger',
            soloPrice: '$10.99',
            menuPrice: '$14.99',
            ingredients: 'Beef patty, cheese, bacon, BBQ sauce',
          },
          {
            name: 'Kofte Burger',
            soloPrice: '$10.99',
            menuPrice: '$14.99',
            ingredients: 'Beef patty, cheese, bacon, BBQ sauce',
          },
          {
            name: 'Hummer Steak',
            soloPrice: '$8.99',
            menuPrice: '$12.99',
            ingredients: 'Grilled chicken, lettuce, tomato, mayo',
          },
          {
            name: 'Hummer Chicken',
            soloPrice: '$10.99',
            menuPrice: '$14.99',
            ingredients: 'Beef patty, cheese, bacon, BBQ sauce',
          },
          {
            name: 'Hummer Kofte',
            soloPrice: '$10.99',
            menuPrice: '$14.99',
            ingredients: 'Beef patty, cheese, bacon, BBQ sauce',
          },
        ],
      },
      {
        name: 'Sandwichs',
        image: '/images/sandwichs/sandwich_3.jpg',
        items: [
          {
            name: 'Maxi Kebab',
            soloPrice: '$7.99',
            menuPrice: '$11.99',
            ingredients: 'Grilled chicken, lettuce, tomato, mayo',
          },
          {
            name: 'Galette Kebab',
            soloPrice: '$6.99',
            menuPrice: '$10.99',
            ingredients: 'Avocado, cucumber, lettuce, hummus',
          },
          {
            name: 'Kebab',
            soloPrice: '$6.99',
            menuPrice: '$10.99',
            ingredients: 'Avocado, cucumber, lettuce, hummus',
          },
          {
            name: 'Escalope',
            soloPrice: '$6.99',
            menuPrice: '$10.99',
            ingredients: 'Avocado, cucumber, lettuce, hummus',
          },
          {
            name: 'Steak',
            soloPrice: '$6.99',
            menuPrice: '$10.99',
            ingredients: 'Avocado, cucumber, lettuce, hummus',
          },
          {
            name: 'Suisse',
            soloPrice: '$6.99',
            menuPrice: '$10.99',
            ingredients: 'Avocado, cucumber, lettuce, hummus',
          },
          {
            name: 'Steak',
            soloPrice: '$6.99',
            menuPrice: '$10.99',
            ingredients: 'Avocado, cucumber, lettuce, hummus',
          },
        ],
      },
      {
        name: 'Nuggets',
        image: '/images/nuggets/nuggets_2.jpg',
        items: [
          {
            name: 'Chicken Nuggets',
            soloPrice: '$6.99',
            menuPrice: '$9.99',
            ingredients: 'Crispy chicken nuggets with your choice of dipping sauce',
          },
          {
            name: 'Spicy Nuggets',
            soloPrice: '$7.99',
            menuPrice: '$10.99',
            ingredients: 'Spicy chicken nuggets with ranch dressing',
          },
        ],
      },

      {
        name: 'Assiettes',
        image: '/images/assiettes/assiettes_3.jpg',
        items: [
          {
            name: 'Assiette Kebab',
            soloPrice: '$6.99',
            menuPrice: '$9.99',
            ingredients: 'Crispy chicken nuggets with your choice of dipping sauce',
          },
          {
            name: 'Assiette Escalope',
            soloPrice: '$7.99',
            menuPrice: '$10.99',
            ingredients: 'Spicy chicken nuggets with ranch dressing',
          },
          {
            name: 'Assiette Kofte',
            soloPrice: '$7.99',
            menuPrice: '$10.99',
            ingredients: 'Spicy chicken nuggets with ranch dressing',
          },
          {
            name: 'Assiette Kofte Chedar',
            soloPrice: '$7.99',
            menuPrice: '$10.99',
            ingredients: 'Spicy chicken nuggets with ranch dressing',
          },
          {
            name: 'Assiette Steak',
            soloPrice: '$7.99',
            menuPrice: '$10.99',
            ingredients: 'Spicy chicken nuggets with ranch dressing',
          },
          {
            name: 'Assiette Mixte',
            soloPrice: '$7.99',
            menuPrice: '$10.99',
            ingredients: 'Spicy chicken nuggets with ranch dressing',
          },
          {
            name: 'Assiette Agneau',
            soloPrice: '$7.99',
            menuPrice: '$10.99',
            ingredients: 'Spicy chicken nuggets with ranch dressing',
          },
        ],
      },
    ];
  
    let currentCategoryIndex = 0;
  let showSlideshow = true;

  // Function to start the slideshow
  const startSlideshow = () => {
    showSlideshow = true;
    setTimeout(() => {
      showSlideshow = false;
      startMenuLists(); // Start showing menu lists after slideshow ends
    }, slideshowItems.length * 5000); // Slideshow duration = number of items * 5 seconds
  };

  // Function to start showing menu lists
  const startMenuLists = () => {
    if (currentCategoryIndex < menuCategories.length) {
      // Show the current menu list for 10 seconds
      setTimeout(() => {
        currentCategoryIndex++;
        startMenuLists(); // Show the next menu list
      }, 10000); // 10 seconds per menu list
    } else {
      // Restart the cycle after all menu lists are shown
      currentCategoryIndex = 0;
      startSlideshow(); // Restart the slideshow
    }
  };

  // Start the cycle when the component mounts
  startSlideshow();
</script>

{#if showSlideshow}
  <Slideshow items={slideshowItems} />
{:else}
  <MenuList
    image={menuCategories[currentCategoryIndex].image}
    menuType={menuCategories[currentCategoryIndex].name}
    items={menuCategories[currentCategoryIndex].items}
  />
{/if}