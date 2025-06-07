import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Avatar,
  IconButton,
  Chip,
  Collapse,
  Divider,
  TextField,
  Button as MuiButton
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BlogPost = ({
  id,
  title,
  content,
  author,
  createdAt,
  tags = [],
  likes = 0,
  comments = [],
  isLiked = false,
  onLike,
  onComment,
  onShare,
  ...props
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [likesCount, setLikesCount] = useState(likes);

  const handleLikeClick = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    if (onLike) {
      onLike(id, newLikedState);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() && onComment) {
      onComment(id, newComment.trim());
      setNewComment('');
    }
  };

  const handleShareClick = () => {
    if (onShare) {
      onShare({ id, title, content, author });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        mb: 2,
      }}
      {...props}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={author.avatar}
            sx={{ bgcolor: 'primary.main' }}
          >
            {author.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              {author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(createdAt)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
          {title}
        </Typography>

        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          {content.length > 200 ? `${content.substring(0, 200)}...` : content}
        </Typography>

        {tags.length > 0 && (
          <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleLikeClick}
          sx={{ color: liked ? 'error.main' : 'text.secondary' }}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {likesCount}
        </Typography>

        <IconButton
          aria-label="comments"
          onClick={handleExpandClick}
          sx={{ color: 'text.secondary', ml: 1 }}
        >
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {comments.length}
        </Typography>

        <IconButton
          aria-label="share"
          onClick={handleShareClick}
          sx={{ color: 'text.secondary', ml: 1 }}
        >
          <ShareIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          {content.length > 200 && (
            <>
              <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.6, mb: 2 }}>
                {content}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </>
          )}

          <Typography variant="subtitle2" gutterBottom>
            Comments ({comments.length})
          </Typography>

          {comments.map((comment, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Avatar
                  src={comment.author.avatar}
                  sx={{ width: 24, height: 24, bgcolor: 'secondary.main' }}
                >
                  {comment.author.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="subtitle2" fontSize="0.875rem">
                  {comment.author.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(comment.createdAt)}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ ml: 4 }}>
                {comment.content}
              </Typography>
            </Box>
          ))}

          <Box display="flex" gap={1} mt={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleCommentSubmit();
                }
              }}
            />
            <MuiButton
              variant="contained"
              size="small"
              onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <SendIcon fontSize="small" />
            </MuiButton>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

BlogPost.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  likes: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  })),
  isLiked: PropTypes.bool,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onShare: PropTypes.func,
};

export default BlogPost;
