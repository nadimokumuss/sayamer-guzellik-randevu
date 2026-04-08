# Sayamer Guzellik - Next Steps

## Mevcut Durum
- Proje `Next.js + TypeScript + Tailwind CSS` ile kuruldu.
- Musteri tarafi akislari hazir:
  - Anasayfa
  - Hizmet secimi
  - Paket secimi
  - Uzman secimi
  - Takvim / saat secimi
  - Musteri bilgi formu
  - Onay ekrani
- Salon paneli demo olarak hazir:
  - Genel bakis
  - Takvim
  - Randevular
  - Hizmetler
  - Personeller
  - Uygunluk / bloke saat yonetimi
- Veri yapisi su anda `mock` calisiyor.
- API route'lari demo icin hazir.
- Asagidaki komutlar calisti:
  - `npm run typecheck`
  - `npm test`
  - `npm run build`

## Bugunku Temel Kararlar
- Marka adi: `Sayamer Guzellik`
- Dil: `Turkce`
- Stil yonu: `premium soft`
- Ilk teslim tipi: `tasarim + demo`
- Randevu akisi: `aninda onay`
- Paket mantigi: `tek sorumlu uzman + tek zaman blogu`
- Bildirim yonu: `WhatsApp agirlikli`

## Onemli Dosyalar
- Ana giris: `app/page.tsx`
- Musteri akisi:
  - `app/randevu/page.tsx`
  - `app/paketler/page.tsx`
  - `app/personeller/page.tsx`
  - `app/takvim/page.tsx`
  - `app/bilgilerim/page.tsx`
  - `app/onay/page.tsx`
- Panel:
  - `app/yonetim/page.tsx`
  - `app/yonetim/randevular/page.tsx`
  - `app/yonetim/uygunluk/page.tsx`
- Veri ve rezervasyon mantigi:
  - `lib/seed.ts`
  - `lib/store.ts`
  - `lib/booking.ts`
  - `lib/types.ts`

## Sonraki Asamalar

### 1. Projeyi Git ve GitHub'a Hazirlama
- `git init`
- Ilk commit
- GitHub repo acma
- Remote baglama
- `main` branch yapisini netlestirme

### 2. Mock Veriden Gercek Veritabani Yapisine Gecis
- Veritabani secimi:
  - Oneri: `PostgreSQL`
- ORM secimi:
  - Oneri: `Prisma` veya `Drizzle`
- Su modeller gercek veritabani tablosuna donusecek:
  - customers
  - appointments
  - staff_members
  - services
  - packages
  - blocked_slots
  - availability_rules
- `lib/store.ts` yerine gercek DB access katmani yazilacak.

### 3. Admin Giris ve Yetki Sistemi
- Panel su anda acik demo durumunda.
- Sonraki adimda admin auth eklenecek.
- Oneri:
  - `NextAuth` / `Auth.js`
  - tek admin kullanici ile baslangic
- Korunacak alanlar:
  - `/yonetim`
  - tum admin API route'lari

### 4. Gercek Randevu Operasyonu
- Uygunluk hesaplari DB tabanli hale getirilecek.
- Cakisma kontrolu transaction mantigina alinacak.
- Calisma saatleri admin panelden guncellenebilir olacak.
- Hizmet sureleri ve fiyatlari panelden degistirilebilir olacak.
- Paket yonetimi panelden yapilabilir hale getirilecek.

### 5. WhatsApp ve Bildirim Entegrasyonu
- Su an demo `wa.me` linki uretiyor.
- Sonraki asamada:
  - otomatik WhatsApp mesaji
  - opsiyonel SMS
  - opsiyonel e-posta teyidi
- Hatirlatma zamani:
  - randevudan 24 saat once
  - randevudan 2 saat once

### 6. Canliya Hazirlama
- Environment variable yapisi
- Production database
- Domain baglantisi
- SSL
- Hosting secimi
  - Oneri: `Vercel` ile baslangic
- Sonrasinda sunucuya tasima gerekiyorsa:
  - Node process
  - reverse proxy
  - PM2 / systemd
  - deployment script

### 7. UI / UX Ikinci Tur Iyilestirme
- Mobil form akisini daha da kisaltma
- Kampanya banner'larini yonetilebilir yapma
- Gercek salon fotograflari ekleme
- Marka logosu gelince header / footer guncelleme
- SEO metinleri ve Open Graph gorselleri ekleme

## Dondugumuzde Onerilen Ilk Is Sirasi
1. Git repo olustur
2. GitHub'a aktar
3. Veritabani sec
4. Mock store yerine DB bagla
5. Admin auth ekle
6. WhatsApp entegrasyonunu gerceklestir
7. Deploy et

## Hizli Baslangic Komutlari
- Bagimliliklar: `npm install`
- Dev server: `npm run dev`
- Type check: `npm run typecheck`
- Test: `npm test`
- Build: `npm run build`

## Notlar
- `npm install` sirasinda birkac `moderate` guvenlik uyarisi goruldu; buildi engellemiyor.
- Proje klasoru: `/Users/nadimokumus/Desktop/sayamer randevu`
- Demo URL (dev): `http://127.0.0.1:3000`
