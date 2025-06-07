import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error = false,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  startIcon,
  endIcon,
  multiline = false,
  rows = 4,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const getEndAdornment = () => {
    if (type === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleTogglePasswordVisibility}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      );
    }
    if (endIcon) {
      return (
        <InputAdornment position="end">
          {endIcon}
        </InputAdornment>
      );
    }
    return null;
  };

  const getStartAdornment = () => {
    if (startIcon) {
      return (
        <InputAdornment position="start">
          {startIcon}
        </InputAdornment>
      );
    }
    return null;
  };

  return (
    <TextField
      type={getInputType()}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      InputProps={{
        startAdornment: getStartAdornment(),
        endAdornment: getEndAdornment(),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
      }}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  size: PropTypes.oneOf(['small', 'medium']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default Input;
