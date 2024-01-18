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
  content: {
    rendered: string;
  };
  categories: number[];
  section: number[];
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
