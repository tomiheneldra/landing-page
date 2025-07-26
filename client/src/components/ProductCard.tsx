import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Product } from "@shared/schema";
import { MessageSquare, CheckCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
}

export function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const whatsappLink = `https://wa.me/6285182477867?text=${encodeURIComponent(`Halo, saya ingin pesan ${product.name}`)}`;

  return (
    <Card className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-gray-700 hover:border-electric-blue/50 transition-all transform hover:scale-105 relative ${product.isPopular ? 'ring-2 ring-electric-blue/50' : ''}`}>
      {product.isPopular && (
        <div className="absolute -top-3 left-6">
          <span className="bg-gradient-to-r from-electric-blue to-cyber-green text-white px-3 py-1 rounded-full text-sm font-semibold">
            POPULAR
          </span>
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">{product.name}</h3>
          <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyber-green rounded-lg flex items-center justify-center">
            <i className={`${product.icon} text-white`}></i>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6">{product.description}</p>
        
        <div className="mb-6">
          <span className="text-3xl font-bold gradient-text">{product.price}</span>
          <span className="text-gray-400 ml-2">/ setup</span>
        </div>
        
        <ul className="text-gray-300 mb-6 space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-cyber-green mr-2 mt-0.5 flex-shrink-0" size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all text-center block ${
            product.isPopular
              ? 'bg-gradient-to-r from-electric-blue to-cyber-green hover:from-blue-600 hover:to-green-600 text-white'
              : 'bg-cyber-green hover:bg-green-600 text-white'
          }`}
        >
          <MessageSquare className="inline mr-2" size={16} />
          Pesan via WhatsApp
        </a>
      </CardContent>
    </Card>
  );
}
