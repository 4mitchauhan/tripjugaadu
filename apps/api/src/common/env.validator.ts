import { Logger } from '@nestjs/common';

const logger = new Logger('EnvironmentValidator');

export function validateEnvironment(): void {
  const isProduction = process.env.NODE_ENV === 'production';
  const warnings: string[] = [];

  const requiredProductionVars = [
    'JWT_SECRET',
    'DATABASE_URL',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
  ];

  for (const varName of requiredProductionVars) {
    const val = process.env[varName];
    if (!val) {
      if (isProduction) {
        throw new Error(`CRITICAL CONFIGURATION ERROR: Required production environment variable '${varName}' is missing.`);
      } else {
        warnings.push(`Environment variable '${varName}' is not set (using development defaults).`);
      }
    } else if (isProduction && val.includes('placeholder')) {
      throw new Error(`CRITICAL CONFIGURATION ERROR: '${varName}' is configured with a development placeholder in production.`);
    }
  }

  if (warnings.length > 0) {
    logger.warn(`Non-production environment initialized with ${warnings.length} defaults.`);
  } else {
    logger.log('Environment configuration verified successfully.');
  }
}
