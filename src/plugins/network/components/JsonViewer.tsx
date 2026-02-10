import type { Colors } from '../../../common/theme/colors';
import { LegendList, type LegendListRenderItemProps } from '@legendapp/list';
import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../common/theme/ThemeContext';
import { spacing } from '../../../common/theme/spacing';
import { typography } from '../../../common/theme/typography';

export interface JsonViewerProps {
  json: string;
}

function tryParse(json: string): string {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    return json;
  }
}

function colorForToken(value: string, colors: Colors): string {
  if (/^"/.test(value) && value.endsWith('"')) {
    const inner = value.slice(1, -1);
    if (/:$/.test(inner) || /^[\w_]+$/.test(inner)) return colors.syntaxKey;
    return colors.syntaxString;
  }
  if (/^-?\d+\.?\d*$/.test(value)) return colors.syntaxNumber;
  if (value === 'true' || value === 'false') return colors.syntaxBool;
  if (value === 'null') return colors.syntaxNull;
  if (/^[{}\[\],:]$/.test(value)) return colors.textMuted;
  return colors.textPrimary;
}

function tokenizeLine(
  line: string,
  colors: Colors
): { text: string; color: string }[] {
  const parts: { text: string; color: string }[] = [];
  let i = 0;
  while (i < line.length) {
    const rest = line.slice(i);
    const keyMatch = rest.match(/^(\s*)"([^"]+)":\s*/);
    if (keyMatch) {
      const full = keyMatch[0] ?? '';
      const spaces = keyMatch[1];
      const key = keyMatch[2] ?? '';
      if (spaces) parts.push({ text: spaces, color: colors.textMuted });
      parts.push({ text: `"${key}"`, color: colors.syntaxKey });
      parts.push({
        text: rest.slice(full.length, full.length + 1),
        color: colors.textMuted,
      });
      i += full.length + 1;
      continue;
    }
    const strMatch = rest.match(/^"([^"\\]|\\.)*"/);
    if (strMatch) {
      parts.push({ text: strMatch[0], color: colors.syntaxString });
      i += strMatch[0].length;
      continue;
    }
    const numMatch = rest.match(/^-?\d+\.?\d*/);
    if (numMatch) {
      parts.push({ text: numMatch[0], color: colors.syntaxNumber });
      i += numMatch[0].length;
      continue;
    }
    if (rest.startsWith('true')) {
      parts.push({ text: 'true', color: colors.syntaxBool });
      i += 4;
      continue;
    }
    if (rest.startsWith('false')) {
      parts.push({ text: 'false', color: colors.syntaxBool });
      i += 5;
      continue;
    }
    if (rest.startsWith('null')) {
      parts.push({ text: 'null', color: colors.syntaxNull });
      i += 4;
      continue;
    }
    const ch = line[i] ?? '';
    parts.push({ text: ch, color: colorForToken(ch, colors) });
    i += 1;
  }
  return parts;
}

export function JsonViewer({ json }: JsonViewerProps) {
  const { colors } = useTheme();
  const formatted = useMemo(() => tryParse(json), [json]);
  const lines = useMemo(() => formatted.split('\n'), [formatted]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          flex: 1,
          backgroundColor: colors.surfaceLight,
          borderRadius: 8,
        },
        content: {
          padding: spacing.sm,
        },
        lineRow: {
          flexDirection: 'row',
          minHeight: 18,
          marginBottom: 2,
        },
        lineNum: {
          ...typography.mono,
          color: colors.textMuted,
          fontSize: 10,
          width: 28,
          marginRight: spacing.sm,
        },
        line: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        token: {
          ...typography.mono,
          fontSize: 11,
        },
      }),
    [colors]
  );

  const renderLine = useCallback(
    ({ item: line, index }: LegendListRenderItemProps<string>) => (
      <View style={styles.lineRow}>
        <Text style={styles.lineNum}>{index + 1}</Text>
        <View style={styles.line}>
          {tokenizeLine(line, colors).map((part, i) => (
            <Text key={i} style={[styles.token, { color: part.color }]}>
              {part.text}
            </Text>
          ))}
        </View>
      </View>
    ),
    [colors, styles]
  );

  return (
    <LegendList
      data={lines}
      keyExtractor={(_, index) => String(index)}
      renderItem={renderLine}
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator
      recycleItems
      estimatedItemSize={18}
    />
  );
}
