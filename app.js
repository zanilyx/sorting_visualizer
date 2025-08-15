/* ========================================
   SORTING VISUALIZER - MAIN SCRIPT
   ======================================== */

// ========================================
// GLOBAL VARIABLES & INITIALIZATION
// ========================================
let audioContext;
let oscillator;

// Color themes configuration
const colorThemes = {
	default: {
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		primary: '#4a90e2',
		secondary: '#357abd'
	},
	ocean: {
		background: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 100%)',
		primary: '#0891b2',
		secondary: '#0c4a6e'
	},
	sunset: {
		background: 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)',
		primary: '#f59e0b',
		secondary: '#dc2626'
	},
	forest: {
		background: 'linear-gradient(135deg, #166534 0%, #22c55e 100%)',
		primary: '#22c55e',
		secondary: '#166534'
	},
	midnight: {
		background: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%)',
		primary: '#7c3aed',
		secondary: '#1e1b4b'
	},
	coral: {
		background: 'linear-gradient(135deg, #be185d 0%, #fb7185 100%)',
		primary: '#fb7185',
		secondary: '#be185d'
	}
};

// ========================================
// AUDIO SYSTEM
// ========================================

/**
 * Initialize Web Audio API context
 */
function initAudio() {
	try {
		audioContext = new (window.AudioContext || window.webkitAudioContext)();
	} catch (e) {
		console.log('Audio not supported in this browser');
	}
}

/**
 * Play sound effects for different operations
 * @param {number} frequency - Sound frequency in Hz
 * @param {number} duration - Sound duration in milliseconds
 * @param {string} type - Wave type: 'sine', 'square', 'triangle'
 */
function playSound(frequency = 440, duration = 50, type = 'sine') {
	if (!audioContext) return;
	
	try {
		oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
		oscillator.type = type;
		
		gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
		
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + duration / 1000);
	} catch (e) {
		// Audio might be blocked by browser
	}
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Calculate optimal number of bars based on screen width
 * @returns {number} Optimal number of bars
 */
function calculateOptimalBarCount() {
	const screenWidth = window.innerWidth;
	
	// Calculate available width for bars (accounting for padding and margins)
	let availableWidth;
	
	if (screenWidth <= 360) {
		// Very small mobile
		availableWidth = screenWidth - 40; // 20px padding on each side
		return Math.floor(availableWidth / 14); // 14px bar width + 1px margin
	} else if (screenWidth <= 480) {
		// Small mobile
		availableWidth = screenWidth - 40;
		return Math.floor(availableWidth / 16); // 16px bar width + 1px margin
	} else if (screenWidth <= 768) {
		// Tablet
		availableWidth = screenWidth - 60;
		return Math.floor(availableWidth / 18); // 18px bar width + 1px margin
	} else {
		// Desktop
		availableWidth = Math.min(screenWidth - 100, 1200); // Max 1200px width
		return Math.floor(availableWidth / 22); // 22px bar width + 2px margin
	}
}

/**
 * Get current speed from slider
 * @returns {number} Speed in milliseconds
 */
function getSpeed() {
	return parseInt(document.getElementById("speed").value);
}

/**
 * Update speed display value
 */
function updateSpeedDisplay() {
	const speed = getSpeed();
	document.getElementById("speedValue").textContent = `${speed}ms`;
}

/**
 * Update bar count input with optimal value
 */
function updateBarCountInput() {
	const optimalCount = calculateOptimalBarCount();
	const barCountInput = document.getElementById("barCount");
	
	// Clamp between 5 and 100
	const clampedCount = Math.max(5, Math.min(100, optimalCount));
	
	barCountInput.value = clampedCount;
	return clampedCount;
}

/**
 * Handle window resize for responsive bar count
 */
function handleResize() {
	const optimalCount = updateBarCountInput();
	
	// Only regenerate bars if the count changed significantly
	const currentBars = document.querySelectorAll('.bar').length;
	if (Math.abs(currentBars - optimalCount) > 2) {
		generateBars();
	}
}

// ========================================
// BAR GENERATION & MANAGEMENT
// ========================================

/**
 * Create a single bar with raytracing effects
 * @param {number} height - Height of the bar in pixels
 * @returns {HTMLElement} The created bar element
 */
