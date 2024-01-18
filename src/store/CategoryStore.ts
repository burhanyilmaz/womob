import { api } from '@services/Api';
import { removeHtmlAndDecimalEntities } from '@utils/helpers';
import { CategoryType } from '@utils/types/BlogTypes';
import { t } from 'mobx-state-tree';

export const Category = t.model({
  id: t.identifier,
  title: t.maybe(t.string),
});

const CategoryStore = t
  .model('CategoryStore', {
    categories: t.map(Category),
  })
  .views(self => ({
    categoryName(categoryIds: string[]) {
      const category: string[] = [];
      categoryIds.forEach(id => {
        category.push(removeHtmlAndDecimalEntities(self.categories.get(id)?.title || ''));
      });

      return category.join(' & ') || 'Category';
    },
  }))
  .actions(self => ({
    async getCategories() {
      const categories = await api.getAllCategories();
      if (!categories.length) {
        const sections = await api.getAllSections();
        sections.forEach(this.addCategory);
      } else {
        categories.forEach(this.addCategory);
      }
    },

    addCategory: (category: CategoryType) => {
      self.categories.set(category.id, { id: category.id.toString(), title: category.name });
    },

    clearAll() {
      self.categories.clear();
    },
  }));

const categoryStore = CategoryStore.create({});

export default categoryStore;
