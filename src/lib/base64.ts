export interface NormalizeResult {
  normalized: string;
  transformations: string[];
  warnings: string[];
  detectedMimeType: string | null;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  invalidPositions: number[];
  estimatedBytes: number;
}

/**
 * Clean up pasted Base64 input before decoding:
 * - trim surrounding whitespace
 * - strip data: URL prefix (records detected MIME)
 * - remove internal line breaks and spaces
 * - convert Base64URL alphabet (- _) to standard (+ /)
 * - re-add missing / fix excessive padding
 *
 * Every automatic fix is reported in `transformations` so the UI can show
 * a transparent "what we did to your input" checklist.
 */
export function normalizeBase64Input(raw: string): NormalizeResult {
  const transformations: string[] = [];
  const warnings: string[] = [];
  let input = raw;
  let detectedMimeType: string | null = null;

  if (input.trim().length !== input.length) {
    transformations.push('已移除首尾空白 / trimmed surrounding whitespace');
    input = input.trim();
  }

  const dataUrl = input.match(/^data:([^;,]*)([^,]*),/);
  if (dataUrl) {
    detectedMimeType = dataUrl[1] || null;
    if (!dataUrl[2].includes('base64')) {
      warnings.push(
        'Data URL 未标记 ;base64，标准 Data URL 此处应为百分号编码；已尝试按 Base64 继续解析 / Data URL is not marked ;base64, attempting Base64 decode anyway'
      );
    } else {
      transformations.push('已移除 Data URL 前缀 / removed data-URL prefix');
    }
    input = input.slice(dataUrl[0].length);
  }

  if (/\s/.test(input)) {
    transformations.push('已移除换行与空格 / removed line breaks and spaces');
    input = input.replace(/\s+/g, '');
  }

  if (input.includes('-') || input.includes('_')) {
    transformations.push(
      '已将 Base64URL 字符 (- _) 转为标准字母表 / converted Base64URL to standard alphabet'
    );
    input = input.replace(/-/g, '+').replace(/_/g, '/');
  }

  const core = input.replace(/=+$/, '');
  const originalPadCount = input.length - core.length;
  const rem = core.length % 4;
  const expectedPad = rem === 2 ? 2 : rem === 3 ? 1 : 0;

  if (rem === 1) {
    // Truncated data cannot be fixed by padding; leave it and let validation report.
    input = core;
  } else {
    if (expectedPad > originalPadCount) {
      transformations.push(
        `已补齐 ${expectedPad} 个填充符 / added ${expectedPad} padding character(s)`
      );
    } else if (originalPadCount > expectedPad) {
      transformations.push('已修正多余的填充符 / fixed excessive padding');
    }
    input = core + '='.repeat(expectedPad);
  }

  return { normalized: input, transformations, warnings, detectedMimeType };
}

/**
 * Validate a (preferably normalized) Base64 string.
 * Errors are bilingual so the same engine serves the Chinese-first MVP
 * and a future English version.
 */
export function validateBase64(b64: string): ValidationResult {
  const errors: string[] = [];
  const invalidPositions: number[] = [];

  if (!b64 || b64.length === 0) {
    return { valid: false, errors: ['输入为空 / input is empty'], invalidPositions: [], estimatedBytes: 0 };
  }

  let firstPad = -1;
  for (let i = 0; i < b64.length; i++) {
    const c = b64.charCodeAt(i);
    const ok =
      (c >= 65 && c <= 90) || // A-Z
      (c >= 97 && c <= 122) || // a-z
      (c >= 48 && c <= 57) || // 0-9
      c === 43 || // +
      c === 47; // /
    if (!ok) {
      if (c === 61) {
        if (firstPad === -1) firstPad = i;
      } else {
        invalidPositions.push(i);
      }
    }
  }

  if (invalidPositions.length > 0) {
    const preview = invalidPositions.slice(0, 5).join(', ');
    errors.push(
      `发现 ${invalidPositions.length} 个非法字符（位置 ${preview}${invalidPositions.length > 5 ? ' …' : ''}）/ invalid character(s) found`
    );
  }

  if (firstPad !== -1) {
    const trailing = b64.length - firstPad;
    const rest = b64.slice(firstPad).replace(/=/g, '');
    if (rest.length > 0) {
      errors.push('填充符 = 之后还有其他字符 / characters found after padding');
    } else if (trailing > 2) {
      errors.push('填充符超过 2 个 / more than 2 padding characters');
    }
  }

  const coreLen = b64.replace(/=+$/, '').length;
  if (coreLen % 4 === 1) {
    errors.push('长度 % 4 余 1：数据疑似被截断 / length remainder is 1, data looks truncated');
  }

  const estimatedBytes = Math.floor((coreLen * 3) / 4);

  return { valid: errors.length === 0, errors, invalidPositions, estimatedBytes };
}

export function decodeBase64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function encodeBytesToBase64(bytes: Uint8Array, options: { urlSafe?: boolean } = {}): string {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  let b64 = btoa(binary);
  if (options.urlSafe) {
    b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  return b64;
}

export function utf8ToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

export function bytesToUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}
