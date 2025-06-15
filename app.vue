<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">PasteSVG</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Convert SVG code to displayable images with real-time preview. Simply
          paste your SVG code and watch it render instantly. This tool helps you
          visualize SVG graphics without needing to save files or use external
          editors. Perfect for web developers, designers, and anyone working
          with SVGs.
        </p>
      </header>

      <!-- Main Content -->
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Input Section -->
        <div
          class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">SVG Code Input</h2>
            <p class="text-sm text-gray-600 mt-1">Paste your SVG code below</p>
          </div>

          <div class="p-6">
            <!-- Code Editor -->
            <div class="relative">
              <textarea
                v-model="svgCode"
                @input="validateAndUpdateSvg"
                class="w-full h-80 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Paste your SVG code here...
Example:
<svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
  <circle cx='50' cy='50' r='40' fill='#3b82f6'/>
</svg>"
              ></textarea>

              <!-- Character Count -->
              <div
                class="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded"
              >
                {{ svgCode.length }} characters
              </div>
            </div>

            <!-- Validation Status -->
            <div class="mt-4 flex items-center gap-2">
              <div
                :class="[
                  'w-3 h-3 rounded-full',
                  isValidSvg
                    ? 'bg-green-500'
                    : svgCode.trim()
                    ? 'bg-red-500'
                    : 'bg-gray-300',
                ]"
              ></div>
              <span
                :class="[
                  'text-sm',
                  isValidSvg
                    ? 'text-green-600'
                    : svgCode.trim()
                    ? 'text-red-600'
                    : 'text-gray-500',
                ]"
              >
                {{ validationMessage }}
              </span>
            </div>

            <!-- Visual Mask Display -->
            <div
              class="mb-4 p-3 bg-gray-50 rounded-lg border font-mono text-sm text-gray-700 overflow-x-auto"
            >
              <span class="text-blue-600"
                >&lt;img src='data:image/svg+xml,</span
              >
              <span class="text-gray-400 italic">{{
                svgCode || 'your SVG code here...'
              }}</span>
              <span class="text-blue-600">'&gt;</span>
            </div>
          </div>
        </div>

        <!-- Output Section -->
        <div
          class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Preview</h2>
            <p class="text-sm text-gray-600 mt-1">
              Live preview of your SVG as an image
            </p>
          </div>

          <div class="p-6">
            <!-- Preview Area -->
            <div
              class="border-2 border-dashed border-gray-200 rounded-lg p-8 min-h-80 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white"
            >
              <div v-if="!svgCode.trim()" class="text-center text-gray-400">
                <svg
                  class="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p class="text-lg font-medium">No SVG code yet</p>
                <p class="text-sm">Paste your SVG code to see the preview</p>
              </div>

              <div v-else-if="!isValidSvg" class="text-center text-red-400">
                <svg
                  class="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
                <p class="text-lg font-medium">Invalid SVG</p>
                <p class="text-sm">Please check your SVG syntax</p>
              </div>

              <div
                v-else
                class="max-w-full max-h-full flex items-center justify-center"
              >
                <img
                  :src="dataUri"
                  :alt="'Rendered SVG'"
                  class="max-w-full max-h-96"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Helper Text -->
            <div
              v-if="isValidSvg && dataUri"
              class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <p class="text-sm font-medium text-blue-800 mb-1">
                    Save as PNG / Right-click to Save (or copy image)
                  </p>
                  <p class="text-sm text-blue-700">
                    Right-click the image above to save it as a PNG file to your
                    computer. You can also copy the image directly to your
                    clipboard for use in other applications (if they support
                    pasting images containing data URI sources).
                  </p>
                </div>
              </div>
            </div>

            <!-- Data URI Display -->
            <div v-if="isValidSvg && dataUri" class="mt-4">
              <details class="group">
                <summary
                  class="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2"
                >
                  <svg
                    class="w-4 h-4 transition-transform group-open:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  View Encoded Data URI
                </summary>
                <div class="mt-3 p-3 bg-gray-50 rounded-lg border">
                  <code class="text-xs text-gray-600 break-all">{{
                    dataUri
                  }}</code>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-12 text-center text-gray-500 text-sm">
        <p>
          Built with Nuxt • By Paul Melero • Visit
          <a href="https://graficos.net" class="text-blue-700 underline"
            >Graficos.net</a
          >
          ❤️
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Reactive state
const svgCode = ref('');
const isValidSvg = ref(false);
const validationMessage = ref('Ready to validate SVG');

// Computed data URI
const dataUri = computed(() => {
  if (!isValidSvg.value || !svgCode.value.trim()) return '';

  try {
    // Clean and encode the SVG
    const cleanSvg = svgCode.value.trim();
    const encodedSvg = encodeURIComponent(cleanSvg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')
      .replace(/#/g, '%23')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/\s+/g, '%20');

    return `data:image/svg+xml,${encodedSvg}`;
  } catch (error) {
    console.error('Error creating data URI:', error);
    return '';
  }
});

// SVG validation function
function validateSvg(code) {
  if (!code.trim()) {
    return { isValid: false, message: 'Enter SVG code to validate' };
  }

  try {
    // Basic SVG structure validation
    const trimmedCode = code.trim();

    // Check if it starts with <svg and ends with </svg>
    if (!trimmedCode.toLowerCase().startsWith('<svg')) {
      return { isValid: false, message: 'SVG must start with <svg tag' };
    }

    if (!trimmedCode.toLowerCase().includes('</svg>')) {
      return { isValid: false, message: 'SVG must end with </svg> tag' };
    }

    // Check for basic XML structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(trimmedCode, 'image/svg+xml');
    const parserError = doc.querySelector('parsererror');

    if (parserError) {
      return { isValid: false, message: 'Invalid XML syntax' };
    }

    // Check if root element is svg
    if (doc.documentElement.tagName.toLowerCase() !== 'svg') {
      return { isValid: false, message: 'Root element must be <svg>' };
    }

    return { isValid: true, message: 'Valid SVG code' };
  } catch (error) {
    return { isValid: false, message: 'SVG parsing error' };
  }
}

// Validate and update SVG
function validateAndUpdateSvg() {
  const validation = validateSvg(svgCode.value);
  isValidSvg.value = validation.isValid;
  validationMessage.value = validation.message;
}

// Handle image load errors
function handleImageError() {
  isValidSvg.value = false;
  validationMessage.value = 'Error rendering SVG image';
}

// Set up SEO
useHead({
  title: 'PasteSVG - SVG to Image Converter',
  meta: [
    {
      name: 'description',
      content:
        'Convert SVG code to displayable images with real-time preview. Simply paste your SVG code and watch it render instantly.',
    },
    {
      name: 'keywords',
      content: 'SVG, converter, image, data URI, web tools, micro-app',
    },
  ],
});

// Sample SVG for demonstration
onMounted(() => {
  // Optionally set a sample SVG
  if (!svgCode.value) {
    svgCode.value = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="80" fill="url(#grad1)" stroke="#1e40af" stroke-width="4"/>
  <text x="100" y="110" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">SVG</text>
</svg>`;
    validateAndUpdateSvg();
  }
});
</script>

<style scoped>
/* Additional custom styles if needed */
details summary::-webkit-details-marker {
  display: none;
}
</style>
