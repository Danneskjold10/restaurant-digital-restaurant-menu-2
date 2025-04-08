# .gitignore

```
node_modules

# Output
.output
.vercel
.netlify
.wrangler
/.svelte-kit
/build

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.*
!.env.example
!.env.test

# Vite
vite.config.js.timestamp-*
vite.config.ts.timestamp-*

.vercel

```

# .npmrc

```
engine-strict=true

```

# package.json

```json
{
	"name": "restaurant-digital-restaurant-menu-2",
	"private": true,
	"version": "0.0.1",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch"
	},
	"devDependencies": {
		"@sveltejs/adapter-auto": "^4.0.0",
		"@sveltejs/kit": "^2.16.0",
		"@sveltejs/vite-plugin-svelte": "^5.0.0",
		"@types/node": "^22.13.1",
		"svelte": "^5.0.0",
		"svelte-check": "^4.0.0",
		"typescript": "^5.0.0",
		"vite": "^6.0.0"
	},
	"dependencies": {
		"@tailwindcss/vite": "^4.0.3",
		"tailwindcss": "^4.0.3"
	}
}

```

# README.md

```md
# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

\`\`\`bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
\`\`\`

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

\`\`\`bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
\`\`\`

## Building

To create a production version of your app:

\`\`\`bash
npm run build
\`\`\`

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

```

# src\app.css

```css
@import "tailwindcss";
/* src/app.css */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* src/app.css */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Prevent scrolling */
  font-family: Arial, sans-serif;
}

/* Ensure the slideshow and menu list cover the full screen */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Flex layout for the menu list */
.flex {
  display: flex;
}

/* Half-width for the image and menu list */
.w-1\/2 {
  width: 50%;
}

/* Padding and spacing for the menu list */
.p-8 {
  padding: 2rem;
}

/* Large font sizes for better readability */
.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.text-5xl {
  font-size: 3rem;
}

@media screen and (max-aspect-ratio: 9/16) {
  body {
    width: 100vh;  /* Adapt to vertical view */
    height: 100vw;
    transform: rotate(90deg);
    transform-origin: center center;
    overflow: hidden;
  }
}

```

# src\app.d.ts

```ts
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

```

# src\app.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>

