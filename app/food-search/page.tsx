"use client";

import { ArrowLeft, Search, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import burgerImg from "@/assets/burger.png";
import pizzaImg from "@/assets/pizza.png";

const menuCategories = [
    { name: "All", icon: "🍽️" },
    { name: "Pizza", icon: "🍕" },
    { name: "Burger", icon: "🍔" },
    { name: "Biryani", icon: "🍚" },
    { name: "Chinese", icon: "🥡" },
    { name: "South Indian", icon: "🥘" },
    { name: "Desserts", icon: "🍰" },
    { name: "Drinks", icon: "🥤" },
];

const allFoodItems = [
    {
        id: 1,
        name: "Cheeseburger",
        category: "Burger",
        price: 199,
        oldPrice: 259,
        rating: 4.2,
        time: "25 min",
        restaurant: "Burger Palace",
        review: "Taste, Hygiene",
        image: burgerImg,
    },
    {
        id: 2,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 249,
        oldPrice: 349,
        rating: 4.5,
        time: "30 min",
        restaurant: "Pizza Hut",
        review: "Fresh, Cheesy",
        image: pizzaImg,
    },
    {
        id: 3,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 349,
        oldPrice: 449,
        rating: 4.6,
        time: "35 min",
        restaurant: "Dominos",
        review: "Spicy, Loaded",
        image: pizzaImg,
    },
    {
        id: 4,
        name: "Chicken Burger",
        category: "Burger",
        price: 179,
        oldPrice: 229,
        rating: 4.0,
        time: "20 min",
        restaurant: "McDonalds",
        review: "Crispy, Juicy",
        image: burgerImg,
    },
    {
        id: 5,
        name: "Hyderabadi Biryani",
        category: "Biryani",
        price: 299,
        oldPrice: 399,
        rating: 4.7,
        time: "40 min",
        restaurant: "Paradise",
        review: "Authentic, Flavorful",
        image: burgerImg,
    },
    {
        id: 6,
        name: "Chicken Fried Rice",
        category: "Chinese",
        price: 199,
        oldPrice: 249,
        rating: 4.1,
        time: "25 min",
        restaurant: "Wok Express",
        review: "Tasty, Quick",
        image: burgerImg,
    },
    {
        id: 7,
        name: "Masala Dosa",
        category: "South Indian",
        price: 129,
        oldPrice: 169,
        rating: 4.4,
        time: "20 min",
        restaurant: "Saravana Bhavan",
        review: "Crispy, Traditional",
        image: burgerImg,
    },
    {
        id: 8,
        name: "Gulab Jamun",
        category: "Desserts",
        price: 99,
        oldPrice: 129,
        rating: 4.3,
        time: "15 min",
        restaurant: "Haldirams",
        review: "Sweet, Soft",
        image: burgerImg,
    },
];

const FoodSearch = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFood, setSelectedFood] = useState(allFoodItems[0]);

    const filteredItems = allFoodItems.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4">
                <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                    <ArrowLeft size={22} />
                </Link>
                <h1 className="text-xl font-bold text-foreground">Food Search</h1>
                <div className="w-10" />
            </header>

            {/* Main Content */}
            <main className="px-5">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Search size={20} />
                    </div>
                    <Input
                        variant="search"
                        inputSize="lg"
                        placeholder="Search pizza, burger, biryani..."
                        className="pl-12"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Menu Categories */}
                <div className="overflow-x-auto scrollbar-hide -mx-5 px-5 mb-6">
                    <div className="flex gap-2 pb-2">
                        {menuCategories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${selectedCategory === cat.name
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card border border-border text-foreground hover:bg-secondary"
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                <span className="text-sm font-medium">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Recommendation Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Left - Product Card */}
                    <Card variant="elevated" className="p-5 animate-fade-in">
                        <Badge variant="bestValue" className="mb-2">BEST VALUE</Badge>
                        <h2 className="text-2xl font-bold text-foreground mb-1">{selectedFood.name}</h2>
                        <p className="text-muted-foreground text-sm mb-4">{selectedFood.restaurant}</p>

                        <div className="w-full aspect-square max-w-xs mx-auto mb-4 bg-secondary/30 rounded-xl">
                            <img
                                src={selectedFood.image.src}
                                alt={selectedFood.name}
                                className="w-full h-full object-contain p-4"
                            />
                        </div>

                        <div className="flex items-baseline gap-3 mb-1">
                            <span className="text-2xl font-bold text-foreground">₹{selectedFood.price}</span>
                            <span className="text-muted-foreground line-through">₹{selectedFood.oldPrice}</span>
                            <span className="text-muted-foreground">{selectedFood.time}</span>
                        </div>

                        <Button variant="cta" size="lg" className="w-full mt-4">
                            ORDER NOW
                        </Button>
                    </Card>

                    {/* Right - AI Insights Card */}
                    <Card variant="default" className="p-5 animate-fade-in">
                        <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-4">
                            AI INSIGHTS
                        </p>

                        <div className="space-y-5">
                            <div>
                                <h3 className="font-bold text-foreground mb-1">AI REVIEW SUMMARY</h3>
                                <p className="text-sm text-muted-foreground">
                                    {selectedFood.review}. Great taste and quick delivery.
                                </p>
                            </div>

                            <div className="border-t border-border pt-4">
                                <h3 className="font-bold text-foreground mb-1">BUNDLE SUGGESTION</h3>
                                <p className="text-sm text-muted-foreground">
                                    Add Coke + Fries for ₹80 extra, save ₹40
                                </p>
                            </div>

                            <div className="border-t border-border pt-4">
                                <h3 className="font-bold text-foreground mb-1">PAYMENT SUGGESTION</h3>
                                <p className="text-sm text-muted-foreground">
                                    Pay via Paytm UPI → Extra 20% cashback
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Food Items Grid */}
                <h2 className="text-xl font-bold text-foreground mb-4">
                    {selectedCategory === "All" ? "All Items" : selectedCategory}
                </h2>

                <div className="flex flex-col gap-3 mb-6">
                    {filteredItems.map((item) => (
                        <Card
                            key={item.id}
                            variant="default"
                            className={`p-3 animate-fade-in cursor-pointer transition-all hover:bg-secondary/20 ${selectedFood.id === item.id ? "ring-2 ring-primary" : ""
                                }`}
                            onClick={() => setSelectedFood(item)}
                        >
                            <div className="flex gap-4">
                                <div className="w-24 h-24 bg-secondary/30 rounded-xl overflow-hidden flex-shrink-0 relative">
                                    <img
                                        src={item.image.src}
                                        alt={item.name}
                                        className="w-full h-full object-contain p-2"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <h3 className="font-semibold text-foreground text-sm truncate">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground mb-1">{item.restaurant}</p>
                                    <div className="flex items-center gap-1 mb-2">
                                        <Star size={12} className="fill-accent text-accent" />
                                        <span className="text-xs text-muted-foreground">{item.rating}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-foreground">₹{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>

            {/* Footer Checkout Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">Best price from</span>
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">Swiggy</span>
                    </div>
                    <span className="text-lg font-bold">₹{selectedFood.price}</span>
                </div>
                <Button variant="checkout" size="xl" className="w-full">
                    UNIVERSAL CHECKOUT
                </Button>
            </div>
        </div>
    );
};

export default FoodSearch;
