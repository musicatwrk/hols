/* eslint-disable */
// docs: https://helmetjs.github.io/docs/csp/
module.exports = {
  defaultSrc: ["'self'"],
  connectSrc: ["'self'", 'https://www.google-analytics.com'],
  baseUri: ["'none'"],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  formAction: ["'self'"],
  frameAncestors: ["'none'"],
  imgSrc: ["'self'", 'data:', 'https://www.google-analytics.com'],
  scriptSrc: [
    "'self'",
    "'sha256-vmyqYv8llK+DTbFomsM0G2wJMexFKZZPejzpvzQF+ek='",
    "'sha256-Wezgm/yRorRVzqbr6vDdLOJEGKDTVKRuWZ2Yh53e/EU='",
    'https://www.google-analytics.com',
  ],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
}
