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
      message: 'What is the title of the project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Write a description for the project.\nWhat was your motivation for building the app?\nWhy did you build this project?\nWhat problem does it solve?\nWhat did you learn?\n',
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
      message: 'Enter the collaborators names\nUse the following format: "Joe Bloggs, Jane Doe, John Smith"\n',
      when: (answers) => answers.credits_collaborators_q === true,
    },
    {
      type: 'input',
      name: 'credits_collaborators_gits',
      message: 'Enter the collaborators GitHub usernames\nEnsure they are in the same order as above\nUse the following format "username, username2, username3"\n',
      when: (answers) => answers.credits_collaborators_q === true,
    },
    {
      type: 'confirm',
      name: 'credits_attributions_q',
      message: 'Are there any attributions for this project?\ne.g. third-party assets\n',
    },
    {
      type: 'input',
      name: 'credits_attributions_creators',
      message: 'Enter the creators names\nUse the following format: "Creator 1, Creator 2, Creator 3"\n',
      when: (answers) => answers.credits_attributions_q === true,
    },
    {
      type: 'input',
      name: 'credits_attributions_links',
      message: 'Enter links to their primary web presence\nEnsure they are in the same order as above\nUse the following format "https://www.example1.com, https://www.example2.com, https://www.example3.com"\n',
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
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter guidelines for how other people can make contributions to the application.',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Enter instructions for how other people can test the application.',
    },
    {
      type: 'input',
      name: 'questions_git',
      message: 'Enter your GitHub username so people can ask questions.',
    },
    {
      type: 'input',
      name: 'questions_email',
      message: 'Enter your email address so people can ask questions.',
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
    const projectContributing = answers.contributing;
    const projectTests = answers.tests;
    const projectQuestionsGit = answers.questions_git;
    const projectQuestionsEmail = answers.questions_email;

// various let declarations to get user inputs from inquirer
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

// let declaration to store the correct license option
    let badgeOption

// switch statement to return the correct license option from the various options and sub options
    switch (projectLicense) {
      case 'BSD (Multiple Options)':
        badgeOption = projectLicenseBSD
        break;
      case 'Creative Commons (Multiple Options)':
        badgeOption = projectLicenseCreative
        break;
      case 'GNU (Multiple Options)':
        badgeOption = projectLicenseGNU
        break;
      case 'The Organization for Ethical Source (Multiple Options)':
        badgeOption = projectLicenseEthical
        break;
      case 'Open Data Commons (Multiple Options)':
        badgeOption = projectLicenseOpenData
        break;
      case 'Perl (Multiple Options)':
        badgeOption = projectLicensePerl
        break;
      default:
        badgeOption= projectLicense
        break;
    };

// let declaration to store the correct license badge link
    let licenseBadge;

// switch statement to return the correct license badge link
    switch (badgeOption) {
      case 'Apache 2.0 License':
        licenseBadge = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
        break;
      case 'Boost Software License 1.0':
        licenseBadge = '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)'
        break;
      case 'BSD 3-Clause License':
        licenseBadge = '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'
        break;
      case 'BSD 2-Clause License':
        licenseBadge = '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)'
        break;
      case 'CC0':
        licenseBadge = '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)'
        break;
      case 'Attribution 4.0 International':
        licenseBadge = '[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)'
        break;
      case 'Attribution-ShareAlike 4.0 International':
        licenseBadge = '[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)'
        break;
      case 'Attribution-NonCommercial 4.0 International':
        licenseBadge = '[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)'
        break;
      case 'Attribution-NoDerivates 4.0 International':
        licenseBadge = '[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)'
        break;
      case 'Attribution-NonCommmercial-ShareAlike 4.0 International':
        licenseBadge = '[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)'
        break;
      case 'Attribution-NonCommercial-NoDerivatives 4.0 International':
        licenseBadge = '[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)'
        break;
      case 'Eclipse Public License 1.0':
        licenseBadge = '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)'
        break;
      case 'GNU GPL v3':
        licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
        break;
      case 'GNU GPL v2':
        licenseBadge = '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)'
        break;
      case 'GNU AGPL v3':
        licenseBadge = '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)'
        break;
      case 'GNU LGPL v3':
        licenseBadge = '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)'
        break;
      case 'GNU FDL v1.3':
        licenseBadge = '[![License: FDL 1.3](https://img.shields.io/badge/License-FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)'
        break;
      case 'The Hippocratic License 2.1':
        licenseBadge = '[![License: Hippocratic 2.1](https://img.shields.io/badge/License-Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)'
        break;
      case 'The Hippocratic License 3.0':
        licenseBadge = '[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)'
        break;
      case 'IBM Public License Version 1.0':
        licenseBadge = '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)'
        break;
      case 'ISC License (ISC)':
        licenseBadge = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)'
        break;
      case 'The MIT License':
        licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
        break;
      case 'Mozilla Public License 2.0':
        licenseBadge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
        break;
      case 'Attribution License (BY)':
        licenseBadge = '[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)'
        break;
      case 'Open Database License (ODbL)':
        licenseBadge = '[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)'
        break;
      case 'Public Domain Dedication and License (PDDL)':
        licenseBadge = '[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)'
        break;
      case 'The Perl License':
        licenseBadge = '[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)'
        break;
      case 'The Artistic License 2.0':
        licenseBadge = '[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)'
        break;
      case 'SIL Open Font License 1.1':
        licenseBadge = '[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)'
        break;
      case 'The Unlicense':
        licenseBadge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
        break;
      case 'The Do What the Fuck You Want to Public License':
        licenseBadge = '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)'
        break;
      case 'The zlib/libpng License':
        licenseBadge = '[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)'
        break;
      default:
        licenseBadge = 'None.'
        break;
    };

// readme file content for project title and description
    let readmeContent = `# ${projectTitle}\n
${licenseBadge}\n
## Description\n
${projectDescription}\n\n`

// if the user confirms that the application requires installation, this section is included
    if(projectInstallationQ) {
      readmeContent += `## Table of Contents\n
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)\n
## Installation\n
${projectInstallationSteps}\n\n`
// else the installation section is excluded and is not shown in the table of contents
    } else {
      readmeContent += `## Table of Contents\n
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)\n\n`
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
      };
      readmeContent += `\n`
      readmeContent += `### Attributions:\n\n`
      for (let i = 0; i < projectAttributionsCreators.length; i++) {
        const creator = projectAttributionsCreators[i];
        const link = projectAttributionsLinks[i];
        readmeContent += `- ${creator} ([Link to Website](${link}))\n`
      };
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
This project uses the following license:\n
${badgeOption}\n
${licenseBadge}\n\n`

// readme file content for 
    readmeContent += `## Contributing\n
${projectContributing}\n\n`

// readme file content for 
    readmeContent += `## Tests\n
${projectTests}\n\n`

// readme file content for 
    readmeContent += `## Questions\n
If you have any questions, feel free to contact me trhough my [GitHub profile](https://github.com/${projectQuestionsGit}) or [email me](mailto:${projectQuestionsEmail}).\n`

// writeFile operation to write the readme content to a file with the above defined filename
    fs.writeFile(readmeFileName, readmeContent, (error) => {
      return error
        ? console.error(error)
        : console.log('File Created Successfully!')
    });
  });