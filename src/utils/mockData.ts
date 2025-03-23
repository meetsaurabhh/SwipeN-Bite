export interface Restaurant {
  id: string;
  name: string;
  image: string;
  address: string;
  timings: string;
  description: string;
  zomatoLink: string;
  googleMapsLink: string;
  rating: number;
  reviewCount: number;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  restaurant: {
    name: string;
    address: string;
    timings: string;
    zomatoLink: string;
    googleMapsLink: string;
    rating: number;
    reviewCount: number;
  };
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  allergies: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // In a real app, this would be hashed
}

export interface Tweet {
  id: string;
  userId: string;
  username: string;
  foodItemId?: string;
  foodItemName?: string;
  restaurantId?: string;
  restaurantName?: string;
  content: string;
  likes: number;
  timestamp: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
}

export interface FoodPreference {
  cuisine: string[];
  dietaryRestrictions: string[];
  spiceLevel: 'mild' | 'medium' | 'spicy';
  priceRange: 'budget' | 'moderate' | 'premium';
  favoriteCategories: string[];
  favoriteRestaurants: string[];
}

export interface UserMatch {
  id: string;
  userId: string;
  matchedUserId: string;
  matchScore: number;
  commonInterests: string[];
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image';
}

// Mock food items data
export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Hyderabadi Biryani",
    image: "src/biryani.jpg",
    description: "This iconic dish features aromatic rice cooked with meat (mutton, chicken, or vegetarian options), spices, and yogurt, often served with Mirchi ka Salan.",
    price: "₹699",
    restaurant: {
      name: "Shadab's Biryani",
      address: "Madina Circle, High Court Rd, Charminar, Hyderabad, Telangana 500012",
      timings: "Mon-Sun: 05:00 AM - 11:00 PM",
      zomatoLink: "https://www.zomato.com/hyderabad/hotel-shadab-ghansi-bazaar",
      googleMapsLink: "https://maps.app.goo.gl/FZesZmFDQrvxqa7q9",
      rating: 4.5,
      reviewCount: 128
    },
    category: "Main Course",
    tags: ["Non-Veg", "Mutton", "Chicken", "Vegetarian", "Biryani"],
    rating: 4.3,
    reviewCount: 5300,
    allergies: ["Dairy", "Gluten", "Nuts"]
  },
  {
    id: "2",
    name: "Haleem",
    image: "src/Haleem.jpg",
    description: "A slow-cooked dish made with meat, lentils, and wheat, flavored with spices, known for its unique texture and taste.",
    price: "₹299",
    restaurant: {
      name: "Pista House Shahalibanda",
      address: "Charminar Rd, beside Pista House, Shah Ali Banda, Hyderabad, Telangana 500002",
      timings: "Mon-Sun: 11:00 AM - 12:45 AM",
      zomatoLink: "https://www.zomato.com/hyderabad/haleem-by-pista-house-ghansi-bazaar",
      googleMapsLink: "https://maps.app.goo.gl/HK7MTARUTs3idSUd9",
      rating: 4.8,
      reviewCount: 256
    },
    category: "Main Course",
    tags: ["Non-Veg", "Meat", "Spices"],
    rating: 4.9,
    reviewCount: 156,
    allergies: ["Gluten", "Dairy", "Nuts"]
  },
  {
    id: "3",
    name: "Shami Kebab",
    image: "src/ShamiKabab.webp",
    description: "Minced meat patties, flavored with spices, and served as a starter.",
    price: "₹199",
    restaurant: {
      name: "Hyderabad House",
      address: "Road 10, Near Chiranjeevi Blood Bank, Jubilee Hills, Hyderabad",
      timings: "Mon-Sun: 12:00 PM - 11:00 PM",
      zomatoLink: "https://www.zomato.com/hyderabad/hyderabad-house-2-jubilee-hills",
      googleMapsLink: "https://maps.app.goo.gl/DEqtwGUsjZqUQMW19",
      rating: 4.6,
      reviewCount: 189
    },
    category: "Starters",
    tags: ["Non-Veg", "Chicken", "Starters"],
    rating: 4.8,
    reviewCount: 112,
    allergies: ["Gluten", "Eggs", "Dairy"]
  },
  {
    id: "4",
    name: "Qubani ka Meetha",
    image: "src/Qubani.jpg",
    description: "A dessert made with dried apricots, milk, and sugar, known for its sweet and creamy taste.",
    price: "₹99",
    restaurant: {
      name: "Banjara 9 Restaurant",
      address: "Banjara Hills Rd Number 1, Ambedkar Nagar, Banjara Hills, Hyderabad, Telangana 500034",
      timings: "Mon-Sun: 12:00 PM - 1:00 AM",
      zomatoLink: "https://www.zomato.com/hyderabad/banjara-9-restaurant-khairatabad",
      googleMapsLink: "https://maps.app.goo.gl/agNJDYQfkowtqVZo6",
      rating: 4.7,
      reviewCount: 145
    },
    category: "Dessert",
    tags: ["Dessert", "Sweet", "Apricots"],
    rating: 4.8,
    reviewCount: 98,
    allergies: ["Dairy", "Nuts", "Sulfites"]
  },
  {
    id: "5",
    name: "Osmania Biscuits",
    image: "src/osmania.jpg",
    description: "Osmania Biscuits are known for their crumbly texture and sweet-salty flavor, making them perfect to pair with Irani chai.",
    price: "₹399",
    restaurant: {
      name: "Karachi Bakery",
      address: "Shop No.5, NH 44, Jambagh Rd, Mozamjahi Market, Jam Bagh, Hyderabad, Telangana 500012",
      timings: "Mon-Sun: 9:00 AM - 8:00 PM",
      zomatoLink: "https://www.zomato.com/hyderabad/karachi-bakery-2-nampallyr",
      googleMapsLink: "https://maps.app.goo.gl/nXZH27pYdDBH6ZXk9",
      rating: 4.5,
      reviewCount: 167
    },
    category: "Dessert",
    tags: ["Biscuits", "Dessert", "Bakery"],
    rating: 4.7,
    reviewCount: 134,
    allergies: ["Gluten", "Dairy", "Eggs", "Nuts"]
  },
  {
    id: "6",
    name: "Falooda",
    image: "src/Falooda.jpg",
    description: "A sweet and refreshing dessert drink made with rose syrup, vermicelli, sweet basil seeds, and milk, topped with ice cream.",
    price: "₹349",
    restaurant: {
      name: "Milan Juice Center & Shawarma",
      address: "Opp, Jamia Masjid Road, Mozampura, Habeeb Nagar, New Mallepally, Hyderabad, Telangana 500001",
      timings: "Mon-Sun: 9:00 AM - 4:00 AM",
      zomatoLink: "https://www.zomato.com/hyderabad/milan-juice-center-charminar",
      googleMapsLink: "https://maps.app.goo.gl/uRcJtxdRvcmPyqXbA",
      rating: 4.4,
      reviewCount: 98
    },
    category: "Beverages",
    tags: ["Beverages", "Sweet", "Ice Cream"],
    rating: 4.6,
    reviewCount: 76,
    allergies: ["Dairy", "Gluten", "Nuts", "Food Coloring"]
  }
];

