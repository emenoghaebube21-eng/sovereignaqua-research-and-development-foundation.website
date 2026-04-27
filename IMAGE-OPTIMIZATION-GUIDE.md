# Image Optimization Guide

## Issues Identified

Your repository has several image-related issues:

1. **Double Extensions**: Files like `environment.jpg.jpg`, `humanitarian.jpg.jpg`, and `world-map-political.jpg.jpg`
2. **Large File Sizes**: Some images exceed optimal sizes
3. **Missing Alt Text**: Images may lack accessibility descriptions

## File Analysis

| File | Size | Issue |
|------|------|-------|
| environment.jpg.jpg | 44 KB | Double extension |
| humanitarian.jpg.jpg | 375 KB | Double extension + oversized |
| image.png | 1.8 MB | Very large, consider converting to WebP |
| world-map-political.jpg.jpg | 1.8 MB | Double extension + oversized |

## Recommended Actions

### 1. Rename Files
- `environment.jpg.jpg` → `environment.jpg`
- `humanitarian.jpg.jpg` → `humanitarian.jpg`
- `world-map-political.jpg.jpg` → `world-map-political.jpg`

### 2. Optimize Images

Use one of these tools:
- **TinyPNG/TinyJPG** (https://tinypng.com) - Web-based
- **ImageOptim** (Mac) - Batch processing
- **ImageMagick** (CLI) - Powerful command-line tool
- **Google Squoosh** (https://squoosh.app) - Modern formats

#### Target Sizes:
- JPEGs: 50-150 KB
- PNGs: 30-100 KB
- WebP: 30-80 KB

### 3. Add Alt Text to HTML

```html
<img src="assets/images/environment.jpg" 
     alt="Environmental sustainability initiatives of SovereignAqua Foundation" 
     loading="lazy">
```

### 4. ImageMagick Batch Optimization

```bash
# Optimize all JPEGs
for file in assets/images/*.jpg; do
  convert "$file" -strip -quality 85 -interlace Plane "${file%.jpg}_optimized.jpg"
done

# Convert large PNGs to WebP
for file in assets/images/*.png; do
  convert "$file" -quality 80 "${file%.png}.webp"
done
```

### 5. Node.js Batch Optimization

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = 'assets/images';

fs.readdirSync(imageDir).forEach(file => {
  const filePath = path.join(imageDir, file);
  
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    sharp(filePath)
      .jpeg({ quality: 85, progressive: true })
      .toFile(filePath.replace(/\.jpg$/, '_opt.jpg'));
  }
  
  if (file.endsWith('.png')) {
    sharp(filePath)
      .png({ compressionLevel: 9 })
      .toFile(filePath.replace(/\.png$/, '_opt.png'));
  }
});
```

## Best Practices

1. **Use Responsive Images**
```html
<picture>
  <source srcset="assets/images/environment.webp" type="image/webp">
  <img src="assets/images/environment.jpg" alt="Description">
</picture>
```

2. **Lazy Loading**
```html
<img src="assets/images/environment.jpg" alt="Description" loading="lazy">
```

3. **Descriptive Alt Text**
- Be specific about what the image shows
- Include context where relevant
- Keep it concise (under 125 characters)

4. **Modern Formats**
- Use WebP for better compression
- Provide fallbacks for older browsers
- Target 60% size reduction vs JPG/PNG

## Implementation Checklist

- [ ] Rename all files with double extensions
- [ ] Optimize images using preferred tool
- [ ] Update all references in HTML/Markdown files
- [ ] Add descriptive alt text to all img tags
- [ ] Test responsive images on mobile
- [ ] Verify accessibility with screen readers
- [ ] Commit changes with clear messages

## Resources

- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
- Web.dev Image Optimization: https://web.dev/image-optimization/
- Accessible Images: https://www.w3.org/WAI/tutorials/images/