function createBar(height) {
	const bar = document.createElement("div");
	bar.classList.add("bar");
	bar.style.height = `${height}px`;
	
	// Add raytracing gradient effect with 3D depth
	bar.style.background = `linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #2c5aa0 100%)`;
	bar.style.boxShadow = `0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)`;
	
	// Add 3D transform for depth
	bar.style.transform = 'translateZ(0)';
	
	return bar;
}

/**
 * Generate random bars for visualization
 */
function generateBars() {
	const numBars = document.getElementById("barCount").value || updateBarCountInput();
	const container = document.getElementById("bars-container");
	container.innerHTML = "";
	
	// Add container raytracing glow effect
	container.style.boxShadow = '0 8px 32px rgba(74, 144, 226, 0.3)';
	
	// Calculate max height based on container height
	const containerHeight = container.clientHeight;
	const maxHeight = Math.floor(containerHeight * 0.8); // 80% of container height
	const minHeight = Math.floor(containerHeight * 0.1); // 10% of container height
	
	for (let i = 0; i < numBars; i++) {
		const height = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
		const bar = createBar(height);
		
		// Add staggered raytracing animation
		setTimeout(() => {
			bar.classList.add('raytrace');
			setTimeout(() => bar.classList.remove('raytrace'), 2000);
		}, i * 100);
		
		container.appendChild(bar);
	}
	
	// Play generation sound
	playSound(800, 100, 'triangle');
}

/**
 * Get current heights of all bars
 * @returns {Array<number>} Array of bar heights
 */
function getBarHeights() {
	const bars = document.querySelectorAll('.bar');
	return Array.from(bars).map(bar => parseInt(bar.style.height));
}

/**
 * Update bar height with smooth transition
 * @param {HTMLElement} bar - The bar element to update
 * @param {number} height - New height in pixels
 */
function updateBarHeight(bar, height) {
	bar.style.height = `${height}px`;
}

// ========================================
// VISUAL EFFECTS & RAYTRACING
// ========================================

/**
 * Highlight bar with raytracing effects
 * @param {HTMLElement} bar - The bar element to highlight
 * @param {string} color - Highlight color
 * @param {string} effect - Effect type: 'glow' or 'pulse'
 */
function highlightBar(bar, color, effect = 'glow') {
	bar.style.backgroundColor = color;
	
	if (effect === 'glow') {
		bar.classList.add('raytrace-glow');
		bar.style.boxShadow = `0 0 20px ${color}, 0 4px 8px rgba(0,0,0,0.3)`;
		bar.style.transform = 'scale(1.05) translateZ(10px)';
	} else if (effect === 'pulse') {
		bar.classList.add('raytrace-pulse');
		bar.style.transform = 'scale(1.1) translateZ(15px)';
	}
}

/**
 * Reset bar to default styling
 * @param {HTMLElement} bar - The bar element to reset
 */
function resetBarStyle(bar) {
	bar.style.backgroundColor = '';
	bar.style.background = 'linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #2c5aa0 100%)';
	bar.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)';
	bar.style.transform = 'scale(1) translateZ(0)';
	bar.style.animation = '';
	
	// Remove raytracing classes
	bar.classList.remove('raytrace-glow', 'raytrace-pulse');
}

/**
 * Mark bar as sorted with raytracing effect
 * @param {HTMLElement} bar - The bar element to mark as sorted
 */
function markAsSorted(bar) {
	bar.style.background = 'linear-gradient(135deg, #51cf66 0%, #40c057 50%, #37b24d 100%)';
	bar.style.boxShadow = '0 0 15px #51cf66, 0 4px 8px rgba(0,0,0,0.3)';
	bar.style.transform = 'translateZ(5px)';
	
	// Add subtle raytracing effect for sorted bars
	setTimeout(() => {
		bar.classList.add('raytrace');
		setTimeout(() => bar.classList.remove('raytrace'), 1000);
	}, 100);
}

// ========================================
// SORTING ALGORITHMS
// ========================================

/**
 * Bubble Sort Algorithm
 */
