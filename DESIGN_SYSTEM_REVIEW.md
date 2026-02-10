# Design System Review - React Native Debug Toolkit

**Ngày review:** 10/02/2026  
**Phong cách:** Glassmorphism  
**Platform:** React Native (Native only, no third-party dependencies)

---

## 📊 Tổng quan

Design-system của bạn được thiết kế tốt với cấu trúc rõ ràng, tuân thủ best practices của React Native. Dưới đây là đánh giá chi tiết và các đề xuất cải thiện.

---

## ✅ Điểm mạnh

### 1. **Cấu trúc Design Tokens**
- ✅ Tách biệt rõ ràng: `colors`, `spacing`, `radius`, `typography`, `shadows`
- ✅ Type-safe với TypeScript
- ✅ Export tập trung qua `common/theme/index.ts`

### 2. **Theme Context Implementation**
- ✅ Sử dụng `useColorScheme()` để detect system theme
- ✅ Support `light` | `dark` | `system` modes
- ✅ `useMemo` để optimize performance
- ✅ Proper error handling khi component ngoài ThemeProvider

### 3. **Component Pattern**
- ✅ Tất cả components đều dùng `useMemo` với `StyleSheet.create`
- ✅ Dependency array đúng với `[colors]`
- ✅ Consistent pattern across components

### 4. **Platform-Specific Handling**
- ✅ Shadows: iOS (`shadowColor`, `shadowOffset`, etc.) vs Android (`elevation`)
- ✅ Typography: Platform-specific monospace fonts

---

## ⚠️ Vấn đề cần sửa ngay

### 1. **Hardcoded Colors trong `SearchInput.tsx`** ✅ ĐÃ SỬA

**File:** `src/common/components/SearchInput.tsx`

**Vấn đề:** Hardcode `rgba(0,0,0,0.2)` thay vì dùng design tokens

```typescript
// ❌ Hiện tại
backgroundColor: 'rgba(0,0,0,0.2)',  // Hardcoded
```

**Sửa thành:**
```typescript
// ✅ Đúng
backgroundColor: colors.surfaceLight,  // Dùng design token
```

### 2. **Emoji Icons thay vì SVG**

**File:** `src/common/components/SearchInput.tsx`, `src/screens/DashboardOverlay.tsx`

**Vấn đề:** Sử dụng emoji (`🔍`, `☀️`, `🌙`, `✕`) làm icons

**Best Practice:** React Native không có backdrop-filter như web, nhưng nên dùng:
- Unicode symbols từ SF Symbols (iOS) hoặc Material Icons (Android)
- Hoặc custom SVG components
- Hoặc icon fonts

**Đề xuất:** Tạo `IconSymbol` component hỗ trợ cả emoji và symbol names

---

## 🔍 Đề xuất cải thiện

### 1. **Glassmorphism Opacity Values**

**Theo UI Pro Max best practices:**
- Translucent white: `rgba(255,255,255,0.1-0.3)` cho dark mode
- Translucent black: `rgba(0,0,0,0.04-0.15)` cho light mode

**Hiện tại:**
```typescript
// Dark mode
surfaceLight: 'rgba(255,255,255,0.03)',  // ← Quá mờ (3%)
borderLight: 'rgba(255,255,255,0.08)',   // ← OK
borderSubtle: 'rgba(255,255,255,0.05)',  // ← OK

// Light mode
surfaceLight: 'rgba(0,0,0,0.04)',        // ← OK
borderLight: 'rgba(0,0,0,0.1)',          // ← OK
borderSubtle: 'rgba(0,0,0,0.06)',       // ← OK
```

**Đề xuất điều chỉnh:**
```typescript
// Dark mode - tăng opacity để glass effect rõ hơn
surfaceLight: 'rgba(255,255,255,0.1)',   // 10% thay vì 3%
// Hoặc thêm variant:
surfaceLightSubtle: 'rgba(255,255,255,0.03)',  // Giữ cho overlay
surfaceLightMedium: 'rgba(255,255,255,0.1)',   // Cho cards
surfaceLightStrong: 'rgba(255,255,255,0.15)', // Cho buttons
```

### 2. **Text Contrast Ratios**

**WCAG AA yêu cầu:** 4.5:1 cho body text, 3:1 cho large text

**Kiểm tra light mode:**
```typescript
textPrimary: '#1a1a1a',      // vs background '#f5f5f8' → ✅ OK (~15:1)
textSecondary: 'rgba(0,0,0,0.65)',  // → ✅ OK (~8:1)
textMuted: 'rgba(0,0,0,0.45)',      // → ⚠️ Cần check (~5:1)
```

**Đề xuất:** Tăng `textMuted` opacity lên `0.55-0.6` để đảm bảo contrast

### 3. **Thêm Glass Variants**

**Hiện tại:** Chỉ có `createGlassStyle()` với một opacity level

**Đề xuất:** Thêm variants cho các use cases khác nhau

