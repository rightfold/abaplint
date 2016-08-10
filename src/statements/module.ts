import { Statement } from "./statement";
import Reuse from "./reuse";
import * as Combi from "../combi";

let str = Combi.str;
let seq = Combi.seq;
let alt = Combi.alt;
let opt = Combi.opt;

export class Module extends Statement {

  public static get_matcher(): Combi.IRunnable {
    return seq(str("MODULE"), Reuse.form_name(), opt(alt(str("INPUT"), str("OUTPUT"))));
  }

}