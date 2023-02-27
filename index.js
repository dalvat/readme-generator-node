// load fs
const fs = require("fs");
// load inquirer
const inquirer = require("inquirer");

// inquirer prompt with user questions
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Write a description of your project.\nInclude information such as:\nWhat was your motivation for building the app?\nWhy did you build this project?\nWhat problem does it solve?\nWhat did you learn?\n',
    },
    {
      type: 'confirm',
      name: 'installation_q',
      message: 'Does the app need installation?',
    },
    {
      type: 'input',
      name: 'installation_steps',
      message: 'What are the steps required to install your project?',
      when: (response) => response.installation_q === true,
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide instructions and examples of how to use the application.',
    },
    {
      type: 'confirm',
      name: 'credits_collaborators_q',
      message: 'Are there any collaborators for this project?',
    },
    {
      type: 'input',
      name: 'credits_collaborators_names',
      message: 'Enter the the collaborators names in the following format "Joe Bloggs, Jane Doe, John Smith".',
      when: (answers) => answers.credits_collaborators_q === true,
    },
    {
      type: 'input',
      name: 'credits_collaborators_gits',
      message: 'Enter the the collaborators GitHub usernames in the follwing format "username, username2, username3".',
      when: (answers) => answers.credits_collaborators_q === true,
    },
  ])
  // inquirer then with all instructions to write readme file
  .then((answers) => {
    // various const declarations to get user inputs from inquirer
    const projectTitle = answers.title;
    const projectDescription = answers.description;
    const projectInstallationQ = answers.installation_q;
    const projectInstallationSteps = answers.installation_steps;
    const projectUsage = answers.usage;
    const projectCollaboratorsQ = answers.credits_collaborators_q;
    const projectCollaboratorsNames = answers.credits_collaborators_names;
    const projectCollaboratorsGits = answers.credits_collaborators_gits;

// readme file name is suffixed with projectTitle and saved in the generated_files folder
    let readmeFileName = `./generated_files/${projectTitle}-README.md`

// readme file content for project title and description
    let readmeContent =
`# ${projectTitle}\n
## Description\n
${projectDescription}\n\n`

// if the user confirms that the application requires installation, this section is included
    if(projectInstallationQ) {
      readmeContent += `## Table of Contents\n
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)\n
## Installation\n
${projectInstallationSteps}\n\n`
// else the installation section is excluded and is not shown in the table of contents
    } else {
      readmeContent += `## Table of Contents\n
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)\n\n`
    }

// readme file content for usage
    readmeContent += `## Usage\n
${projectUsage}\n\n`

// readme file content for credits !!! switch statement to be added !!!
    readmeContent += `## Credits\n
${projectCollaboratorsNames}\n${projectCollaboratorsGits}`

// writeFile operation to write the readme content to a file with the above defined filename
    fs.writeFile(readmeFileName, readmeContent, (error) => {
      return error
        ? console.error(error)
        : console.log('File Created Successfully!')
    });

  })