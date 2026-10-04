const menuData = [
  // =====================================================
  // RICE DISHES
  // =====================================================

  {
    id: 1,
    name: "Jollof Rice",
    category: "Rice",
    description:
      "Classic Nigerian party jollof rice cooked in a rich tomato and pepper sauce.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 2,
    name: "Fried Rice",
    category: "Rice",
    description:
      "Fragrant Nigerian fried rice with vegetables, sweet corn, green peas and seasoning.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 3,
    name: "Coconut Rice",
    category: "Rice",
    description:
      "Aromatic coconut-infused rice prepared with vegetables and carefully selected spices.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 4,
    name: "Ofada Rice & Sauce",
    category: "Rice",
    description:
      "Locally grown Ofada rice served with rich, spicy traditional ayamase sauce.",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 5,
    name: "Native Rice",
    category: "Rice",
    description:
      "Traditional Nigerian native rice cooked with local spices, peppers and aromatic herbs.",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },


  // =====================================================
  // SWALLOW
  // =====================================================

  {
    id: 6,
    name: "Pounded Yam",
    category: "Swallow",
    description:
      "Smooth and freshly prepared pounded yam, perfect with rich Nigerian soups.",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 7,
    name: "Garri",
    category: "Swallow",
    description:
      "Freshly prepared garri served soft and smooth with your choice of Nigerian soup.",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 8,
    name: "Eba",
    category: "Swallow",
    description:
      "Golden cassava-based swallow prepared fresh and served with traditional soup.",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 9,
    name: "Amala",
    category: "Swallow",
    description:
      "Soft traditional yam-flour swallow served with rich Nigerian soups and stew.",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 10,
    name: "Fufu",
    category: "Swallow",
    description:
      "Smooth cassava fufu prepared fresh and served with your favourite soup.",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 11,
    name: "Wheat",
    category: "Swallow",
    description:
      "Soft wheat swallow served with a generous portion of traditional Nigerian soup.",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },


  // =====================================================
  // NIGERIAN SOUPS
  // =====================================================

  {
    id: 12,
    name: "Egusi Soup",
    category: "Soups",
    description:
      "Rich melon-seed soup cooked with leafy vegetables, peppers and assorted proteins.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 13,
    name: "Afang Soup",
    category: "Soups",
    description:
      "Traditional Efik-style soup made with afang leaves, waterleaf and assorted proteins.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 14,
    name: "Oha Soup",
    category: "Soups",
    description:
      "Traditional Igbo soup prepared with tender oha leaves, cocoyam and rich palm-oil stock.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 15,
    name: "Okra Soup",
    category: "Soups",
    description:
      "Fresh okra soup cooked with vegetables, palm oil and your choice of protein.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 16,
    name: "Bitterleaf Soup",
    category: "Soups",
    description:
      "Traditional Nigerian bitterleaf soup prepared with cocoyam, palm oil and assorted meat.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 17,
    name: "Edikang Ikong",
    category: "Soups",
    description:
      "Nutritious vegetable soup made with ugu, waterleaf and a generous selection of proteins.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 18,
    name: "Ogbono Soup",
    category: "Soups",
    description:
      "Rich and hearty Nigerian draw soup made with ground ogbono seeds and assorted proteins.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 19,
    name: "Nsala Soup",
    category: "Soups",
    description:
      "Light and aromatic white soup prepared with catfish, yam and traditional spices.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },


  // =====================================================
  // PROTEINS
  // =====================================================

  {
    id: 20,
    name: "Peppered Chicken",
    category: "Proteins",
    description:
      "Tender chicken coated in a spicy Nigerian pepper sauce with aromatic herbs.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 21,
    name: "Grilled Chicken",
    category: "Proteins",
    description:
      "Juicy chicken marinated with herbs and spices, then grilled to perfection.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 22,
    name: "Suya",
    category: "Proteins",
    description:
      "Nigerian street-style grilled beef coated with spicy yaji seasoning and onions.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 23,
    name: "Peppered Goat Meat",
    category: "Proteins",
    description:
      "Tender goat meat simmered and finished in a rich, spicy pepper sauce.",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 24,
    name: "Grilled Fish",
    category: "Proteins",
    description:
      "Whole fish marinated with herbs and peppers and grilled over high heat.",
    price: 7500,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 25,
    name: "Peppered Snail",
    category: "Proteins",
    description:
      "Well-seasoned Nigerian peppered snail prepared with fresh peppers and onions.",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },


  // =====================================================
  // AFRICAN SPECIALS
  // =====================================================

  {
    id: 26,
    name: "Doro Wat",
    category: "African Specials",
    description:
      "Spicy Ethiopian chicken stew prepared with berbere spices and slow-cooked onions.",
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 27,
    name: "Piri Piri Chicken",
    category: "African Specials",
    description:
      "Portuguese-African inspired grilled chicken with a bold chilli and citrus marinade.",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 28,
    name: "Moroccan Chicken",
    category: "African Specials",
    description:
      "Slow-cooked chicken infused with Moroccan spices, herbs and preserved lemon.",
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },


  // =====================================================
  // BREAKFAST
  // =====================================================

  {
    id: 29,
    name: "Nigerian Breakfast",
    category: "Breakfast",
    description:
      "A hearty breakfast combination of eggs, fried plantain, sausages and toast.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 30,
    name: "Akara & Pap",
    category: "Breakfast",
    description:
      "Crispy bean cakes served with smooth Nigerian pap and a side of fresh fruit.",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 31,
    name: "Moi Moi",
    category: "Breakfast",
    description:
      "Steamed Nigerian bean pudding prepared with peppers, onions and selected spices.",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },


  // =====================================================
  // PLANTAIN & SIDES
  // =====================================================

  {
    id: 32,
    name: "Fried Plantain",
    category: "Sides",
    description:
      "Golden ripe plantain slices fried until perfectly caramelized.",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 33,
    name: "Boiled Yam",
    category: "Sides",
    description:
      "Freshly boiled yam served with your choice of sauce or stew.",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 34,
    name: "Chips & Plantain",
    category: "Sides",
    description:
      "Crispy golden chips served alongside sweet fried plantain.",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },


  // =====================================================
  // SNACKS
  // =====================================================

  {
    id: 35,
    name: "Puff Puff",
    category: "Snacks",
    description:
      "Soft and fluffy Nigerian fried dough balls lightly dusted with sugar.",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 36,
    name: "Meat Pie",
    category: "Snacks",
    description:
      "Golden pastry filled with seasoned minced beef, potatoes and carrots.",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 37,
    name: "Chicken Pie",
    category: "Snacks",
    description:
      "Flaky pastry filled with seasoned chicken, vegetables and creamy sauce.",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },


  // =====================================================
  // DRINKS
  // =====================================================

  {
    id: 38,
    name: "Zobo",
    category: "Drinks",
    description:
      "Refreshing Nigerian hibiscus drink infused with ginger, pineapple and spices.",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 39,
    name: "Fresh Fruit Juice",
    category: "Drinks",
    description:
      "Freshly blended seasonal fruit juice with no unnecessary additives.",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },

  {
    id: 40,
    name: "Chapman",
    category: "Drinks",
    description:
      "Classic Nigerian cocktail-style soft drink with citrus, bitters and fruit garnish.",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },

  {
    id: 41,
    name: "Palm Wine",
    category: "Drinks",
    description:
      "Traditional Nigerian palm wine served chilled.",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },
];

export default menuData;