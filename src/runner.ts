import * as Tokens from "./tokens/";
import {File, ParsedFile} from "./file";
import Config from "./config";
import * as Rules from "./rules/";
import Lexer from "./lexer";
import Parser from "./parser";
import {Issue} from "./issue";
import Nesting from "./nesting";
import Registry from "./registry";
import {TokenNode} from "./node";
import {Version} from "./version";
import {Downport} from "./downport";
import {Define} from "./statements";
import {MacroCall, Unknown, Statement} from "./statements/statement";
import * as Types from "./types";
import * as Formatters from "./formatters/";
import * as ProgressBar from "progress";

export default class Runner {

// todo, create constructor, which can set Config?

  public static run(files: Array<File>, conf?: Config): Array<Issue> {
    conf = conf ? conf : Config.getDefault();

    let parsed = this.parse(files, conf);

    parsed = this.fixMacros(parsed);

    return this.issues(parsed, conf);
  }

  public static parse(files: Array<File>, conf?: Config): Array<ParsedFile> {
    let ret: Array<ParsedFile> = [];

    conf = conf ? conf : Config.getDefault();

    let bar = undefined;
    if (conf.getShowProgress()) {
      bar = new ProgressBar(":percent - Lexing and parsing - :filename",
                            {total: files.length});
    }

    files.forEach((f) => {
      if (!this.skip(f)) {
        if (bar) {
          bar.tick({filename: f.getFilename()});
          bar.render();
        }

        let tokens = Lexer.run(f);
        let statements = Parser.run(tokens, conf.getVersion());
        let root = Nesting.run(statements);

        ret.push(new ParsedFile(f, tokens, statements, root));
      }
    });

    return ret;
  }

  public static fixMacros(files: Array<ParsedFile>): Array<ParsedFile> {
// todo: copies all statements? (memory)

    let reg = new Registry();

    files.forEach((f) => {
      f.getStatements().forEach((s) => {
        if (s instanceof Define) {
          reg.addMacro(s.getTokens()[1].getStr());
        }
      });
    });

    files.forEach((f) => {
      let statements: Array<Statement> = [];
      f.getStatements().forEach((s) => {
        if (s instanceof Unknown &&
            reg.isMacro(s.getTokens()[0].getStr())) {
          statements.push(new MacroCall(this.tokensToNodes(s.getTokens())));
        } else {
          statements.push(s);
        }
      });
      f.setStatements(statements);
    });

    return files;
  }

  public static issues(files: Array<ParsedFile>, conf?: Config): Array<Issue> {
    let issues: Array<Issue> = [];

    conf = conf ? conf : Config.getDefault();

    let bar = undefined;
    if (conf.getShowProgress()) {
      bar = new ProgressBar(":percent - Finding Issues - :filename",
                            {total: files.length});
    }

    for (let file of files) {
      if (bar) {
        bar.tick({filename: file.getFilename()});
        bar.render();
      }

      for (let key in Rules) {
        if (typeof Rules[key] === "function") {
          let rule: Rules.IRule = new Rules[key]();
          if (rule.getKey && conf.readByKey(rule.getKey(), "enabled") === true) {
            rule.setConfig(conf.readByRule(rule.getKey()));
            issues = issues.concat(rule.run(file));
          }
        }
      }
    }

    return issues;
  }

  public static version(): string {
// magic, see build script "version.sh"
    return "{{ VERSION }}";
  }

  public static downport(files: Array<ParsedFile>): Array<File> {
    return Downport.run(files);
  }

  public static types(file: ParsedFile) {
    return Types.Analyze.run(file);
  }

  public static format(issues: Array<Issue>, format?: string): string {
// todo, this can be done more generic
    switch (format) {
      case "total":
        return Formatters.Total.output(issues);
      case "json":
        return Formatters.Json.output(issues);
      case "code":
        return Formatters.Code.output(issues);
      default:
        return Formatters.Standard.output(issues);
    }
  }

  private static skip(file: File): boolean {
// ignore global exception classes
    if (/zcx_.*\.clas\.abap$/.test(file.getFilename())) {
      return true;
    }
    return false;
  }

  private static tokensToNodes(tokens: Array<Tokens.Token>): Array<TokenNode> {
    let ret: Array<TokenNode> = [];

    tokens.forEach((t) => {ret.push(new TokenNode("Unknown", t)); });

    return ret;
  }
}

exports.File = File;
exports.Runner = Runner;
exports.Config = Config;
exports.Version = Version;