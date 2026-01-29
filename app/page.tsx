import { FleetGrid } from "@/components/FleetGrid";
import { PromotionSection } from "@/components/PromotionSection";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen -mt-6">
      {/* ... (Hero section same) */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[#222222] text-[#F9F3E5] overflow-hidden">
        {/* ... (image omitted for brevity) */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="/images/fleet/alphard.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 md:space-y-8 px-6 max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
            Sewa Kendaraan <span className="text-[#F3D88D]">Delian</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Penyedia layanan transportasi premium terbaik di kelasnya.
            Armada terbaru, harga bersahabat, dan layanan 24/7.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4 sm:pt-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Button size="lg" className="bg-[#F3D88D] text-[#222222] hover:bg-white hover:scale-105 active:scale-95 transition-all font-black px-10 py-7 md:py-8 text-lg md:text-xl rounded-full shadow-2xl" asChild>
              <a href="#fleet">BOOKING SEKARANG</a>
            </Button>
            <Button size="lg" className="bg-white text-[#222222] hover:bg-[#F3D88D] hover:scale-105 active:scale-95 transition-all font-black px-10 py-7 md:py-8 text-lg md:text-xl rounded-full shadow-2xl border-none" asChild>
              <a href="#promos">LIHAT PROMO</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Promotions Section (Now Interactive) */}
      <PromotionSection />

      {/* Fleet Showcase Section */}
      <section id="fleet" className="py-24 bg-[#F9F3E5]">
        <div className="container mx-auto px-4 text-center mb-20">
          <h2 className="text-5xl font-black text-[#222222] mb-6 tracking-tighter uppercase">Armada Pilihan</h2>
          <div className="h-2 w-32 bg-[#F3D88D] mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-[#665D4D] max-w-2xl mx-auto font-medium leading-relaxed">
            Berbagai tipe kendaraan mulai dari City Car hingga Luxury MPV siap menemani perjalanan Anda dengan standar kenyamanan tertinggi.
          </p>
        </div>

        <FleetGrid />
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#222222] text-[#F9F3E5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Apa Kata Mereka?</h2>
            <div className="h-1.5 w-24 bg-[#F3D88D] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Andi Saputra", text: "Pelayanan sangat memuaskan. Mobil bersih dan wangi. Supirnya juga ramah dan sangat membantu.", role: "Pebisnis" },
              { name: "Siti Aminah", text: "Harga transparan dan terjangkau. Proses reservasi sangat cepat lewat website. Recommended!", role: "Ibu Rumah Tangga" },
              { name: "Budi Santoso", text: "Alphard-nya dalam kondisi prima. Sangat cocok untuk acara VVIP. Terima kasih Delian!", role: "Manager" }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, star) => (
                    <span key={star} className="text-[#F3D88D]">★</span>
                  ))}
                </div>
                <p className="text-lg italic text-gray-300 mb-6 font-medium">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-[#F3D88D]">{t.name}</h4>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white border-y border-[#DED6C4]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-[#222222] mb-16 tracking-tight uppercase">Mengapa Memilih Delian?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { title: "Armada Terbaru", desc: "Kendaraan selalu dalam kondisi prima, wangi, dan bersih setiap saat.", icon: "🚗" },
              { title: "Harga Kompetitif", desc: "Penawaran harga transparan tanpa biaya tersembunyi yang memberatkan.", icon: "💰" },
              { title: "Layanan 24/7", desc: "Tim operasional kami siaga membantu Anda kapan saja dibutuhkan.", icon: "⏰" },
              { title: "Supir Handal", desc: "Tersedia tim supir berpengalaman, ramah, dan menguasai medan jalan.", icon: "👨‍✈️" }
            ].map((item, i) => (
              <div key={i} className="space-y-4 group">
                <div className="w-20 h-20 bg-[#F9F3E5] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F3D88D] group-hover:rotate-12 transition-all duration-300 border border-[#DED6C4]">
                  <span className="text-4xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#222222] tracking-tight">{item.title}</h3>
                <p className="text-[#665D4D] leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] text-[#F9F3E5] py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img src="/images/logo.png" alt="Delian Logo" className="h-12 w-12" />
                <span className="text-3xl font-black tracking-tighter">DELIAN</span>
              </div>
              <p className="text-gray-400 font-medium leading-relaxed">
                Partner perjalanan terpercaya Anda di seluruh Indonesia. Menyediakan layanan sewa kendaraan premium sejak tahun 2010.
              </p>
            </div>

            <div>
              <h5 className="text-xl font-bold mb-6 text-[#F3D88D]">Navigasi</h5>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                <li><a href="/" className="hover:text-white transition-colors">Beranda</a></li>
                <li><a href="#fleet" className="hover:text-white transition-colors">Cari Armada</a></li>
                <li><a href="#promos" className="hover:text-white transition-colors">Promo Terbaru</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Masuk Member</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xl font-bold mb-6 text-[#F3D88D]">Legal</h5>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bantuan Web</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xl font-bold mb-6 text-[#F3D88D]">Hubungi Kami</h5>
              <p className="text-gray-400 font-bold text-sm mb-4 leading-relaxed">
                Jl. Raya Kendaraan No. 123<br />
                Jakarta Selatan, Indonesia
              </p>
              <div className="space-y-2 font-black text-[#F3D88D]">
                <p>+62 821 1234 5678</p>
                <p>support@delian.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-bold">
            <p>&copy; 2026 SEWA KENDARAAN DELIAN. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#F3D88D] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#F3D88D] transition-colors">Facebook</a>
              <a href="#" className="hover:text-[#F3D88D] transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
