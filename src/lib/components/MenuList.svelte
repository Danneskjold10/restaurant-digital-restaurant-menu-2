<script lang="ts">
	// Use Svelte 5 runes for props
	let { image, menuType, items = [] } = $props<{
		image: string;
		menuType: string;
		items: Array<{ name: string; soloPrice: string; menuPrice: string; ingredients?: string }>;
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
		return price;
	}
</script>

<style>
	/* Import statements must come first - BEFORE any other rules */
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

	/* Now we can add other rules */
	@keyframes gradientAnimation {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}
	
	/* Molinga font @font-face declaration - this is NOT an import */
	@font-face {
		font-family: 'Molinga';
		src: url('/fonts/Molinga-pgOv1.otf') format('opentype');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}
	
	.gradient-header {
		background: linear-gradient(90deg, #FF416C, #FF4B2B, #f83600, #FF416C);
		background-size: 300% 300%;
		animation: gradientAnimation 10s ease infinite;
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
		text-shadow: 0px 2px 4px rgba(0,0,0,0.1);
		font-family: 'Molinga', cursive;
		letter-spacing: 1px;
	}
	
	.shimmer {
		position: relative;
		overflow: hidden;
	}
	
	.shimmer::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			to right,
			rgba(255,255,255,0) 0%,
			rgba(255,255,255,0.3) 50%,
			rgba(255,255,255,0) 100%
		);
		transform: rotate(30deg);
		animation: shimmerEffect 3s infinite;
	}
	
	@keyframes shimmerEffect {
		0% { transform: rotate(30deg) translate(-100%, -100%); }
		100% { transform: rotate(30deg) translate(100%, 100%); }
	}
	
	.menu-item-hover {
		transition: all 0.3s ease;
	}
	
	.menu-item-hover:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0,0,0,0.1);
	}
	
	/* Fixed badge positioning */
	.badge {
		position: absolute;
		top: 5px;
		right: 5px;
		background: #FF416C;
		color: white;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 12px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.2);
		z-index: 1;
	}
	
	/* Hide scrollbar while maintaining scroll functionality */
	::-webkit-scrollbar {
		display: none;
	}
	
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>

