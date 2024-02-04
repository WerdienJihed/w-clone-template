import util from "util";
import { exec } from "child_process";
import chalk from "chalk";
import os from "os";

const execAsync = util.promisify(exec);
const isWindows = os.platform() === "win32";

export const cloneRepo = async (repositoryUrl, destinationDirectory) => {
  const stats = await execAsync(
    `git clone ${repositoryUrl} ${destinationDirectory}`
  );
  console.log(chalk.yellow(stats.stderr));
};

export const resetGit = async (destinationDirectory) => {
  const removeGitFolderCommand = isWindows
    ? "powershell.exe -command remove-item .git -recurse -force"
    : "rm -rf .git";

  let stats = await execAsync(removeGitFolderCommand, {
    cwd: destinationDirectory,
  });

  stats = await execAsync(`git init`, {
    cwd: destinationDirectory,
  });

  console.log(chalk.green(stats.stdout));

  stats = await execAsync(`git add .`, {
    cwd: destinationDirectory,
  });

  stats = await execAsync(`git commit -m "initial commit"`, {
    cwd: destinationDirectory,
  });

  console.log(chalk.green(stats.stdout));
};
