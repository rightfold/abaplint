import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "GET foobar.",
  "GET foobar LATE.",
  "GET foobar FIELDS field1 field2.",
  "GET foobar LATE FIELDS field.",
];

statementType(tests, "GET", Statements.Get);