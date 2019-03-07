#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');
const path = require("path");
const program = require('commander');

const multiplyRems = function (files, regex, coeff) {
  files.forEach(function (file) {
    const src = fs.readFileSync(file).toString("utf-8");
    const result = src.replace(regex, function (match, contents) {
      const rem = parseFloat(contents, 10);
      const result = `${rem * coeff}rem`;
      return `${rem * coeff}rem`;
    });
    fs.writeFileSync(file, result, "utf-8");
  });
};

program
  .command("multiply <sourcedir>")
  .alias("m")
  .option("-c, --coefficient <m>", "Coefficient applyed to rem units", parseFloat)
  .action(function (sourcedir, options) {
    const coefficient = parseFloat(options.coefficient);
    if (isNaN(options.coefficient)) {
      console.error('Coefficient should be a valid float number');
      process.exit(1);
    }
    glob(path.join(sourcedir, "**/*.less"), function (err, files) {
      multiplyRems(files, /([+-]?[0-9]+\.?[0-9]*)rem/g, coefficient);
      console.log("done");
    });
  });

program
  .command("remcalc <sourcedir>")
  .alias("r")
  .option("-c, --coefficient <m>", "Coefficient applyed when replacing rem-calc", parseFloat)
  .action(function (sourcedir, options) {
    const coefficient = parseFloat(options.coefficient);
    if (isNaN(options.coefficient)) {
      console.error('Coefficient should be a valid float number');
      process.exit(1);
    }
    glob(path.join(sourcedir, "**/*.less"), function (err, files) {
      multiplyRems(files, /rem-calc\(([+-]?[0-9]+\.?[0-9]*)\)/g, coefficient);
      console.log("done");
    });
  });

program.parse(process.argv);