async function bubbleSort() {
	const bars = document.querySelectorAll('.bar');
	const heights = getBarHeights();
	
	for (let i = 0; i < heights.length; i++) {
		for (let j = 0; j < heights.length - i - 1; j++) {
			// Highlight bars being compared with raytracing
			highlightBar(bars[j], '#ff6b6b', 'glow');
			highlightBar(bars[j + 1], '#4ecdc4', 'glow');
			
			// Play comparison sound
			playSound(600 + heights[j] * 2, 30, 'sine');
			
			await new Promise(resolve => setTimeout(resolve, getSpeed()));
			
			if (heights[j] > heights[j + 1]) {
				// Swap heights with raytracing effect
				[heights[j], heights[j + 1]] = [heights[j + 1], heights[j]];
				updateBarHeight(bars[j], heights[j]);
				updateBarHeight(bars[j + 1], heights[j + 1]);
				
				// Add swap raytracing animation
				bars[j].classList.add('raytrace-pulse');
				bars[j + 1].classList.add('raytrace-pulse');
				setTimeout(() => {
					bars[j].classList.remove('raytrace-pulse');
					bars[j + 1].classList.remove('raytrace-pulse');
				}, 500);
				
				// Play swap sound
				playSound(800, 50, 'square');
			}
			
			// Reset colors
			resetBarStyle(bars[j]);
			resetBarStyle(bars[j + 1]);
		}
	}
	
	// Mark all as sorted with raytracing cascade
	for (let i = 0; i < bars.length; i++) {
		markAsSorted(bars[i]);
		await new Promise(resolve => setTimeout(resolve, 50));
	}
}

/**
 * Selection Sort Algorithm
 */
async function selectionSort() {
	const bars = document.querySelectorAll('.bar');
	const heights = getBarHeights();
	
	for (let i = 0; i < heights.length; i++) {
		let minIndex = i;
		
		// Find minimum element with raytracing
		for (let j = i + 1; j < heights.length; j++) {
			highlightBar(bars[j], '#ff6b6b', 'glow');
			highlightBar(bars[minIndex], '#4ecdc4', 'glow');
			
			playSound(500 + heights[j] * 3, 25, 'sine');
			await new Promise(resolve => setTimeout(resolve, getSpeed()));
			
			if (heights[j] < heights[minIndex]) {
				resetBarStyle(bars[minIndex]);
				minIndex = j;
			} else {
				resetBarStyle(bars[j]);
			}
		}
		
		// Swap with raytracing effect
		if (minIndex !== i) {
			[heights[i], heights[minIndex]] = [heights[minIndex], heights[i]];
			updateBarHeight(bars[i], heights[i]);
			updateBarHeight(bars[minIndex], heights[minIndex]);
			
			// Add swap raytracing
			bars[i].classList.add('raytrace-pulse');
			bars[minIndex].classList.add('raytrace-pulse');
			setTimeout(() => {
				bars[i].classList.remove('raytrace-pulse');
				bars[minIndex].classList.remove('raytrace-pulse');
			}, 500);
			
			playSound(900, 60, 'square');
		}
		
		markAsSorted(bars[i]);
	}
}

/**
 * Insertion Sort Algorithm
 */
async function insertionSort() {
	const bars = document.querySelectorAll('.bar');
	const heights = getBarHeights();
	
	for (let i = 1; i < heights.length; i++) {
		const currentHeight = heights[i];
		let j = i - 1;
		
		highlightBar(bars[i], '#ff6b6b', 'pulse');
		
		while (j >= 0 && heights[j] > currentHeight) {
			highlightBar(bars[j], '#4ecdc4', 'glow');
			playSound(400 + heights[j] * 4, 20, 'sine');
			await new Promise(resolve => setTimeout(resolve, getSpeed()));
			
			heights[j + 1] = heights[j];
			updateBarHeight(bars[j + 1], heights[j + 1]);
			
			resetBarStyle(bars[j]);
			j--;
		}
		
		heights[j + 1] = currentHeight;
		updateBarHeight(bars[j + 1], currentHeight);
		markAsSorted(bars[j + 1]);
	}
}

/**
 * Quick Sort Algorithm
 */
async function quickSort() {
	const bars = document.querySelectorAll('.bar');
	const heights = getBarHeights();
	await quickSortHelper(heights, bars, 0, heights.length - 1);
}

