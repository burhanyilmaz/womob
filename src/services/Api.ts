import type { ApiPostType, CategoryType, MediaType } from '@utils/types/BlogTypes';
import wretch, { Wretch } from 'wretch';

class API {
  instance: Wretch = wretch('');

  createApiInstance(url: string) {
    this.instance = wretch(url).options({
      mode: 'cors',
      credentials: 'include',
      caches: 'default',
    });
  }

  getPost(pagination: number): Promise<ApiPostType[]> {
    return this.instance
      .url(`wp-json/wp/v2/posts?order_by=date&per_page=12&page=${pagination || 1}`)
      .get()
      .json(result => result);
  }

  searchPost(term: string): Promise<ApiPostType[]> {
    return this.instance
      .url(
        `wp-json/wp/v2/posts?search=${term}&orderby=relevance&per_page=50&search_columns=post_title`,
      )
      .get()
      .json(result => result);
  }

  getCategories(postId: string): Promise<CategoryType[]> {
    return this.instance
      .url(`wp-json/wp/v2/categories?post=${postId}`)
      .get()
      .json(result => result);
  }

  getMediaByUrl(mediaUrl: string): Promise<MediaType> {
    return fetch(mediaUrl).then(response => response.json());
  }
}

export const api = new API();
