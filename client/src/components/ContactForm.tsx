import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Send } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Pesan Terkirim!",
        description: "Terima kasih, pesan Anda telah berhasil dikirim. Kami akan merespons segera.",
      });
      setFormData({ name: '', email: '', message: '' });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/messages'] });
    },
    onError: (error) => {
      toast({
        title: "Gagal Mengirim Pesan",
        description: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
      console.error('Contact form error:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang diperlukan.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold mb-6 text-white">Kirim Pesan</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-gray-300 font-medium">Nama Lengkap</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 bg-dark-charcoal border-gray-600 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-electric-blue/25"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
          <div>
            <Label className="text-gray-300 font-medium">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 bg-dark-charcoal border-gray-600 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-electric-blue/25"
              placeholder="email@contoh.com"
            />
          </div>
          <div>
            <Label className="text-gray-300 font-medium">Pesan</Label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="mt-2 bg-dark-charcoal border-gray-600 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-electric-blue/25 resize-none"
              placeholder="Ceritakan kebutuhan bot Anda..."
            />
          </div>
          <Button
            type="submit"
            disabled={contactMutation.isPending}
            className="w-full bg-gradient-to-r from-electric-blue to-cyber-green hover:from-blue-600 hover:to-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-105"
          >
            {contactMutation.isPending ? (
              "Mengirim..."
            ) : (
              <>
                <Send className="mr-2" size={16} />
                Kirim Pesan
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