async function quickSortHelper(heights, bars, low, high) {
	if (low < high) {
		const pi = await partition(heights, bars, low, high);
		await quickSortHelper(heights, bars, low, pi - 1);
		await quickSortHelper(heights, bars, pi + 1, high);
	}
}

async function partition(heights, bars, low, high) {
	const pivot = heights[high];
	let i = low - 1;
	
	highlightBar(bars[high], '#ffd93d', 'pulse');
	
	for (let j = low; j < high; j++) {
		highlightBar(bars[j], '#ff6b6b', 'glow');
		playSound(700 + heights[j] * 2, 30, 'sine');
		await new Promise(resolve => setTimeout(resolve, getSpeed()));
		
		if (heights[j] <= pivot) {
			i++;
			if (i !== j) {
				[heights[i], heights[j]] = [heights[j], heights[i]];
				updateBarHeight(bars[i], heights[i]);
				updateBarHeight(bars[j], heights[j]);
				
				// Add swap raytracing
				bars[i].classList.add('raytrace-pulse');
				bars[j].classList.add('raytrace-pulse');
				setTimeout(() => {
					bars[i].classList.remove('raytrace-pulse');
					bars[j].classList.remove('raytrace-pulse');
				}, 300);
				
				playSound(1000, 40, 'square');
			}
		}
		resetBarStyle(bars[j]);
	}
	
	[heights[i + 1], heights[high]] = [heights[high], heights[i + 1]];
	updateBarHeight(bars[i + 1], heights[i + 1]);
	updateBarHeight(bars[high], heights[high]);
	
	resetBarStyle(bars[high]);
	markAsSorted(bars[i + 1]);
	
	return i + 1;
}

/**
 * Merge Sort Algorithm
 */
async function mergeSort() {
	const bars = document.querySelectorAll('.bar');
	const heights = getBarHeights();
	await mergeSortHelper(heights, bars, 0, heights.length - 1);
}

async function mergeSortHelper(heights, bars, left, right) {
	if (left < right) {
		const mid = Math.floor((left + right) / 2);
		await mergeSortHelper(heights, bars, left, mid);
		await mergeSortHelper(heights, bars, mid + 1, right);
		await merge(heights, bars, left, mid, right);
	}
}

async function merge(heights, bars, left, mid, right) {
	const leftArray = heights.slice(left, mid + 1);
	const rightArray = heights.slice(mid + 1, right + 1);
	
	let i = 0, j = 0, k = left;
	
	while (i < leftArray.length && j < rightArray.length) {
		highlightBar(bars[k], '#ff6b6b', 'glow');
		playSound(600 + heights[k] * 2, 25, 'sine');
		await new Promise(resolve => setTimeout(resolve, getSpeed()));
		
		if (leftArray[i] <= rightArray[j]) {
			heights[k] = leftArray[i];
			updateBarHeight(bars[k], heights[k]);
			i++;
		} else {
			heights[k] = rightArray[j];
			updateBarHeight(bars[k], heights[k]);
			j++;
		}
		markAsSorted(bars[k]);
		k++;
	}
	
	while (i < leftArray.length) {
		heights[k] = leftArray[i];
		updateBarHeight(bars[k], heights[k]);
		markAsSorted(bars[k]);
		i++;
		k++;
	}
	
	while (j < rightArray.length) {
		heights[k] = rightArray[j];
		updateBarHeight(bars[k], heights[k]);
		markAsSorted(bars[k]);
		j++;
		k++;
	}
}

/**
 * Heap Sort Algorithm
 */
async function heapSort() {
	const bars = document.querySelectorAll('.bar');
	const heights = getBarHeights();
	
	// Build max heap with raytracing
	for (let i = Math.floor(heights.length / 2) - 1; i >= 0; i--) {
		await heapify(heights, bars, heights.length, i);
	}
	
	// Extract elements from heap one by one with raytracing
	for (let i = heights.length - 1; i > 0; i--) {
		[heights[0], heights[i]] = [heights[i], heights[0]];
		updateBarHeight(bars[0], heights[0]);
		updateBarHeight(bars[i], heights[i]);
		
		markAsSorted(bars[i]);
		playSound(1200, 80, 'triangle');
		await new Promise(resolve => setTimeout(resolve, getSpeed()));
		
		await heapify(heights, bars, i, 0);
	}
	
	markAsSorted(bars[0]);
}

