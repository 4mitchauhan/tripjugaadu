import { createHmac, timingSafeEqual } from 'crypto';
function base64UrlEncode(str) {
    return Buffer.from(str)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}
function base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return Buffer.from(base64, 'base64').toString('utf8');
}
export function signJwt(payload, secret, expiresInSeconds = 7 * 24 * 3600) {
    const jwtSecret = secret || process.env.JWT_SECRET || 'tripjugaadu_development_jwt_secret_token_change_in_production';
    const now = Math.floor(Date.now() / 1000);
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    };
    const fullPayload = {
        ...payload,
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
        iat: payload.iat ?? now,
        exp: payload.exp ?? now + expiresInSeconds,
    };
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const signature = createHmac('sha256', jwtSecret)
        .update(signingInput)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    return `${signingInput}.${signature}`;
}
export function verifyJwt(token, secret) {
    if (!token || typeof token !== 'string') {
        return { valid: false, error: 'Token is required' };
    }
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token.trim();
    const parts = cleanToken.split('.');
    if (parts.length !== 3) {
        return { valid: false, error: 'Malformed JWT structure' };
    }
    const [encodedHeader, encodedPayload, signature] = parts;
    const jwtSecret = secret || process.env.JWT_SECRET || 'tripjugaadu_development_jwt_secret_token_change_in_production';
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = createHmac('sha256', jwtSecret)
        .update(signingInput)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    try {
        const sigBuffer = Buffer.from(signature);
        const expectedBuffer = Buffer.from(expectedSignature);
        if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
            return { valid: false, error: 'Invalid JWT cryptographic signature' };
        }
        const payloadJson = base64UrlDecode(encodedPayload);
        const payload = JSON.parse(payloadJson);
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
            return { valid: false, error: 'JWT token has expired' };
        }
        return { valid: true, payload };
    }
    catch (err) {
        return { valid: false, error: err?.message || 'Failed to decode JWT payload' };
    }
}
//# sourceMappingURL=jwt.util.js.map