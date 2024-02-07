#! /usr/bin/env node
import { program, Option } from "commander";
import path from "path";

import { handleReact, handleExpress, handleMern } from "./script.js";

program
  .name("w-clone-template")
  .description(
    "A command-line tool to quickly set up a new project based on a template."
  )
  .version("0.0.1");

program
  .requiredOption("-n, --name <name>", "Project name")
  .option("-d, --directory <path>", "Destination directory")
  .addOption(
    new Option("-t, --template <template-name>", "Template to clone from")
      .choices(["react", "express", "mern"])
      .default("react")
  );

program.parse();
const options = program.opts();

const projectName = options.name;
const directory = options.directory
  ? path.join(options.directory, projectName)
  : path.join(process.cwd(), projectName);

const template = options.template;

switch (template) {
  case "react":
    await handleReact(directory, projectName);
    break;
  case "express":
    await handleExpress(directory, projectName);
    break;
  case "mern":
    await handleMern(directory, projectName);
    break;
  default:
    break;
}
