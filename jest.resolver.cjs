const path = require('path');

module.exports = (request, options) => {
  const defaultResolver = options.defaultResolver;

  try {
    return defaultResolver(request, options);
  } catch (error) {
    const isRelative = request.startsWith('./') || request.startsWith('../');
    const isJs = request.endsWith('.js');
    const parentDir = options?.basedir || '';
    const interfacesRoot = path.join('packages', 'types', 'src', 'interfaces');

    if (isRelative && isJs && parentDir.includes(interfacesRoot)) {
      const tsRequest = request.slice(0, -3) + '.ts';
      return defaultResolver(tsRequest, options);
    }

    throw error;
  }
};
