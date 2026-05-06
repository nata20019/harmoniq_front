export const selectArticles = state => state.articles.items;
export const selectIsLoading = state => state.articles.isLoading;
export const selectError = state => state.articles.error;
export const selectMyArticles = state => state.articles.ownItems; 