// Mock restaurants data
export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Shadab's Biryani",
    image: "src/arrangement-delicious-prepared-meal.jpg",
    address: "Madina Circle, High Court Rd, Charminar, Hyderabad, Telangana 500012",
    timings: "Mon-Sun: 05:00 AM - 11:00 PM",
    description: "This iconic dish features aromatic rice cooked with meat (mutton, chicken, or vegetarian options), spices, and yogurt, often served with Mirchi ka Salan.",
    zomatoLink: "https://www.zomato.com/hyderabad/hotel-shadab-ghansi-bazaar",
    googleMapsLink: "https://maps.app.goo.gl/FZesZmFDQrvxqa7q9",
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: "2",
    name: "Pista House Shahalibanda",
    image: "src/BaskByCoffee.jpg",
    address: "Charminar Rd, beside Pista House, Shah Ali Banda, Hyderabad, Telangana 500002",
    timings: "Mon-Sun: 11:00 AM - 12:45 AM",
    description: "A slow-cooked dish made with meat, lentils, and wheat, flavored with spices, known for its unique texture and taste.",
    zomatoLink: "https://www.zomato.com/hyderabad/haleem-by-pista-house-ghansi-bazaar",
    googleMapsLink: "https://maps.app.goo.gl/HK7MTARUTs3idSUd9",
    rating: 4.8,
    reviewCount: 256
  },
  {
    id: "3",
    name: "Hyderabad House",
    image: "src/sage-lavender.jpg",
    address: "Road 10, Near Chiranjeevi Blood Bank, Jubilee Hills, Hyderabad",
    timings: "Mon-Sun: 12:00 PM - 11:00 PM",
    description: "Minced meat patties, flavored with spices, and served as a starter.",
    zomatoLink: "https://www.zomato.com/hyderabad/hyderabad-house-2-jubilee-hills",
    googleMapsLink: "https://maps.app.goo.gl/DEqtwGUsjZqUQMW19",
    rating: 4.6,
    reviewCount: 189
  },
  {
    id: "4",
    name: "Banjara 9 Restaurant",
    image: "src/the-beach-terrace.jpg",
    address: "Banjara Hills Rd Number 1, Ambedkar Nagar, Banjara Hills, Hyderabad, Telangana 500034",
    timings: "Mon-Sun: 12:00 PM - 1:00 AM",
    description: "A dessert made with dried apricots, milk, and sugar, known for its sweet and creamy taste.",
    zomatoLink: "https://www.zomato.com/hyderabad/banjara-9-restaurant-khairatabad",
    googleMapsLink: "https://maps.app.goo.gl/agNJDYQfkowtqVZo6",
    rating: 4.7,
    reviewCount: 145
  },
  {
    id: "5",
    name: "Karachi Bakery",
    image: "src/high-angle-dessert-fancy-mask-arrangement.jpg",
    address: "Shop No.5, NH 44, Jambagh Rd, Mozamjahi Market, Jam Bagh, Hyderabad, Telangana 500012",
    timings: "Mon-Sun: 9:00 AM - 8:00 PM",
    description: "Osmania Biscuits are known for their crumbly texture and sweet-salty flavor, making them perfect to pair with Irani chai.",
    zomatoLink: "https://www.zomato.com/hyderabad/karachi-bakery-2-nampallyr",
    googleMapsLink: "https://maps.app.goo.gl/nXZH27pYdDBH6ZXk9",
    rating: 4.5,
    reviewCount: 167
  },
  {
    id: "6",
    name: "Milan Juice Center & Shawarma",
    image: "src/writers cafe.jpg",
    address: "Opp, Jamia Masjid Road, Mozampura, Habeeb Nagar, New Mallepally, Hyderabad, Telangana 500001",
    timings: "Mon-Sun: 9:00 AM - 4:00 AM",
    description: "A sweet and refreshing dessert drink made with rose syrup, vermicelli, sweet basil seeds, and milk, topped with ice cream.",
    zomatoLink: "https://www.zomato.com/hyderabad/milan-juice-center-charminar",
    googleMapsLink: "https://maps.app.goo.gl/uRcJtxdRvcmPyqXbA",
    rating: 4.4,
    reviewCount: 98
  }
];

