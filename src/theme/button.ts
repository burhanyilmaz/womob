import { cva } from 'class-variance-authority';

export const button = cva([''], {
  variants: {
    variant: {
      solid: 'px-6 py-4 bg-zinc-900 rounded-lg',
      secondary: 'px-6 py-4 bg-zinc-200 border-zinc-900 rounded-lg',
      outline: 'px-6 py-3 bg-zinc-100 border-zinc-900 rounded-lg border-b1',
    },
    title: {
      solid: 'text-callout leading-callout font-Medium text-white text-center',
      outline: 'text-callout leading-callout font-Medium text-zinc-900 text-center',
      secondary: 'text-callout leading-callout font-Medium text-zinc-900 text-center',
    },
  },
});
