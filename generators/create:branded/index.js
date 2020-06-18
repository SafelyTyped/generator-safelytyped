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
    this.argument("typeName", { type: String, required: true });
    this.argument("baseType", { type: String, required: true });
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
      baseType: this.options.baseType,
      typeName: this.options.typeName
    };
    defaults = { ...defaults, ...options };

    const data = fs.readFileSync(path, "utf8");
    defaults = { ...JSON.parse(data), ...defaults };

    // now, we need to add in the license that's being used
    const packageJsonPath = this.destinationPath() + "/package.json";
    if (!this.fs.exists(packageJsonPath)) {
      this.log("Error!! Cannot find your package.json file.");
      this.log("We expected it to be here: " + packageJsonPath);
      throw new Error("package.json not found; aborting");
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    if (packageJson.license.toLowerCase().startsWith("SEE")) {
      packageJson.license = "Proprietary";
    }

    // merge the license in with everything else
    defaults = { ...defaults, ...{ license: packageJson.license }};
  }

  writing() {
    // shorthand
    defaults.errorName = "Invalid" + defaults.typeName;
    const errorDestPath = this.destinationPath("src/v1/Errors/" + defaults.errorName);
    const typeDestPath = this.destinationPath("src/v1/" + defaults.typeName);

    // step 1 - we need our license-specific header
    let header = "";
    this.fs.copyTpl(
      this.templatePath("headers/" + defaults.license + ".ts"),
      this.destinationPath("src/v1/" + defaults.typeName + "/index.ts"),
      defaults
    );
    header = this.fs.read(typeDestPath + "/index.ts", "utf8");
    defaults = { ...defaults, ...{ typescriptHeader: header }};

    // step 2 - copy the code into place
    [
      {
        src: "type/isData.ts",
        dest: typeDestPath + "/is" + defaults.typeName + "Data.ts"
      },
      {
        src: "type/make.ts",
        dest: typeDestPath + "/make" + defaults.typeName + ".ts"
      },
      {
        src: "type/mustBeData.ts",
        dest: typeDestPath + "/mustBe" + defaults.typeName + "Data.ts"
      },
      {
        src: "type/type.ts",
        dest: typeDestPath + "/" + defaults.typeName + ".ts"
      },
      {
        src: "type/validateData.ts",
        dest: typeDestPath + "/validate" + defaults.typeName + "Data.ts"
      },
      {
        src: "errors/data.ts",
        dest: errorDestPath + "/Invalid" + defaults.typeName + "Data.ts"
      },
      {
        src: "errors/error.ts",
        dest: errorDestPath + "/Invalid" + defaults.typeName + "Error.ts"
      },
      {
        src: "errors/error.spec.ts",
        dest: errorDestPath + "/Invalid" + defaults.typeName + "Error.spec.ts"
      },
      {
        src: "errors/index.ts",
        dest: errorDestPath + "/index.ts"
      }
    ].forEach((template) => {
      this.fs.copyTpl(
        this.templatePath(template.src),
        template.dest,
        defaults
      )
    });
  }

  end() {
    // all done
    this.log();
    this.log("We have created your new branded type in:");
    this.log();
    this.log("    ./src/v1");
    this.log();
    this.log("Next steps:");
    this.log();
    this.log(`- review all of the files we have created`);
    this.log(`- update parent module index.ts files`);
    this.log(`- complete the validation code`);
    this.log(`- complete the unit tests`);
    this.log(`- add them all to git`);
  }
};
