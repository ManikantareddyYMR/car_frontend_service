// ========================================
// src/components/StatsCard.jsx

import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Eye,
  Car,
  Calendar,
  Zap
} from 'lucide-react';

const icons = {
  trending: TrendingUp,
  trendingUp: TrendingUp,
  users: Users,
  dollar: DollarSign,
  activity: Activity,
  cart: ShoppingCart,
  shoppingCart: ShoppingCart,
  package: Package,
  barChart: BarChart3,
  eye: Eye,
  car: Car,           // Added for "Total Cars"
  calendar: Calendar, // Added for "Avg Year"
  zap: Zap,          // Added for "Brands"
};

const colorSchemes = {
  blue: {
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
    text: 'rgba(147, 197, 253, 1)',
    icon: 'rgba(96, 165, 250, 1)',
  },
  green: {
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.3)',
    text: 'rgba(134, 239, 172, 1)',
    icon: 'rgba(74, 222, 128, 1)',
  },
  purple: {
    bg: 'rgba(168, 85, 247, 0.1)',
    border: 'rgba(168, 85, 247, 0.3)',
    text: 'rgba(216, 180, 254, 1)',
    icon: 'rgba(192, 132, 252, 1)',
  },
  orange: {
    bg: 'rgba(249, 115, 22, 0.1)',
    border: 'rgba(249, 115, 22, 0.3)',
    text: 'rgba(253, 186, 116, 1)',
    icon: 'rgba(251, 146, 60, 1)',
  },
  pink: {
    bg: 'rgba(236, 72, 153, 0.1)',
    border: 'rgba(236, 72, 153, 0.3)',
    text: 'rgba(249, 168, 212, 1)',
    icon: 'rgba(244, 114, 182, 1)',
  },
  yellow: {
    bg: 'rgba(234, 179, 8, 0.1)',
    border: 'rgba(234, 179, 8, 0.3)',
    text: 'rgba(253, 224, 71, 1)',
    icon: 'rgba(250, 204, 21, 1)',
  },
};

export default function StatsCard({ title, value, icon, color }) {
  // Default to Activity icon if the specified icon doesn't exist
  const Icon = icons[icon] || Activity;
  
  // Default to blue color scheme if the specified color doesn't exist
  const scheme = colorSchemes[color] || colorSchemes.blue;

  const styles = {
    card: {
      background: scheme.bg,
      backdropFilter: 'blur(4px)',
      border: `1px solid ${scheme.border}`,
      borderRadius: '0.75rem',
      padding: '1rem',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: scheme.text,
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    value: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: 'white',
      marginTop: '0.25rem',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.container}>
        <div>
          <p style={styles.title}>{title}</p>
          <p style={styles.value}>{value}</p>
        </div>
        <Icon size={40} color={scheme.icon} />
      </div>
    </div>
  );
}