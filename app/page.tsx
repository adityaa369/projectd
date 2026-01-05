"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef, Suspense } from "react";
import { ArrowUp, Plus, Search, Globe, Image as ImageIcon, MapPin, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allElectronics, allFoodItems, categories, foodCategories } from "@/lib/mockData";
import { useSearchParams } from "next/navigation";

function HomeContent() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [activeResultType, setActiveResultType] = useState<"all" | "electronics" | "food">("all");
    const resultsEndRef = useRef<HTMLDivElement>(null);

    // Initial mounting for theme
    useEffect(() => {
        setMounted(true);
    }, []);

    // Initial Category Load
    useEffect(() => {
        const category = searchParams.get("category");
        if (category === "electronics") {
            setActiveResultType("electronics");
            setHasSearched(true);
        } else if (category === "food") {
            setActiveResultType("food");
            setHasSearched(true);
        }
    }, [searchParams]);

    // Scroll to bottom on search
    useEffect(() => {
        if (hasSearched && resultsEndRef.current) {
            resultsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [hasSearched, activeResultType, searchQuery]);

    if (!mounted) {
        return <div className="flex h-screen items-center justify-center">Loading AI Interface...</div>;
    }

    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        setHasSearched(true);

        // Simple keyword detection for demo
        const lowerQuery = searchQuery.toLowerCase();
        if (lowerQuery.includes("food") || lowerQuery.includes("pizza") || lowerQuery.includes("burger") || lowerQuery.includes("biryani")) {
            setActiveResultType("food");
        } else {
            setActiveResultType("electronics");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // Filter Logic
    const filteredElectronics = allElectronics.filter(item =>
        !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase().replace("best", "").trim()) || item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredFood = allFoodItems.filter(item =>
        !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase().replace("best", "").replace("food", "").trim()) || item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen text-foreground relative">

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto pb-40">
                <main className={`flex flex-col items-center px-4 transition-all duration-500 h-full ${hasSearched ? "pt-10 justify-start" : "justify-center"}`}>

                    {/* Hero Section - Only Visible Initially */}
                    {!hasSearched && (
                        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full max-w-2xl px-4 animate-fade-in">
                            <h1 className="text-4xl md:text-5xl font-semibold mb-10 tracking-tight text-center">How can I help you today?</h1>

                            {/* Initial Centered Search Bar */}
                            <div className="w-full max-w-2xl">
                                <div className="relative flex flex-col w-full bg-secondary/10 border border-border/60 hover:border-border/100 rounded-[2rem] shadow-sm transition-colors duration-200">
                                    <Input
                                        className="w-full bg-transparent border-none shadow-none px-6 py-4 text-lg focus-visible:ring-0 placeholder:text-muted-foreground/50 min-h-[64px] resize-none rounded-[2rem]"
                                        placeholder="Ask anything..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                    />

                                    {/* Action Buttons */}
                                    <div className="flex justify-between items-center px-4 pb-3">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-muted/50">
                                                <Plus size={20} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-muted/50">
                                                <Globe size={18} />
                                                <span className="sr-only">Search</span>
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                size="icon"
                                                className={`h-9 w-9 rounded-full transition-all duration-200 ${searchQuery ? "bg-primary text-primary-foreground" : "bg-muted/20 text-muted-foreground/40 cursor-not-allowed"}`}
                                                disabled={!searchQuery}
                                                onClick={handleSearch}
                                            >
                                                <ArrowUp size={20} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions Footer (Initial View Only) */}
                            <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-medium text-muted-foreground/60 animate-fade-in delay-200">
                                <button className="flex items-center gap-2 hover:text-foreground transition-colors px-3 py-2 hover:bg-secondary/40 rounded-full"><ImageIcon size={14} /> Create image</button>
                                <button className="flex items-center gap-2 hover:text-foreground transition-colors px-3 py-2 hover:bg-secondary/40 rounded-full"><MapPin size={14} /> Plan trip</button>
                                <button className="flex items-center gap-2 hover:text-foreground transition-colors px-3 py-2 hover:bg-secondary/40 rounded-full"><Paperclip size={14} /> Analyze Data</button>
                            </div>
                        </div>
                    )}

                    {/* Results View - Only Visible After Search */}
                    {hasSearched && (
                        <div className="w-full max-w-3xl animate-fade-in pb-20">

                            {/* User Query Bubble */}
                            {searchQuery && (
                                <div className="flex justify-end mb-8">
                                    <div className="bg-secondary px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                                        {searchQuery}
                                    </div>
                                </div>
                            )}

                            {/* AI Response Block */}
                            <div className="flex gap-4 mb-8">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                                    <span className="text-primary text-xs font-bold">AI</span>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <p className="text-sm font-medium">
                                        {searchQuery ? (
                                            <>Here are the top results for <span className="text-primary">"{searchQuery}"</span>:</>
                                        ) : (
                                            <>Showing top <span className="text-primary capitalize">{activeResultType}</span>:</>
                                        )}
                                    </p>

                                    {/* Sub-Filters */}
                                    <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
                                        {(activeResultType === "food" ? foodCategories : categories).map((cat) => (
                                            <Badge key={cat.name} variant="outline" className="cursor-pointer hover:bg-secondary px-3 py-1 font-normal">
                                                {cat.icon} {cat.name}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Results Grid */}
                                    <div className="grid grid-cols-1 gap-3">
                                        {(activeResultType === "food" ? filteredFood : filteredElectronics).slice(0, 3).map((item: any) => (
                                            <Card key={item.id} className="p-3 flex gap-4 hover:bg-secondary/20 cursor-pointer border-border/50 hover:border-border/80 transition-border">
                                                <div className="w-20 h-20 bg-white rounded-md p-2 flex-shrink-0 border border-border/10">
                                                    <img src={item.image.src} className="w-full h-full object-contain" alt={item.name} />
                                                </div>
                                                <div className="flex-1 min-w-0 py-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="text-sm font-semibold truncate">{item.name}</h4>
                                                        <span className="text-xs font-bold">₹{item.price.toLocaleString()}</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.description || item.restaurant}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Badge variant="secondary" className="text-[10px] h-5">{item.rating} ★</Badge>
                                                        {item.time && <span className="text-[10px] text-muted-foreground">{item.time}</span>}
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}

                                        {/* Show "More" button */}
                                        <Button variant="ghost" className="w-full text-xs text-muted-foreground h-8 mt-2">
                                            View {activeResultType === "food" ? filteredFood.length - 3 : filteredElectronics.length - 3} more results
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div ref={resultsEndRef} />
                        </div>
                    )}
                </main>
            </div>

            {/* Persistent Bottom Search Bar - ONLY Visible After Search */}
            {hasSearched && (
                <div className="fixed bottom-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-md pb-6 pt-2 md:pl-72 border-t border-border/40">
                    <div className="max-w-3xl mx-auto px-4 w-full">
                        <div className="relative group">
                            <div className="relative flex flex-col w-full bg-secondary/40 backdrop-blur-xl border border-primary/10 rounded-3xl shadow-sm transition-all duration-300 hover:border-primary/20 hover:bg-secondary/60 focus-within:ring-1 focus-within:ring-primary/20">
                                <Input
                                    className="w-full bg-transparent border-none shadow-none px-4 py-3 text-sm focus-visible:ring-0 placeholder:text-muted-foreground/50 min-h-[48px]"
                                    placeholder="Ask follow-up..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />

                                <div className="flex justify-between items-center px-2 pb-2">
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-background/50">
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            size="icon"
                                            className={`h-7 w-7 rounded-full transition-all duration-300 ${searchQuery ? "bg-primary text-primary-foreground scale-100" : "bg-transparent text-muted-foreground/30 scale-90"}`}
                                            disabled={!searchQuery}
                                            onClick={handleSearch}
                                        >
                                            <ArrowUp size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading AI Interface...</div>}>
            <HomeContent />
        </Suspense>
    );
}
