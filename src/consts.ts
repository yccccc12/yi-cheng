export const SITE_TITLE = 'YC | Yi Cheng';
export const SITE_DESCRIPTION = 'AI engineer: OCR, RAG and local LLM systems';
export const SITE_URL = process.env.SITE_URL || 'https://example.com';

export const PORTRAIT: { light: string; dark?: string } | undefined = {
  light: '/portrait-color.webp',
  dark: '/portrait-color.webp',
};

export const LINKS = [
  { label: 'Email', href: 'mailto:ycgoh04@gmail.com' },
  { label: 'Resume', href: '/resume.pdf' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yi-cheng-goh/' },
  { label: 'GitHub', href: 'https://github.com/yccccc12' },
];
