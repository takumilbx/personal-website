import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

const root = path.resolve(process.cwd(), 'content');

/** Read a YAML file under content/ at build time. */
export function readYaml<T>(relative: string): T {
  const file = path.join(root, relative);
  return load(fs.readFileSync(file, 'utf8')) as T;
}

export interface Link { label: string; href: string }

export interface HomeContent {
  title: string;
  description: string;
  brand: string;
  year: string;
  marquee: string;
  nav: Link[];
  social: Link[];
  drawer: { navLabel: string; socialLabel: string };
  footer: { left: string[]; right: string[] };
  hero: { background: string; cutout: string; cutoutAlt: string; magnet: boolean };
  media: { src: string; alt: string }[];
  about: { heading: string; paragraph: string; cta: Link };
  services: { heading: string; items: { name: string; description: string }[] };
  projects: {
    heading: string;
    buttonLabel: string;
    items: { slug: string; category: string; images: string[] }[];
  };
  closing: string;
}
