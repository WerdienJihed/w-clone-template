import path from "path";
import fs from "fs";
import {
  cloneRepo,
  removeGitFolder,
  resetGit,
  editPackageJson,
  editPackageLockJson,
  removeReadme,
  editIndexHtml,
} from "./utils.js";

import chalk from "chalk";

const reactRepositoryUrl = "https://github.com/WerdienJihed/react-template";
const expressRepositoryUrl =
  "https://github.com/WerdienJihed/expressjs-template";

export const handleReact = async (destinationDirectory, projectName) => {
  try {
    // Clone repository
    await cloneRepo(reactRepositoryUrl, destinationDirectory);

    // Edit package.json
    const packageJsonPath = path.join(destinationDirectory, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Edit package-loc.json
    const packageLockJsonPath = path.join(
      destinationDirectory,
      "package-lock.json"
    );
    const packageLockJson = JSON.parse(
      fs.readFileSync(packageLockJsonPath, "utf-8")
    );
    packageLockJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageLockJson, null, 2));

    // Edit index.html
    const indexPath = path.join(destinationDirectory, "index.html");
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    const updatedIndexContent = indexContent.replace(
      "<title>React Template</title>",
      `<title>${projectName}</title>`
    );
    fs.writeFileSync(indexPath, updatedIndexContent);

    // Reset git
    await resetGit(destinationDirectory);

    // Reset README.md
    const readmePath = path.join(destinationDirectory, "README.md");
    fs.writeFileSync(readmePath, `# ${projectName}`);

    console.log(
      chalk.green(
        "Project setup completed successfully! Repository cloned, files edited, and npm dependencies installed!"
      )
    );
  } catch (error) {
    console.log(chalk.red(error));
  }
};

export const handleExpress = async (destinationDirectory, projectName) => {
  try {
    // Clone repository
    await cloneRepo(expressRepositoryUrl, destinationDirectory);

    // Edit package.json
    const packageJsonPath = path.join(destinationDirectory, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Edit package-loc.json
    const packageLockJsonPath = path.join(
      destinationDirectory,
      "package-lock.json"
    );
    const packageLockJson = JSON.parse(
      fs.readFileSync(packageLockJsonPath, "utf-8")
    );
    packageLockJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageLockJson, null, 2));

    // Reset git
    await resetGit(destinationDirectory);

    // Reset README.md
    const readmePath = path.join(destinationDirectory, "README.md");
    fs.writeFileSync(readmePath, `# ${projectName}`);

    console.log(
      chalk.green(
        "Project setup completed successfully! Repository cloned, files edited, and npm dependencies installed!"
      )
    );
  } catch (error) {
    console.log(chalk.red(error));
  }
};

export const handleMern = async (destinationDir, projectName) => {
  try {
    const clientDir = path.join(destinationDir, "client");
    const serverDir = path.join(destinationDir, "server");
    console.log({ clientDir });
    /* CLIENT */
    await cloneRepo(reactRepositoryUrl, clientDir);
    await editPackageJson(clientDir, "client");
    await editPackageLockJson(clientDir, "client");
    await editIndexHtml(clientDir, projectName);
    await removeGitFolder(clientDir);
    await removeReadme(clientDir);

    /* SERVER */

    await cloneRepo(expressRepositoryUrl, serverDir);
    await editPackageJson(serverDir, "server");
    await editPackageLockJson(serverDir, "server");
    await removeGitFolder(serverDir);
    await removeReadme(serverDir);

    console.log(
      chalk.green(
        "Project setup completed successfully! Repository cloned, files edited, and npm dependencies installed!"
      )
    );
  } catch (error) {
    console.log(chalk.red(error));
  }
};
