/**
 * Decodifica el payload de un JWT sin verificar su firma (eso lo hace el
 * backend). Sirve solo para leer datos publicos como `exp`, para saber
 * cuando expira la sesion sin tener que hardcodear ese tiempo en el frontend.
 */
export interface JwtPayload {
  usuarioId?: string;
  rol?: string;
  exp?: number; // timestamp unix en segundos
  iat?: number;
}

export const decodeJwtPayload = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
};
