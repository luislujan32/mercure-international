export type NavigationItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  icon?: string;
  keywords?: string[];
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type BenefitItem = {
  title: string;
  description: string;
};

export type RouteItem = {
  title: string;
  description: string;
  href?: string;
};

export type StatItem = {
  value: string;
  label: string;
  description: string;
  sourceLabel: string;
};

export type TargetAudienceItem = {
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};
