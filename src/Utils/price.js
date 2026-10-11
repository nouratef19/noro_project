
export const USD_TO_EGP = 50;

export function toEGP(usd) {
  return Math.round(usd * USD_TO_EGP);
}

export function formatEGP(price) {
  return price.toLocaleString('en-US') + ' EGP';
}