<!-- Main container with orientation-based styling -->
<div class="flex h-screen" style={isPortrait ? "flex-direction: column; overflow: hidden;" : ""}>
	<!-- Image section -->
	<div style={isPortrait 
		? `width: 100%; height: ${imageHeight}; max-height: ${imageHeight}; overflow: hidden; position: relative;` 
		: "width: 50%; height: 100%; position: relative;"}>
		
		<!-- Background image with overlay -->
		<img src={image} alt={menuType + " Menu Image"} 
			style="width: 100%; height: 100%; object-fit: cover; object-position: center center;" />
		
		<!-- Dark overlay with pattern for better text contrast -->
		<div style="position: absolute; inset: 0; background: radial-gradient(circle, rgba(0,0,0,0.4), rgba(0,0,0,0.7));">
			<!-- Optional subtle pattern overlay -->
			<div style="position: absolute; inset: 0; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDQiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTUgNUwwIDBaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA4IiBzdHJva2Utd2lkdGg9IjAuNSI+PC9wYXRoPgo8L3N2Zz4='); opacity: 0.7;"></div>
		</div>
		
		<!-- Title on image with decorative elements -->
		<div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 30px; text-align: center;">
			<!-- Decorative line -->
			<div style="display: inline-block; height: 3px; width: 60px; background: linear-gradient(to right, transparent, #FF416C, transparent); margin-bottom: 15px;"></div>
			
			<h1 style="color: white; font-size: 3.5rem; margin: 0; text-shadow: 2px 2px 8px rgba(0,0,0,0.5); font-family: 'Molinga', cursive; letter-spacing: 1px;">
				{menuType}
			</h1>
			
			<!-- Decorative line -->
			<div style="display: inline-block; height: 3px; width: 60px; background: linear-gradient(to right, transparent, #FF416C, transparent); margin-top: 15px;"></div>
		</div>
	</div>

	<!-- Menu content section - with no-scrollbar class -->
	<div style={isPortrait 
		? `width: 100%; height: ${contentHeight}; overflow-y: auto; background-color: white; box-shadow: inset 0 5px 15px rgba(0,0,0,0.1);` 
		: "width: 50%; height: 100%; overflow-y: auto; background-color: white; box-shadow: inset 5px 0 15px rgba(0,0,0,0.1);"} 
		class="p-4 no-scrollbar">
		
		<!-- Menu header for landscape mode (portrait mode header is on the image) -->
		{#if !isPortrait}
			<h2 class="gradient-header" style="font-size: 3.5rem; margin-bottom: 1.5rem; text-align: center; letter-spacing: 2px;">
				{menuType}
			</h2>
		{/if}

		<!-- Table header with fancy styling -->
		<div style="display: flex; justify-content: space-between; padding: 15px; margin: 0 -15px 25px -15px; position: relative; overflow: hidden;">
			<!-- Background with gradient - changed to a lighter background for brown text visibility -->
			<div style="position: absolute; inset: 0; background: linear-gradient(135deg, #FFE8D6, #FFDAB9); transform: skewY(-2deg); transform-origin: top left; z-index: -1;"></div>
			
			<div style="font-size: 1.6rem; font-weight: bold; color: #8B4513; text-shadow: 1px 1px 3px rgba(255,255,255,0.3); font-family: 'Molinga', cursive; letter-spacing: 1px;">Item</div>
			<div style="display: flex; gap: 40px; font-size: 1.6rem; font-weight: bold; color: #8B4513; text-shadow: 1px 1px 3px rgba(255,255,255,0.3); font-family: 'Molinga', cursive; letter-spacing: 1px;">
				<div>Solo</div>
				<div>Menu</div>
			</div>
		</div>

		<!-- Menu items list with eye-catching styling -->
		{#each items as item, index}
			<div class="menu-item-hover" style={`margin: 0 -5px 20px -5px; padding: 15px; border-radius: 10px; background-color: white; position: relative; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 4px solid ${index % 3 === 0 ? '#FF416C' : (index % 3 === 1 ? '#FF4B2B' : '#f83600')};`}>
				<!-- Price badge for visual flair - show on some items with fixed positioning -->
				{#if index % 3 === 0}
					<div class="badge shimmer">
						<span>★</span>
					</div>
				{/if}
				
				<div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: baseline;">
					<!-- Changed to Montserrat for item names -->
					<span style="font-size: 1.5rem; font-weight: 600; color: #2d3748; text-shadow: 0px 1px 1px rgba(0,0,0,0.1); font-family: 'Montserrat', sans-serif;">{item.name}</span>
					<div style="display: flex; gap: 40px; font-size: 1.5rem;">
						<span style="text-align: right; min-width: 70px; font-weight: 600; color: #FF416C; font-family: 'Montserrat', sans-serif;">{formatPrice(item.soloPrice)}</span>
						<span style="text-align: right; min-width: 70px; font-weight: 600; color: #FF416C; font-family: 'Montserrat', sans-serif;">{formatPrice(item.menuPrice)}</span>
					</div>
				</div>
				{#if item.ingredients}
					<p style="color: #4a5568; font-size: 1.2rem; margin-top: 5px; font-style: italic; font-family: 'Montserrat', sans-serif; font-weight: 300;">{item.ingredients}</p>
				{/if}
			</div>
		{/each}
		
		<!-- Footer with branding -->
		<div style="margin-top: 30px; text-align: center; padding-top: 20px;">
			<div style="display: inline-block; width: 50px; height: 2px; background: linear-gradient(to right, transparent, #FF416C, transparent); margin-bottom: 15px;"></div>
			<p style="color: #2d3748; font-size: 1.3rem; margin: 0; font-style: italic; font-family: 'Molinga', cursive; letter-spacing: 0.5px;">Bon Appétit!</p>
		</div>
	</div>
</div>