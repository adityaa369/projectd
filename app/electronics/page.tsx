"use client";

import { Search } from "lucide-react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { categories, allElectronics } from "@/lib/mockData";
import { RichResultCard } from "@/components/ResultCard";

const ElectronicsContent = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState(query || "");

    const filteredProducts = allElectronics.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background pb-10">
            {/* Standard Header for Page */}
            <div className="px-5 py-6 max-w-5xl mx-auto w-full">
                <h1 className="text-2xl font-bold mb-6 tracking-tight">Electronics Store</h1>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Search size={18} />
                        </div>
                        <Input
                            placeholder="Search gadgets (e.g., iPhone, Laptop)..."
                            className="pl-11 h-12 bg-card border-border/60 rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 pb-6 overflow-x-auto scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${selectedCategory === cat.name
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "bg-card border border-border/60 text-foreground hover:bg-secondary/80"
                                }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Product List */}
                <div className="flex flex-col gap-6 items-center">
                    {filteredProducts.map((item) => (
                        <RichResultCard key={item.id} item={item} type="electronics" />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-muted-foreground">No products found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Electronics = () => {
    return (
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading Store...</div>}>
            <ElectronicsContent />
        </Suspense>
    );
};

export default Electronics;
