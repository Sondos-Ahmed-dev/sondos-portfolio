# دليل نشر البورتفوليو على Vercel و Netlify

## 📋 جدول المحتويات
1. [نشر على Vercel](#نشر-على-vercel)
2. [نشر على Netlify](#نشر-على-netlify)
3. [إعدادات المجال المخصص](#إعدادات-المجال-المخصص)
4. [متغيرات البيئة](#متغيرات-البيئة)
5. [أفضل الممارسات](#أفضل-الممارسات)
6. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## نشر على Vercel

### الخطوة 1: إنشاء حساب Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. انقر على "Sign Up"
3. اختر "Continue with GitHub"
4. وافق على الأذونات المطلوبة
5. أكمل إعداد الحساب

### الخطوة 2: ربط مستودع GitHub

```bash
# تأكد من أن المشروع محفوظ على GitHub
cd /home/ubuntu/sondos-portfolio
git remote -v  # تحقق من أن الـ remote موجود

# إذا لم يكن موجوداً، أضفه:
git remote add origin https://github.com/YOUR_USERNAME/sondos-portfolio.git
git branch -M main
git push -u origin main
```

### الخطوة 3: استيراد المشروع إلى Vercel

1. في لوحة تحكم Vercel، انقر على "New Project"
2. اختر "Import Git Repository"
3. ابحث عن `sondos-portfolio` واختره
4. انقر على "Import"

### الخطوة 4: إعدادات البناء

في صفحة "Configure Project":

**Build Settings:**
```
Framework Preset: Other
Build Command: pnpm run build
Output Directory: dist
Install Command: pnpm install
```

**Environment Variables:**
```
DATABASE_URL: [اترك فارغاً إذا لم تكن تستخدم قاعدة بيانات]
JWT_SECRET: [أنشئ مفتاح عشوائي قوي]
VITE_APP_ID: [معرّف تطبيق Manus OAuth]
OAUTH_SERVER_URL: https://api.manus.im
VITE_OAUTH_PORTAL_URL: https://app.manus.im
OWNER_OPEN_ID: [معرّف المالك]
OWNER_NAME: Sondos Ibrahim
BUILT_IN_FORGE_API_URL: [رابط Manus API]
BUILT_IN_FORGE_API_KEY: [مفتاح API]
VITE_FRONTEND_FORGE_API_KEY: [مفتاح API للـ Frontend]
VITE_FRONTEND_FORGE_API_URL: [رابط API للـ Frontend]
```

### الخطوة 5: النشر

1. انقر على "Deploy"
2. انتظر اكتمال البناء (عادة 2-5 دقائق)
3. ستحصل على رابط مثل: `https://sondos-portfolio.vercel.app`

### الخطوة 6: إعدادات ما بعد النشر

**تفعيل الـ Analytics (اختياري):**
1. انتقل إلى "Settings" → "Analytics"
2. فعّل "Web Analytics"
3. استخدم البيانات لتتبع زيارات البورتفوليو

**إعدادات الأداء:**
1. انتقل إلى "Settings" → "Performance"
2. تأكد من تفعيل "Compression"
3. فعّل "Automatic HTTPS"

---

## نشر على Netlify

### الخطوة 1: إنشاء حساب Netlify

1. اذهب إلى [netlify.com](https://netlify.com)
2. انقر على "Sign up"
3. اختر "Sign up with GitHub"
4. وافق على الأذونات المطلوبة

### الخطوة 2: ربط المستودع

1. في لوحة تحكم Netlify، انقر على "New site from Git"
2. اختر "GitHub"
3. ابحث عن `sondos-portfolio`
4. انقر على "Connect"

### الخطوة 3: إعدادات البناء

في صفحة "Site settings":

**Build Settings:**
```
Build command: pnpm run build
Publish directory: dist
```

**Environment Variables:**
انقر على "Edit variables" وأضف:
```
DATABASE_URL=
JWT_SECRET=[مفتاح عشوائي قوي]
VITE_APP_ID=[معرّف تطبيق Manus]
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://app.manus.im
OWNER_OPEN_ID=[معرّف المالك]
OWNER_NAME=Sondos Ibrahim
BUILT_IN_FORGE_API_URL=[رابط API]
BUILT_IN_FORGE_API_KEY=[مفتاح API]
VITE_FRONTEND_FORGE_API_KEY=[مفتاح API]
VITE_FRONTEND_FORGE_API_URL=[رابط API]
```

### الخطوة 4: النشر

1. انقر على "Deploy site"
2. انتظر اكتمال البناء
3. ستحصل على رابط مثل: `https://sondos-portfolio.netlify.app`

### الخطوة 5: إعدادات Netlify المتقدمة

**إنشاء ملف `netlify.toml`:**

```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
  PNPM_VERSION = "10"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/cv.pdf"
  [headers.values]
    Content-Disposition = "attachment; filename=Sondos_Ibrahim_CV.pdf"
```

---

## إعدادات المجال المخصص

### على Vercel

1. انتقل إلى "Settings" → "Domains"
2. انقر على "Add Domain"
3. أدخل اسم المجال (مثل: `sondos-portfolio.com`)
4. اتبع التعليمات لتحديث سجلات DNS

**تحديث DNS Records:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A (للـ root domain)
Name: @
Value: 76.76.19.165
```

### على Netlify

1. انتقل إلى "Site settings" → "Domain management"
2. انقر على "Add custom domain"
3. أدخل اسم المجال
4. اتبع التعليمات لتحديث DNS

**تحديث DNS Records:**
```
Type: CNAME
Name: www
Value: sondos-portfolio.netlify.app

Type: A (للـ root domain)
Name: @
Value: 75.2.60.5
```

### تفعيل HTTPS

كل من Vercel و Netlify يفعلان HTTPS تلقائياً مجاناً باستخدام Let's Encrypt.

---

## متغيرات البيئة

### المتغيرات المطلوبة

```env
# OAuth Configuration
VITE_APP_ID=your_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://app.manus.im
OWNER_OPEN_ID=your_owner_id
OWNER_NAME=Sondos Ibrahim

# API Configuration
BUILT_IN_FORGE_API_URL=https://api.manus.im/forge
BUILT_IN_FORGE_API_KEY=your_api_key
VITE_FRONTEND_FORGE_API_KEY=your_frontend_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im/forge

# Security
JWT_SECRET=generate_a_strong_random_key_here
```

### كيفية إنشاء JWT_SECRET قوي

```bash
# على Linux/Mac:
openssl rand -base64 32

# أو استخدم أي أداة عبر الإنترنت:
# https://generate-random.org/
```

---

## أفضل الممارسات

### 1. استخدام متغيرات البيئة بأمان

❌ **لا تفعل:**
```javascript
const apiKey = "sk_live_abc123";  // خطر!
```

✅ **افعل:**
```javascript
const apiKey = process.env.BUILT_IN_FORGE_API_KEY;
```

### 2. إعدادات الأداء

**تقليل حجم الـ Bundle:**
```bash
# تحليل حجم الـ Bundle
pnpm run build
# ستجد تقرير الحجم في dist/

# استخدم dynamic imports للمكونات الكبيرة
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### 3. إعدادات الـ Caching

**على Vercel:**
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/cv.pdf",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

### 4. المراقبة والتحليلات

**تفعيل Google Analytics:**

أضف إلى `client/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 5. الاختبار قبل النشر

```bash
# بناء محلي
pnpm run build

# اختبر الـ Build محلياً
pnpm run preview

# تشغيل الاختبارات
pnpm test

# فحص TypeScript
pnpm run check
```

### 6. إعدادات الأمان

**ملف `vercel.json` للأمان:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 7. تحسين SEO

**ملف `robots.txt`:**
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://sondos-portfolio.com/sitemap.xml
```

**ملف `sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sondos-portfolio.com/</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## استكشاف الأخطاء

### خطأ: "Build failed"

**الحل:**
```bash
# تحقق من الأخطاء محلياً
pnpm run build

# تأكد من تثبيت جميع الـ dependencies
pnpm install

# امسح الـ cache
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### خطأ: "Environment variables not found"

**الحل:**
1. تحقق من أن جميع المتغيرات موجودة في لوحة التحكم
2. أعد نشر الموقع بعد إضافة المتغيرات
3. تأكد من أن أسماء المتغيرات صحيحة (حساسة لحالة الأحرف)

### خطأ: "Contact form not working"

**الحل:**
1. تحقق من أن `BUILT_IN_FORGE_API_KEY` صحيح
2. تأكد من أن `OWNER_OPEN_ID` موجود
3. اختبر الـ API محلياً:
```bash
curl -X POST http://localhost:3000/api/trpc/contact.submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

### خطأ: "Slow loading time"

**الحل:**
1. استخدم Lighthouse لتحليل الأداء
2. قلل حجم الصور
3. استخدم dynamic imports
4. فعّل compression على الخادم

---

## مقارنة Vercel vs Netlify

| الميزة | Vercel | Netlify |
|--------|--------|---------|
| السعر | مجاني + مدفوع | مجاني + مدفوع |
| الأداء | ممتاز | ممتاز |
| سهولة الاستخدام | سهلة جداً | سهلة جداً |
| دعم الـ Functions | نعم | نعم |
| دعم الـ Analytics | نعم (مدفوع) | نعم (مجاني) |
| دعم الـ Redirects | نعم | نعم |
| دعم الـ Preview | نعم | نعم |
| التكامل مع GitHub | ممتاز | ممتاز |

**التوصية:** استخدم **Vercel** إذا كنت تريد أفضل أداء وتجربة مستخدم، أو **Netlify** إذا كنت تفضل واجهة أكثر مرونة.

---

## خطوات ما بعد النشر

### 1. اختبر الموقع المنشور

```bash
# اختبر الروابط
curl -I https://sondos-portfolio.vercel.app

# اختبر نموذج التواصل
# زر الموقع وجرب إرسال رسالة

# تحقق من SEO
# استخدم Google Search Console
```

### 2. أضف الموقع إلى محركات البحث

**Google Search Console:**
1. اذهب إلى [search.google.com/search-console](https://search.google.com/search-console)
2. أضف الموقع
3. تحقق من الملكية
4. أرسل sitemap.xml

**Bing Webmaster Tools:**
1. اذهب إلى [bing.com/webmasters](https://www.bing.com/webmasters)
2. أضف الموقع
3. تحقق من الملكية

### 3. راقب الأداء

**على Vercel:**
- انتقل إلى "Analytics"
- راقب الزيارات والأداء

**على Netlify:**
- انتقل إلى "Analytics"
- راقب الزيارات والأداء

### 4. إعداد التنبيهات

**على Vercel:**
1. انتقل إلى "Settings" → "Notifications"
2. فعّل التنبيهات للأخطاء

**على Netlify:**
1. انتقل إلى "Settings" → "Build & deploy"
2. فعّل التنبيهات البريدية

---

## نصائح إضافية

### استخدام Custom Domain مع Email

```
# إذا كنت تستخدم sondos-portfolio.com
# يمكنك إضافة بريد إلكتروني مخصص مثل:
# hello@sondos-portfolio.com

# استخدم خدمات مثل:
# - Mailgun
# - SendGrid
# - Zoho Mail
```

### تفعيل CORS للـ APIs

```javascript
// في server/_core/index.ts
app.use(cors({
  origin: ['https://sondos-portfolio.com', 'https://www.sondos-portfolio.com'],
  credentials: true,
}));
```

### استخدام CDN للصور

```javascript
// استخدم Cloudinary أو Imgix
const imageUrl = `https://res.cloudinary.com/your-cloud/image/upload/w_800/your-image.jpg`;
```

---

## الخلاصة

**خطوات النشر السريعة:**

1. ✅ ادفع المشروع إلى GitHub
2. ✅ اختر Vercel أو Netlify
3. ✅ ربط المستودع
4. ✅ أضف متغيرات البيئة
5. ✅ انقر "Deploy"
6. ✅ اختبر الموقع
7. ✅ أضف المجال المخصص
8. ✅ أضف إلى محركات البحث

**النتيجة:** موقع بورتفوليو احترافي متاح للعالم! 🚀

---

**آخر تحديث:** 28 يونيو 2026
