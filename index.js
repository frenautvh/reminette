const fs = require('fs');
const glob = require('glob');
const path = require("path");
const program = require('commander');

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
      files.forEach(function (file) {
        const src = fs.readFileSync(file).toString("utf-8");
        var count = 0;
        const result = src.replace(/([+-]?[0-9]+\.?[0-9]*)?rem/g, function (match, contents) {
          const rem = parseFloat(contents, 10);
          const result = `${rem * coefficient}rem`;
          count++;
          return `${rem * coefficient}rem`;
        });
        console.log(` > ${path.relative(sourcedir, file)}, replaced ${count} rem units`);
        fs.writeFileSync(file, result, "utf-8");
      });
    });
  });

program.parse(process.argv);
