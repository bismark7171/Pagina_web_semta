const fs = require('fs');
const file = 'src/components/ui/ImageViewerProvider.tsx';

if (fs.existsSync(file)) {
  let code = fs.readFileSync(file, 'utf8');
  
  if (code.includes('useContext')) {
    const targetHook = `export const useImageViewer = () => {
  const context = useContext(ImageViewerContext);
  if (!context) {
    throw new Error("useImageViewer must be used within an ImageViewerProvider");
  }
  return context;
};`;

    const safeHook = `export const useImageViewer = () => {
  const context = useContext(ImageViewerContext);
  if (!context) {
    return {
      openImageViewer: () => {},
      closeImageViewer: () => {},
    };
  }
  return context;
};`;

    code = code.replace(targetHook, safeHook);
    
    // Also, wrap the context read itself if it exists
    code = code.replace(/export const useImageViewer = \(\) => {\n  const context = useContext\(ImageViewerContext\);\n  if \(context === undefined\) {\n    throw new Error\('useImageViewer must be used within an ImageViewerProvider'\);\n  }\n  return context;\n};/, 
      `export const useImageViewer = () => {
  const context = useContext(ImageViewerContext);
  if (!context) {
    return { openImageViewer: () => {}, closeImageViewer: () => {} };
  }
  return context;
};`);
      
    fs.writeFileSync(file, code);
  }
}
