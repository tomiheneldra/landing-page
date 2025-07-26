import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { type Product, type ContactMessage, type InsertProduct } from "@shared/schema";
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Users, 
  MessageSquare, 
  Eye, 
  Package,
  TrendingUp,
  Bot 
} from "lucide-react";

export default function AdminDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<InsertProduct>({
    name: '',
    description: '',
    price: '',
    features: [],
    isActive: true,
    isPopular: false,
    icon: 'fas fa-robot',
    order: 0
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    retry: false,
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/messages"],
    retry: false,
  });

  const createProductMutation = useMutation({
    mutationFn: async (product: InsertProduct) => {
      await apiRequest('POST', '/api/admin/products', product);
    },
    onSuccess: () => {
      toast({
        title: "Produk Berhasil Ditambahkan",
        description: "Produk baru telah berhasil ditambahkan ke daftar.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setProductDialogOpen(false);
      resetProductForm();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Gagal Menambahkan Produk",
        description: "Terjadi kesalahan saat menambahkan produk.",
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, product }: { id: string; product: Partial<InsertProduct> }) => {
      await apiRequest('PUT', `/api/admin/products/${id}`, product);
    },
    onSuccess: () => {
      toast({
        title: "Produk Berhasil Diperbarui",
        description: "Perubahan produk telah berhasil disimpan.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setProductDialogOpen(false);
      resetProductForm();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Gagal Memperbarui Produk",
        description: "Terjadi kesalahan saat memperbarui produk.",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/products/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Produk Berhasil Dihapus",
        description: "Produk telah berhasil dihapus dari daftar.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Gagal Menghapus Produk",
        description: "Terjadi kesalahan saat menghapus produk.",
        variant: "destructive",
      });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('PUT', `/api/admin/messages/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/messages'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
    },
  });

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      features: [],
      isActive: true,
      isPopular: false,
      icon: 'fas fa-robot',
      order: 0
    });
    setEditingProduct(null);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, product: productForm });
    } else {
      createProductMutation.mutate(productForm);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      isActive: product.isActive,
      isPopular: product.isPopular,
      icon: product.icon,
      order: product.order
    });
    setProductDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleFeatureChange = (value: string) => {
    const features = value.split('\n').filter(f => f.trim());
    setProductForm(prev => ({ ...prev, features }));
  };

  const unreadMessages = messages.filter(m => !m.isRead);
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.isActive).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-space-black flex items-center justify-center">
        <div className="text-center">
          <Bot className="mx-auto text-6xl text-electric-blue mb-4 animate-pulse" />
          <p className="text-xl text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-space-black text-white">
      {/* Navigation */}
      <nav className="bg-dark-charcoal border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyber-green rounded-lg flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Dashboard - Tomy Stark Diamond</h1>
          </div>
          <Button
            onClick={() => window.location.href = '/api/logout'}
            variant="outline"
            className="text-gray-300 hover:text-white border-gray-600 hover:border-gray-500"
          >
            <LogOut className="mr-2" size={16} />
            Logout
          </Button>
        </div>
      </nav>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-300 text-sm">Total Produk</h3>
                  <p className="text-3xl font-bold text-white">{totalProducts}</p>
                </div>
                <Package className="text-electric-blue" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-300 text-sm">Produk Aktif</h3>
                  <p className="text-3xl font-bold text-white">{activeProducts}</p>
                </div>
                <TrendingUp className="text-cyber-green" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-300 text-sm">Pesan Masuk</h3>
                  <p className="text-3xl font-bold text-white">{messages.length}</p>
                </div>
                <MessageSquare className="text-electric-blue" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-300 text-sm">Belum Dibaca</h3>
                  <p className="text-3xl font-bold text-white">{unreadMessages.length}</p>
                </div>
                <Eye className="text-yellow-500" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Management */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Manajemen Produk</CardTitle>
                <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={resetProductForm}
                      className="bg-cyber-green hover:bg-green-600 text-white"
                    >
                      <Plus className="mr-2" size={16} />
                      Tambah Produk
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-dark-charcoal border-gray-700 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div>
                        <Label className="text-gray-300">Nama Produk</Label>
                        <Input
                          value={productForm.name}
                          onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="mt-1 bg-space-black border-gray-600 text-white"
                          placeholder="Nama produk"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Deskripsi</Label>
                        <Textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                          required
                          className="mt-1 bg-space-black border-gray-600 text-white"
                          placeholder="Deskripsi produk"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Harga</Label>
                          <Input
                            value={productForm.price}
                            onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                            required
                            className="mt-1 bg-space-black border-gray-600 text-white"
                            placeholder="Rp 1.500.000"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Urutan</Label>
                          <Input
                            type="number"
                            value={productForm.order}
                            onChange={(e) => setProductForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                            className="mt-1 bg-space-black border-gray-600 text-white"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300">Icon (FontAwesome Class)</Label>
                        <Input
                          value={productForm.icon}
                          onChange={(e) => setProductForm(prev => ({ ...prev, icon: e.target.value }))}
                          className="mt-1 bg-space-black border-gray-600 text-white"
                          placeholder="fas fa-robot"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Fitur (satu per baris)</Label>
                        <Textarea
                          value={productForm.features.join('\n')}
                          onChange={(e) => handleFeatureChange(e.target.value)}
                          className="mt-1 bg-space-black border-gray-600 text-white"
                          placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
                          rows={4}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={productForm.isActive}
                            onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, isActive: checked }))}
                          />
                          <Label className="text-gray-300">Aktif</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={productForm.isPopular}
                            onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, isPopular: checked }))}
                          />
                          <Label className="text-gray-300">Popular</Label>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button 
                          type="submit" 
                          disabled={createProductMutation.isPending || updateProductMutation.isPending}
                          className="bg-gradient-to-r from-electric-blue to-cyber-green hover:from-blue-600 hover:to-green-600 text-white"
                        >
                          {editingProduct ? 'Update' : 'Tambah'} Produk
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setProductDialogOpen(false)}
                          className="border-gray-600 text-gray-300 hover:text-white"
                        >
                          Batal
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {productsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue mx-auto"></div>
                    <p className="text-gray-400 mt-2">Loading products...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto text-4xl text-gray-600 mb-2" />
                    <p className="text-gray-400">Belum ada produk</p>
                  </div>
                ) : (
                  products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-space-black rounded-lg border border-gray-700">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{product.name}</h4>
                          {product.isPopular && (
                            <span className="bg-electric-blue/20 text-electric-blue px-2 py-1 rounded-full text-xs">
                              Popular
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            product.isActive ? 'bg-cyber-green/20 text-cyber-green' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {product.isActive ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                          className="border-gray-600 text-electric-blue hover:text-blue-400"
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="border-gray-600 text-red-500 hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Pesan Kontak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messagesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue mx-auto"></div>
                    <p className="text-gray-400 mt-2">Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto text-4xl text-gray-600 mb-2" />
                    <p className="text-gray-400">Belum ada pesan</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className={`p-4 rounded-lg border ${
                      message.isRead ? 'bg-space-black border-gray-700' : 'bg-electric-blue/10 border-electric-blue/30'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{message.name}</h4>
                          <p className="text-sm text-gray-400">{message.email}</p>
                        </div>
                        {!message.isRead && (
                          <Button
                            size="sm"
                            onClick={() => markAsReadMutation.mutate(message.id)}
                            className="bg-electric-blue hover:bg-blue-600 text-white"
                          >
                            Mark Read
                          </Button>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{message.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(message.createdAt!).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
