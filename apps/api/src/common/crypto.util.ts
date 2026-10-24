import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

/**
 * TripJugaadu Cryptographic Password Utilities
 * Uses Node.js native scrypt with a unique 16-byte salt and timing-safe comparison.
 */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!password || !storedHash || !storedHash.includes(':')) {
    return false;
  }
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) {
    return false;
  }

  try {
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedBuffer = scryptSync(password, salt, 64);
    return keyBuffer.length === derivedBuffer.length && timingSafeEqual(keyBuffer, derivedBuffer);
  } catch {
    return false;
  }
}
