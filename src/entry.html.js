import template from './template.html';

const html = context => template({
  title: 'Odd/Even Parking in Syracuse, NY',
  description: 'A simple website to help you better understand which side of the street to be parked on in Syracuse, NY. The city of Syracuse uses odd/even parking, or alternative-side parking, to make sure snowplows and street-sweepers have access on narrow roads.',
  script: context.htmlWebpackPlugin.files.js,
  stylesheet: context.htmlWebpackPlugin.files.css,
});

export default html;
