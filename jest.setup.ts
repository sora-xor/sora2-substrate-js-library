const WARN_PATTERNS = ['MetadataApi not available'];
const ERROR_PATTERNS = ['subscribeRuntimeVersion(): RuntimeVersion:: disconnected'];

const originalWarn = console.warn.bind(console);
const originalError = console.error.bind(console);

console.warn = (...args: unknown[]) => {
  const serialized = args.map((arg) => (typeof arg === 'string' ? arg : '')).join(' ');
  const suppress = WARN_PATTERNS.some((pattern) => serialized.includes(pattern));
  if (!suppress) {
    originalWarn(...args);
  }
};

console.error = (...args: unknown[]) => {
  const serialized = args.map((arg) => (typeof arg === 'string' ? arg : '')).join(' ');
  const suppress = ERROR_PATTERNS.some((pattern) => serialized.includes(pattern));
  if (!suppress) {
    originalError(...args);
  }
};
