# w-clone-template CLI

A command-line tool to quickly set up a new project based on a template.

## Requirements

Ensure you have [Node.js](https://nodejs.org/) installed.

## Usage

```bash
npx w-clone-template project_name
```

Options:

- -n, --name <name>: Required. Specifies the name for your new project.
- -d, --directory <path>: Specifies the destination directory name. If not provided, the current working directory will be used.
- -t, --template <template-name>: Specifies the template to use. If not provided, the react template will be used.
  supported templates are [react, expressjs, mern]

## What It Does

- Clones the template repository based on the template provided by the user
- Edits package.json to set the project name.
- Initializes a new Git repository with an initial commit and a new README.md file.
- Installs npm dependencies.

## License

This project is licensed under the MIT License