async function heapify(heights, bars, n, i) {
	let largest = i;
	const left = 2 * i + 1;
	const right = 2 * i + 2;
	
	if (left < n && heights[left] > heights[largest]) {
		largest = left;
	}
	
	if (right < n && heights[right] > heights[largest]) {
		largest = right;
	}
	
	if (largest !== i) {
		highlightBar(bars[i], '#ff6b6b', 'glow');
		highlightBar(bars[largest], '#4ecdc4', 'glow');
		playSound(500 + heights[largest] * 3, 35, 'sine');
		await new Promise(resolve => setTimeout(resolve, getSpeed()));
		
		[heights[i], heights[largest]] = [heights[largest], heights[i]];
		updateBarHeight(bars[i], heights[i]);
		updateBarHeight(bars[largest], heights[largest]);
		
		resetBarStyle(bars[i]);
		resetBarStyle(bars[largest]);
		
		await heapify(heights, bars, n, largest);
	}
}

/**
 * Shell Sort Algorithm
 */
async function shellSort() {
	const bars = document.querySelectorAll('.bar');
	const heights = getBarHeights();
	const n = heights.length;
	
	// Start with a large gap and reduce it with raytracing
	for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
		for (let i = gap; i < n; i++) {
			const temp = heights[i];
			let j;
			
			highlightBar(bars[i], '#ff6b6b', 'pulse');
			
			for (j = i; j >= gap && heights[j - gap] > temp; j -= gap) {
				highlightBar(bars[j - gap], '#4ecdc4', 'glow');
				playSound(400 + heights[j - gap] * 4, 20, 'sine');
				await new Promise(resolve => setTimeout(resolve, getSpeed()));
				
				heights[j] = heights[j - gap];
				updateBarHeight(bars[j], heights[j]);
				
				resetBarStyle(bars[j - gap]);
			}
			
			heights[j] = temp;
			updateBarHeight(bars[j], temp);
			resetBarStyle(bars[i]);
		}
	}
	
	// Mark all as sorted with raytracing cascade
	for (let i = 0; i < n; i++) {
		markAsSorted(bars[i]);
		await new Promise(resolve => setTimeout(resolve, 30));
	}
}

// ========================================
// SORTING CONTROLLER
// ========================================

/**
 * Main sorting function that routes to selected algorithm
 */
async function startSort() {
	const algorithm = document.getElementById('algorithm').value;
	
	// Disable sort button during sorting
	const sortBtn = document.querySelector('button[onclick="startSort()"]');
	sortBtn.disabled = true;
	sortBtn.textContent = 'Sorting...';
	
	// Initialize audio if not already done
	if (!audioContext) {
		initAudio();
	}
	
	try {
		switch (algorithm) {
			case 'bubble':
				await bubbleSort();
				break;
			case 'selection':
				await selectionSort();
				break;
			case 'insertion':
				await insertionSort();
				break;
			case 'quick':
				await quickSort();
				break;
			case 'merge':
				await mergeSort();
				break;
			case 'heap':
				await heapSort();
				break;
			case 'shell':
				await shellSort();
				break;
		}
		
		// Play completion sound
		playSound(1000, 500, 'sine');
		
	} catch (error) {
		console.error('Sorting error:', error);
	}
	
	// Re-enable sort button
	sortBtn.disabled = false;
	sortBtn.textContent = 'Sort';
	
	// Reset all bar colors
	const bars = document.querySelectorAll('.bar');
	bars.forEach(bar => {
		resetBarStyle(bar);
	});
}

// ========================================
// COLOR THEME SYSTEM
// ========================================

/**
 * Change application color theme
 * @param {string} themeName - Name of the theme to apply
 */
