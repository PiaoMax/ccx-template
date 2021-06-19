import loadable from "@loadable/component";
import login from "@/pages/login";
import main from "@/pages/main";
import { RouterUtil } from "@cyber-ccx/lib";
 //$IMPORT$

export default RouterUtil.createConfig([
  login(),
  main([
    //$MORE$
  ]),
]);
