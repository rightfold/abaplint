import {statementType, statementVersion} from "../utils";
import * as Statements from "../../src/statements/";
import {Version} from "../../src/version";

let tests = [
  "TYPES ty_type TYPE c LENGTH 6.",
  "TYPE ty_type TYPE c LENGTH 6.",
  "TYPES dummy.",
  "TYPES ty_foo_tt TYPE STANDARD TABLE OF lcl_repo=>ty_repo WITH DEFAULT KEY.",
  "TYPES ty_foo_tt TYPE STANDARD TABLE OF lcl_repo=>ty_repo-key WITH DEFAULT KEY.",
  "TYPES ty_foo_tt TYPE STANDARD TABLE OF ty_repo-key WITH DEFAULT KEY.",
  "type string1(236) TYPE c.",
  "types tt_table TYPE TABLE OF ty_field WITH NON-UNIQUE SORTED KEY bar COMPONENTS foo bar.",
  "TYPES /foo/ TYPE i.",
  "TYPES /foo/bar TYPE i.",
  "TYPES ty_bar TYPE STANDARD TABLE OF /foo/bar INITIAL SIZE 0 WITH DEFAULT KEY.",
];

statementType(tests, "TYPE", Statements.Type);

let versions = [
  {abap: "types tt_foo TYPE STANDARD TABLE OF ty_foo WITH EMPTY KEY.", ver: Version.v740sp02},
];

statementVersion(versions, "TYPE", Statements.Type);