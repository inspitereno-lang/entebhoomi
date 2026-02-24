import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Plus,
  Minus,
  Heart,
  ArrowRight,
  Clock,
  ShoppingBag,
  Cake,
  Cherry,
  Home,
  Flame,
  Coffee
} from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import { Button } from '../components/ui/button.jsx';
import { toast } from '../components/ui/sonner';
import { normalizeImageUrl } from '../utils/utils.js';
import api from '../api/axios';
import LandownerSection from '../components/LandownerSection';

export default function HomePage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [banners, setBanners] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist, cart, updateQuantity, isLoggedIn, isRegistered } = useStore();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        let token = localStorage.getItem('token');

        // If no token exists, get a guest token
        if (!token) {
          try {
            const guestResponse = await api.post('/user/guest');
            const guestResult = guestResponse.data;

            if (guestResult.success && guestResult.token) {
              token = guestResult.token;
              localStorage.setItem('token', token);
              localStorage.setItem('tokenType', 'guest');
            }
          } catch (guestError) {
            console.error('Error fetching guest token:', guestError);
          }
        }

        const response = await api.post('/stores/home', {});
        const result = response.data;
        if (result.success) {
          setBanners(result.data.banners || []);
          setCategoriesData(result.data.categories || []);
          // Normalize featured products to ensure we have consistent access to IDs
          const normalizedFeatured = (result.data.products || []).slice(0, 4).map(p => ({
            ...p,
            id: p._id || p.id,
            name: p.name || p.productName || 'Unnamed Product',
            image: normalizeImageUrl(p.image || (p.images && p.images.length > 0 ? p.images[0] : null)),
            category: p.categoryName || p.category?.name || p.category?.categoryName || p.category || 'Uncategorized',
            shop: p.storeName || p.storeId?.storeName || p.storeId?.businessName || p.storeDetails?.storeName || p.shop || 'Unknown Store',
            stock: p.quantity !== undefined ? p.quantity : 0
          }));
          setFeaturedProducts(normalizedFeatured);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
        toast.error('Failed to load home page content');
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentSlide, banners.length]);

  const nextSlide = () => {
    if (isAnimating || banners.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating || banners.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleAddToCart = (product) => {
    if (!isRegistered) {
      toast.error('Please login to add to cart');
      navigate('/login');
      return;
    }
    addToCart(product, 1);
  };

  const getProductQuantity = (productId) => {
    const cartItem = cart.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleToggleWishlist = (product) => {
    if (!isRegistered) {
      toast('Please login to add to wishlist');
      navigate('/login');
      return;
    }
    toggleWishlist(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5bab00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden w-full px-4 pt-6 lg:px-10">
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-cover bg-center shadow-lg relative min-h-[500px] flex items-center"
          style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeDr3mgyuXM14yCKYTq1jViRSOvLCRFC1r3XNzvf0gi8bJhaYW0Hekh-o6ea16CrDYJafiLpIh48ZUgdYKDz3s-1a4ThaMFJXlP6y1d6oV-gsR_0VBSvi37VLBCDqkBgU5nRaCgZVBCSZnZK7SF2KUur0m6ULBMpDUtpmbCwZyBt0G7Svle7T16KscW3LjbU69ExoiuubFyt44OQfhlgY7tWY6RV1ARHLYp-NHHVXsSDMd_PyF6UX-sAPCrMyXLOOlnHwtPSvYGucw')" }}
        >
          <div className="relative z-10 flex flex-col gap-6 p-8 md:p-16 max-w-3xl">
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl tracking-tight drop-shadow-sm">
              Pure, Fresh, from <span className="text-[#dceacd]">Ente Bhoomi</span>
            </h1>
            <p className="text-lg font-medium text-white/90 md:text-xl max-w-xl drop-shadow-sm">
              Connecting you with nature's finest agricultural products directly from the heart of Kerala's soil.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate('/products')}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#5bab00] px-8 text-base font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-[#4a8a00]"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-[#151d0c] mb-8 tracking-tight md:text-3xl">Shop by Category</h2>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {categoriesData.map((category, index) => {
              return (
                <button
                  key={category._id}
                  onClick={() => navigate(`/products?categoryId=${category._id}`)}
                  className="flex flex-col items-center gap-3 group flex-shrink-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-24 h-24 rounded-2xl bg-white border border-[#eef4e6] overflow-hidden transition-all duration-300 group-hover:bg-[#f1f7e8] group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#5bab00]/10">
                    <img
                      src={normalizeImageUrl(category.image)}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/product-placeholder.png';
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#4b5f3e] group-hover:text-[#5bab00] transition-colors">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-[#151d0c] md:text-3xl">Products</h2>
            <button
              onClick={() => navigate('/products')}
              className="group hidden sm:flex items-center gap-2 rounded-xl bg-[#5bab00]/10 px-6 py-2.5 text-sm font-bold text-[#5bab00] hover:bg-[#5bab00] hover:text-white transition-all hover:shadow-md"
            >
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product, index) => {
              const quantity = getProductQuantity(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group flex flex-col gap-3 rounded-xl bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md border border-[#eef4e6] cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image || '/product-placeholder.png'}
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/product-placeholder.png';
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.stock <= 0 ? (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-white/90 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          Out of Stock
                        </span>
                      </div>
                    ) : product.stock < 10 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold border border-red-200 shadow-sm animate-pulse">
                          Only {product.stock} left!
                        </span>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FFF3ED] transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${isInWishlist(product.id)
                          ? 'fill-[#E85A24] text-[#E85A24]'
                          : 'text-[#666666]'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1 px-1 mt-2">
                    <h3
                      className="text-lg font-semibold text-[#151d0c] line-clamp-1 cursor-pointer hover:text-[#5bab00] transition-colors"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#4b5f3e] line-clamp-1">
                        {product.unit || "Premium Quality"}
                      </p>
                      <p className="font-bold text-[#5bab00]">₹{product.price}</p>
                    </div>

                    {isRegistered && quantity > 0 ? (
                      <div className="mt-2 flex items-center justify-between bg-[#F5F5F5] rounded-lg p-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateQuantity(product.id, quantity - 1);
                          }}
                          className="w-8 h-8 bg-white rounded-md flex items-center justify-center hover:bg-[#eef4e6] transition-colors shadow-sm"
                        >
                          <Minus className="w-4 h-4 text-[#5bab00]" />
                        </button>
                        <span className="font-bold text-[#151d0c] text-sm">
                          {quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateQuantity(product.id, quantity + 1);
                          }}
                          className="w-8 h-8 bg-white rounded-md flex items-center justify-center hover:bg-[#eef4e6] transition-colors shadow-sm"
                        >
                          <Plus className="w-4 h-4 text-[#5bab00]" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={product.stock <= 0}
                        className="mt-2 w-full rounded-lg bg-[#eef4e6] py-2 text-sm font-bold text-[#5bab00] hover:bg-[#5bab00] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Button
              onClick={() => navigate('/products')}
              variant="outline"
              className="border-[#5bab00] text-[#5bab00] hover:bg-[#f1f7e8]"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <LandownerSection />



    </div>
  );
}
