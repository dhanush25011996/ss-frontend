import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: true,
  },
  filters: {
    category: 'all',
    sortBy: 'newest',
    search: '',
  },
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    addPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      state.loading = false;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload };
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    likePost: (state, action) => {
      const { postId, isLiked } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.isLiked = isLiked;
        post.likes = isLiked ? post.likes + 1 : post.likes - 1;
      }
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetPosts: (state) => {
      state.posts = [];
      state.pagination = {
        page: 1,
        limit: 10,
        total: 0,
        hasMore: true,
      };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setPosts,
  addPosts,
  addPost,
  updatePost,
  deletePost,
  setCurrentPost,
  likePost,
  addComment,
  setPagination,
  setFilters,
  resetPosts,
} = blogSlice.actions;

// Selectors
export const selectPosts = (state) => state.blog.posts;
export const selectCurrentPost = (state) => state.blog.currentPost;
export const selectBlogLoading = (state) => state.blog.loading;
export const selectBlogError = (state) => state.blog.error;
export const selectPagination = (state) => state.blog.pagination;
export const selectFilters = (state) => state.blog.filters;

export default blogSlice.reducer;
