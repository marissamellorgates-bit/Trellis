import {
  Lock, Home, Users, Briefcase, Building, Tent,
  Heart, Globe, GraduationCap, Sprout, Sun, TreePine,
  Church, Music, Palette, Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { UserCommunity, CommunityConfig } from '../types';

// ── Icon Registry ─────────────────────────────────────────────

export const COMMUNITY_ICON_MAP: Record<string, LucideIcon> = {
  Lock,
  Home,
  Users,
  Briefcase,
  Building,
  Tent,
  Heart,
  Globe,
  GraduationCap,
  Sprout,
  Sun,
  TreePine,
  Church,
  Music,
  Palette,
  Star,
};

export const ICON_PICKER_OPTIONS: { key: string; icon: LucideIcon }[] = [
  { key: 'Lock', icon: Lock },
  { key: 'Home', icon: Home },
  { key: 'Users', icon: Users },
  { key: 'Briefcase', icon: Briefcase },
  { key: 'Building', icon: Building },
  { key: 'Tent', icon: Tent },
  { key: 'Heart', icon: Heart },
  { key: 'Globe', icon: Globe },
  { key: 'GraduationCap', icon: GraduationCap },
  { key: 'Sprout', icon: Sprout },
  { key: 'Sun', icon: Sun },
  { key: 'TreePine', icon: TreePine },
  { key: 'Church', icon: Church },
  { key: 'Music', icon: Music },
  { key: 'Palette', icon: Palette },
  { key: 'Star', icon: Star },
];

// ── Defaults ──────────────────────────────────────────────────

export const DEFAULT_COMMUNITIES: UserCommunity[] = [
  { id: 'private', name: 'Private Greenhouse', iconKey: 'Lock', type: 'personal', isDefault: true },
  { id: 'family', name: 'Family Garden', iconKey: 'Home', type: 'family', isDefault: false },
  { id: 'friends', name: 'Friends Circle', iconKey: 'Users', type: 'social', isDefault: false },
];

// ── Helpers ───────────────────────────────────────────────────

/** Resolve serializable UserCommunity[] → renderable CommunityConfig[] */
export function resolveCommunitiesForUI(communities: UserCommunity[]): CommunityConfig[] {
  return communities.map(c => ({
    id: c.id,
    name: c.name,
    icon: COMMUNITY_ICON_MAP[c.iconKey] ?? Lock,
    type: c.type,
  }));
}

/** Ensure Private Greenhouse is always present; return defaults if empty/null */
export function ensureDefaults(saved: UserCommunity[] | undefined | null): UserCommunity[] {
  if (!saved || saved.length === 0) return [...DEFAULT_COMMUNITIES];

  // Guarantee Private Greenhouse exists
  const hasPrivate = saved.some(c => c.id === 'private');
  if (!hasPrivate) {
    return [DEFAULT_COMMUNITIES[0], ...saved];
  }

  // Ensure Private Greenhouse has isDefault: true
  return saved.map(c => c.id === 'private' ? { ...c, isDefault: true } : c);
}
