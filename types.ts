import { LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Partner {
  name: string;
  logoText: string; // Using text placeholder for logos to avoid external broken links, normally this would be an image URL
}