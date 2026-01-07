"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef, Suspense } from "react";
import { ArrowUp, Plus, Globe, Image as ImageIcon, MapPin, Paperclip, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { allElectronics, allFoodItems } from "@/lib/mockData";
import { RichResultCard } from "@/components/ResultCard";

interface Message {
    id: string;
    role: "user" | "ai";
    content?: string;
    type: "text" | "results";
    results?: any[];
    resultType?: "food" | "electronics";
}

function HomeContent() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    if (!mounted) return null;

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            type: "text"
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            const lowerQuery = userMsg.content?.toLowerCase() || "";
            let responseMsg: Message;

            if (lowerQuery.includes("food") || lowerQuery.includes("burger") || lowerQuery.includes("pizza")) {
                responseMsg = {
                    id: (Date.now() + 1).toString(),
                    role: "ai",
                    type: "results",
                    resultType: "food",
                    results: allFoodItems.slice(0, 3), // Show top 3
                    content: "Here are the best food options I found for you based on the latest deals and reviews."
                };
            } else if (lowerQuery.includes("phone") || lowerQuery.includes("laptop") || lowerQuery.includes("electronic")) {
                responseMsg = {
                    id: (Date.now() + 1).toString(),
                    role: "ai",
                    type: "results",
                    resultType: "electronics",
                    results: allElectronics.slice(0, 3),
                    content: "I've analyzed the market. Here are the top electronics deals currently available across platforms."
                };
            } else {
                responseMsg = {
                    id: (Date.now() + 1).toString(),
                    role: "ai",
                    type: "text",
                    content: "I can help you find the best deals on Electronics, Food, Travel, and Hotels. Try asking 'Show me best phones' or 'I want a burger'."
                };
            }

            setMessages(prev => [...prev, responseMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSendMessage();
    };

    return (
        <div className="flex flex-col h-screen text-foreground relative bg-background">

            {/* Scrollable Chat Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto w-full px-4 pb-40 min-h-full flex flex-col">

                    {/* Empty State / Greeting */}
                    {messages.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in px-4">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                                <img src="/logo.png" alt="Depenk Logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-center">What do you want to choose today?</h1>

                            <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-muted-foreground/60">
                                <button className="flex items-center gap-2 hover:text-foreground transition-colors px-4 py-2 bg-secondary/30 rounded-full hover:bg-secondary/60">
                                    <ImageIcon size={14} /> Create image
                                </button>
                                <button className="flex items-center gap-2 hover:text-foreground transition-colors px-4 py-2 bg-secondary/30 rounded-full hover:bg-secondary/60">
                                    <MapPin size={14} /> Plan trip
                                </button>
                                <button className="flex items-center gap-2 hover:text-foreground transition-colors px-4 py-2 bg-secondary/30 rounded-full hover:bg-secondary/60">
                                    <Paperclip size={14} /> Analyze Data
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Message List */}
                    <div className="flex flex-col gap-8 pt-10">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>

                                {/* AI Avatar */}
                                {msg.role === "ai" && (
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                                        <Sparkles className="w-4 h-4 text-primary" />
                                    </div>
                                )}

                                <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[75%]`}>
                                    {/* Text Content */}
                                    {msg.content && (
                                        <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-secondary text-secondary-foreground rounded-tr-sm"
                                            : "text-foreground"
                                            }`}>
                                            {msg.content}
                                        </div>
                                    )}

                                    {/* Results Rendering */}
                                    {msg.type === "results" && msg.results && (
                                        <div className="flex flex-col gap-4 mt-2">
                                            {msg.results.map((item) => (
                                                <RichResultCard
                                                    key={item.id}
                                                    item={item}
                                                    type={msg.resultType!}
                                                />
                                            ))}
                                            <Button variant="ghost" className="self-start text-xs text-muted-foreground">
                                                View more results
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* User Avatar */}
                                {msg.role === "user" && (
                                    <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center mt-1">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex items-center gap-1 h-10">
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Persistent Bottom Search Bar */}
            {/* Persistent Bottom Search Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-20 pb-6 pt-10 px-4 md:pl-64 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none">
                <div className="max-w-3xl mx-auto w-full pointer-events-auto">
                    <div className="relative group">
                        <div className="relative flex flex-col w-full bg-secondary/30 backdrop-blur-xl border border-primary/10 rounded-3xl shadow-lg transition-all duration-300 hover:bg-secondary/50 focus-within:bg-background focus-within:ring-1 focus-within:ring-primary/20 focus-within:shadow-xl">
                            <Input
                                className="w-full bg-transparent border-none shadow-none px-5 py-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 min-h-[58px]"
                                placeholder="Message Depenk..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                            />

                            <div className="flex justify-between items-center px-4 pb-3">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-background/50">
                                        <Plus size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-background/50">
                                        <Globe size={18} />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        size="icon"
                                        className={`h-9 w-9 rounded-full transition-all duration-300 ${inputValue ? "bg-foreground text-background scale-100 shadow-sm" : "bg-transparent text-muted-foreground/30 scale-90"}`}
                                        disabled={!inputValue}
                                        onClick={handleSendMessage}
                                    >
                                        <ArrowUp size={20} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <p className="text-[10px] text-muted-foreground/50 font-medium">Depenk can make mistakes. Consider checking important information.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={null}>
            <HomeContent />
        </Suspense>
    );
}
