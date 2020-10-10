#!/usr/bin/env node

// https://github.com/saojs/sao/blob/v1.7.1/bin/cli.js
// and https://github.com/saojs/sao/blob/master/bin/cli.js

const cli = require("cac")();
const sao = require("sao");
const pkg = require("./package.json");

const githubOrg = 'PublicI';

cli
  .command("[outDir]", "Generate a new project")
  .action((generator, outDir, flags) => {
    const options = Object.assign(
      {
        generator: `${githubOrg}/${generator}`,
        outDir: outDir || ".",
        updateCheck: true,
      },
      flags
    );

    return sao(options).run().catch(sao.handleError);
  })
  .option("-y, --yes", "Use the default options")
  .option("--debug", "Show debug logs");

cli.help();
cli.version(pkg.version);

cli.parse();
