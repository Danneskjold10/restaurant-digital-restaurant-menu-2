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
	
	// Calculate dimensions based on orientation
	let imageHeight = $derived(isPortrait ? Math.floor(windowHeight * 0.40) + 'px' : '100%');
	let contentHeight = $derived(isPortrait ? Math.floor(windowHeight * 0.60) + 'px' : '100%');
	
	// Format prices with consistent spacing - fixed typing
	function formatPrice(price: string): string {
		if (!price.startsWith('$')) return price;
		return price;
	}
</script>

<!-- Main container with orientation-based styling -->
<div class="flex h-screen" style={isPortrait ? "flex-direction: column; overflow: hidden;" : ""}>
	<!-- Image section -->
	<div style={isPortrait 
		? `width: 100%; height: ${imageHeight}; max-height: ${imageHeight}; overflow: hidden; position: relative;` 
		: "width: 50%; height: 100%; position: relative;"}>
		
		<!-- Background image with overlay -->
		<img src={image} alt={menuType + " Menu Image"} 
			style="width: 100%; height: 100%; object-fit: cover; object-position: center center;" />
		
		<!-- Dark overlay for better text contrast -->
		<div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); padding: 20px; text-align: center;">
			<h1 style="color: white; font-size: 3rem; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
				{menuType}
			</h1>
		</div>
	</div>

	<!-- Menu content section -->
	<div style={isPortrait 
		? `width: 100%; height: ${contentHeight}; overflow-y: auto; background-color: white;` 
		: "width: 50%; height: 100%; overflow-y: auto; background-color: white;"} 
		class="p-4">
		
		<!-- Menu header for landscape mode (portrait mode header is on the image) -->
		{#if !isPortrait}
			<h2 style="font-size: 3rem; margin-bottom: 1.5rem; text-align: center; font-weight: bold; color: #333;">
				{menuType}
			</h2>
		{/if}

		<!-- Table header -->
		<div style="display: flex; justify-content: space-between; border-bottom: 3px solid #e53e3e; padding-bottom: 12px; margin-bottom: 20px;">
			<div style="font-size: 1.6rem; font-weight: bold; color: #e53e3e;">Item</div>
			<div style="display: flex; gap: 40px; font-size: 1.6rem; font-weight: bold; color: #e53e3e;">
				<div>Solo</div>
				<div>Menu</div>
			</div>
		</div>

		<!-- Menu items list with improved styling -->
		{#each items as item, index}
			<div style={`margin-bottom: 25px; padding-bottom: 20px; border-bottom: ${index === items.length - 1 ? 'none' : '1px solid #e2e8f0'}; display: flex; flex-direction: column;`}>
				<div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: baseline;">
					<span style="font-size: 1.5rem; font-weight: bold; color: #2d3748;">{item.name}</span>
					<div style="display: flex; gap: 40px; font-size: 1.5rem;">
						<span style="text-align: right; min-width: 70px; font-weight: 600; color: #2d3748;">{formatPrice(item.soloPrice)}</span>
						<span style="text-align: right; min-width: 70px; font-weight: 600; color: #2d3748;">{formatPrice(item.menuPrice)}</span>
					</div>
				</div>
				<p style="color: #4a5568; font-size: 1.2rem; margin-top: 5px; font-style: italic;">{item.ingredients}</p>
			</div>
		{/each}
		
		<!-- Footer with branding -->
		<div style="margin-top: 30px; text-align: center; padding-top: 15px; border-top: 1px solid #e2e8f0;">
			<p style="color: #718096; font-size: 1.1rem;">Enjoy your meal!</p>
		</div>
	</div>
</div>