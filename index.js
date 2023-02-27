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
      message: 'Write a description of your project.\n\nWhat was your motivation for building the app?\nWhy did you build this project?\nWhat problem does it solve?\nWhat did you learn?\n\n',
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
      message: 'Enter the collaborators names\n\nUse the following format: "Joe Bloggs, Jane Doe, John Smith"\n\n',
      when: (answers) => answers.credits_collaborators_q === true,
    },
    {
      type: 'input',
      name: 'credits_collaborators_gits',
      message: 'Enter the collaborators GitHub usernames\n\nEnsure they are in the same order as above\nUse the following format "username, username2, username3"\n\n',
      when: (answers) => answers.credits_collaborators_q === true,
    },
    {
      type: 'confirm',
      name: 'credits_attributions_q',
      message: 'Are there any attributions for this project?\n\ne.g. third-party assets\n\n',
    },
    {
      type: 'input',
      name: 'credits_attributions_creators',
      message: 'Enter the creators names\n\nUse the following format: "Creator 1, Creator 2, Creator 3"\n\n',
      when: (answers) => answers.credits_attributions_q === true,
    },
    {
      type: 'input',
      name: 'credits_attributions_links',
      message: 'Enter links to their primary web presence\n\nEnsure they are in the same order as above\nUse the following format "https://www.example1.com, https://www.example2.com, https://www.example3.com"\n\n',
      when: (answers) => answers.credits_attributions_q === true,
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
    const projectAttributionsQ = answers.credits_attributions_q;
    const projectAttributionsCreators = answers.credits_attributions_creators;
    const projectAttributionsLinks = answers.credits_attributions_links;

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
- [License](#license)
- [Badges](#badges)\n
## Installation\n
${projectInstallationSteps}\n\n`
// else the installation section is excluded and is not shown in the table of contents
    } else {
      readmeContent += `## Table of Contents\n
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)\n\n`
    }

// readme file content for usage
    readmeContent += `## Usage\n
${projectUsage}\n\n`

// readme file content for credits
// !!! SWITCH STATEMENT TO BE ADDED !!!
    readmeContent += `## Credits\n
${projectCollaboratorsNames}\n${projectCollaboratorsGits}\n
${projectAttributionsCreators}\n${projectAttributionsLinks}\n\n`

// readme file content for license information
// !!! NOT COMPLETE !!!
    readmeContent =+ `## License\n
### LICENSE INFO GOES HERE`

// readme file content for badges
// !!! NOT COMPLETE !!!
readmeContent =+ `## Badges\n
### BADGES GO HERE`

// writeFile operation to write the readme content to a file with the above defined filename
    fs.writeFile(readmeFileName, readmeContent, (error) => {
      return error
        ? console.error(error)
        : console.log('File Created Successfully!')
    });
  });