const ms = require('ms');

export function calculateExpiryFromDuration(durationStr: string): Date | null {
  const millis = ms(durationStr);
  if (!millis || isNaN(millis)) return null;
  return new Date(Date.now() + millis);
}
