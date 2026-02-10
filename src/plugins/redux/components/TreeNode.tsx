import { memo, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../common/theme/ThemeContext';
import { spacing } from '../../../common/theme/spacing';
import { typography } from '../../../common/theme/typography';

export interface TreeNodeData {
  key: string;
  value: unknown;
  depth: number;
}

function valueColor(
  v: unknown,
  colors: {
    textMuted: string;
    syntaxString: string;
    syntaxNumber: string;
    syntaxBool: string;
    textPrimary: string;
  }
): string {
  if (v === null) return colors.textMuted;
  if (typeof v === 'string') return colors.syntaxString;
  if (typeof v === 'number') return colors.syntaxNumber;
  if (typeof v === 'boolean') return colors.syntaxBool;
  return colors.textPrimary;
}

function formatValue(v: unknown): string {
  if (v === null) return 'null';
  if (typeof v === 'string') return `"${v}"`;
  if (typeof v === 'object' && v !== null) {
    if (Array.isArray(v)) return `Array(${v.length})`;
    return `Object {...}`;
  }
  return String(v);
}

function TreeNodeComponent({
  keyName,
  value,
  depth,
}: {
  keyName: string;
  value: unknown;
  depth: number;
}) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(depth < 2);
  const isObject = value !== null && typeof value === 'object';
  const isExpandable =
    isObject &&
    (Array.isArray(value)
      ? value.length > 0
      : Object.keys(value as object).length > 0);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        node: {
          borderLeftWidth: 1,
          borderLeftColor: colors.borderSubtle,
          paddingLeft: spacing.xs,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 2,
          gap: 4,
        },
        leaf: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 2,
          paddingLeft: spacing.sm,
        },
        pressed: {
          backgroundColor: 'rgba(127,13,242,0.08)',
        },
        arrow: {
          ...typography.mono,
          color: colors.primary,
          fontSize: 10,
        },
        key: {
          ...typography.mono,
          color: colors.textPrimary,
          fontWeight: '600',
          fontSize: 12,
        },
        type: {
          ...typography.mono,
          color: colors.textMuted,
          fontSize: 11,
        },
        value: {
          ...typography.mono,
          fontSize: 12,
        },
        children: {
          marginLeft: spacing.xs,
        },
      }),
    [colors]
  );

  if (!isExpandable) {
    return (
      <Pressable
        style={({ pressed }) => [styles.leaf, pressed && styles.pressed]}
      >
        <Text style={styles.key}>{keyName}: </Text>
        <Text style={[styles.value, { color: valueColor(value, colors) }]}>
          {formatValue(value)}
        </Text>
      </Pressable>
    );
  }

  const obj = value as Record<string, unknown>;
  const keys = Array.isArray(obj)
    ? Object.keys(obj).map(Number)
    : Object.keys(obj);

  return (
    <View style={[styles.node, { marginLeft: depth * spacing.md }]}>
      <Pressable
        onPress={() => setExpanded((e) => !e)}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <Text style={styles.arrow}>{expanded ? '▼' : '▶'}</Text>
        <Text style={styles.key}>{keyName}</Text>
        <Text style={styles.type}>
          {Array.isArray(obj) ? `Array(${obj.length})` : 'Object {...}'}
        </Text>
      </Pressable>
      {expanded && (
        <View style={styles.children}>
          {keys.map((k) => (
            <TreeNodeComponent
              key={String(k)}
              keyName={String(k)}
              value={Array.isArray(obj) ? obj[k as number] : obj[k]}
              depth={depth + 1}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export const TreeNode = memo(TreeNodeComponent);
