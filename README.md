# Sayamer Güzellik

Sayamer Güzellik için hazırlanmış `Next.js 15 + TypeScript + Tailwind CSS` tabanlı online randevu ve salon yönetim arayüzü.

## Kapsam

- 3 slaytlı hero slider, sağ-yarı soft maskeli portre ve şeftali/krem floral atmosfer
- Müşteri tarafı online randevu akışı (tek sayfa: hizmet → uzman → saat → bilgi → onay)
- Demo admin paneli (`/yonetim`)
- WhatsApp tabanlı teyit akışı
- Mock veri katmanı ve API route'ları
- Krem zeminli footer + Son Yazılar + Bülten widget'ları
- Marquee marka şeridi
- Pexels lisanslı görseller (her blog post unique kapak)

## Tasarım Sistemi

- **Palet**: Brand altın/şeftali/mocha (`brand-50` → `brand-900`), krem footer
- **Tipografi**: Playfair Display (`font-display`) + Inter (`font-sans`)
- **Hareket**: Framer Motion (slider, InView, RevealText, CountUp)
- **Dekor**: `floral-decor.tsx` (Monstera, Orkide, Pembe Çiçek, Papatya) ve `botanical.tsx`
- **Title süs**: `section-title-mark.tsx` (altın yatay ornament)

## Komutlar

```bash
npm install
npm run dev          # Dev sunucu (http://localhost:3000)
npm run typecheck    # tsc --noEmit
npm test             # vitest
npm run build        # Next üretim derlemesi
```

## Demo Girişi

Proje canlıya açıldığında tüm sayfalar `middleware.ts` ile korunur. Şu ortam değişkenlerini tanımlayın:

```bash
DEMO_ACCESS_PASSWORD=degistir-beni
DEMO_SESSION_SECRET=uzun-ve-rastgele-bir-deger
```

Giriş ekranı `/giris` adresindedir. Parola doğruysa kullanıcı 12 saatlik demo oturumu alır.

## Vercel Deploy

```bash
npm run deploy:vercel
```

Deploy öncesi Vercel projesinde `DEMO_ACCESS_PASSWORD` ve `DEMO_SESSION_SECRET` env değerlerini ekleyin.

## Önemli Dizinler

```
app/                     # Next.js App Router sayfaları
  page.tsx               # Anasayfa (hero slider + section'lar)
  randevu/               # Tek sayfa rezervasyon akışı
  blog/                  # Blog liste + detay
  yonetim/               # Demo admin paneli
components/
  ui/                    # Hero slider, footer, header, kartlar, dekor
  booking/               # Rezervasyon adım bileşenleri
  motion/                # Framer Motion sarmalayıcılar
  layout/                # Sayfa hero, brand-cta, vb.
lib/
  site.ts                # Marka, navigasyon, hero slide'ları, blog post'ları
  seed.ts                # Hizmet kataloğu, paket ve personel verisi
  store.ts               # Mock veri saklama
```

## Not

Bu sürüm tasarım + demo odaklıdır. Veri katmanı şu anda mock çalışır; sonraki aşama gerçek veritabanı ve admin yetkilendirmesidir.
