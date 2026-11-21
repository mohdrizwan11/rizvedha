import {
  Atom, Award, BadgeCheck, BookOpen, Bookmark, Building2, Castle, Compass, Crown, Dna, Droplets,
  Flag, FlaskConical, Flame, Gamepad2, Globe2, GraduationCap, Home, Landmark, Layers, Leaf,
  Lightbulb, MapPin, Medal, Mountain, MountainSnow, Music, Palette, PartyPopper, PersonStanding,
  Play, Rocket, Route, Scale, Search, Ship, Sparkles, Sprout, Star, Swords, Target, Timer,
  TrainFront, Trees, TrendingUp, Trophy, UserCog, Users, Waves, Zap, Check, ChevronRight, ChevronLeft,
  ArrowRight, ArrowLeft, Shuffle, RotateCcw, BookMarked, Layers3, Eye, EyeOff, ListChecks, Brain,
  CircleCheck, Circle, X, Layers2, Grid2x2, Wrench, Quote, Info, ChevronDown, ExternalLink, Clock,
  Accessibility, Send, Settings2, FlameKindling, CalendarDays, Activity, PieChart, Printer,
  Menu, Sun, Moon, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, Mail,
  MessageCircle, LogIn, LogOut, Heart, ArrowUpRight, ShieldCheck, Sparkle, UserRound,
  Command, CornerDownLeft, ArrowUp
} from "lucide-react";
import type { LucideProps } from "lucide-react";

/* lucide dropped brand marks, so GitHub is drawn locally */
function GithubMark({ size = 24, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.9 3.17 9.06 7.57 10.53.55.1.75-.24.75-.53v-1.86c-3.08.67-3.73-1.48-3.73-1.48-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.68.08-.68 1.11.08 1.7 1.14 1.7 1.14.99 1.7 2.59 1.21 3.22.93.1-.72.39-1.21.7-1.49-2.46-.28-5.05-1.23-5.05-5.48 0-1.21.43-2.2 1.14-2.98-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.6 1.53.22 2.66.11 2.94.71.78 1.14 1.77 1.14 2.98 0 4.26-2.6 5.2-5.07 5.47.4.35.76 1.03.76 2.08v3.08c0 .3.2.64.76.53a11.1 11.1 0 0 0 7.56-10.53C23.1 5.33 18.27.5 12 .5Z" />
    </svg>
  );
}

const registry = {
  Atom, Award, BadgeCheck, BookOpen, Bookmark, Building2, Castle, Compass, Crown, Dna, Droplets,
  Flag, FlaskConical, Flame, Gamepad2, Globe2, GraduationCap, Home, Landmark, Layers, Leaf,
  Lightbulb, MapPin, Medal, Mountain, MountainSnow, Music, Palette, PartyPopper, PersonStanding,
  Play, Rocket, Route, Scale, Search, Ship, Sparkles, Sprout, Star, Swords, Target, Timer,
  TrainFront, Trees, TrendingUp, Trophy, UserCog, Users, Waves, Zap, Check, ChevronRight, ChevronLeft,
  ArrowRight, ArrowLeft, Shuffle, RotateCcw, BookMarked, Layers3, Eye, EyeOff, ListChecks, Brain,
  CircleCheck, Circle, X, Layers2, Grid2x2, Wrench, Quote, Info, ChevronDown, ExternalLink, Clock,
  Accessibility, Send, Settings2, FlameKindling, CalendarDays, Activity, PieChart, Printer,
  Menu, Sun, Moon, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, Github: GithubMark, Mail,
  MessageCircle, LogIn, LogOut, Heart, ArrowUpRight, ShieldCheck, Sparkle, UserRound,
  Command, CornerDownLeft, ArrowUp,
} as const;

export type IconName = keyof typeof registry;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (registry as Record<string, any>)[name] || Sparkles;
  return <Cmp {...props} />;
}
