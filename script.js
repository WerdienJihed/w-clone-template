import path from "path";
import chalk from "chalk";
import {
  cloneRepo,
  removeGitFolder,
  resetGit,
  editPackageJson,
  editPackageLockJson,
  removeReadme,
  editIndexHtml,
  initGit,
  resetReadme,
  installPackages,
  copyItem,
} from "./utils.js";

const reactRepoUrl = "https://github.com/WerdienJihed/react-template";
const expressRepoUrl = "https://github.com/WerdienJihed/expressjs-template";

export const handleReact = async (directory, projectName) => {
  try {
    await cloneRepo(reactRepoUrl, directory);
    editPackageJson(directory, projectName);
    editPackageLockJson(directory, projectName);
    editIndexHtml(directory, projectName);
    resetReadme(directory, projectName);
    await resetGit(directory);

    console.log(chalk.yellow("Installing packages ..."));
    await installPackages(directory);

    console.log(
      chalk.green(
        "Project setup completed successfully! Repository cloned, files edited, and npm dependencies installed!"
      )
    );
  } catch (error) {
    console.log(chalk.red(error));
  }
};

export const handleExpress = async (directory, projectName) => {
  try {
    await cloneRepo(expressRepoUrl, directory);
    editPackageJson(directory, projectName);
    editPackageJson(directory, projectName);
    resetReadme(directory, projectName);
    await resetGit(directory);

    console.log(chalk.yellow("Installing packages ..."));
    await installPackages(directory);

    console.log(
      chalk.green(
        "Project setup completed successfully! Repository cloned, files edited, and npm dependencies installed!"
      )
    );
  } catch (error) {
    console.log(chalk.red(error));
  }
};

export const handleMern = async (rootDir, projectName) => {
  try {
    const clientDir = path.join(rootDir, "client");
    const serverDir = path.join(rootDir, "server");

    /* CLIENT */
    await cloneRepo(reactRepoUrl, clientDir);
    await editPackageJson(clientDir, "client");
    await editPackageLockJson(clientDir, "client");
    await editIndexHtml(clientDir, projectName);
    await removeGitFolder(clientDir);
    await removeReadme(clientDir);

    /* SERVER */
    await cloneRepo(expressRepoUrl, serverDir);
    await editPackageJson(serverDir, "server");
    await editPackageLockJson(serverDir, "server");
    await removeGitFolder(serverDir);
    await removeReadme(serverDir);

    /* ROOT */
    copyItem(".gitignore", rootDir);
    copyItem("package.json", rootDir);
    copyItem("package-lock.json", rootDir);
    console.log(chalk.yellow("Installing packages ..."));

    await installPackages(clientDir);
    await installPackages(serverDir);
    await installPackages(rootDir);
    await initGit(rootDir);

    console.log(
      chalk.green(
        "Project setup completed successfully! Repository cloned, files edited, and npm dependencies installed!"
      )
    );
  } catch (error) {
    console.log(chalk.red(error));
  }
};