// Mock user data
export const users: User[] = [
  {
    id: "user1",
    username: "meetsaurabh",
    email: "meetsaurabh@gmail.com",
    password: "helloworld"
  },
  {
    id: "user2",
    username: "erenoice",
    email: "irenanidhi@gmail.com",
    password: "helloworld@31"
  },
  {
    id: "user3",
    username: "foodie_adam",
    email: "adam@example.com",
    password: "password123"
  },
  {
    id: "user4",
    username: "sarah_eats",
    email: "sarah@example.com",
    password: "password123"
  }
];

// Mock tweets
export const tweets: Tweet[] = [
  {
    id: "1",
    userId: "1",
    username: "meetsaurabh",
    restaurantId: "1",
    restaurantName: "Hyderabad House",
    content: "I love the shami kebab at Hyderabad House! The meat is so tender and flavorful. Highly recommended!",
    likes: 15,
    timestamp: "2025-02-15T14:30:00Z",
    replies: [
      {
        id: "1-1",
        userId: "2",
        username: "erenoice",
        content: "I love the shami kebab at Hyderabad House! The meat is so tender and flavorful. Highly recommended!",
        timestamp: "2025-02-20T15:45:00Z"
      }
    ]
  },
  {
    id: "2",
    userId: "2",
    username: "erenoice",
    restaurantId: "2",
      restaurantName: "Karachi Bakery",
      content: "I love the osmania biscuits at Karachi Bakery! The biscuits are so crumbly and sweet-salty. Highly recommended!",
    likes: 23,
    timestamp: "2025-03-10T19:15:00Z",
    replies: []
  }
];

