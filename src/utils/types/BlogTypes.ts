export type MediaType = {
  guid: {
    rendered: string;
  };
  media_details: {
    sizes: {
      medium: {
        source_url: string;
      };
    };
  };
};

export type ApiPostType = {
  id: string;
  title: {
    rendered: string;
  };
  primary_category: {
    name?: string;
  };
  _links: {
    'wp:featuredmedia': { href: string }[];
  };
};

export type CategoryType = {
  id: string;
  name: string;
};
