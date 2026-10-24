import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
export function hashPassword(password) {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${derivedKey}`;
}
export function verifyPassword(password, storedHash) {
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
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=crypto.util.js.map