// Mock user preferences data
export const userPreferences: Record<string, FoodPreference> = {
  "user1": {
    cuisine: ["Indian", "Chinese", "Italian"],
    dietaryRestrictions: ["Vegetarian"],
    spiceLevel: "medium",
    priceRange: "moderate",
    favoriteCategories: ["Main Course", "Desserts"],
    favoriteRestaurants: ["Shadab's Biryani", "Pista House Shahalibanda"]
  },
  "user2": {
    cuisine: ["Indian", "Mexican", "Japanese"],
    dietaryRestrictions: [],
    spiceLevel: "spicy",
    priceRange: "premium",
    favoriteCategories: ["Starters", "Main Course"],
    favoriteRestaurants: ["Hyderabad House", "Banjara 9 Restaurant"]
  },
  "user3": {
    cuisine: ["Indian", "Italian", "Thai"],
    dietaryRestrictions: ["Vegetarian", "No Dairy"],
    spiceLevel: "mild",
    priceRange: "budget",
    favoriteCategories: ["Desserts", "Beverages"],
    favoriteRestaurants: ["Karachi Bakery", "Milan Juice Center & Shawarma"]
  },
  "user4": {
    cuisine: ["Indian", "Mexican", "Italian"],
    dietaryRestrictions: ["Vegan"],
    spiceLevel: "medium",
    priceRange: "moderate",
    favoriteCategories: ["Main Course", "Starters"],
    favoriteRestaurants: ["Hyderabad House", "Banjara 9 Restaurant"]
  }
};

// Mock user matches data
export const userMatches: UserMatch[] = [
  {
    id: "match1",
    userId: "user1",
    matchedUserId: "user2",
    matchScore: 75,
    commonInterests: ["Indian Cuisine", "Main Course"],
    status: "pending",
    createdAt: "2024-03-20T10:00:00Z"
  },
  {
    id: "match2",
    userId: "user1",
    matchedUserId: "user3",
    matchScore: 60,
    commonInterests: ["Desserts"],
    status: "accepted",
    createdAt: "2024-03-19T15:30:00Z"
  },
  {
    id: "match3",
    userId: "user2",
    matchedUserId: "user3",
    matchScore: 45,
    commonInterests: ["Indian Cuisine"],
    status: "pending",
    createdAt: "2024-03-20T11:00:00Z"
  },
  {
    id: "match4",
    userId: "user2",
    matchedUserId: "user4",
    matchScore: 85,
    commonInterests: ["Indian Cuisine", "Mexican", "Main Course"],
    status: "accepted",
    createdAt: "2024-03-18T14:20:00Z"
  },
  {
    id: "match5",
    userId: "user3",
    matchedUserId: "user4",
    matchScore: 70,
    commonInterests: ["Indian Cuisine", "Main Course"],
    status: "pending",
    createdAt: "2024-03-20T12:00:00Z"
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'user1',
    receiverId: 'user2',
    content: 'Hey! I see you love Italian food too!',
    timestamp: new Date(Date.now() - 3600000),
    type: 'text'
  },
  {
    id: '2',
    senderId: 'user2',
    receiverId: 'user1',
    content: 'Yes! Have you tried the new Italian place downtown?',
    timestamp: new Date(Date.now() - 3500000),
    type: 'text'
  },
  {
    id: '3',
    senderId: 'user1',
    receiverId: 'user2',
    content: 'Not yet! Would you like to go together sometime?',
    timestamp: new Date(Date.now() - 3400000),
    type: 'text'
  },
  {
    id: '4',
    senderId: 'user2',
    receiverId: 'user1',
    content: 'That sounds great! I\'m free this weekend.',
    timestamp: new Date(Date.now() - 3300000),
    type: 'text'
  }
];
