<script lang="ts">
	// Use Svelte 5 runes for props
	let { image, menuType, items = [] } = $props<{
		image: string;
		menuType: string;
		items: Array<{ name: string; soloPrice: string; menuPrice: string; ingredients: string }>;
	}>();
	
	// Use $state for reactive variables
	let isPortrait = $state(false);
	let windowWidth = $state(0);
	let windowHeight = $state(0);
	
	// Update dimensions and orientation
	function updateDimensions() {
		if (typeof window !== 'undefined') {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
			isPortrait = windowHeight > windowWidth;
		}
	}
	
	// Run once after component is mounted and on resize
	$effect(() => {
		if (typeof window !== 'undefined') {
			// Initial check
			updateDimensions();
			
			// Add event listener
			window.addEventListener('resize', updateDimensions);
			
			// Cleanup
			return () => {
				window.removeEventListener('resize', updateDimensions);
			};
		}
	});
	
	// Calculate image height for portrait mode using $derived
	let imageHeight = $derived(isPortrait ? Math.floor(windowHeight * 0.35) + 'px' : '100%');
	let contentHeight = $derived(isPortrait ? Math.floor(windowHeight * 0.65) + 'px' : '100%');
</script>

<div class="flex h-screen" style={isPortrait ? "flex-direction: column; overflow: hidden;" : ""}>
	<!-- Image section - fixed height in portrait mode -->
	<div style={isPortrait 
		? `width: 100%; height: ${imageHeight}; max-height: ${imageHeight}; overflow: hidden;` 
		: "width: 50%; height: 100%;"}>
		<img src={image} alt={menuType + " Menu Image"} 
			style="width: 100%; height: 100%; object-fit: cover; object-position: center center;" />
	</div>

	<!-- Menu content section - with fixed height in portrait mode -->
	<div style={isPortrait 
		? `width: 100%; height: ${contentHeight}; overflow-y: auto; background-color: white;` 
		: "width: 50%; height: 100%; overflow-y: auto; background-color: white;"} 
		class="p-4">
		<!-- Header -->
		<h1 style={isPortrait ? "font-size: 2.5rem; margin-bottom: 1rem; text-align: center; font-weight: bold;" : "font-size: 3rem; margin-bottom: 1.5rem; text-align: center; font-weight: bold;"}>
			{menuType}
		</h1>

		<!-- Table header -->
		<div style="display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 15px;">
			<div style="font-size: 1.5rem; font-weight: bold;">Item</div>
			<div style="display: flex; gap: 30px; font-size: 1.5rem; font-weight: bold;">
				<div>Solo</div>
				<div>Menu</div>
			</div>
		</div>

		<!-- Menu items list with improved spacing -->
		{#each items as item}
			<div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #ddd;">
				<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
					<span style="font-size: 1.3rem; font-weight: bold;">{item.name}</span>
					<div style="display: flex; gap: 30px; font-size: 1.3rem;">
						<span style="text-align: right; min-width: 60px;">{item.soloPrice}</span>
						<span style="text-align: right; min-width: 60px;">{item.menuPrice}</span>
					</div>
				</div>
				<p style="color: #666; font-size: 1.1rem; margin-top: 4px;">{item.ingredients}</p>
			</div>
		{/each}
	</div>
</div>