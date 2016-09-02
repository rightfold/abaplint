import { Statement } from "./statement";
import * as Combi from "../combi";
import Reuse from "./reuse";

let str = Combi.str;
let seq = Combi.seq;
let opt = Combi.opt;
let alt = Combi.alt;
let tok = Combi.tok;
let per = Combi.per;
let plus = Combi.plus;
let star = Combi.star;

export class Select extends Statement {

  public static get_matcher(): Combi.IRunnable {

    let from = seq(str("FROM"),
                   alt(Reuse.dynamic(), Reuse.database_table()),
                   opt(seq(str("AS"), Reuse.database_table())));

    let intoList = seq(str("INTO"),
                       tok("WParenLeft"),
                       star(seq(Reuse.target(), str(","))),
                       Reuse.target(),
                       str(")"));
    let intoTable = seq(alt(str("INTO"), str("APPENDING")),
                        opt(str("CORRESPONDING FIELDS OF")),
                        str("TABLE"),
                        Reuse.target());
    let intoSimple = seq(str("INTO"),
                         opt(str("CORRESPONDING FIELDS OF")),
                         Reuse.target());
    let into = alt(intoList, intoTable, intoSimple);

    let where = seq(str("WHERE"), alt(Reuse.cond(), Reuse.dynamic()));

    let order = seq(str("ORDER BY"), alt(plus(Reuse.field()), str("PRIMARY KEY"), Reuse.dynamic()));

    let forAll = seq(str("FOR ALL ENTRIES IN"), Reuse.source());

    let count = seq(str("COUNT"), alt(tok("ParenLeft"), tok("ParenLeftW")), str("*"), str(")"));

    let fields = alt(str("*"), count, plus(Reuse.field()));

    let join = seq(str("INNER JOIN"), Reuse.database_table(), str("ON"), plus(Reuse.cond()));

    let up = seq(str("UP TO"), Reuse.source(), str("ROWS"));

    let perm = per(from, plus(join), into, forAll, where, order, up);

    let ret = seq(str("SELECT"),
                  alt(str("DISTINCT"), opt(seq(str("SINGLE"), opt(str("FOR UPDATE"))))),
                  fields,
                  perm);

    return ret;
  }

}