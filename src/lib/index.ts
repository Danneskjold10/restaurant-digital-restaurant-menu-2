// src/lib/index.ts

// Define interfaces for type safety
export interface SlideshowItem {
	image: string;
	name: string;
	price: string;
	description: string;
}

export interface MenuItem {
	name: string;
	soloPrice: string;
	menuPrice: string;
	ingredients: string;
}

export interface MenuCategory {
	name: string;
	image: string;
	items: MenuItem[];
}

// Export the data arrays

export const slideshowItems: SlideshowItem[] = [
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

export const menuCategories: MenuCategory[] = [
    {
        name: 'Tacos',
        image: '/images/tacos/tacos_2.jpg',
        items: [
            { name: 'Kebab', soloPrice: '$5.99', menuPrice: '$8.99', ingredients: 'Grilled chicken, lettuce, cheese, salsa' },
            { name: 'Steak', soloPrice: '$6.99', menuPrice: '$9.99', ingredients: 'Seasoned beef, onions, cilantro, lime' },
            { name: 'Tacos Kofte', soloPrice: '$5.99', menuPrice: '$8.99', ingredients: 'Grilled chicken, lettuce, cheese, salsa' },
            { name: 'Cordon Bleu', soloPrice: '$6.99', menuPrice: '$9.99', ingredients: 'Seasoned beef, onions, cilantro, lime' },
            { name: 'Escalope', soloPrice: '$5.99', menuPrice: '$8.99', ingredients: 'Grilled chicken, lettuce, cheese, salsa' },
            { name: 'Tacos Chicken', soloPrice: '$6.99', menuPrice: '$9.99', ingredients: 'Seasoned beef, onions, cilantro, lime' },
            { name: 'Tacos Nuggets', soloPrice: '$6.99', menuPrice: '$9.99', ingredients: 'Seasoned beef, onions, cilantro, lime' },
            { name: 'Tacos 2 Viandes', soloPrice: '$6.99', menuPrice: '$9.99', ingredients: 'Seasoned beef, onions, cilantro, lime' },
            { name: 'Tacos 3 Viandes', soloPrice: '$6.99', menuPrice: '$9.99', ingredients: 'Seasoned beef, onions, cilantro, lime' },
        ],
    },
    {
        name: 'Burgers',
        image: '/images/burgers/burger_4.jpg',
        items: [
            { name: 'Cheese Burger', soloPrice: '$8.99', menuPrice: '$12.99', ingredients: 'Beef patty, cheese, lettuce, tomato, special sauce' },
            { name: 'Chicken Burger', soloPrice: '$10.99', menuPrice: '$14.99', ingredients: 'Crispy chicken, lettuce, tomato, mayo' },
            { name: 'Kofte Burger', soloPrice: '$10.99', menuPrice: '$14.99', ingredients: 'Spiced kofte patty, cheese, onions, yogurt sauce' },
            { name: 'Hummer Steak', soloPrice: '$8.99', menuPrice: '$12.99', ingredients: 'Grilled steak strips, onions, peppers, cheese' },
            { name: 'Hummer Chicken', soloPrice: '$10.99', menuPrice: '$14.99', ingredients: 'Grilled chicken strips, onions, peppers, cheese' },
            { name: 'Hummer Kofte', soloPrice: '$10.99', menuPrice: '$14.99', ingredients: 'Kofte patty strips, onions, peppers, cheese' },
        ],
    },
    {
        name: 'Sandwichs',
        image: '/images/sandwichs/sandwich_3.jpg',
        items: [
            { name: 'Maxi Kebab', soloPrice: '$7.99', menuPrice: '$11.99', ingredients: 'Large portion kebab meat, salad, sauce in pita' },
            { name: 'Galette Kebab', soloPrice: '$6.99', menuPrice: '$10.99', ingredients: 'Kebab meat, salad, sauce wrapped in flatbread' },
            { name: 'Kebab', soloPrice: '$6.99', menuPrice: '$10.99', ingredients: 'Standard kebab meat, salad, sauce in pita' },
            { name: 'Escalope', soloPrice: '$6.99', menuPrice: '$10.99', ingredients: 'Breaded chicken cutlet, salad, sauce in baguette' },
            { name: 'Steak', soloPrice: '$6.99', menuPrice: '$10.99', ingredients: 'Grilled steak strips, onions, salad, sauce in baguette' },
            { name: 'Suisse', soloPrice: '$6.99', menuPrice: '$10.99', ingredients: 'Ham, swiss cheese, salad, mayo in baguette' },
            // { name: 'Steak', soloPrice: '$6.99', menuPrice: '$10.99', ingredients: 'Avocado, cucumber, lettuce, hummus' }, // Duplicate name, clarify or remove
        ],
    },
    {
        name: 'Nuggets',
        image: '/images/nuggets/nuggets_2.jpg',
        items: [
            { name: 'Chicken Nuggets', soloPrice: '$6.99', menuPrice: '$9.99', ingredients: 'Crispy chicken nuggets with your choice of dipping sauce' },
            { name: 'Spicy Nuggets', soloPrice: '$7.99', menuPrice: '$10.99', ingredients: 'Spicy chicken nuggets with ranch dressing' },
        ],
    },
    {
        name: 'Assiettes',
        image: '/images/assiettes/assiettes_3.jpg',
        items: [
            { name: 'Assiette Kebab', soloPrice: '$11.99', menuPrice: '$14.99', ingredients: 'Kebab meat served with fries, salad, and bread' },
            { name: 'Assiette Escalope', soloPrice: '$12.99', menuPrice: '$15.99', ingredients: 'Breaded chicken cutlet served with fries, salad, and bread' },
            { name: 'Assiette Kofte', soloPrice: '$12.99', menuPrice: '$15.99', ingredients: 'Grilled kofte patties served with fries, salad, and bread' },
            { name: 'Assiette Kofte Chedar', soloPrice: '$13.99', menuPrice: '$16.99', ingredients: 'Grilled kofte patties topped with cheddar, served with fries, salad, and bread' },
            { name: 'Assiette Steak', soloPrice: '$13.99', menuPrice: '$16.99', ingredients: 'Grilled steak strips served with fries, salad, and bread' },
            { name: 'Assiette Mixte', soloPrice: '$14.99', menuPrice: '$17.99', ingredients: 'Mix of kebab, chicken, and kofte served with fries, salad, and bread' },
            { name: 'Assiette Agneau', soloPrice: '$15.99', menuPrice: '$18.99', ingredients: 'Grilled lamb chops served with fries, salad, and bread' },
        ],
    },
];