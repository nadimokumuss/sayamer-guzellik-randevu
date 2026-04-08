# Sayamer Guzellik

Sayamer Guzellik icin hazirlanmis `Next.js + TypeScript + Tailwind CSS` tabanli demo randevu ve salon yonetim arayuzu.

## Kapsam

- Musteri tarafi randevu akisi
- Demo admin paneli
- Mock veri katmani ve API route'lari
- Temel test ve build altyapisi

## Komutlar

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

## Demo Girisi

Proje canliya acildiginda tum sayfalar `middleware.ts` ile korunur. Su ortam degiskenlerini tanimlayin:

```bash
DEMO_ACCESS_PASSWORD=degistir-beni
DEMO_SESSION_SECRET=uzun-ve-rastgele-bir-deger
```

Giris ekrani `/giris` adresindedir. Parola dogruysa kullanici 12 saatlik demo oturumu alir.

## Vercel Deploy

```bash
npm run deploy:vercel
```

Deploy oncesi Vercel projesinde `DEMO_ACCESS_PASSWORD` ve `DEMO_SESSION_SECRET` env degerlerini ekleyin.

## Not

Bu surum tasarim + demo odaklidir. Veri katmani su anda mock calisir; sonraki asama gercek veritabani ve admin yetkilendirmesidir.
