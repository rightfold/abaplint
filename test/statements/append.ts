import {statementType, statementVersion} from "../utils";
import * as Statements from "../../src/statements/";
import {Version} from "../../src/version";

let tests = [
  "APPEND lt_table.",
  "append 'sdf' to lt_foo.",
  "APPEND INITIAL LINE TO lt_lines ASSIGNING <ls_line>.",
  "APPEND LINES OF lt_objects TO gt_programs.",
  "APPEND is_definition-definition TO ls_obj_old-wdyd-defin.",
  "APPEND <ls_component> TO ls_obj_old-wdyc-ccomp.",
  "APPEND <ls_node>-obj_name TO lt_findstrings.",
  "APPEND LINES OF read_text_online( ) TO rt_repos.",
  "APPEND foo TO <fs>.",
  "APPEND read_controller( ls_controller_key ) TO rs_component-ctlr_metadata.",
  "APPEND INITIAL LINE TO lt_key_tab REFERENCE INTO key.",
  "APPEND <lv_code>+1 TO lt_commented.",
  "APPEND INITIAL LINE TO <ls_data>-sub ASSIGNING FIELD-SYMBOL(<ls_sub>).",
  "APPEND '000000e8' && lv_sha1 && ' HEAD' && get_null( ) && lv_reply TO lt_reply.",
  "APPEND 'foo' && 'bar' TO lt_foo.",
  "APPEND lo_commit->get_pretty( ) TO rt_commits.",
  "APPEND |foo| TO lt_foo.",
  "APPEND <ls_snode>-name+11 TO rt_types.",
  "APPEND lo_commit->get_pretty( foo = bar ) TO rt_commits.",
  "APPEND lo_commit->get_pretty( foo = bar moo = boo ) TO rt_commits.",
  "APPEND lo_commit->get_pretty( 1 + 1 ) TO rt_commits.",
  "APPEND LINES OF explode( ii_object = lo_parent iv_deepen = iv_deepen - 1 ) TO rt_objects.",
  "APPEND lo_foo->call( )->chain( ) TO rt_commits.",
  "APPEND lo_branch->get_data( )-sha1 TO lt_visit.",
  "APPEND LINES OF foobar FROM 2 TO 3 TO result.",
  "APPEND INITIAL LINE TO lt_tab ASSIGNING <fs> CASTING.",
  "APPEND ls_field->node TO <ls_data>-fields SORTED BY table_line.",
];

statementType(tests, "APPEND", Statements.Append);

let versions = [
  {abap: "APPEND VALUE #( key = is_key meta = it_meta ) TO mt_files.", ver: Version.v740sp02},
  {abap: "APPEND INITIAL LINE TO <ls_data>-sub ASSIGNING FIELD-SYMBOL(<ls_sub>).", ver: Version.v740sp02},
];

statementVersion(versions, "APPEND", Statements.Append);