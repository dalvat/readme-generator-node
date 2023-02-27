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
    {
      type: 'list',
      choices:['None','Apache 2.0 License','Boost Software License 1.0','BSD (Multiple Options)','Creative Commons (Multiple Options)','Eclipse Public License 1.0','GNU (Multiple Options)','The Organization for Ethical Source (Multiple Options)','IBM Public License Version 1.0','ISC License (ISC)','The MIT License','Mozilla Public License 2.0','Open Data Commons (Multiple Options)','Perl (Multiple Options)','SIL Open Font License 1.1','The Unlicense','The Do What the Fuck You Want to Public License','The zlib/libpng License'],
      name: 'license',
      message: 'Select the appropriate license type:',
    },
    {
      type: 'list',
      choices:['BSD 2-Clause License','BSD 3-Clause License'],
      name: 'license_BSD',
      message: 'Select the appropriate "BSD" license type:',
      when: (answers) => answers.license === 'BSD (Multiple Options)',
    },
    {
      type: 'list',
      choices:['CC0','Attribution 4.0 International','Attribution-ShareAlike 4.0 International','Attribution-NonCommercial 4.0 International','Attribution-NoDerivates 4.0 International','Attribution-NonCommmercial-ShareAlike 4.0 International','Attribution-NonCommercial-NoDerivatives 4.0 International'],
      name: 'license_creative',
      message: 'Select the appropriate "Creative Commons" license type:',
      when: (answers) => answers.license === 'Creative Commons (Multiple Options)',
    },
    {
      type: 'list',
      choices:['GNU GPL v2','GNU GPL v3','GNU AGPL v3','GNU LGPL v3','GNU FDL v1.3'],
      name: 'license_GNU',
      message: 'Select the appropriate "GNU" license type:',
      when: (answers) => answers.license === 'GNU (Multiple Options)',
    },
    {
      type: 'list',
      choices:['The Hippocratic License 2.1','The Hippocratic License 3.0'],
      name: 'license_ethical',
      message: 'Select the appropriate "The Organization for Ethical Source" license type:',
      when: (answers) => answers.license === 'The Organization for Ethical Source (Multiple Options)',
    },
    {
      type: 'list',
      choices:['Attribution License (BY)','Open Database License (ODbL)','Public Domain Dedication and License (PDDL)'],
      name: 'license_open_data',
      message: 'Select the appropriate "Open Data Commons" license type:',
      when: (answers) => answers.license === 'Open Data Commons (Multiple Options)',
    },
    {
      type: 'list',
      choices:['The Perl License','The Artistic License 2.0'],
      name: 'license_perl',
      message: 'Select the appropriate "Perl" license type:',
      when: (answers) => answers.license === 'Perl (Multiple Options)',
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
    const projectAttributionsQ = answers.credits_attributions_q;
    const projectCreditsQs = [projectCollaboratorsQ, projectAttributionsQ];
    const projectLicense = answers.license;
    const projectLicenseBSD = answers.license_BSD;
    const projectLicenseCreative = answers.license_creative;
    const projectLicenseGNU = answers.license_GNU;
    const projectLicenseEthical = answers.license_ethical;
    const projectLicenseOpenData = answers.license_open_data;
    const projectLicensePerl = answers.license_perl;

    let projectCollaboratorsNames;
    let projectCollaboratorsGits;
    let projectAttributionsCreators;
    let projectAttributionsLinks;

// if statement to deal with single or multiple user entries for collaborators
    if (answers.credits_collaborators_names !== undefined) {
      if (answers.credits_collaborators_names[1] === undefined) {
        projectCollaboratorsNames = [answers.credits_collaborators_names];
        projectCollaboratorsGits = [answers.credits_collaborators_gits];
      } else {
        projectCollaboratorsNames = answers.credits_collaborators_names.split(', ');
        projectCollaboratorsGits = answers.credits_collaborators_gits.split(', ');
        };
    };
// if statement to deal with single or multiple user entries for creators
    if (answers.credits_attributions_creators !== undefined) {
      if (answers.credits_attributions_creators[1] === undefined) {
        projectAttributionsCreators = [answers.credits_attributions_creators];
        projectAttributionsLinks = [answers.credits_attributions_links];
      } else {
        projectAttributionsCreators = answers.credits_attributions_creators.split(', ');
        projectAttributionsLinks = answers.credits_attributions_links.split(', ');
        };
    };

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

// readme file content for credits using if, else if statements
    if (projectCreditsQs[0] === true && projectCreditsQs[1] === true) {
      readmeContent += `## Credits\n\n### Collaborators:\n\n`
      for (let i = 0; i < projectCollaboratorsNames.length; i++) {
        const name = projectCollaboratorsNames[i];
        const git = projectCollaboratorsGits[i];
        readmeContent += `- ${name} ([GitHub Profile](https://github.com/${git}))\n`
      }
      readmeContent += `\n`
      readmeContent += `### Attributions:\n\n`
      for (let i = 0; i < projectAttributionsCreators.length; i++) {
        const creator = projectAttributionsCreators[i];
        const link = projectAttributionsLinks[i];
        readmeContent += `- ${creator} ([Link to Website](https://github.com/${link}))\n`
      }
      readmeContent += `\n`
      } else if (projectCreditsQs[0] === true && projectCreditsQs[1] === false) {
        readmeContent += `## Credits\n\n### Collaborators:\n\n`
        for (let i = 0; i < projectCollaboratorsNames.length; i++) {
          const name = projectCollaboratorsNames[i];
          const git = projectCollaboratorsGits[i];
          readmeContent += `- ${name} ([GitHub Profile](https://github.com/${git}))\n`
          readmeContent += `\n`
        }} else if (projectCreditsQs[0] === false && projectCreditsQs[1] === true) {
            readmeContent += `## Credits\n\n### Attributions:\n\n`
            for (let i = 0; i < projectAttributionsCreators.length; i++) {
              const creator = projectAttributionsCreators[i];
              const link = projectAttributionsLinks[i];
              readmeContent += `- ${creator} ([Link to Website](${link}))\n`
            }
            readmeContent += `\n`
          };

// readme file content for license information
    readmeContent += `## License\n
This project uses the following license:\n\n`

    switch (projectLicense) {
      case 'BSD (Multiple Options)':
        readmeContent += `**${projectLicenseBSD}**\n\n`
        break;
      case 'Creative Commons (Multiple Options)':
        readmeContent += `**${projectLicense}**\n\n`
        break;
      case 'GNU (Multiple Options)':
        readmeContent += `**${projectLicenseGNU}**\n\n`
        break;
      case 'The Organization for Ethical Source (Multiple Options)':
        readmeContent += `**${projectLicenseEthical}**\n\n`
        break;
      case 'Open Data Commons (Multiple Options)':
        readmeContent += `**${projectLicenseOpenData}**\n\n`
        break;
      case 'Perl (Multiple Options)':
        readmeContent += `**${projectLicensePerl}**\n\n`
        break;
      default:
        readmeContent += `**${projectLicense}**\n\n`
        break;
    }

// readme file content for badges
// !!! NOT COMPLETE !!!
    readmeContent += `## Badges\n
### BADGES GO HERE\n`

// writeFile operation to write the readme content to a file with the above defined filename
    fs.writeFile(readmeFileName, readmeContent, (error) => {
      return error
        ? console.error(error)
        : console.log('File Created Successfully!')
    });
  });