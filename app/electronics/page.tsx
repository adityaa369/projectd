"use client";

import { ArrowLeft, Search, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import laptopImg from "@/assets/laptop.png";

const categories = [
    { name: "All", icon: "🛒" },
    { name: "Mobiles", icon: "📱" },
    { name: "Laptops", icon: "💻" },
    { name: "TVs", icon: "📺" },
    { name: "Headphones", icon: "🎧" },
    { name: "Watches", icon: "⌚" },
    { name: "Cameras", icon: "📷" },
    { name: "Clothes", icon: "👕" },
];

const allProducts = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        category: "Mobiles",
        price: 129999,
        oldPrice: 149999,
        rating: 4.8,
        brand: "Apple",
        description: "256GB, Natural Titanium",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 134999 },
            { name: "Flipkart", price: 129999 },
            { name: "Croma", price: 139999 },
        ]
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        category: "Mobiles",
        price: 79999,
        oldPrice: 89999,
        rating: 4.6,
        brand: "Samsung",
        description: "256GB, Phantom Black",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 82999 },
            { name: "Flipkart", price: 79999 },
            { name: "Samsung", price: 84999 },
        ]
    },
    {
        id: 3,
        name: "MacBook Air M3",
        category: "Laptops",
        price: 114999,
        oldPrice: 129999,
        rating: 4.9,
        brand: "Apple",
        description: "8GB RAM, 256GB SSD",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 119999 },
            { name: "Flipkart", price: 114999 },
            { name: "Croma", price: 124999 },
        ]
    },
    {
        id: 4,
        name: "Dell XPS 15",
        category: "Laptops",
        price: 159999,
        oldPrice: 179999,
        rating: 4.7,
        brand: "Dell",
        description: "16GB RAM, 512GB SSD",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 164999 },
            { name: "Flipkart", price: 159999 },
            { name: "Dell", price: 169999 },
        ]
    },
    {
        id: 5,
        name: "Sony Bravia 55\"",
        category: "TVs",
        price: 89999,
        oldPrice: 109999,
        rating: 4.5,
        brand: "Sony",
        description: "4K OLED Smart TV",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 94999 },
            { name: "Flipkart", price: 89999 },
            { name: "Croma", price: 99999 },
        ]
    },
    {
        id: 6,
        name: "AirPods Pro 2",
        category: "Headphones",
        price: 24999,
        oldPrice: 29999,
        rating: 4.7,
        brand: "Apple",
        description: "Active Noise Cancellation",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 26999 },
            { name: "Flipkart", price: 24999 },
            { name: "Croma", price: 27999 },
        ]
    },
    {
        id: 7,
        name: "Apple Watch Series 9",
        category: "Watches",
        price: 44999,
        oldPrice: 49999,
        rating: 4.6,
        brand: "Apple",
        description: "GPS, 45mm",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 46999 },
            { name: "Flipkart", price: 44999 },
            { name: "Croma", price: 48999 },
        ]
    },
    {
        id: 8,
        name: "Levi's Denim Jacket",
        category: "Clothes",
        price: 3999,
        oldPrice: 5999,
        rating: 4.4,
        brand: "Levi's",
        description: "Classic Blue, All Sizes",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 4499 },
            { name: "Myntra", price: 3999 },
            { name: "Ajio", price: 4299 },
        ]
    },
    {
        id: 9,
        name: "Nike Air Max",
        category: "Clothes",
        price: 12999,
        oldPrice: 15999,
        rating: 4.5,
        brand: "Nike",
        description: "Running Shoes, White",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 13999 },
            { name: "Myntra", price: 12999 },
            { name: "Nike", price: 14999 },
        ]
    },
    {
        id: 10,
        name: "Canon EOS R50",
        category: "Cameras",
        price: 74999,
        oldPrice: 84999,
        rating: 4.6,
        brand: "Canon",
        description: "Mirrorless, 24.2MP",
        image: laptopImg,
        platforms: [
            { name: "Amazon", price: 79999 },
            { name: "Flipkart", price: 74999 },
            { name: "Croma", price: 82999 },
        ]
    },
];

const Electronics = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(allProducts[0]);

    const filteredProducts = allProducts.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4">
                <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                    <ArrowLeft size={22} />
                </Link>
                <h1 className="text-xl font-bold text-foreground">E-commerce Search</h1>
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
                        placeholder="Search mobiles, laptops, clothes..."
                        className="pl-12"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="overflow-x-auto scrollbar-hide -mx-5 px-5 mb-6">
                    <div className="flex gap-2 pb-2">
                        {categories.map((cat) => (
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
                        <h2 className="text-2xl font-bold text-foreground mb-1">{selectedProduct.name}</h2>
                        <p className="text-muted-foreground text-sm mb-4">{selectedProduct.brand} • {selectedProduct.description}</p>

                        <div className="w-full aspect-square max-w-xs mx-auto mb-4 bg-secondary/30 rounded-xl">
                            <img
                                src={selectedProduct.image.src}
                                alt={selectedProduct.name}
                                className="w-full h-full object-contain p-4"
                            />
                        </div>

                        <div className="flex items-baseline gap-3 mb-1">
                            <span className="text-2xl font-bold text-foreground">₹{selectedProduct.price.toLocaleString()}</span>
                            <span className="text-muted-foreground line-through">₹{selectedProduct.oldPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-success text-sm font-medium">
                            Save ₹{(selectedProduct.oldPrice - selectedProduct.price).toLocaleString()}
                        </p>

                        <Button variant="cta" size="lg" className="w-full mt-4">
                            BUY NOW
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
                                    Performance, Battery. Great camera and premium build quality.
                                </p>
                            </div>

                            <div className="border-t border-border pt-4">
                                <h3 className="font-bold text-foreground mb-1">BUNDLE SUGGESTION</h3>
                                <p className="text-sm text-muted-foreground">
                                    Add Case + Screen Guard for ₹999 extra, save ₹500
                                </p>
                            </div>

                            <div className="border-t border-border pt-4">
                                <h3 className="font-bold text-foreground mb-1">PAYMENT SUGGESTION</h3>
                                <p className="text-sm text-muted-foreground">
                                    Pay via HDFC Credit Card → Extra ₹2000 OFF
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Products Grid */}
                <h2 className="text-xl font-bold text-foreground mb-4">
                    {selectedCategory === "All" ? "All Products" : selectedCategory}
                </h2>

                <div className="flex flex-col gap-3 mb-6">
                    {filteredProducts.map((item) => (
                        <Card
                            key={item.id}
                            variant="default"
                            className={`p-3 animate-fade-in cursor-pointer transition-all hover:bg-secondary/20 ${selectedProduct.id === item.id ? "ring-2 ring-primary" : ""
                                }`}
                            onClick={() => setSelectedProduct(item)}
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
                                    <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
                                    <div className="flex items-center gap-1 mb-2">
                                        <Star size={12} className="fill-accent text-accent" />
                                        <span className="text-xs text-muted-foreground">{item.rating}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-foreground">₹{item.price.toLocaleString()}</span>
                                        <span className="text-xs text-muted-foreground line-through">₹{item.oldPrice.toLocaleString()}</span>
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
                        <span className="text-sm text-muted-foreground">Best price on</span>
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">Flipkart</span>
                    </div>
                    <span className="text-lg font-bold">₹{selectedProduct.price.toLocaleString()}</span>
                </div>
                <Button variant="checkout" size="xl" className="w-full">
                    UNIVERSAL CHECKOUT
                </Button>
            </div>
        </div>
    );
};

export default Electronics;
