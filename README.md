# 🎬 MOHAMMAD RIFAT - Premium Portfolio Website

A highly responsive, cinematic, and modern creative agency portfolio website designed for **MOHAMMAD RIFAT** (Graphic Designer, Video Editor, Motion Graphics Designer, & Digital Marketer). 

This website features premium light/dark mode systems, custom glassmorphic styling, neon highlights, and a signature, interactive **Adobe Premiere Pro-inspired workspace timeline** built with high-performance animations (Framer Motion).

---

## 🚀 Key Features
- **Centralized Content Control**: Edit your entire website from a single file (`/src/content.ts`).
- **Interactive Premiere Timeline**: A custom-designed visual timeline showcasing editing tracks, waves, markers, and keyframes with continuous loop animation.
- **Glassmorphic UI Elements**: Luxury blurred cards, subtle ambient glows, and balanced premium shadow depth.
- **Performance Optimized**: Lazy-loaded assets, hardware-accelerated animations, and efficient state controls.
- **Production-Ready Hosting Configuration**: Configured specifically for **Firebase Hosting** to support SPA routes, rapid cold starts, and persistent HTTPS.

---

## 🛠️ How to Edit Content (Admin Central)

You can update **all content** on your portfolio without touching any complex layout code. All editable text, metrics, tags, links, and paths are housed in a single file:

👉 **File to Edit**: `/src/content.ts`

### 1. Changing Text & Contact Info
Inside `/src/content.ts`, you can directly change the text values in the `PERSONAL_INFO` object:
```typescript
export const PERSONAL_INFO = {
  name: "MOHAMMAD RIFAT",
  title: "Graphic Designer | Video Editor | Motion Graphics Designer | Digital Marketer",
  professions: ["Graphic Designer", "Video Editor", "Motion Graphics Designer", "Digital Marketer"],
  email: "mdrifatulriad@gmail.com",
  phone: "+8801700814379",
  whatsapp: "https://wa.me/8801700814379",
  location: "Dhaka, Bangladesh",
  socials: {
    behance: "https://behance.net/mdrifatulriad",
    whatsapp: "https://wa.me/8801700814379",
    facebook: "https://facebook.com/mdrifatulriad",
    linkedin: "https://linkedin.com/in/mdrifatulriad",
    instagram: "https://instagram.com/mdrifatulriad"
  }
};
```
Every section, link, or click event (such as the **floating WhatsApp button** or the **Contact section socials**) will instantly update with your new inputs.

### 2. Replacing Images & Videos
- **Profile Portrait / Headshot**: 
  1. Save your new photo inside `/src/assets/images/` (e.g., `my_photo.jpg`).
  2. In `content.ts`, update the `avatar` path:
     ```typescript
     avatar: "/src/assets/images/my_photo.jpg"
     ```
- **Portfolio Project Images**:
  1. Add project screenshots or thumbnails to `/src/assets/images/` or use high-resolution Unsplash URLs.
  2. In `content.ts`, edit the `PORTFOLIO_PROJECTS` array to update the `image` path:
     ```typescript
     image: "/src/assets/images/project_thumbnail.jpg"
     ```
- **Adding Videos**:
  1. Place custom background MP4 clips inside `/public/assets/videos/`.
  2. Reference them in your content setup if you expand cards to include live motion video players.

### 3. Adding/Updating Portfolio Projects
Add or remove objects in the `PORTFOLIO_PROJECTS` array. Support categories are:
- `'Graphic Design'`
- `'Motion Graphics'`
- `'Video Editing'`
- `'Branding'`
- `'Social Media'`
- `'Thumbnails'`

---

## 📦 How to Run Locally

If you wish to run, test, and preview changes on your computer:

### Prerequisites
- Install **Node.js** (v18 or higher is recommended)

### Steps
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *The local server will run on `http://localhost:3000`.*
3. **Build Code for Production**:
   ```bash
   npm run build
   ```
   *This compiles assets into a high-performance static folder `/dist/`.*

---

## ☁️ Deploying to Firebase Hosting

This project is configured out-of-the-box for **Firebase Hosting** to serve under your custom subdomain: `https://mohammadrifat.web.app`.

### First-Time Setup
1. **Install Firebase CLI globally** (if you haven't already):
   ```bash
   npm install -g firebase-tools
   ```
2. **Login to your Google Account**:
   ```bash
   firebase login
   ```
3. **Initialize & link to your Firebase project** (or let our `.firebaserc` handle it):
   ```bash
   firebase use --add mohammadrifat
   ```

### Quick Deploy Command
Every time you make content edits in `content.ts` and want to update your live website, run:
```bash
# 1. Compile the latest code changes
npm run build

# 2. Deploy the static build files to Firebase Hosting
firebase deploy --only hosting
```
Within seconds, the CLI will output a live hosting URL, and the updates will be visible worldwide with SSL encryption!

---

## 🌐 Connecting a Custom Domain (e.g. `mohammadrifat.com`)

You can easily connect a professional custom domain later using the Firebase Console:

1. Go to the **Firebase Console** (https://console.firebase.google.com).
2. Select your project: **`mohammadrifat`**.
3. In the left navigation, click **Hosting**.
4. Click **Add custom domain**.
5. Type your domain (e.g., `mohammadrifat.com`) and follow the on-screen instructions:
   - Copy the **TXT record** to verify ownership in your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.).
   - Update your **A records** pointing to Firebase’s IP addresses.
6. Firebase Hosting will automatically provision an **SSL/HTTPS certificate** for your domain (this is free and updates automatically).

---

## 🗄️ Connecting to GitHub for Version Control

To store your code securely on GitHub and enable automatic deployments:

1. **Initialize a local Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of premium portfolio"
   ```
2. **Create a new repository** on [GitHub](https://github.com) named `mohammadrifat-portfolio`.
3. **Link your local repository to GitHub**:
   ```bash
   git remote add origin https://github.com/your-username/mohammadrifat-portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. **(Optional) Enable GitHub Actions Auto-deploy**:
   - Run `firebase init hosting:github` in your terminal to set up automated deployment. Every time you push changes to GitHub, it will compile and publish to your website automatically!