function changeTheme(themeName) {
	const theme = colorThemes[themeName];
	if (!theme) return;
	
	// Update body background
	document.body.style.background = theme.background;
	
	// Update current theme preview
	document.getElementById('currentThemePreview').style.background = theme.background;
	
	// Update gradient preview
	document.getElementById('gradientPreview').style.background = theme.background;
	
	// Update color inputs to match theme
	const startColor = theme.background.match(/#[a-fA-F0-9]{6}/g)[0];
	const endColor = theme.background.match(/#[a-fA-F0-9]{6}/g)[1];
	document.getElementById('startColor').value = startColor;
	document.getElementById('endColor').value = endColor;
	
	// Store preference
	localStorage.setItem('selectedTheme', themeName);
	
	// Play theme change sound
	playSound(600, 100, 'sine');
}

/**
 * Apply custom gradient from color inputs
 */
function applyCustomGradient() {
	const startColor = document.getElementById('startColor').value;
	const endColor = document.getElementById('endColor').value;
	const direction = document.getElementById('gradientDirection').value;
	
	const customGradient = `linear-gradient(${direction}, ${startColor} 0%, ${endColor} 100%)`;
	
	// Update body background
	document.body.style.background = customGradient;
	
	// Update current theme preview
	document.getElementById('currentThemePreview').style.background = customGradient;
	
	// Update gradient preview
	document.getElementById('gradientPreview').style.background = customGradient;
	
	// Store custom gradient
	localStorage.setItem('customGradient', customGradient);
	localStorage.removeItem('selectedTheme');
	
	// Play success sound
	playSound(800, 150, 'triangle');
}

/**
 * Initialize color picker dropdown functionality
 */
function initColorPicker() {
	const colorPickerBtn = document.getElementById('colorPickerBtn');
	const colorPickerMenu = document.getElementById('colorPickerMenu');
	
	// Toggle dropdown
	colorPickerBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		colorPickerMenu.classList.toggle('show');
		colorPickerBtn.classList.toggle('active');
	});
	
	// Close dropdown when clicking outside
	document.addEventListener('click', (e) => {
		if (!colorPickerBtn.contains(e.target) && !colorPickerMenu.contains(e.target)) {
			colorPickerMenu.classList.remove('show');
			colorPickerBtn.classList.remove('active');
		}
	});
	
	// Prevent dropdown from closing when clicking inside it
	colorPickerMenu.addEventListener('click', (e) => {
		e.stopPropagation();
	});
	
	// Add click event listeners for preset themes
	document.querySelectorAll('.theme-option').forEach(option => {
		option.addEventListener('click', (e) => {
			e.preventDefault();
			const themeName = option.getAttribute('data-theme');
			changeTheme(themeName);
			
			// Close dropdown
			colorPickerMenu.classList.remove('show');
			colorPickerBtn.classList.remove('active');
		});
	});
	
	// Add event listeners for custom gradient inputs
	document.getElementById('startColor').addEventListener('input', updateGradientPreview);
	document.getElementById('endColor').addEventListener('input', updateGradientPreview);
	document.getElementById('gradientDirection').addEventListener('change', updateGradientPreview);
	
	// Load saved theme or custom gradient
	loadSavedTheme();
}

/**
 * Update gradient preview in real-time
 */
function updateGradientPreview() {
	const startColor = document.getElementById('startColor').value;
	const endColor = document.getElementById('endColor').value;
	const direction = document.getElementById('gradientDirection').value;
	
	const previewGradient = `linear-gradient(${direction}, ${startColor} 0%, ${endColor} 100%)`;
	document.getElementById('gradientPreview').style.background = previewGradient;
}

/**
 * Load saved theme or custom gradient from localStorage
 */
function loadSavedTheme() {
	const savedTheme = localStorage.getItem('selectedTheme');
	const customGradient = localStorage.getItem('customGradient');
	
	if (customGradient) {
		// Apply custom gradient
		document.body.style.background = customGradient;
		document.getElementById('currentThemePreview').style.background = customGradient;
		document.getElementById('gradientPreview').style.background = customGradient;
		
		// Extract colors from gradient
		const colors = customGradient.match(/#[a-fA-F0-9]{6}/g);
		if (colors && colors.length >= 2) {
			document.getElementById('startColor').value = colors[0];
			document.getElementById('endColor').value = colors[1];
		}
	} else if (savedTheme) {
		changeTheme(savedTheme);
	} else {
		// Set default theme
		changeTheme('default');
	}
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize application when page loads
 */
window.onload = () => {
	generateBars();
	updateSpeedDisplay();
	document.getElementById("speed").addEventListener("input", updateSpeedDisplay);
	initAudio();
	initColorPicker();
	window.addEventListener('resize', handleResize); // Add resize listener
};

