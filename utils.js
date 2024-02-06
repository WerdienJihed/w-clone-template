import util from "util";
import { exec } from "child_process";
import chalk from "chalk";
import os from "os";
import path from "path";
import fs from "fs";

const execAsync = util.promisify(exec);
const isWindows = os.platform() === "win32";

export const cloneRepo = async (repositoryUrl, destinationDirectory) => {
  const stats = await execAsync(
    `git clone ${repositoryUrl} ${destinationDirectory}`
  );
  console.log(chalk.yellow(stats.stderr));
};

export const editIndexHtml = (directory, projectName) => {
  const filePath = path.join(directory, "index.html");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const updatedFileContent = fileContent.replace(
    "<title>React Template</title>",
    `<title>${projectName}</title>`
  );
  fs.writeFileSync(filePath, updatedFileContent);
};

export const editPackageJson = async (directory, projectName) => {
  const filePath = path.join(directory, "package.json");
  const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  fileContent.name = projectName;
  fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
};

export const editPackageLockJson = async (directory, projectName) => {
  const filePath = path.join(directory, "package-lock.json");
  const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  fileContent.name = projectName;
  fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
};

export const removeGitFolder = async (destinationDirectory) => {
  const removeGitFolderCommand = isWindows
    ? "powershell.exe -command remove-item .git -recurse -force"
    : "rm -rf .git";

  await execAsync(removeGitFolderCommand, {
    cwd: destinationDirectory,
  });
};

export const initGit = async (directory) => {
  let stats = await execAsync(`git init`, {
    cwd: directory,
  });

  console.log(chalk.green(stats.stdout));

  stats = await execAsync(`git add .`, {
    cwd: directory,
  });

  stats = await execAsync(`git commit -m "initial commit"`, {
    cwd: directory,
  });
};

export const removeReadme = async (directory) => {
  const removeGitFolderCmd = isWindows
    ? "powershell.exe -command remove-item README.md -recurse -force"
    : "rm -rf README.md";

  await execAsync(removeGitFolderCmd, {
    cwd: directory,
  });
};

export const resetGit = async (destinationDirectory) => {
  await removeGitFolder(destinationDirectory);

  await initGit(destinationDirectory);

  console.log(chalk.green(stats.stdout));
};
