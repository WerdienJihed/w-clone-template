import util from "util";
import { exec } from "child_process";
import chalk from "chalk";
import path from "path";
import fs from "fs";

const execAsync = util.promisify(exec);
const currentWorkingDir = process.cwd();
const resourcesPath = path.join(currentWorkingDir, "resources");

export const cloneRepo = async (repositoryUrl, directory) => {
  const stats = await execAsync(`git clone ${repositoryUrl} ${directory}`);
  console.log(chalk.yellow(stats.stderr));
};

export const removeGitFolder = async (directory) => {
  await execAsync("powershell.exe -command remove-item .git -recurse -force", {
    cwd: directory,
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

export const resetGit = async (directory) => {
  await removeGitFolder(directory);
  await initGit(directory);
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

export const resetReadme = (directory, projectName) => {
  const readmePath = path.join(directory, "README.md");
  fs.writeFileSync(readmePath, `# ${projectName}`);
};

export const removeReadme = async (directory) => {
  await execAsync(
    "powershell.exe -command remove-item README.md -recurse -force",
    {
      cwd: directory,
    }
  );
};

export const installPackages = async (directory) => {
  execAsync(`npm ci`, {
    cwd: directory,
  });
};

export const copyItem = async (fileName, destinationDir) => {
  await execAsync(
    `powershell.exe -command copy-item -path ${resourcesPath}\\${fileName} -destination ${destinationDir}`
  );
};
