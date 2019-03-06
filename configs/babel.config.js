module.exports = () => {
  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'usage' }],
  ];

  const plugins = [
    '@babel/proposal-object-rest-spread',
  ];

  return {
    presets,
    plugins,
  };
};
