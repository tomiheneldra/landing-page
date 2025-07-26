import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductCard } from "@/components/ProductCard";
import { ContactForm } from "@/components/ContactForm";
import { type Product } from "@shared/schema";
import { 
  Bot, 
  MessageSquare, 
  Plug, 
  Bell, 
  Settings, 
  Menu, 
  X,
  Star,
  User,
  Phone,
  Instagram,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const whatsappNumber = "+6285182477867";
  const whatsappLink = (message: string) => 
    `https://wa.me/6285182477867?text=${encodeURIComponent(message)}`;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-space-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-space-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyber-green rounded-lg flex items-center justify-center">
                <Bot className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold gradient-text">
                Tomy Stark Diamond
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('beranda')} 
                className="text-gray-300 hover:text-electric-blue transition-colors"
              >
                Beranda
              </button>
              <button 
                onClick={() => scrollToSection('fitur')} 
                className="text-gray-300 hover:text-electric-blue transition-colors"
              >
                Fitur
              </button>
              <button 
                onClick={() => scrollToSection('produk')} 
                className="text-gray-300 hover:text-electric-blue transition-colors"
              >
                Produk
              </button>
              <button 
                onClick={() => scrollToSection('tentang')} 
                className="text-gray-300 hover:text-electric-blue transition-colors"
              >
                Tentang
              </button>
              <button 
                onClick={() => scrollToSection('kontak')} 
                className="text-gray-300 hover:text-electric-blue transition-colors"
              >
                Kontak
              </button>
              <a 
                href={whatsappLink("Halo, saya ingin konsultasi tentang jasa bot")}
                className="bg-cyber-green hover:bg-green-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare size={16} />
                WhatsApp
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-charcoal border-t border-gray-800">
            <div className="px-4 py-3 space-y-3">
              <button 
                onClick={() => scrollToSection('beranda')} 
                className="block text-gray-300 hover:text-electric-blue transition-colors w-full text-left"
              >
                Beranda
              </button>
              <button 
                onClick={() => scrollToSection('fitur')} 
                className="block text-gray-300 hover:text-electric-blue transition-colors w-full text-left"
              >
                Fitur
              </button>
              <button 
                onClick={() => scrollToSection('produk')} 
                className="block text-gray-300 hover:text-electric-blue transition-colors w-full text-left"
              >
                Produk
              </button>
              <button 
                onClick={() => scrollToSection('tentang')} 
                className="block text-gray-300 hover:text-electric-blue transition-colors w-full text-left"
              >
                Tentang
              </button>
              <button 
                onClick={() => scrollToSection('kontak')} 
                className="block text-gray-300 hover:text-electric-blue transition-colors w-full text-left"
              >
                Kontak
              </button>
              <a 
                href={whatsappLink("Halo, saya ingin konsultasi tentang jasa bot")}
                className="block bg-cyber-green hover:bg-green-600 px-4 py-2 rounded-lg transition-colors text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="inline mr-2" size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="pt-24 pb-16 bg-gradient-to-br from-space-black via-dark-charcoal to-space-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="gradient-text">
                  Jasa Pembuatan Bot
                </span>
                <br />
                <span className="text-white">Topup Otomatis</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Integrasi bot WhatsApp dan Telegram ke berbagai layanan topup API sesuai kebutuhan Anda. 
                Automatisasi transaksi yang efisien dan handal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href={whatsappLink("Halo, saya ingin pesan bot topup otomatis")}
                  className="bg-cyber-green hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-cyber-green/25 inline-flex items-center justify-center gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare size={20} />
                  Pesan via WhatsApp
                </a>
                <button 
                  onClick={() => scrollToSection('produk')}
                  className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                >
                  Lihat Produk
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-96 h-96 bg-gradient-to-br from-electric-blue/20 to-cyber-green/20 rounded-3xl p-8 backdrop-blur-sm border border-gray-700 animate-float">
                <div className="w-full h-full bg-gradient-to-br from-dark-charcoal to-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <Bot className="text-8xl text-electric-blue animate-glow" />
                  <div className="absolute top-4 right-4 w-3 h-3 bg-cyber-green rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-electric-blue rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 left-4 w-1 h-8 bg-gradient-to-b from-electric-blue to-transparent rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-20 bg-dark-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">
                Fitur Layanan Kami
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Solusi bot automation terlengkap untuk berbagai kebutuhan bisnis topup dan transaksi digital
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-electric-blue/50 transition-all transform hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-cyber-green rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Bot WhatsApp & Telegram</h3>
                <p className="text-gray-300">Pembuatan bot untuk platform WhatsApp dan Telegram dengan interface yang user-friendly</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-electric-blue/50 transition-all transform hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-cyber-green rounded-xl flex items-center justify-center mb-4">
                  <Plug className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Integrasi Multi-API</h3>
                <p className="text-gray-300">Koneksi ke Digiflazz, Tokovoucher, VocaGame, TopupKuy, Kiosgamer dan API lainnya</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-electric-blue/50 transition-all transform hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-cyber-green rounded-xl flex items-center justify-center mb-4">
                  <Bell className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Notifikasi Real-time</h3>
                <p className="text-gray-300">Sistem notifikasi otomatis dan auto-check status transaksi secara real-time</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-electric-blue/50 transition-all transform hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-cyber-green rounded-xl flex items-center justify-center mb-4">
                  <Settings className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Custom Flow Bisnis</h3>
                <p className="text-gray-300">Kustomisasi sesuai alur bisnis dan kebutuhan spesifik klien</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" className="py-20 bg-space-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">
                Daftar Produk & Layanan
              </span>
            </h2>
            <p className="text-xl text-gray-300">Pilih paket yang sesuai dengan kebutuhan bisnis Anda</p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 animate-pulse">
                  <div className="h-8 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-6"></div>
                  <div className="h-6 bg-gray-700 rounded mb-6"></div>
                  <div className="space-y-2 mb-6">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-4 bg-gray-700 rounded"></div>
                    ))}
                  </div>
                  <div className="h-12 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />
              ))}
            </div>
          )}

          {!isLoading && products.length === 0 && (
            <div className="text-center py-12">
              <Bot className="mx-auto text-6xl text-gray-600 mb-4" />
              <p className="text-xl text-gray-400">Belum ada produk yang tersedia</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-20 bg-dark-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="gradient-text">
                  Tentang Kami
                </span>
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Saya <strong className="text-white">Tomi Heneldra</strong>, seorang developer berpengalaman yang 
                  fokus pada pengembangan bot automation untuk berbagai platform messaging dan integrasi API.
                </p>
                <p>
                  Dengan pengalaman lebih dari 5 tahun di bidang automation dan bot development, 
                  saya telah membantu ratusan klien mengotomatisasi proses bisnis mereka melalui 
                  bot WhatsApp dan Telegram yang handal.
                </p>
                <Card className="bg-gradient-to-r from-electric-blue/10 to-cyber-green/10 border-electric-blue/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Mengapa Memilih Layanan Kami?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Star className="text-cyber-green mr-3 mt-1 flex-shrink-0" size={16} />
                        <span>Pengalaman 5+ tahun dalam bot development</span>
                      </li>
                      <li className="flex items-start">
                        <Star className="text-cyber-green mr-3 mt-1 flex-shrink-0" size={16} />
                        <span>Support 24/7 dan maintenance berkala</span>
                      </li>
                      <li className="flex items-start">
                        <Star className="text-cyber-green mr-3 mt-1 flex-shrink-0" size={16} />
                        <span>Kustomisasi sesuai kebutuhan bisnis</span>
                      </li>
                      <li className="flex items-start">
                        <Star className="text-cyber-green mr-3 mt-1 flex-shrink-0" size={16} />
                        <span>Integrasi dengan berbagai API provider</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="w-full h-96 bg-gradient-to-br from-electric-blue/20 to-cyber-green/20 rounded-2xl border border-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <User className="mx-auto text-8xl text-electric-blue mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Tomi Heneldra</h3>
                    <p className="text-gray-300">Bot Developer Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 bg-space-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">
                Hubungi Kami
              </span>
            </h2>
            <p className="text-xl text-gray-300">Siap membantu mewujudkan automasi bisnis Anda</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />
            
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Informasi Kontak</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyber-green rounded-lg flex items-center justify-center mr-4">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-300">Owner</p>
                        <p className="text-white font-semibold">Tomi Heneldra</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyber-green rounded-lg flex items-center justify-center mr-4">
                        <MessageSquare className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-300">WhatsApp</p>
                        <a href={`https://wa.me/6285182477867`} className="text-cyber-green font-semibold hover:text-green-400">
                          +62 851 8247 7867
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyber-green rounded-lg flex items-center justify-center mr-4">
                        <Instagram className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-300">Instagram</p>
                        <a href="https://instagram.com/tomiheneldra" className="text-cyber-green font-semibold hover:text-green-400" target="_blank" rel="noopener noreferrer">
                          @tomiheneldra
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Contact Buttons */}
              <div className="space-y-4">
                <a 
                  href={whatsappLink("Halo, saya ingin konsultasi gratis tentang bot")}
                  className="w-full bg-cyber-green hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold transition-all text-center block text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="inline mr-3" size={20} />
                  Konsultasi Gratis via WhatsApp
                </a>
                <a 
                  href="https://instagram.com/tomiheneldra"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all text-center block text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="inline mr-3" size={20} />
                  Follow Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-charcoal border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyber-green rounded-lg flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold gradient-text">
                  Tomy Stark Diamond
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Solusi automasi bot terpercaya untuk berbagai kebutuhan bisnis digital dan topup otomatis.
              </p>
              <div className="flex space-x-4">
                <a href={`https://wa.me/6285182477867`} className="text-gray-400 hover:text-cyber-green transition-colors">
                  <MessageSquare size={24} />
                </a>
                <a href="https://instagram.com/tomiheneldra" className="text-gray-400 hover:text-cyber-green transition-colors" target="_blank" rel="noopener noreferrer">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => scrollToSection('produk')} className="hover:text-electric-blue transition-colors">Bot WhatsApp</button></li>
                <li><button onClick={() => scrollToSection('produk')} className="hover:text-electric-blue transition-colors">Bot Telegram</button></li>
                <li><button onClick={() => scrollToSection('produk')} className="hover:text-electric-blue transition-colors">API Integration</button></li>
                <li><button onClick={() => scrollToSection('produk')} className="hover:text-electric-blue transition-colors">Custom Development</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Owner: Tomi Heneldra</li>
                <li>WhatsApp: +62 851 8247 7867</li>
                <li>Instagram: @tomiheneldra</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Tomy Stark Diamond. All rights reserved. 
              <span className="text-cyber-green ml-1">Powered by React & Express</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
