import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import colors from '@theme/colors';
import { width } from '@utils/helpers';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';

type Props = {
  html?: string;
  customContentWidth?: number;
};

const customHTMLElementModels = {
  iframe: iframeModel,
};

const renderers = {
  iframe: IframeRenderer,
};

const HtmlToNativeViewer = ({ html, customContentWidth }: Props) => {
  if (!html) {
    return null;
  }

  return (
    <RenderHtml
      WebView={WebView}
      source={{ html }}
      tagsStyles={styles}
      renderers={renderers}
      renderersProps={{
        iframe: {
          webViewProps: {},
          scalesPageToFit: true,
        },
        img: {
          enableExperimentalPercentWidth: true,
        },
      }}
      contentWidth={customContentWidth || width - 40}
      customHTMLElementModels={customHTMLElementModels}
    />
  );
};

const styles = StyleSheet.create({
  a: {},
  li: {
    marginVertical: 4,
    color: colors.zinc[700],
  },
  h1: {
    marginVertical: 6,
    color: colors.zinc[700],
  },
  h2: {
    marginVertical: 6,
    color: colors.zinc[700],
  },
  h3: {
    marginVertical: 6,
    color: colors.zinc[700],
  },
  h4: {
    marginVertical: 6,
    color: colors.zinc[700],
  },
  h5: {
    marginVertical: 6,
    color: colors.zinc[700],
  },
  h6: {
    marginVertical: 6,
    color: colors.zinc[700],
  },
  img: {
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  p: {
    marginVertical: 4,
    fontSize: 16,
    width: width - 40,
    color: colors.zinc[700],
  },
  b: {
    color: colors.zinc[700],
  },
});

export default memo(HtmlToNativeViewer);
