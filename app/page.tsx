"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import flavorRushLogo from "@/public/Flavor Rush logo.png";
import pizzaIcon from "@/public/pizza-icon.png";
import burgerIcon from "@/public/burger-icon.png";
import pastaIcon from "@/public/pasta-icon.png";
import drinksIcon from "@/public/drinks-icon.png";
import burgerHeroOne from "@/public/carousel-1.jpg";
import burgerHeroTwo from "@/public/carousel-2.jpg";
import burgerHeroThree from "@/public/carousel-3.jpg";
import { AccordionCard } from "@/components/AccordionCard";
import { FoodCard } from "@/components/FoodCard";
import { CalendarDays, MapPin, ShoppingCart } from "lucide-react";
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <article className={`flex flex-col justify-between rounded-lg border border-zinc-200 p-4 ${className}`}>
      <div className="animate-pulse">
        <div className="h-5 w-3/4 rounded bg-zinc-200"></div>
        <div className="mt-2 h-4 w-full rounded bg-zinc-200"></div>
        <div className="mt-1 h-4 w-5/6 rounded bg-zinc-200"></div>
      </div>
      <div className="mt-4 h-10 w-full animate-pulse rounded-lg bg-zinc-200"></div>
    </article>
  );
}

export default function Home() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const router = useRouter();

  // Place Order Modal State
  const [isPlaceOrderModalOpen, setIsPlaceOrderModalOpen] = useState(false);
  const [orderCategory, setOrderCategory] = useState("Pizza");
  const [orderName, setOrderName] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderSuggestions, setOrderSuggestions] = useState("");
  const [orderToppings, setOrderToppings] = useState<string[]>([]);
  const [orderFlavor, setOrderFlavor] = useState("");
  const [orderFastDelivery, setOrderFastDelivery] = useState(false);
  const [orderPizzaSize, setOrderPizzaSize] = useState(2);
  const [orderDrinkSize, setOrderDrinkSize] = useState(2);

  // Future Booking State
  const [isFutureBookingModalOpen, setIsFutureBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");

  // Promotional Toast State
  const [activePromotion, setActivePromotion] = useState<string | null>(null);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: 'Hi there! How can I help you today?' }
  ]);

  // Register Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFile, setRegisterFile] = useState<File | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsFetchingData(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (itemName: string) => {
    setLoadingItem(itemName);
    setTimeout(() => {
      setLoadingItem(null);
      alert("your item has been added to the cart");
      router.push("/cart");
    }, 800);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput("");

    // Fake bot reply
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Thanks for reaching out! Our team is currently busy, but we will get back to you soon.' }]);
    }, 1000);
  };

  const heroSlides = [
    { image: burgerHeroOne, alt: "Cheeseburger with fries and dip" },
    { image: burgerHeroTwo, alt: "Loaded sandwich with fries and sauces" },
    { image: burgerHeroThree, alt: "Burger and wraps with fries" },
  ];

  useEffect(() => {
    if (!isProfileModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isProfileModalOpen]);

  useEffect(() => {
    if (!isPlaceOrderModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPlaceOrderModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPlaceOrderModalOpen]);

  useEffect(() => {
    if (!isRegisterModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsRegisterModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isRegisterModalOpen]);

  useEffect(() => {
    if (!isFutureBookingModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFutureBookingModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFutureBookingModalOpen]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);

    return () => {
      window.clearInterval(interval);
    };
  }, [heroSlides.length]);

  useEffect(() => {
    const promotions = [
      "🔥 Flash Sale! Get 20% off all large pizzas!",
      "🥤 Free drink with any burger combo today!",
      "✨ Try our new Spicy Zinger Pasta!",
      "🍕 Buy 1 Get 1 Free on all medium pizzas!",
      "🍟 Add extra fries for just 50 Rupees!"
    ];

    const showRandomPromotion = () => {
      const randomPromo = promotions[Math.floor(Math.random() * promotions.length)];
      setActivePromotion(randomPromo);

      // Hide after 5 seconds
      setTimeout(() => {
        setActivePromotion((current) => current === randomPromo ? null : current);
      }, 5000);
    };

    let promoInterval: NodeJS.Timeout | null = null;
    const initialTimer = setTimeout(() => {
      showRandomPromotion();
      // Then show every 30 seconds
      promoInterval = setInterval(showRandomPromotion, 30000);
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      if (promoInterval) clearInterval(promoInterval);
    };
  }, []);

  return (
    <SidebarProvider>
      <header className="fixed top-0 left-0 right-0 z-[60] w-full bg-yellow-400 px-4 py-3 sm:px-6 md:px-8">
        {/* ── Mobile row 1: Trigger + Logo + Profile ── */}
        <div className="flex items-center justify-between gap-2 md:hidden">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="text-zinc-900 hover:bg-yellow-500 hover:text-zinc-900" />
            <Image src={flavorRushLogo} alt="Flavor Rush logo" width={44} height={44} priority />
            <h1 className="text-lg font-bold tracking-wide">Flavor Rush</h1>
          </div>
          <button type="button" onClick={() => setIsProfileModalOpen(true)} className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden cursor-pointer rounded-full bg-zinc-800 ring-1 ring-white/20" aria-label="User profile">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="text-zinc-200">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor" />
              <path d="M4 20C4.6 16.4 7.7 14 12 14C16.3 14 19.4 16.4 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {/* ── Mobile row 2: Place Order + Register + Cart ── */}
        <div className="mt-2 flex items-center gap-2 md:hidden">
          <button type="button" onClick={() => setIsPlaceOrderModalOpen(true)} className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500">Place Order</button>
          <button type="button" onClick={() => setIsRegisterModalOpen(true)} className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50">Register</button>
          <Link href="/cart" aria-label="Cart" className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-300/40 transition hover:bg-yellow-300">
            <span className="sr-only">Cart</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="text-zinc-900">
              <path d="M6.5 9.5H20L18.7 18.2C18.6 18.8 18.1 19.2 17.5 19.2H9.2C8.6 19.2 8.1 18.8 8 18.2L6.5 9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M6.5 9.5L5.8 6.8C5.7 6.3 5.3 6 4.8 6H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M9.5 22C10.3 22 11 21.3 11 20.5C11 19.7 10.3 19 9.5 19C8.7 19 8 19.7 8 20.5C8 21.3 8.7 22 9.5 22Z" fill="currentColor" />
              <path d="M17.5 22C18.3 22 19 21.3 19 20.5C19 19.7 18.3 19 17.5 19C16.7 19 16 19.7 16 20.5C16 21.3 16.7 22 17.5 22Z" fill="currentColor" />
            </svg>
            <span className="absolute -right-1 -top-1 z-10 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">3</span>
          </Link>
        </div>
        {/* ── Desktop single row ── */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-zinc-900 hover:bg-yellow-500 hover:text-zinc-900" />
            <Image src={flavorRushLogo} alt="Flavor Rush logo" width={60} height={60} priority />
            <h1 className="text-2xl font-bold tracking-wide">Flavor Rush</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav aria-label="Main navigation">
              <ul className="flex items-center gap-x-6 text-sm font-semibold">
                <li><a href="#pizzas" className="flex items-center gap-1 cursor-pointer transition hover:text-white"><Image src={pizzaIcon} alt="" width={20} height={20} />Pizzas</a></li>
                <li><a href="#burgers" className="flex items-center gap-1 cursor-pointer transition hover:text-white"><Image src={burgerIcon} alt="" width={20} height={20} />Burgers</a></li>
                <li><a href="#pasta" className="flex items-center gap-1 cursor-pointer transition hover:text-white"><Image src={pastaIcon} alt="" width={20} height={20} />Pasta</a></li>
                <li><a href="#drinks" className="flex items-center gap-1 cursor-pointer transition hover:text-white"><Image src={drinksIcon} alt="" width={20} height={20} />Drinks</a></li>
                <li className="flex items-center">
                  <Link href="/cart" aria-label="Cart" className="group relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-300/40 transition hover:bg-yellow-300">
                    <span className="sr-only">Cart</span>
                    <span className="pointer-events-none absolute -top-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">See the Cart</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="text-zinc-900">
                      <path d="M6.5 9.5H20L18.7 18.2C18.6 18.8 18.1 19.2 17.5 19.2H9.2C8.6 19.2 8.1 18.8 8 18.2L6.5 9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M6.5 9.5L5.8 6.8C5.7 6.3 5.3 6 4.8 6H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M9.5 22C10.3 22 11 21.3 11 20.5C11 19.7 10.3 19 9.5 19C8.7 19 8 19.7 8 20.5C8 21.3 8.7 22 9.5 22Z" fill="currentColor" />
                      <path d="M17.5 22C18.3 22 19 21.3 19 20.5C19 19.7 18.3 19 17.5 19C16.7 19 16 19.7 16 20.5C16 21.3 16.7 22 17.5 22Z" fill="currentColor" />
                    </svg>
                    <span className="absolute -right-1 -top-1 z-10 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">3</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <button type="button" onClick={() => setIsPlaceOrderModalOpen(true)} className="whitespace-nowrap rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">Place Order</button>
            <button type="button" onClick={() => setIsRegisterModalOpen(true)} className="whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50">Register</button>
            <button type="button" onClick={() => setIsProfileModalOpen(true)} className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden cursor-pointer rounded-full bg-zinc-800 ring-1 ring-white/20" aria-label="User profile">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="text-zinc-200">
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor" />
                <path d="M4 20C4.6 16.4 7.7 14 12 14C16.3 14 19.4 16.4 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <Sidebar variant="sidebar" side="left" className="bg-zinc-900 border-none pt-[116px] md:pt-[84px]">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="gap-3 px-4 pt-4 sm:pt-6">
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start rounded-lg bg-yellow-400 px-4 py-6 text-base font-semibold text-zinc-900 transition hover:bg-yellow-300">
                  <a href="#pizzas" className="flex items-center w-full">
                    <Image src={pizzaIcon} alt="" width={24} height={24} className="mr-2 shrink-0" />
                    Pizzas
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start rounded-lg bg-yellow-400 px-4 py-6 text-base font-semibold text-zinc-900 transition hover:bg-yellow-300">
                  <a href="#burgers" className="flex items-center w-full">
                    <Image src={burgerIcon} alt="" width={24} height={24} className="mr-2 shrink-0" />
                    Burgers
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start rounded-lg bg-yellow-400 px-4 py-6 text-base font-semibold text-zinc-900 transition hover:bg-yellow-300">
                  <a href="#pasta" className="flex items-center w-full">
                    <Image src={pastaIcon} alt="" width={24} height={24} className="mr-2 shrink-0" />
                    Pasta
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start rounded-lg bg-yellow-400 px-4 py-6 text-base font-semibold text-zinc-900 transition hover:bg-yellow-300">
                  <a href="#drinks" className="flex items-center w-full">
                    <Image src={drinksIcon} alt="" width={24} height={24} className="mr-2 shrink-0" />
                    Drinks
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="mt-auto pt-4">
                <SidebarMenuButton className="w-full justify-start rounded-lg bg-red-600 px-4 py-6 text-base font-semibold text-white transition hover:bg-red-500 hover:text-white">
                  <Link href="/cart" className="flex items-center w-full">
                    <ShoppingCart className="w-6 h-6 mr-2 shrink-0" />
                    Cart
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start rounded-lg bg-zinc-800 px-4 py-6 text-base font-semibold text-white transition hover:bg-zinc-700 hover:text-white">
                  <Link href="/tracking" className="flex items-center w-full">
                    <MapPin className="w-6 h-6 text-yellow-400 mr-2 shrink-0" />
                    Track your order
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setIsFutureBookingModalOpen(true)} className="w-full justify-start rounded-lg bg-yellow-400 px-4 py-6 text-base font-semibold text-zinc-900 transition hover:bg-yellow-300">
                  <CalendarDays className="w-6 h-6 mr-2 shrink-0" />
                  Future Booking
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="min-w-0 w-full pt-[116px] md:pt-[84px]">




        <main
          className="min-w-0 flex-1 p-4 sm:p-6 md:px-8 md:pb-8 transition-all duration-300"

        >
          <section className="relative mb-6 overflow-hidden rounded-xl shadow-sm">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={heroSlides[activeSlide].image}
                alt={heroSlides[activeSlide].alt}
                fill
                priority
                className="object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveSlide(
                  (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
                )
              }
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-xl font-bold text-white transition hover:bg-black/65"
            >
              &#10094;
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-xl font-bold text-white transition hover:bg-black/65"
            >
              &#10095;
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.alt}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${index === activeSlide ? "bg-yellow-400" : "bg-white/70"
                    }`}
                />
              ))}
            </div>
          </section>

          <section id="pizzas" className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Pizzas</h2>
            <p className="mt-2 text-zinc-600">
              Explore our classic and specialty pizzas with rich toppings and
              fresh ingredients.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { name: "Margherita Pizza", desc: "Fresh basil, mozzarella, and tomato sauce." },
                { name: "Pepperoni Pizza", desc: "Loaded with spicy pepperoni and extra cheese." },
                { name: "BBQ Chicken Pizza", desc: "Smoky BBQ sauce with grilled chicken chunks." },
                { name: "Veggie Supreme", desc: "Capsicum, olives, onions, and sweet corn." },
                { name: "Fajita Pizza", desc: "Spicy fajita chicken with jalapenos and onions." },
                { name: "Cheese Lover", desc: "A rich blend of mozzarella and cheddar cheese." },
              ].map((item, index) => (
                isFetchingData ? (
                  <SkeletonCard key={index} />
                ) : (
                  <FoodCard
                    key={item.name}
                    name={item.name}
                    desc={item.desc}
                    image="/mock-pizza.jpg"
                    actionButton={
                      <button
                        onClick={() => handleAddToCart(item.name)}
                        disabled={!!loadingItem}
                        className="flex w-full items-center justify-center rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-zinc-900 transition hover:bg-yellow-300 disabled:opacity-70"
                      >
                        Add to Cart
                      </button>
                    }
                  />
                )
              ))}
            </div>
          </section>

          <hr className="my-6 border-zinc-300" />

          <section id="burgers" className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Burgers</h2>
            <p className="mt-2 text-zinc-600">
              Find juicy burgers layered with premium patties, sauces, and
              crunchy add-ons.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { name: "Classic Beef Burger", desc: "Grilled beef patty with lettuce and house sauce." },
                { name: "Chicken Crispy Burger", desc: "Crispy chicken fillet with spicy mayo." },
                { name: "Double Patty Burger", desc: "Two patties stacked with melting cheese." },
                { name: "Mushroom Melt Burger", desc: "Sauteed mushrooms with creamy cheese sauce." },
                { name: "Spicy Zinger Burger", desc: "Crunchy zinger fillet with hot chili spread." },
                { name: "BBQ Smash Burger", desc: "Smashed patty glazed in smoky BBQ sauce." },
              ].map((item, index) => (
                isFetchingData ? (
                  <SkeletonCard key={index} />
                ) : (
                  <FoodCard
                    key={item.name}
                    name={item.name}
                    desc={item.desc}
                    image="/burger.jpg"
                    imageFit="contain"
                    actionButton={
                      <button
                        onClick={() => handleAddToCart(item.name)}
                        disabled={!!loadingItem}
                        className="flex w-full items-center justify-center rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-zinc-900 transition hover:bg-yellow-300 disabled:opacity-70"
                      >
                        Add to Cart
                      </button>
                    }
                  />
                )
              ))}
            </div>
          </section>

          <hr className="my-6 border-zinc-300" />

          <section id="pasta" className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Pasta</h2>
            <p className="mt-2 text-zinc-600">
              Choose from creamy, spicy, and tomato-based pasta dishes made to
              order.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { name: "Alfredo Pasta", desc: "Creamy white sauce pasta with parmesan." },
                { name: "Arrabbiata Pasta", desc: "Spicy tomato sauce with garlic and herbs." },
                { name: "Pesto Pasta", desc: "Fresh basil pesto with roasted vegetables." },
                { name: "Chicken Penne", desc: "Penne tossed with grilled chicken in pink sauce." },
              ].map((item, index) => (
                isFetchingData ? (
                  <SkeletonCard key={index} />
                ) : (
                  <FoodCard
                    key={item.name}
                    name={item.name}
                    desc={item.desc}
                    image="/pasta.jpg"
                    imageFit="contain"
                    actionButton={
                      <button
                        onClick={() => handleAddToCart(item.name)}
                        disabled={!!loadingItem}
                        className="flex w-full items-center justify-center rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-zinc-900 transition hover:bg-yellow-300 disabled:opacity-70"
                      >
                        Add to Cart
                      </button>
                    }
                  />
                )
              ))}
            </div>
          </section>

          <hr className="my-6 border-zinc-300" />

          <section id="drinks" className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Drinks</h2>
            <p className="mt-2 text-zinc-600">
              Refresh your meal with chilled sodas, juices, and signature
              beverages.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { name: "Cola", desc: "Classic fizzy cola served ice cold." },
                { name: "Fresh Lime", desc: "Zesty lime cooler with mint and soda." },
                { name: "Iced Tea", desc: "Chilled tea with lemon and a hint of sweetness." },
                { name: "Mango Shake", desc: "Creamy mango shake made with fresh pulp." },
              ].map((item, index) => (
                isFetchingData ? (
                  <SkeletonCard key={index} />
                ) : (
                  <FoodCard
                    key={item.name}
                    name={item.name}
                    desc={item.desc}
                    image="/drinks.jpg"
                    imageFit="contain"
                    actionButton={
                      <button
                        onClick={() => handleAddToCart(item.name)}
                        disabled={!!loadingItem}
                        className="flex w-full items-center justify-center rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-zinc-900 transition hover:bg-yellow-300 disabled:opacity-70"
                      >
                        Add to Cart
                      </button>
                    }
                  />
                )
              ))}
            </div>
          </section>
        </main>

        <section
          className="bg-zinc-100 px-4 py-8 sm:px-6 md:px-8 transition-all duration-300"

        >
          <AccordionCard />
        </section>

        <footer className="footer footer-horizontal footer-center bg-zinc-900 text-white p-10 transition-all duration-300">
          <aside>
            <Image src={flavorRushLogo} alt="Flavor Rush logo" width={60} height={60} />
            <p className="font-bold text-lg">
              Flavor Rush
              <br />
              <span className="text-sm font-normal text-zinc-300">Mock Address: 123 Flavor Street, Foodie Block, Karachi, Pakistan - 75000</span>
            </p>
            <p className="mt-4 text-zinc-400">Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <nav className="mt-8">
            <div className="grid grid-flow-col gap-4">
              <a className="transition hover:text-yellow-400 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a className="transition hover:text-yellow-400 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a className="transition hover:text-yellow-400 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </nav>
        </footer>
      </SidebarInset>

      {isPlaceOrderModalOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsPlaceOrderModalOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="place-order-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h2 id="place-order-modal-title" className="text-xl font-bold text-zinc-900">
                Place Order
              </h2>
              <button
                type="button"
                onClick={() => setIsPlaceOrderModalOpen(false)}
                className="rounded-md px-2 py-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
              >
                x
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Order placed successfully for ${orderName}!`);
              setIsPlaceOrderModalOpen(false);
            }} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Category</label>
                <div className="mt-1 flex flex-wrap gap-4">
                  {["Pizza", "Pasta", "Burger", "Drinks"].map((cat) => (
                    <label key={cat} className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="category" value={cat} className="accent-yellow-400" checked={orderCategory === cat} onChange={() => {
                        setOrderCategory(cat);
                        setOrderFlavor("");
                        setOrderToppings([]);
                      }} />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Name</label>
                <input required type="text" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400" value={orderName} onChange={(e) => setOrderName(e.target.value)} />
              </div>

              {/* Flavors */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Flavor</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {(orderCategory === "Pizza" ? ["Margherita", "Pepperoni", "BBQ Chicken", "Veggie Supreme", "Fajita", "Cheese Lover"] :
                    orderCategory === "Pasta" ? ["Alfredo", "Arrabbiata", "Pesto", "Chicken Penne"] :
                      orderCategory === "Burger" ? ["Classic Beef", "Chicken Crispy", "Double Patty", "Mushroom Melt", "Spicy Zinger", "BBQ Smash"] :
                        ["Cola", "Fresh Lime", "Iced Tea", "Mango Shake"]).map((flavor) => (
                          <label key={flavor} className="flex items-center gap-1 cursor-pointer">
                            <input type="radio" name="flavor" value={flavor} className="accent-yellow-400" checked={orderFlavor === flavor} onChange={() => setOrderFlavor(flavor)} required />
                            <span className="text-sm">{flavor}</span>
                          </label>
                        ))}
                </div>
              </div>

              {/* Sizes */}
              {orderCategory === "Pizza" && (
                <div>
                  <label className="block text-sm font-semibold text-zinc-900">Size</label>
                  <input type="range" min="1" max="4" step="1" className="mt-2 w-full accent-yellow-400" value={orderPizzaSize} onChange={(e) => setOrderPizzaSize(parseInt(e.target.value))} />
                  <div className="flex justify-between text-xs text-zinc-500 font-medium">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                    <span>X-Large</span>
                  </div>
                </div>
              )}
              {orderCategory === "Drinks" && (
                <div>
                  <label className="block text-sm font-semibold text-zinc-900">Size</label>
                  <input type="range" min="1" max="3" step="1" className="mt-2 w-full accent-yellow-400" value={orderDrinkSize} onChange={(e) => setOrderDrinkSize(parseInt(e.target.value))} />
                  <div className="flex justify-between text-xs text-zinc-500 font-medium">
                    <span>Regular</span>
                    <span>Half Liter</span>
                    <span>1.5 Liter</span>
                  </div>
                </div>
              )}

              {/* Toppings */}
              {(orderCategory === "Pizza" || orderCategory === "Pasta") && (
                <div>
                  <label className="block text-sm font-semibold text-zinc-900">Toppings</label>
                  <div className="mt-1 flex flex-wrap gap-3">
                    {["Extra Cheese", "Olives", "Mushrooms", "Jalapenos", "Bell Peppers"].map((topping) => (
                      <label key={topping} className="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" className="accent-yellow-400" checked={orderToppings.includes(topping)} onChange={(e) => {
                          if (e.target.checked) setOrderToppings([...orderToppings, topping]);
                          else setOrderToppings(orderToppings.filter(t => t !== topping));
                        }} />
                        <span className="text-sm">{topping}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Quantity</label>
                <input required type="number" min="1" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400" value={orderQuantity} onChange={(e) => setOrderQuantity(parseInt(e.target.value))} />
              </div>

              {/* Fast Delivery */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer w-max">
                  <div className="relative">
                    <input type="checkbox" className="peer sr-only" checked={orderFastDelivery} onChange={(e) => setOrderFastDelivery(e.target.checked)} />
                    <div className="h-6 w-11 rounded-full bg-zinc-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-400"></div>
                  </div>
                  <span className="text-sm font-semibold text-zinc-900">Fast Delivery</span>
                </label>
                {orderFastDelivery && (
                  <p className="mt-1 text-xs text-red-600 font-medium">It will add 50 extra Rupees to the bill.</p>
                )}
              </div>

              {/* Suggestions */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Any Suggestions</label>
                <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400" rows={3} value={orderSuggestions} onChange={(e) => setOrderSuggestions(e.target.value)}></textarea>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button type="button" onClick={() => setIsPlaceOrderModalOpen(false)} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-yellow-300">Submit Order</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isFutureBookingModalOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsFutureBookingModalOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="future-booking-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h2 id="future-booking-modal-title" className="text-xl font-bold text-zinc-900">
                Future Booking
              </h2>
              <button
                type="button"
                onClick={() => setIsFutureBookingModalOpen(false)}
                className="rounded-md px-2 py-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
              >
                x
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Future booking set successfully for ${bookingDate}!`);
              setIsFutureBookingModalOpen(false);
            }} className="space-y-4">

              {/* Date & Time Picker */}
              <div className="rounded-lg bg-orange-50 p-4 border border-orange-200">
                <label className="block text-sm font-bold text-orange-900 mb-2">Select Date &amp; Time for Booking</label>
                <input required type="datetime-local" className="w-full rounded-md border border-orange-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Category</label>
                <div className="mt-1 flex flex-wrap gap-4">
                  {["Pizza", "Pasta", "Burger", "Drinks"].map((cat) => (
                    <label key={cat} className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="category" value={cat} className="accent-orange-400" checked={orderCategory === cat} onChange={() => {
                        setOrderCategory(cat);
                        setOrderFlavor("");
                        setOrderToppings([]);
                      }} />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Name</label>
                <input required type="text" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" value={orderName} onChange={(e) => setOrderName(e.target.value)} />
              </div>

              {/* Flavors */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Flavor</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {(orderCategory === "Pizza" ? ["Margherita", "Pepperoni", "BBQ Chicken", "Veggie Supreme", "Fajita", "Cheese Lover"] :
                    orderCategory === "Pasta" ? ["Alfredo", "Arrabbiata", "Pesto", "Chicken Penne"] :
                      orderCategory === "Burger" ? ["Classic Beef", "Chicken Crispy", "Double Patty", "Mushroom Melt", "Spicy Zinger", "BBQ Smash"] :
                        ["Cola", "Fresh Lime", "Iced Tea", "Mango Shake"]).map((flavor) => (
                          <label key={flavor} className="flex items-center gap-1 cursor-pointer">
                            <input type="radio" name="flavor" value={flavor} className="accent-orange-400" checked={orderFlavor === flavor} onChange={() => setOrderFlavor(flavor)} required />
                            <span className="text-sm">{flavor}</span>
                          </label>
                        ))}
                </div>
              </div>

              {/* Sizes */}
              {orderCategory === "Pizza" && (
                <div>
                  <label className="block text-sm font-semibold text-zinc-900">Size</label>
                  <input type="range" min="1" max="4" step="1" className="mt-2 w-full accent-orange-400" value={orderPizzaSize} onChange={(e) => setOrderPizzaSize(parseInt(e.target.value))} />
                  <div className="flex justify-between text-xs text-zinc-500 font-medium">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                    <span>X-Large</span>
                  </div>
                </div>
              )}
              {orderCategory === "Drinks" && (
                <div>
                  <label className="block text-sm font-semibold text-zinc-900">Size</label>
                  <input type="range" min="1" max="3" step="1" className="mt-2 w-full accent-orange-400" value={orderDrinkSize} onChange={(e) => setOrderDrinkSize(parseInt(e.target.value))} />
                  <div className="flex justify-between text-xs text-zinc-500 font-medium">
                    <span>Regular</span>
                    <span>Half Liter</span>
                    <span>1.5 Liter</span>
                  </div>
                </div>
              )}

              {/* Toppings */}
              {(orderCategory === "Pizza" || orderCategory === "Pasta") && (
                <div>
                  <label className="block text-sm font-semibold text-zinc-900">Toppings</label>
                  <div className="mt-1 flex flex-wrap gap-3">
                    {["Extra Cheese", "Olives", "Mushrooms", "Jalapenos", "Bell Peppers"].map((topping) => (
                      <label key={topping} className="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" className="accent-orange-400" checked={orderToppings.includes(topping)} onChange={(e) => {
                          if (e.target.checked) setOrderToppings([...orderToppings, topping]);
                          else setOrderToppings(orderToppings.filter(t => t !== topping));
                        }} />
                        <span className="text-sm">{topping}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Quantity</label>
                <input required type="number" min="1" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" value={orderQuantity} onChange={(e) => setOrderQuantity(parseInt(e.target.value))} />
              </div>

              {/* Fast Delivery */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer w-max">
                  <div className="relative">
                    <input type="checkbox" className="peer sr-only" checked={orderFastDelivery} onChange={(e) => setOrderFastDelivery(e.target.checked)} />
                    <div className="h-6 w-11 rounded-full bg-zinc-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-400"></div>
                  </div>
                  <span className="text-sm font-semibold text-zinc-900">Fast Delivery</span>
                </label>
                {orderFastDelivery && (
                  <p className="mt-1 text-xs text-red-600 font-medium">It will add 50 extra Rupees to the bill.</p>
                )}
              </div>

              {/* Suggestions */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Any Suggestions</label>
                <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400" rows={3} value={orderSuggestions} onChange={(e) => setOrderSuggestions(e.target.value)}></textarea>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button type="button" onClick={() => setIsFutureBookingModalOpen(false)} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-orange-400 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-orange-300">Book Order</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isProfileModalOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h2 id="profile-modal-title" className="text-xl font-bold text-zinc-900">
                Profile Info
              </h2>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="rounded-md px-2 py-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                aria-label="Close profile modal"
              >
                x
              </button>
            </div>

            <div className="space-y-2 text-sm text-zinc-700">
              <p>
                <span className="font-semibold text-zinc-900">Name:</span> Alex Khan
              </p>
              <p>
                <span className="font-semibold text-zinc-900">Email:</span>{" "}
                alex.khan@example.com
              </p>
              <p>
                <span className="font-semibold text-zinc-900">Phone:</span>{" "}
                +92 300 1234567
              </p>
              <p>
                <span className="font-semibold text-zinc-900">Address:</span>{" "}
                123 Flavor Street, Karachi
              </p>
              <p>
                <span className="font-semibold text-zinc-900">Member Since:</span>{" "}
                Jan 2025
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {loadingItem && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm transition-all duration-300">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-2xl">
            <svg className="h-10 w-10 animate-spin text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg font-semibold text-zinc-900">Adding to cart...</p>
            <p className="text-sm text-zinc-500">{loadingItem}</p>
          </div>
        </div>
      )}

      {isRegisterModalOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsRegisterModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="register-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h2 id="register-modal-title" className="text-xl font-bold text-zinc-900">
                Register
              </h2>
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                className="rounded-md px-2 py-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                aria-label="Close register modal"
              >
                x
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Registered successfully as ${registerName}!`);
                setIsRegisterModalOpen(false);
                setRegisterName("");
                setRegisterEmail("");
                setRegisterPassword("");
                setRegisterFile(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-zinc-900">Name</label>
                <input
                  required
                  type="text"
                  className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900">Email</label>
                <input
                  required
                  type="email"
                  className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900">Password</label>
                <input
                  required
                  type="password"
                  className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-zinc-500 file:mr-4 file:rounded-md file:border-0 file:bg-yellow-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-900 hover:file:bg-yellow-300"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setRegisterFile(e.target.files[0]);
                    }
                  }}
                />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Chat Window backdrop — closes on outside click */}
      {isChatOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsChatOpen(false)} />
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl border border-zinc-200"
          style={{ width: 'min(320px, calc(100vw - 2rem))', height: 'min(384px, calc(100vh - 160px))' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between bg-yellow-400 px-4 py-3 shrink-0">
            <h3 className="font-bold text-zinc-900">Helper Assistant</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-zinc-700 hover:text-zinc-900 transition">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-yellow-400 text-zinc-900 rounded-tr-none' : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendChatMessage} className="flex border-t border-zinc-200 bg-white p-2 shrink-0">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-l-lg border border-zinc-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
            />
            <button type="submit" className="rounded-r-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800">
              Send
            </button>
          </form>
        </div>
      )}

      {/* Helper Assistant Floating Button */}
      <button
        type="button"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-yellow-400 shadow-lg transition-transform hover:scale-105 hover:bg-yellow-300 active:scale-95"
        aria-label="Helper Assistant"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Promotional Toast Notification */}
      <div className={`fixed bottom-24 right-6 z-50 w-full max-w-[300px] rounded-xl bg-zinc-900 p-4 shadow-2xl transition-all duration-500 ease-out sm:max-w-sm ${activePromotion ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">Special Offer!</h4>
            <p className="mt-1 text-sm text-zinc-200 font-medium">{activePromotion}</p>
          </div>
          <button
            onClick={() => setActivePromotion(null)}
            className="flex-shrink-0 text-zinc-400 hover:text-white transition cursor-pointer"
            aria-label="Close promotion"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </SidebarProvider>
  );
}
