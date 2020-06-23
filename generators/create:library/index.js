/* eslint-disable prettier/prettier */
/* eslint-disable complexity */
/* eslint-disable capitalized-comments */
"use strict";
const fs = require("fs");
const findUp = require("find-up");
const Generator = require("yeoman-generator");
const userHome = require("user-home");
// const chalk = require("chalk");

let defaults = {};
let path;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("repoName", { type: String, required: true });
  }

  initializing() {
    // we start with whatever Yeoman stored locally
    defaults = this.config.getAll().promptValues || {};

    // where is the config file?
    path = findUp.sync(".yo-safelytyped.json");
    if (path === undefined) {
      path = userHome + "/.yo-safelytyped.json";
    }

    // `this.options` is polluted with other things
    // we have to explicitly extract what we want from it
    // to safely use it :(
    const options = {
      repoName: this.options.repoName,
    };
    defaults = { ...defaults, ...options };

    const data = fs.readFileSync(path, "utf8");
    defaults = { ...JSON.parse(data), ...defaults };
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log("Welcome to the SafelyTyped Typescript library generator!");
    this.log("========================================================");

    const branchingChoices = [
      {
        name: "Gitflow / Hubflow",
        value: "gitflow"
      },
      {
        name: "Github Flow",
        value: "githubflow"
      }
    ];

    const licenseChoices = [
      {
        name: "All Rights Reserved / Proprietary",
        value: "Proprietary"
      },
      {
        name: `BSD 2-Clause "Simplified" License`,
        value: "BSD-2-Clause"
      },
      {
        name: "BSD 3-Clause License (aka New-BSD License)",
        value: "BSD-3-Clause"
      },
      {
        name: "GNU Affero General Public License v3.0 or later",
        value: "AGPL-3.0-or-later"
      },
      {
        name: "GNU General Public License v2.0 or later",
        value: "GPL-2.0-or-later"
      },
      {
        name: "GNU General Public License v3.0 or later",
        value: "GPL-3.0-or-later"
      },
      {
        name: "MIT License",
        value: "MIT"
      }
    ];
    const prompts = [
      {
        type: "string",
        name: "githubOrg",
        message: "Which Github org/user will host this?",
        default: defaults.githubOrg || ""
      },
      {
        type: "string",
        name: "repoName",
        message: "What will your repo be called?",
        default: defaults.repoName || this.appname || ""
      },
      {
        type: "confirm",
        name: "packageIsScoped",
        message: "Is this going to be a scoped package?",
        default: true,
      },
      {
        type: "string",
        name: "packageName",
        message: "What will your NPM package be called?",
        default: defaults.packageName || ""
      },
      {
        type: "string",
        name: "packageDescription",
        message: "Describe your package (for package.json)",
        default: defaults.packageDescription || ""
      },
      {
        type: "string",
        name: "copyrightHolder",
        message: "Who owns the copyright to this code?",
        default: defaults.copyrightHolder || ""
      },
      {
        type: "string",
        name: "copyrightWebsite",
        message: "What is the website for the copyright holder?",
        default: defaults.copyrightWebsite || ""
      },
      {
        type: "string",
        name: "copyrightYear",
        message: "What year does the copyright start from?",
        default: defaults.copyrightYear || new Date().getFullYear()
      },
      {
        type: "string",
        name: "packageContactEmail",
        message: "Where can people email you about this package?",
        default: defaults.packageContactEmail || ""
      },
      {
        type: "string",
        name: "authorName",
        message: "Who is the author of this package?",
        default: defaults.authorName || ""
      },
      {
        type: "string",
        name: "authorEmail",
        message: "What is the author's email address?",
        default: defaults.authorEmail || ""
      },
      {
        type: "string",
        name: "authorWebsite",
        message: "What is the author's website?",
        default: defaults.authorWebsite || ""
      },
      {
        type: "list",
        name: "license",
        message: "Which license will your code use?",
        choices: licenseChoices,
        default: defaults.license || ""
      },
      {
        type: "list",
        name: "branchingModel",
        message: "Which branching model will your repo use?",
        choices: branchingChoices,
        defaults: defaults.branchingModel || ""
      }
    ];

    return this.prompt(prompts).then(answers => {
      // special case - NPM / SPDX doesn't handle proprietary licenses
      answers.npmLicense = answers.license;
      if (answers.license === "Proprietary") {
        answers.npmLicense = "SEE LICENSE IN LICENSE.md";
      }

      // To access props later use this.props.someAnswer;
      this.answers = answers;

      // merge our answers into our existing defaults
      // this will preserve defaults created in our other generators
      defaults = { ...defaults, ...answers };
    });
  }

  writing() {
    // save our answers for next time
    //
    // this is handy for stashing answers at the per-github-org folder
    // level
    fs.writeFileSync(userHome + "/.yo-safelytyped.json", JSON.stringify(defaults, null, 2) + "\n");
    fs.writeFileSync(path, JSON.stringify(defaults, null, 2) + "\n");

    // alright, let's turn the answers into action

    // step 1: these files exist in every project
    [
      {
        src: ".eslintrc.js",
      },
      {
        src: ".github"
      },
      {
        src: ".gitignore",
      },
      {
        src: ".nycrc.json",
      },
      {
        src: "AUTHORS.md",
      },
      {
        src: "CHANGELOG.md",
      },
      {
        src: "MAINTAINERS.md",
      },
      {
        src: "package.json",
      },
      {
        src: "README.md",
      },
      {
        src: "tsconfig.json",
      },
      {
        src: "tslint.json",
      },
      {
        src: "typedoc.json"
      },
      {
        src: "docs/maintainers-all",
        dest: "docs/maintainers"
      },
      {
        src: "docs/maintainers-" + this.answers.branchingModel,
        dest: "docs/maintainers"
      }
    ].forEach((template) => {
      template.dest = template.dest || template.src;
      this.fs.copyTpl(
        this.templatePath(template.src),
        this.destinationPath(this.answers.repoName + "/" + template.dest),
        defaults
      );
    });

    // step 2 - files that vary based on license
    this.fs.copyTpl(
      this.templatePath("LICENSES/" + this.answers.license + ".md"),
      this.destinationPath(this.answers.repoName + "/LICENSE.md"),
      defaults
    );
    this.fs.copyTpl(
      this.templatePath("indexes/" + this.answers.license + ".ts"),
      this.destinationPath(this.answers.repoName + "/src/v1/index.ts"),
      defaults
    );
    this.fs.copyTpl(
      this.templatePath("indexes/" + this.answers.license + ".ts"),
      this.destinationPath(this.answers.repoName + "/src/v1/Errors/index.ts"),
      defaults
    );
    this.fs.append(
      this.destinationPath(this.answers.repoName + "/src/v1/Errors/index.ts"),
`
export * from "./defaults/MODULE_NAME";
`
    );
    this.fs.copyTpl(
      this.templatePath("indexes/" + this.answers.license + ".ts"),
      this.destinationPath(this.answers.repoName + "/src/v1/Errors/defaults/MODULE_NAME.ts"),
      defaults
    );
    this.fs.append(
      this.destinationPath(this.answers.repoName + "/src/v1/Errors/defaults/MODULE_NAME.ts"),
`
import { makeNodeJSModuleName } from "@safelytyped/core-types";

/**
 * \`MODULE_NAME\` is used by all of our errors to show which package they
 * were defined in.
 */
export const MODULE_NAME = makeNodeJSModuleName("${this.answers.packageName}/lib/v1");
`
    );

    // step 3 - files that we do not create for Proprietary works
    if (this.answers.license !== "Proprietary") {
      [
        {
          src: "CONTRIBUTING.md"
        },
        {
          src: "CODE-OF-CONDUCT.md"
        },
        {
          src: "docs/contributors-all",
          dest: "docs/contributors"
        },
        {
          src: "docs/contributors-" + this.answers.branchingModel,
          dest: "docs/contributors"
        }
      ].forEach((template) => {
        template.dest = template.dest || template.src;
        this.fs.copyTpl(
          this.templatePath(template.src),
          this.destinationPath(this.answers.repoName + "/" + template.dest),
          defaults
        );
      });
    }

    // finally, we want to write our defaults into the new repo folder
    // too
    //
    // these will get picked up by any generators we run inside the folder
    this.fs.write(
      this.destinationPath(".yo-safelytyped.json"),
      JSON.stringify(defaults, null, 2) + "\n"
    );
    this.fs.write(
      this.destinationPath(this.answers.repoName + "/.yo-safelytyped.json"),
      JSON.stringify(defaults, null, 2) + "\n"
    );
  }

  end() {
    // all done
    this.log();
    this.log("We have created your new project skeleton in:");
    this.log();
    this.log("    ./" + this.answers.repoName);
    this.log();
    this.log("Next steps:");
    this.log();
    this.log(`- cd ${this.answers.repoName} && git init .`);
    this.log(`- review all of the files we have created`);
    this.log(`- npm install`);
    this.log(`- add them all to git`);
    this.log(`- git push to your remote repository`);
  }
};
