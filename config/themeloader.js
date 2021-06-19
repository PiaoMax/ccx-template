const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');
const _ = require('lodash');

let allless = {};
let distless;

module.exports = function loader(content,map,meta){
    let pk = loaderUtils.interpolateName(this, "[path][name]", { content });
    if(pk.includes('node_modules')){
      return content;
    }
    let option = loaderUtils.getOptions(this);
    if(!distless&&fs.existsSync(option.dist)){
      distless = fs.readFileSync(option.dist).toString();
    }
    let varless = fs.readFileSync(option.vars).toString();
    while(varless.indexOf('@import') !== -1){
      let _a1 = varless.indexOf('@import');
      let _a2 = varless.substring(_a1).indexOf(';') + _a1;
      varless = varless.substring(_a2+1);
    }
    
    const css = content.toString('utf8');

  	let reslist = [];
    let last_temp = '';
    let css_temp = css;

    while(css_temp.indexOf('var(') !== -1){
      /** var( */
      let n1 = css_temp.indexOf('var(');
      /** }.xxx{} 最前的一个括号 */
      let n5 = css_temp.substring(0,n1).lastIndexOf('}');
       /** ".xxxx{} 最前的一个引号 */
      let n5_2 = css_temp.substring(0,n1).lastIndexOf("\"");
      n5 = n5 === -1?n5_2:n5;
       /** {color:var();} 前一个括号 */
      let n4 = css_temp.substring(0,n1).lastIndexOf('{');
      /** {color:var();} 后一个括号 */
      let n4_2 = css_temp.substring(n1).indexOf('}') + n1;
      /** 选择器 */
      
      let varselect = css_temp.substring(n5+1,n4-1);

      if(varselect.includes('keyframes')){
        css_temp = css_temp.substring(n4_2);
        continue;
      }
      /** 整个样式块里的所有样式 */
      let child_css = css_temp.substring(n4,n4_2);
      let child_csslist = [];
      while(child_css.indexOf('var(') !== -1){
        /** var( */
        let _c1 = child_css.indexOf('var(');
        /** var(  )后一個括號 */
        let _c2 = child_css.substring(_c1).indexOf(')') + _c1;
        /** var();后一个分号 */
        let _c2_2 = child_css.substring(_c1).indexOf(';') + _c1;
        /** var(里面的值) */
        let varname = child_css.substring(_c1+4,_c2);
        /** 替换成less变量 */
        let varvalue = child_css.substring(_c1+4,_c2_2).replace(varname+')',varname.replace('--',' @'));
        /** ;color:var(); 前一个分号 */
        let _c3 = child_css.substring(0,_c1).lastIndexOf(';');
        /** {color:var();} 前一个括号 */
        let _c4 = child_css.substring(0,_c1).lastIndexOf('{');
        _c3 = _c3 < _c4?_c4:_c3;
        /** css的键 */
        let varkey = child_css.substring(_c3+1,_c1);
        child_csslist.push(`${varkey}${varvalue};`);
        child_css = child_css.substring(_c2_2);
      }
      
      let res = `${varselect}{${child_csslist.join('')}}\n`;
      reslist.push(res.replace(/\\n/g,''));
      css_temp = css_temp.substring(n4_2);
    }

    allless[pk] = reslist.join('');
    if(reslist.length){
      fs.writeFileSync(option.dist,distless+varless+_.values(allless).join(''));
    }
    return content;
    
}

module.exports.raw = true;
