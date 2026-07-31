import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  {
    ignores: ['out/**', '.next/**', '_next/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
      // This is a static export with full-page navigation by design (see CLAUDE.md) — every
      // internal link is a plain <a>, never next/link, so this rule fights the architecture.
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];

export default eslintConfig;
