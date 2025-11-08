# Carousel Images Setup

## How to Add Carousel Images

The carousel automatically shuffles through images every 3 seconds.

### Step 1: Create Carousel Folder

Create a folder in your `public/images/` directory:

```
public/images/carousel/
```

### Step 2: Add Your Images

Place your images in the carousel folder with these names:
- `image1.jpg` (or `.png`, `.webp`)
- `image2.jpg`
- `image3.jpg`

You can add more images by:
1. Adding more files (image4.jpg, image5.jpg, etc.)
2. Updating the `carouselImages` array in `src/data/personalInfo.ts`

### Step 3: Update personalInfo.ts (if needed)

If you want to add more images or change the names, edit `src/data/personalInfo.ts`:

```typescript
carouselImages: [
  '/images/carousel/image1.jpg',
  '/images/carousel/image2.jpg',
  '/images/carousel/image3.jpg',
  '/images/carousel/image4.jpg', // Add more as needed
] as string[],
```

### Image Recommendations

- **Size:** 400x400px or larger (square images work best)
- **Format:** JPG, PNG, or WebP
- **File Size:** Keep under 500KB each for faster loading
- **Aspect Ratio:** Square (1:1) recommended for best display

### How It Works

- Images automatically change every 3 seconds
- Smooth fade-in animation between images
- Circular display with gradient border
- Positioned next to your profile picture

### Disable Carousel

If you don't want the carousel, you can:
1. Remove the images from the folder, OR
2. Set `carouselImages: []` in `personalInfo.ts`

