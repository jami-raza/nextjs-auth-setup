export function isExpired(expiresAt: Date) {
  const currentTime = new Date();
  return expiresAt > currentTime;
}
