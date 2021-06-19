const path = require('path');
const { generateTheme, getLessVars } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, '../src'),    //对应具体位置
  antDir: path.join(__dirname, '../node_modules/antd'), //对应具体位置
  varFile: path.join(__dirname, '../src/theme/vars.less'), //对应具体位置
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background'
  ],
  outputFilePath: path.join(__dirname, '../public/color.less'),
}

module.exports = function(){
  return generateTheme(options)
  .then(less => {
    console.log('编译主题成功！');
  })
  .catch(error => {
      console.log('编译主题失败！', error);
      return error
    });
}