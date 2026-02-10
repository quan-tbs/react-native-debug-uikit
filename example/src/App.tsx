import { Text, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  DebugToolkitProvider,
  GlassCard,
  GlassButton,
  colors,
  type DebugToolPlugin,
  type PluginScreenProps,
} from 'react-native-debug-toolkit';

function CustomToolScreen({ onClose }: PluginScreenProps) {
  return (
    <GlassCard style={customStyles.card}>
      <Text style={customStyles.title}>Custom Add-on Tool</Text>
      <Text style={customStyles.subtitle}>
        This plugin was added via the plugins prop.
      </Text>
      <GlassButton title="Close" onPress={onClose} />
    </GlassCard>
  );
}

const customPlugin: DebugToolPlugin = {
  id: 'custom',
  name: 'Custom',
  subtitle: 'Add-on',
  icon: '🔧',
  iconColor: colors.neonCyan,
  order: 55,
  component: CustomToolScreen,
};

export default function App() {
  return (
    <DebugToolkitProvider enabled={true} plugins={[customPlugin]} theme="light">
      <View style={styles.container}>
        <FastImage
          style={styles.logo as any}
          source={{
            uri: 'https://via.placeholder.com/100',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.title}>Debug Toolkit Example</Text>
        <Text style={styles.hint}>
          Tap the floating bug button to open the dashboard.
        </Text>
      </View>
    </DebugToolkitProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#f5f5f8', // Light theme background
    paddingTop: 100,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a', // Light theme text primary
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.55)', // Light theme text muted
  },
});

const customStyles = StyleSheet.create({
  card: {
    padding: 24,
    minHeight: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 16,
  },
});
