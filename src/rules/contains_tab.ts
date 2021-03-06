import {IRule} from "./rule";
import {ParsedFile} from "../file";
import {Issue} from "../issue";
import Position from "../position";

export class ContainsTabConf {
  public enabled: boolean = true;
}

export class ContainsTab implements IRule {

  private conf = new ContainsTabConf();

  public getKey(): string {
    return "contains_tab";
  }

  public getDescription(): string {
    return "Code contains tab";
  }

  public getConfig() {
    return this.conf;
  }

  public setConfig(conf) {
    this.conf = conf;
  }

  public run(file: ParsedFile) {
    let issues: Array<Issue> = [];
    let lines = file.getRaw().split("\n");
    for (let line = 0; line < lines.length; line++) {
      if (/\t/.test(lines[line])) {
        let issue = new Issue(this, new Position(line + 1, 1), file);
        issues.push(issue);
      }
    }
    return issues;
  }

}