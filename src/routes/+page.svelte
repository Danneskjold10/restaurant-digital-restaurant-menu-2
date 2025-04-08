<script lang="ts">
	import Slideshow from '$lib/components/Slideshow.svelte';
	import MenuList from '$lib/components/MenuList.svelte';
	// Import the data from $lib/index.ts
	import { slideshowItems, menuCategories } from '$lib';
    // Types can also be imported if needed elsewhere in this script, e.g.:
    // import type { MenuCategory } from '$lib;

	// --- Config ---
	const MENU_CATEGORY_DURATION = 10000; // ms (10 seconds per menu category)

	// --- State ---
	let showSlideshow = $state(true);
	let currentCategoryIndex = $state(0); // Index for menuCategories

	// --- Logic ---

	// Function to be called when the slideshow finishes its duration
	function handleSlideshowEnd() {
		// Ensure there are categories to show before hiding slideshow
		if (menuCategories.length > 0) {
			showSlideshow = false;
			currentCategoryIndex = 0; // Start with the first menu category
		} else {
			// If no categories, maybe just restart slideshow or show a message?
			// For now, let's just keep slideshow running (or it will show blank)
            // To restart immediately (without waiting for timeout):
            // showSlideshow = true; // Stay in slideshow mode
            // console.warn("No menu categories found. Slideshow will loop.");
		}
	}

	// Effect to manage the cycling through menu categories
	$effect(() => {
		if (showSlideshow || menuCategories.length === 0) {
			return; // Don't run timer if slideshow is active or no menus
		}

		// Set a timer to switch to the next category or loop back to slideshow
		const timerId = setTimeout(() => {
			const nextIndex = currentCategoryIndex + 1;
			if (nextIndex < menuCategories.length) {
				currentCategoryIndex = nextIndex; // Go to next menu
			} else {
				showSlideshow = true; // Loop back to slideshow
			}
		}, MENU_CATEGORY_DURATION);

		// Cleanup function for the effect
		return () => {
			clearTimeout(timerId);
		};
	});

	// Derived state for the current menu category data
	const currentCategory = $derived(
		(!showSlideshow && currentCategoryIndex < menuCategories.length)
			? menuCategories[currentCategoryIndex]
			: null
	);

</script>

{#if showSlideshow}
	<Slideshow items={slideshowItems} on:end={handleSlideshowEnd} />
{:else if currentCategory}
	<!-- Display the current menu category -->
	<MenuList
		image={currentCategory.image}
		menuType={currentCategory.name}
		items={currentCategory.items}
	/>
{:else}
	<!-- Fallback if something goes wrong (e.g., no menu categories AND slideshow ended) -->
	<div class="fixed inset-0 flex justify-center items-center h-screen bg-gray-100">
		<p class="text-2xl text-gray-700">Loading menu...</p>
		<!-- Or you could force a restart: {() => { showSlideshow = true; currentCategoryIndex = 0; return ''; }()} -->
	</div>
{/if}