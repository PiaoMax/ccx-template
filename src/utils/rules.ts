import _ from 'lodash'
import {Rule} from 'rc-field-form/lib/interface'

const validate:{[k:string]:Rule} = {
  required:{required:true},
  number: {pattern:/^(\-|\+)?\d+(\.\d+)?$/,message:'请输入正确的数字'},
  integer: {pattern:/^\d+$/,message:'请输入正确的整数'},
  email: {type:'email'}
}

type ruleType = 'required'|'number'|'integer'|'email'|RegExp|Rule

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
    className:'required',
    required:true
  }:{};
  return {
    ...required,
    rules:res
  }
}

export default Rules;