```typescript
// src/common/theme/glassmorphism.ts

export function createGlassStyle(
  overrides: Partial<ViewStyle> = {},
  colors: Colors = darkColors,
  variant: 'subtle' | 'medium' | 'strong' = 'medium'
): ViewStyle {
  const opacityMap = {
    subtle: colors.surfaceLight,  // 3-5%
    medium: 'rgba(255,255,255,0.1)',  // 10%
    strong: 'rgba(255,255,255,0.15)',  // 15%
  };
  
  return {
    backgroundColor: variant === 'subtle' 
      ? colors.surfaceLight 
      : opacityMap[variant],
    borderWidth: 1,
    borderColor: variant === 'strong' 
      ? colors.borderLight 
      : colors.borderSubtle,
    borderRadius: radius.xl,
    ...shadows.glass,
    ...overrides,
  };
}
```

### 4. **Shadow Variants**

**Hiện tại:** Có `glass`, `neon`, `subtle`

**Đề xuất:** Thêm variants cho các trường hợp khác

```typescript
// src/common/theme/shadows.ts

export const shadows = {
  // ... existing
  
  /** Stronger glass effect */
  glassStrong: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
        }
      : { elevation: 8 }),
  } as ViewStyle,
  
  /** Colored glow variants */
  glowGreen: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#00ff9d',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
        }
      : { elevation: 6 }),
  } as ViewStyle,
  
  // ... thêm các màu neon khác
};
```

### 5. **Typography Enhancements**

**Hiện tại:** Có `display`, `title`, `subtitle`, `body`, `caption`, `mono`

**Đề xuất:** Thêm variants cho các use cases

```typescript
// src/common/theme/typography.ts

export const typography: Record<string, TextStyle> = {
  // ... existing
  
  /** Large display for hero sections */
  displayLarge: {
    fontSize: fontSizes.display * 1.5,  // 36px
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.display * 1.5 * lineHeights.tight,
  },
  
  /** Small caption */
  captionSmall: {
    fontSize: fontSizes.xs,  // 10px
    fontWeight: fontWeights.normal,
    lineHeight: fontSizes.xs * lineHeights.normal,
  },
  
  /** Button text */
  button: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.md * lineHeights.normal,
    letterSpacing: 0.5,
  },
};
```

### 6. **Spacing System**

**Hiện tại:** `xs=4, sm=8, md=16, lg=24, xl=32, xxl=40`

**Đề xuất:** Thêm `xxxl` cho large containers

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,  // ← Thêm cho large containers
} as const;
```

### 7. **Border Radius Consistency**

**Hiện tại:** `sm=8, md=16, lg=20, xl=24, xxl=40`

**Đề xuất:** Đảm bảo glass panels luôn dùng `xl` hoặc `xxl` (theo rule)

**Kiểm tra:** Tất cả `GlassCard`, `GlassButton` đã dùng đúng chưa?

---

## 🎨 Glassmorphism Best Practices cho React Native

### 1. **Backdrop Blur Limitation**

**Vấn đề:** React Native không có `backdrop-filter: blur()` như web

**Giải pháp hiện tại:** Dùng opacity + shadows để tạo depth

**Đề xuất:** Nếu cần blur effect thật, có thể:
- Dùng `react-native-blur` (nhưng bạn muốn tránh third-party)
- Hoặc giữ nguyên approach hiện tại (opacity + shadows) - **Đây là lựa chọn tốt**

### 2. **Layering Strategy**

**Best Practice:** Tạo depth bằng cách:
1. Background layer: Solid color với opacity thấp
2. Border layer: Thin border với opacity cao hơn
3. Shadow layer: Multiple shadows với offsets khác nhau

**Hiện tại:** Bạn đã làm tốt với `shadows.glass`

### 3. **Light Mode Considerations**

**Vấn đề:** Glassmorphism khó nhìn hơn trong light mode

**Giải pháp:**
- Tăng opacity của borders trong light mode
- Dùng darker backgrounds
- Tăng contrast của text

**Hiện tại:** Bạn đã có light mode colors, nhưng cần test contrast

---

## 📝 Checklist Implementation

### Immediate Fixes (Cần sửa ngay)
- [x] ✅ Thay hardcoded color trong `SearchInput.tsx` (ĐÃ SỬA)
- [ ] Test contrast ratios trong light mode
- [ ] Cải thiện icon system (thay emoji bằng symbols)

### Short-term Improvements (1-2 tuần)
- [ ] Thêm glass variants (`subtle`, `medium`, `strong`)
- [ ] Thêm shadow variants (`glassStrong`, `glowGreen`, etc.)
- [ ] Thêm typography variants (`displayLarge`, `button`, `captionSmall`)
- [ ] Thêm `spacing.xxxl`

### Long-term Enhancements (Tùy chọn)
- [ ] Tạo icon system thay thế emoji
- [ ] Thêm animation variants cho glass effects
- [ ] Document design tokens với examples
- [ ] Tạo Storybook/Component showcase

---

## 🔗 References

- [UI Pro Max Glassmorphism Guidelines](.shared/ui-ux-pro-max/)
- [React Native Styling Best Practices](https://reactnative.dev/docs/style)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## 💡 Kết luận

Design-system của bạn đã có nền tảng tốt với:
- ✅ Cấu trúc rõ ràng
- ✅ Type-safe
- ✅ Performance optimized
- ✅ Platform-aware

**Priority fixes:**
1. Fix syntax error trong `colors.ts`
2. Standardize color usage (không hardcode)
3. Test và điều chỉnh contrast ratios

**Nice-to-have:**
- Thêm variants cho flexibility
- Cải thiện icon system
- Document tốt hơn

Bạn muốn tôi implement các fixes này không?
