import type { Colors } from '../theme/colors';

export type TokenType =
  | 'key'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'punctuation'
  | 'whitespace';

export interface Token {
  type: TokenType;
  value: string;
  color: string;
}

const DEFAULT_COLORS = {
  key: '#ff79c6',
  string: '#8be9fd',
  number: '#00FF41',
  boolean: '#ffb86c',
  null: '#ff5555',
  punctuation: 'rgba(255,255,255,0.5)',
  whitespace: 'transparent',
};

/**
 * Simple JSON tokenizer for syntax highlighting.
 * Returns array of { type, value, color } for rendering.
 */
export function tokenizeJson(
  json: string,
  colorMap: Partial<Record<TokenType, string>> = {}
): Token[] {
  const colors: Record<TokenType, string> = { ...DEFAULT_COLORS, ...colorMap };
  const tokens: Token[] = [];
  let i = 0;

  const peek = (): string => json[i] ?? '';
  const advance = (): string => json[i++] ?? '';
  const rest = () => json.slice(i);

  while (i < json.length) {
    const c = peek();

    if (c === '"') {
      let value = c;
      advance();
      while (i < json.length) {
        const ch = advance();
        value += ch;
        if (ch === '\\') value += advance();
        else if (ch === '"') break;
      }
      tokens.push({ type: 'string', value, color: colors.string });
      continue;
    }

    if (/[0-9-]/.test(c) && (i === 0 || /[\s,:\[\{]/.test(json[i - 1] ?? ''))) {
      let value = '';
      if (c === '-') value += advance();
      while (/[0-9.]/.test(peek())) value += advance();
      tokens.push({ type: 'number', value, color: colors.number });
      continue;
    }

    if (rest().startsWith('true')) {
      i += 4;
      tokens.push({ type: 'boolean', value: 'true', color: colors.boolean });
      continue;
    }
    if (rest().startsWith('false')) {
      i += 5;
      tokens.push({ type: 'boolean', value: 'false', color: colors.boolean });
      continue;
    }
    if (rest().startsWith('null')) {
      i += 4;
      tokens.push({ type: 'null', value: 'null', color: colors.null });
      continue;
    }

    if (c === '"') {
      let value = '';
      advance();
      while (peek() !== '"' && i < json.length) value += advance();
      advance();
      tokens.push({ type: 'key', value: `"${value}"`, color: colors.key });
      continue;
    }

    if (/[\s\n\r]/.test(c)) {
      let value = '';
      while (/[\s\n\r]/.test(peek()) && i < json.length) value += advance();
      tokens.push({ type: 'whitespace', value, color: colors.whitespace });
      continue;
    }

    if (/[{}\[\],:]/.test(c)) {
      const v = advance();
      tokens.push({
        type: 'punctuation',
        value: v,
        color: colors.punctuation,
      });
      continue;
    }

    if (c === '"') {
      advance();
      let value = '"';
      while (peek() !== '"' && i < json.length) {
        if (peek() === '\\') value += advance() + advance();
        else value += advance();
      }
      if (peek() === '"') value += advance();
      tokens.push({ type: 'key', value, color: colors.key });
      continue;
    }

    const char = advance();
    tokens.push({
      type: 'punctuation',
      value: char || c,
      color: colors.punctuation,
    });
  }

  return tokens;
}

/**
 * Split JSON string into lines and assign line numbers.
 */
export function jsonToLines(
  json: string
): { lineNumber: number; content: string }[] {
  return json.split(/\n/).map((content, index) => ({
    lineNumber: index + 1,
    content,
  }));
}

/**
 * Map theme colors to tokenizer color map.
 */
export function colorsToSyntaxMap(
  colors: Pick<
    Colors,
    'syntaxKey' | 'syntaxString' | 'syntaxNumber' | 'syntaxBool' | 'syntaxNull'
  >
) {
  return {
    key: colors.syntaxKey,
    string: colors.syntaxString,
    number: colors.syntaxNumber,
    boolean: colors.syntaxBool,
    null: colors.syntaxNull,
  };
}
