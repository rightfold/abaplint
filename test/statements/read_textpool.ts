import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "READ TEXTPOOL lv_cp INTO lt_tpool LANGUAGE mv_language.",
  "READ TEXTPOOL lv_cp INTO lt_tpool.",
  "read textpool lv_cp language mv_lang into lt_tpool state 'A'.",
];

statementType(tests, "READ TEXTPOOL", Statements.ReadTextpool);