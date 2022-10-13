/**
 * Config wrapper, to maybe change and improve it
 *
 * @author vmalyshev
 */

export const BASE_PATH: string = process.env.BASE_PATH;
export const DOCS_PATH: string = BASE_PATH + 'docs';
export const SHUTDOWN_TIMEOUT = process.env.SHUTDOWN_TIMEOUT || 10000;
export const PORT = process.env.PORT || 3001;
export const API_VERSION = process.env.version || '1.0';
export const CORS_HEADERS = process.env.CORS_HEADERS || '';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const AUTH_URI = process.env.AUTH_URI || 'http://localhost:3003';
