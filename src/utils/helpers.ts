import { Dimensions, Insets } from 'react-native';

export const { width, height } = Dimensions.get('screen');

export const getHitSlop = (
  params: Insets & { value?: number } = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    value: 10,
  },
): Insets | undefined => {
  const { value, top, left, right, bottom } = params;

  return {
    top: top || value,
    left: left || value,
    right: right || value,
    bottom: bottom || value,
  };
};

export function replaceHtmlEntitiesWithUnicode(input: string) {
  return input
    .replace(/&#[0-9]+;/g, function (match) {
      const decimalCode = parseInt(match.substring(2, match.length - 1), 10);

      return String.fromCharCode(decimalCode)?.replace(/&amp;/g, '&');
    })
    .replace(/&amp;/g, '&');
}

export function removeHtmlEntities(value: string) {
  return value.replace(/<[^>]*>/g, '');
}

export function removeHtmlAndDecimalEntities(value: string) {
  try {
    return removeHtmlEntities(replaceHtmlEntitiesWithUnicode(value));
  } catch {
    return value;
  }
}

export const convertUrl = (url: string) => {
  let convertedUrl = url;

  if (!convertedUrl.startsWith('https://')) {
    convertedUrl = 'https://' + convertedUrl;
  }

  if (!convertedUrl.endsWith('/')) {
    convertedUrl = convertedUrl + '/';
  }

  return convertedUrl;
};

export const checkUrlIsValid = (url: string) => {
  if (!url) {
    return false;
  }

  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const urlRegex = new RegExp(expression);

  return !!url.match(urlRegex)?.length;
};
