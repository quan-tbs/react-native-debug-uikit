import { LegendList, type LegendListRenderItemProps } from '@legendapp/list';
import { useCallback, useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  GlassOverlay,
  GlassCard,
  GlassButton,
  IconSymbol,
  ICONS,
} from '../common/components';
import { useTheme, type ThemeMode } from '../common/theme/ThemeContext';
import { spacing } from '../common/theme/spacing';
import { typography } from '../common/theme/typography';
import { useDebugToolkit } from '../core/DebugToolkitContext';
import { OPEN_PLUGIN, CLOSE } from '../core/NavigationState';
import type { DebugToolPlugin } from '../core/types';
import type { Colors } from '../common/theme/colors';

const THEME_CYCLE: Array<'system' | 'light' | 'dark'> = [
  'system',
  'light',
  'dark',
];

const staticStyles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    maxHeight: '90%',
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  themeToggle: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolButton: {
    width: '100%',
    minHeight: 120,
    alignItems: 'flex-start',
  },
  toolContent: {
    alignItems: 'flex-start',
  },
  grid: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  columnWrapper: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  toolItem: {
    flex: 1,
    minHeight: 120,
    minWidth: 0,
  },
});

interface DashboardStyles {
  title: TextStyle;
  iconText: TextStyle;
  themeToggleText: TextStyle;
  toolName: TextStyle;
  toolSubtitle: TextStyle;
  badge: TextStyle;
  footer: ViewStyle;
  footerText: TextStyle;
  footerDivider: TextStyle;
}

function createDashboardStyles(colors: Colors): DashboardStyles {
  return {
    title: {
      ...typography.title,
      color: colors.textPrimary,
    },
    iconText: {
      color: colors.textPrimary,
      fontSize: 18,
    },
    themeToggleText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    toolName: {
      ...typography.subtitle,
      color: colors.textPrimary,
      marginTop: spacing.xs,
    },
    toolSubtitle: {
      ...typography.caption,
      color: colors.textMuted,
      marginTop: 2,
    },
    badge: {
      ...typography.caption,
      color: colors.error,
      marginTop: 4,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.sm,
      marginTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.borderSubtle,
      gap: spacing.sm,
    },
    footerText: {
      ...typography.mono,
      color: colors.neonGreen,
      fontSize: 12,
    },
    footerDivider: {
      color: colors.textMuted,
      fontSize: 12,
    },
  };
}

export function DashboardOverlay() {
  const { plugins, dispatch } = useDebugToolkit();
  const { themeMode, setThemeMode, colors } = useTheme();

  const cycleTheme = () => {
    const idx = THEME_CYCLE.indexOf(themeMode);
    const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length] as ThemeMode;
    setThemeMode(next);
  };

  const dynamicStyles = useMemo(() => createDashboardStyles(colors), [colors]);

  const themeIcon = useMemo(() => {
    if (themeMode === 'system') {
      return `${ICONS.SUN}/${ICONS.MOON}`;
    }
    return themeMode === 'light' ? ICONS.SUN : ICONS.MOON;
  }, [themeMode]);

  const renderPluginItem = useCallback(
    ({ item }: LegendListRenderItemProps<DebugToolPlugin>) => (
      <View
        style={[
          staticStyles.toolItem,
          item.gridSpan === 2 && { width: '100%' }, // eslint-disable-line react-native/no-inline-styles
        ]}
      >
        <GlassButton
          style={staticStyles.toolButton}
          onPress={() => dispatch({ type: OPEN_PLUGIN, pluginId: item.id })}
        >
          <View style={staticStyles.toolContent}>
            <IconSymbol
              symbol={item.icon}
              color={item.iconColor}
              size={32}
              glowColor={item.iconColor}
            />
            <Text style={dynamicStyles.toolName}>{item.name}</Text>
            {item.subtitle ? (
              <Text style={dynamicStyles.toolSubtitle}>{item.subtitle}</Text>
            ) : null}

            {item.badge != null && (
              <Text
                style={[
                  dynamicStyles.badge,
                  item.badgeColor && { color: item.badgeColor },
                ]}
              >
                {String(item.badge)}
              </Text>
            )}
          </View>
        </GlassButton>
      </View>
    ),
    [dispatch, dynamicStyles]
  );

  return (
    <GlassOverlay onBackdropPress={() => dispatch({ type: CLOSE })}>
      <GlassCard style={staticStyles.card}>
        <View style={staticStyles.header}>
          <Text style={dynamicStyles.title}>DebugRN</Text>
          <View style={staticStyles.headerRight}>
            <Pressable
              onPress={cycleTheme}
              style={staticStyles.themeToggle}
              accessibilityLabel={`Theme: ${themeMode}`}
            >
              <Text style={dynamicStyles.themeToggleText}>{themeIcon}</Text>
            </Pressable>
            <GlassButton
              circular
              onPress={() => dispatch({ type: CLOSE })}
              icon={
                <IconSymbol
                  symbol={ICONS.CLOSE}
                  size={18}
                  color={colors.textPrimary}
                />
              }
            />
          </View>
        </View>

        <LegendList<DebugToolPlugin>
          data={plugins}
          keyExtractor={(item: DebugToolPlugin) => item.id}
          renderItem={renderPluginItem}
          numColumns={2}
          columnWrapperStyle={staticStyles.columnWrapper}
          contentContainerStyle={staticStyles.grid}
          showsVerticalScrollIndicator={false}
          recycleItems
          estimatedItemSize={120}
        />

        <View style={dynamicStyles.footer}>
          <Text style={dynamicStyles.footerText}>FPS: 60</Text>
          <Text style={dynamicStyles.footerDivider}>|</Text>
          <Text style={dynamicStyles.footerText}>RAM: 150 MB</Text>
          <Text style={dynamicStyles.footerDivider}>|</Text>
          <Text style={dynamicStyles.footerText}>CPU: 12%</Text>
        </View>
      </GlassCard>
    </GlassOverlay>
  );
}