```

# src\lib\components\Layout.svelte

```svelte
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
```

# src\lib\components\MenuList.svelte

```svelte
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
```

# src\lib\components\Slideshow.svelte

```svelte
<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();
  
    export let items: Array<{ image: string; name: string; price: string; description: string }> = [];
    let currentIndex = 0;
    let showSlideshow = true;
  
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % items.length;
    };
  
    let interval: number; // Use `number` instead of `NodeJS.Timeout`
  
    // Start the slideshow
    const startSlideshow = () => {
      currentIndex = 0; // Reset the index to 0
      interval = setInterval(nextSlide, 5000); // Automatically change slides every 5 seconds
    };
  
    // Stop the slideshow
    const stopSlideshow = () => {
      clearInterval(interval);
    };
  
    // Hide the slideshow after all slides are shown
    onMount(() => {
      startSlideshow();
      setTimeout(() => {
        stopSlideshow();
        dispatch('end'); // Emit an event when the slideshow ends
      }, items.length * 5000); // Total duration = number of items * 5 seconds
    });
  </script>
  
  <style>
    .slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 1s ease-in-out; /* Smooth fade transition */
    }
  
    .slide.active {
      opacity: 1;
    }
  
    /* Fume effect for images */
    .slide img {
      animation: fume 5s infinite;
    }
  
    @keyframes fume {
      0% {
        filter: blur(0) brightness(1);
        opacity: 1;
      }
      50% {
        filter: blur(5px) brightness(1.2);
        opacity: 0.8;
      }
      100% {
        filter: blur(0) brightness(1);
        opacity: 1;
      }
    }
  </style>
  
  {#if showSlideshow}
    <div class="fixed inset-0 z-50">
      {#each items as item, index}
        <div class="slide {index === currentIndex ? 'active' : ''}">
          <!-- Background image with fume effect -->
          <img src={item.image} alt="" class="w-full h-full object-cover" />
  
          <!-- Image Description Bubble -->
          <div class="absolute bottom-8 left-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md">
            <p class="text-4xl font-bold text-gray-900">{item.name}</p>
            <p class="text-xl text-gray-600 mt-4">{item.description}</p>
          </div>
  
          <!-- Price Tag Bubble -->
          <div class="absolute top-8 right-8 bg-green-500 bg-opacity-90 p-4 rounded-lg shadow-lg">
            <p class="text-3xl font-bold text-white">{item.price}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
```

# src\lib\index.ts

```ts
// place files you want to import through the `$lib` alias in this folder.

```

# src\routes\+layout.svelte

```svelte
<script>
    let { children } = $props();
    import '../app.css'; // Correct path to app.css
  </script>
  
  {@render children()}
```

# src\routes\+page.svelte

```svelte
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
```

# src\routes\assiettes\+page.svelte

```svelte
<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
  
    const menuItems = [
      { name: 'Chicken Assiette', soloPrice: '$10.99', menuPrice: '$15.99' },
      { name: 'Beef Assiette', soloPrice: '$12.99', menuPrice: '$17.99' },
    ];
  </script>
  
  <Layout image="/images/commercial3.jpg" {menuItems} />
```

# src\routes\burgers\+page.svelte

```svelte
<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
  
    const menuItems = [
      { name: 'Chicken Burger', soloPrice: '$8.99', menuPrice: '$12.99' },
      { name: 'Big King Burger', soloPrice: '$10.99', menuPrice: '$14.99' },
    ];
  </script>
  
  <Layout image="/images/commercial4.jpg" {menuItems} />
```

# src\routes\nuggets\+page.svelte

```svelte
<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
  
    const menuItems = [
      { name: 'Chicken Nuggets', soloPrice: '$6.99', menuPrice: '$9.99' },
      { name: 'Spicy Nuggets', soloPrice: '$7.99', menuPrice: '$10.99' },
    ];
  </script>
  
  <Layout image="/images/commercial3.jpg" {menuItems} />
```

# src\routes\sandwichs\+page.svelte

```svelte
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
```

# src\routes\tacos\+page.svelte

```svelte
<script lang="ts">
    import Layout from '$lib/components/Layout.svelte';
  
    const menuItems = [
      { name: 'Chicken Taco', soloPrice: '$5.99', menuPrice: '$8.99' },
      { name: 'Beef Taco', soloPrice: '$6.99', menuPrice: '$9.99' },
    ];
  </script>
  
  <Layout image="/images/commercial1.jpg" {menuItems} />
```

# static\favicon.png

This is a binary file of the type: Image

# static\images\assiettes\assiette_1.jpg

This is a binary file of the type: Image

# static\images\assiettes\assiettes_3.jpg

This is a binary file of the type: Image

# static\images\burgers\burger_1.jpg

This is a binary file of the type: Image

# static\images\burgers\burger_3.jpg

This is a binary file of the type: Image

# static\images\burgers\burger_4.jpg

This is a binary file of the type: Image

# static\images\commercial1.jpg

This is a binary file of the type: Image

# static\images\commercial2.jpg

This is a binary file of the type: Image

# static\images\commercial3.jpg

This is a binary file of the type: Image

# static\images\commercial4.jpg

This is a binary file of the type: Image

# static\images\nuggets\nuggets_1.jpg

This is a binary file of the type: Image

# static\images\nuggets\nuggets_2.jpg

This is a binary file of the type: Image

# static\images\sandwichs\sandwich_3.jpg

This is a binary file of the type: Image

# static\images\tacos\tacos_1.jpg

This is a binary file of the type: Image

# static\images\tacos\tacos_2.jpg

This is a binary file of the type: Image

# static\sandwich_1.jpg

This is a binary file of the type: Image

# svelte.config.js

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;

```

# tsconfig.json

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler"
	}
	// Path aliases are handled by https://svelte.dev/docs/kit/configuration#alias
	// except $lib which is handled by https://svelte.dev/docs/kit/configuration#files
	//
	// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
	// from the referenced tsconfig.json - TypeScript does not merge them in
}

```

# vite.config.ts

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(),sveltekit()]
});

```

