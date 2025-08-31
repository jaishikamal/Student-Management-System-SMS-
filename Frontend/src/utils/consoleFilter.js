// Suppress React Router deprecation warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args[0];
  if (typeof message === 'string' && 
      (message.includes('React Router Future Flag Warning') || 
       message.includes('v7_startTransition') || 
       message.includes('v7_relativeSplatPath'))) {
    return; // Suppress React Router deprecation warnings
  }
  originalWarn.apply(console, args);
};

export default console;
