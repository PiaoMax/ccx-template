import _ from 'lodash'
import {Rule} from 'rc-field-form/lib/interface'

const validate:{[k:string]:Rule} = {
  required:{required:true},
  number: {pattern:/^(\-|\+)?\d+(\.\d+)?$/,message:'请输入正确的数字'},
  integer: {pattern:/^\d+$/,message:'请输入正确的整数'},
  email: {type:'email'},
  phone: {pattern:/^1\d{10}$/,message:'请输入11位手机号码'},
  price: {pattern: /^(\d+)(.\d{0,2})?$/ , message: '只能是数字，正数，小数点字最多2位'},
}

type ruleType = 'required'|'number'|'integer'|'email'|'phone'|'price'|RegExp|Rule

const Rules = (...rules :ruleType[]) => {
  let isRequired = false;
  let res = rules.map(v=>{
    if(_.isString(v)){
      if(v === 'required'){
        isRequired = true;
      }
      return validate[v];
    }else if(_.isRegExp(v)){
      return { pattern: v,message:`请输入正确的格式`}
    }else{
      return v;
    }
  })
  let required = isRequired?{
    // className:'required',
    required:true
  }:{};
  return {
    ...required,
    rules:res
  }
}

export default Rules;