export interface JwtPayload {
    sub: string;
    email: string;
    role: 'USER' | 'PROVIDER' | 'ADMIN';
    firstName?: string;
    lastName?: string;
    iat?: number;
    exp?: number;
    [key: string]: any;
}
export interface JwtVerifyResult {
    valid: boolean;
    payload?: JwtPayload;
    error?: string;
}
export declare function signJwt(payload: {
    sub: string;
    email: string;
    role: 'USER' | 'PROVIDER' | 'ADMIN';
    firstName?: string;
    lastName?: string;
    [key: string]: any;
}, secret?: string, expiresInSeconds?: number): string;
export declare function verifyJwt(token: string, secret?: string): JwtVerifyResult;
