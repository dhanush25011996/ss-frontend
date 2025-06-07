import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Fab,
  TextField,
  InputAdornment,
  Chip,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { BlogPost } from '../components/features';
import { Loading, Dialog, Button, Input } from '../components/common';
import {
  selectPosts,
  selectBlogLoading,
  selectFilters,
  setFilters,
  likePost,
  addComment,
  addPost
} from '../store/slices/blogSlice';

const BlogFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectBlogLoading);
  const filters = useSelector(selectFilters);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  // Mock data for demonstration
  const mockPosts = [
    {
      id: 1,
      title: "My First Week Journey",
      content: "Starting this journey has been challenging but rewarding. I've learned so much about myself and my habits. The community support here is incredible, and I'm grateful for everyone who shares their experiences. It's not easy, but every day gets a little better. I'm focusing on building healthy routines and staying accountable to my goals.",
      author: {
        name: "Alex Johnson",
        avatar: null
      },
      createdAt: "2024-01-15T10:30:00Z",
      tags: ["motivation", "first-week", "journey"],
      likes: 12,
      comments: [
        {
          author: { name: "Sarah M.", avatar: null },
          content: "Great job on your first week! Keep it up!",
          createdAt: "2024-01-15T11:00:00Z"
        }
      ],
      isLiked: false
    },
    {
      id: 2,
      title: "Tips for Building Better Habits",
      content: "After 30 days, here are some strategies that have worked for me: 1) Start small and be consistent, 2) Track your progress daily, 3) Find an accountability partner, 4) Celebrate small wins, 5) Don't be too hard on yourself when you slip up. Remember, this is a marathon, not a sprint.",
      author: {
        name: "Mike Chen",
        avatar: null
      },
      createdAt: "2024-01-14T15:45:00Z",
      tags: ["tips", "habits", "30-days"],
      likes: 25,
      comments: [
        {
          author: { name: "Emma R.", avatar: null },
          content: "These tips are gold! Thank you for sharing.",
          createdAt: "2024-01-14T16:00:00Z"
        },
        {
          author: { name: "David L.", avatar: null },
          content: "The accountability partner tip really works!",
          createdAt: "2024-01-14T17:30:00Z"
        }
      ],
      isLiked: true
    }
  ];

  const categories = ['all', 'motivation', 'tips', 'journey', 'milestone', 'support'];

  const handleSearchChange = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }));
  };

  const handleLikePost = (postId, isLiked) => {
    dispatch(likePost({ postId, isLiked }));
  };

  const handleCommentPost = (postId, comment) => {
    const newComment = {
      author: { name: "Current User", avatar: null },
      content: comment,
      createdAt: new Date().toISOString()
    };
    dispatch(addComment({ postId, comment: newComment }));
  };

  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        author: {
          name: "Current User",
          avatar: null
        },
        createdAt: new Date().toISOString(),
        tags: newPost.tags,
        likes: 0,
        comments: [],
        isLiked: false
      };
      
      dispatch(addPost(post));
      setNewPost({ title: '', content: '', tags: [] });
      setCreateDialogOpen(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newPost.tags.includes(tagInput.trim())) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         post.content.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === 'all' || 
                           post.tags.some(tag => tag.toLowerCase().includes(filters.category.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Community Blog
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Share your journey, tips, and experiences with the community.
        </Typography>

        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search posts..."
            value={filters.search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                onClick={() => handleCategoryChange(category)}
                color={filters.category === category ? 'primary' : 'default'}
                variant={filters.category === category ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Box>

        {/* Posts */}
        {loading ? (
          <Loading type="card-skeleton" />
        ) : (
          <Box>
            {filteredPosts.map((post) => (
              <BlogPost
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                createdAt={post.createdAt}
                tags={post.tags}
                likes={post.likes}
                comments={post.comments}
                isLiked={post.isLiked}
                onLike={handleLikePost}
                onComment={handleCommentPost}
                onShare={(post) => console.log('Share post:', post)}
              />
            ))}
          </Box>
        )}

        {/* Create Post FAB */}
        <Fab
          color="primary"
          aria-label="create post"
          onClick={() => setCreateDialogOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>

        {/* Create Post Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          title="Create New Post"
          maxWidth="md"
          actions={
            <>
              <Button
                variant="outlined"
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleCreatePost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
              >
                Publish
              </Button>
            </>
          }
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 400 }}>
            <Input
              label="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              fullWidth
            />
            
            <Input
              label="Content"
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              multiline
              rows={6}
              fullWidth
            />

            <Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Input
                  label="Add tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  size="small"
                />
                <Button variant="outlined" onClick={handleAddTag} size="small">
                  Add
                </Button>
              </Box>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {newPost.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Container>
  );
};

export default BlogFeed;
