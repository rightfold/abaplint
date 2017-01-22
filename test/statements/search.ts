import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "SEARCH foo-bar FOR '/' STARTING AT 2.",
  "search foo for bar in byte mode.",
  "search foo for bar in character mode starting at lv_start.",
];

statementType(tests, "SEARCH", Statements.Search);