import { cva } from 'class-variance-authority';

export const text = cva(['items-center justify-center'], {
  variants: {
    type: {
      title40: 'text-[40px] leading-[44px] font-Medium',
      title1: 'text-title1 leading-title1 font-Light ',
      title2: 'text-title2 leading-title2 font-Regular',
      title3: 'text-title3 leading-title3 font-Regular',
      title4: 'text-[16px] leading-[18px] font-SemiBold',
      headline: 'text-headline leading-headline font-SemiBold',
      body: 'text-body leading-body font-Regular',
      callout: 'text-callout leading-callout font-Regular',
      subhead: 'text-subhead leading-subhead font-Regular',
      footnote: 'text-footnote leading-footnote font-Regular',
      caption1: 'text-caption1 leading-caption1 font-Regular',
      caption2: 'text-caption2 leading-caption2 font-Regular',
      subtitle: 'text-callout leading-callout font-Medium',
      subtitle1: 'text-[13px] leading-[16px] font-Medium',
    },
    size: {
      title1XLarge: 'text-[30px] leading-[36px]',
      title1XXLarge: 'text-[32px] leading-[39px]',
      title1XXXLarge: 'text-[34px] leading-[41px]',
    },
    isCenter: {
      true: 'text-center',
    },
    tabTitleIsActive: {
      true: 'font-Medium text-[12px] text-zinc-900',
      false: 'font-Regular text-[12px] text-zinc-400',
    },
  },
});
