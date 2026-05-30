"use client";

import {
  BookOpen,
  Code,
  FileCode,
  Brain,
  Layers,
  Cpu,
  Terminal,
  Database,
  Globe,
  Zap,
  LucideProps,
} from "lucide-react";
import type { FC } from "react";

const iconMap: Record<string, FC<LucideProps>> = {
  BookOpen,
  Code,
  FileCode,
  Brain,
  Layers,
  Cpu,
  Terminal,
  Database,
  Globe,
  Zap,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = iconMap[name] ?? BookOpen;
  return <Icon {...props} />;
}
