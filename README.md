# 🚀 Sorting Algorithm Visualizer

An interactive, web-based sorting algorithm visualizer featuring stunning **raytracing effects**, **3D animations**, and **audio feedback**. Watch sorting algorithms come to life with Hollywood-quality visual effects!

![Sorting Visualizer Demo](https://img.shields.io/badge/Demo-Live%20Demo-blue?style=for-the-badge&logo=github)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green?style=for-the-badge&logo=github)

## ✨ Features

### 🎯 **Core Functionality**
- **7 Sorting Algorithms**: Bubble, Selection, Insertion, Quick, Merge, Heap, and Shell Sort
- **Interactive Controls**: Adjustable bar count (5-100), animation speed, and algorithm selection
- **Real-time Visualization**: Watch bars move and swap with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🌟 **Advanced Visual Effects**
- **Raytracing & 3D**: Bars appear to float in 3D space with realistic lighting
- **Dynamic Shadows**: Multi-layered shadow systems with ambient occlusion
- **Specular Highlights**: Shiny reflections and glass morphism effects
- **Smooth Transitions**: CSS-powered animations with hardware acceleration

### 🎨 **Theme System**
- **6 Preset Themes**: Default, Ocean, Sunset, Forest, Midnight, and Coral
- **Custom Gradients**: Create your own color schemes with direction control
- **Real-time Preview**: See changes instantly as you adjust colors
- **Theme Persistence**: Your preferences are saved automatically

### 🔊 **Audio Experience**
- **Web Audio API**: High-quality sound effects for all operations
- **Dynamic Frequencies**: Sound pitch changes based on bar heights
- **Multiple Wave Types**: Sine, square, and triangle wave options
- **Performance Optimized**: Non-blocking audio that enhances the experience

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. **Fork this repository**
2. **Enable GitHub Pages** in your repository settings
3. **Set source to main branch**
4. **Your visualizer will be live at**: `https://yourusername.github.io/sorting_visualizer`

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/zanilyx/sorting_visualizer.git

# Navigate to the project
cd sorting_visualizer

# Open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

## 🎮 How to Use

### **Basic Controls**
1. **Generate Bars**: Click "Generate New Bars" to create a new random dataset
2. **Adjust Count**: Use the number input to set 5-100 bars
3. **Choose Algorithm**: Select from 7 different sorting algorithms
4. **Control Speed**: Use the slider to adjust animation speed (1-200ms)
5. **Start Sorting**: Click "Start Sorting" to begin the visualization

### **Theme Customization**
1. **Click the color picker** in the top-right corner
2. **Choose a preset theme** or create a custom gradient
3. **Custom gradients** allow you to set start/end colors and direction
4. **Your theme preference** is automatically saved

### **Understanding the Visualization**
- **Blue bars**: Unsorted elements
- **Colored bars**: Currently being compared or swapped
- **Green bars**: Elements in their final sorted position
- **Raytracing effects**: Show the 3D depth and lighting

## 🏗️ Project Structure

```
sorting_visualizer/
├── index.html          # Main HTML structure
├── style.css           # All styling and raytracing effects
├── app.js             # Core logic and sorting algorithms
└── README.md          # This documentation
```

### **File Breakdown**

#### `index.html`
- Semantic HTML5 structure
- Accessibility features (labels, ARIA)
- Responsive meta tags
- Clean, organized sections

#### `style.css`
- **Raytracing animations** with CSS keyframes
- **3D transforms** and perspective effects
- **Glass morphism** and backdrop filters
- **Responsive design** for all screen sizes
- **Performance optimizations** with hardware acceleration

#### `app.js`
- **7 sorting algorithms** with async/await
- **Web Audio API** integration
- **Theme management** system
- **Event handling** and DOM manipulation
- **Local storage** for user preferences

## 🔧 Technical Details

### **Performance Features**
- **Hardware Acceleration**: Uses `transform3d()` for GPU acceleration
- **Efficient Animations**: CSS transforms instead of layout changes
- **Smart Cleanup**: Automatic removal of animation classes
- **Optimized Rendering**: Minimal DOM manipulation during sorting

### **Browser Compatibility**
- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile Support**: iOS Safari 12+, Chrome Mobile 60+
- **Progressive Enhancement**: Graceful degradation for older browsers

### **Audio System**
- **Web Audio API**: High-quality, low-latency audio
- **Multiple Wave Types**: Sine, square, triangle waves
- **Dynamic Frequencies**: Based on bar heights for unique sounds
- **Error Handling**: Graceful fallback for unsupported browsers

## 🎨 Customization

### **Adding New Themes**
```javascript
// In app.js, add to colorThemes object:
const colorThemes = {
    // ... existing themes ...
    yourTheme: {
        background: 'linear-gradient(135deg, #yourColor1 0%, #yourColor2 100%)',
        primary: '#yourPrimaryColor',
        secondary: '#yourSecondaryColor'
    }
};
```

### **Adding New Algorithms**
```javascript
// In app.js, add your sorting function:
async function yourSort() {
    // Your sorting logic here
    // Use highlightBar(), resetBarStyle(), markAsSorted()
}

// Add to startSort() function:
case 'yourSort':
    await yourSort();
    break;

// Add to HTML select options:
<option value="yourSort">Your Sort</option>
```

### **Modifying Visual Effects**
```css
/* In style.css, customize raytracing effects: */
.raytrace {
    animation: yourCustomAnimation 2s ease-in-out infinite;
}

@keyframes yourCustomAnimation {
    /* Your custom keyframes here */
}
```

## 🌐 Deployment

### **GitHub Pages**
1. **Fork** this repository
2. **Enable GitHub Pages** in Settings → Pages
3. **Set source** to main branch
4. **Your site is live** at `https://username.github.io/repository-name`

### **Other Hosting Services**
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI
- **Any static hosting**: Upload the files to any web server

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Bug Reports**
- Use the GitHub Issues page
- Include browser version and steps to reproduce
- Add screenshots if possible

### **Feature Requests**
- Open a new issue with the "enhancement" label
- Describe the feature and its benefits
- Consider implementation complexity

### **Code Contributions**
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### **Areas for Improvement**
- **Additional Algorithms**: Radix sort, counting sort, etc.
- **Performance Metrics**: Time complexity display, comparisons counter
- **Export Features**: Save animations as GIF/MP4
- **Mobile Optimizations**: Touch gestures, mobile-specific UI

## 📱 Mobile Experience

### **Touch-Friendly Design**
- **Large touch targets** for mobile devices
- **Responsive controls** that adapt to screen size
- **Optimized layouts** for portrait and landscape
- **Smooth scrolling** and touch interactions

### **Performance on Mobile**
- **Reduced animations** for better battery life
- **Optimized rendering** for mobile GPUs
- **Efficient memory usage** for mobile devices
- **Progressive loading** for better performance

## 🔮 Future Enhancements

### **Planned Features**
- **More Algorithms**: Radix, counting, bucket sorts
- **Performance Metrics**: Real-time complexity analysis
- **Export Options**: Save animations and share
- **Dark/Light Mode**: Automatic theme switching
- **Keyboard Shortcuts**: Full keyboard navigation

### **Advanced Visualizations**
- **3D Bar Charts**: Rotate and explore in 3D space
- **Particle Effects**: Sparkles and explosions
- **Sound Visualization**: Audio waveform display
- **VR Support**: Virtual reality sorting experience

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **CSS Grid & Flexbox** for responsive layouts
- **Web Audio API** for immersive sound effects
- **CSS 3D Transforms** for raytracing effects
- **Modern JavaScript** for clean, async code
- **GitHub Pages** for free hosting

## 📞 Support

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and help
- **Email**: [Your email here]
- **Twitter**: [@yourusername]

---

**Made with ❤️ and lots of raytracing magic!**

*Star this repository if you found it helpful! ⭐*
