module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-hooks/exhaustive-deps': 'warn', // Đang là 'error', đổi thành 'warn' thôi cho đỡ gắt
    '@typescript-eslint/no-unused-vars': 'off',
    semi: 'off', // Tắt dấu chấm phẩy nếu không thích
    'eol-last': 'off', // Tắt bắt dòng trắng cuối file
    'no-trailing-spaces': 'off', // Tắt bắt khoảng trắng thừa cuối dòng
    'react-native/no-inline-styles': 'off',
  },
};
