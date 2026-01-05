"use client";

import { Search } from "lucide-react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { foodCategories, allFoodItems } from "@/lib/mockData";

const FoodSearchContent = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState(query || "");

    const filteredItems = allFoodItems.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background pb-10">
            {/* Header */}
            <div className="px-5 py-4 max-w-5xl mx-auto w-full">
                <h1 className="text-2xl font-bold mb-4">Food Delivery</h1>

                {/* Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Search size={16} />
                        </div>
                        <Input
                            placeholder="Cravings? Search here..."
                            className="pl-9 bg-card"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 pb-4 overflow-x-auto">
                    {foodCategories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-sm ${selectedCategory === cat.name
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border text-foreground hover:bg-secondary"
                                }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                        <Card key={item.id} className="p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow">
                            <div className="w-full h-40 bg-white rounded-md p-4 flex items-center justify-center">
                                <img src={item.image.src} className="max-w-full max-h-full object-contain" alt={item.name} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-foreground">{item.name}</h3>
                                    <Badge className="bg-success text-success-foreground text-[10px]">{item.rating} ★</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{item.restaurant}</p>
                                <div className="flex items-center gap-2 mt-3 justify-between">
                                    <div>
                                        <span className="font-bold text-lg">₹{item.price}</span>
                                        <span className="text-sm text-muted-foreground line-through ml-2">₹{item.oldPrice}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{item.time}</span>
                                </div>
                                <Button className="w-full mt-3">Order Now</Button>
                            </div>
                        </Card>
                    ))}
                </div>
                {filteredItems.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        No food items found.
                    </div>
                )}
            </div>
        </div>
    );
};

const FoodSearch = () => {
    return (
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
            <FoodSearchContent />
        </Suspense>
    );
};

export default FoodSearch;
