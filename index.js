const fs = require("fs");
// const path = require('path');
const inquirer = require("inquirer");
// const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
// const questions = [

// ];

// function to write README file
// function writeToFile(fileName, data) {
// }

// function to initialize program
// function init() {

// }

// function call to initialize program
// init();

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
  ])
  .then((answers) => {
    const projectTitle = answers.title;
    const readmeFileName = `./generated_files/${answers.title}-README.md`

    const readmeContent = `# ${answers.title}\n\n### More content here.`

    fs.writeFile(readmeFileName, readmeContent, (error) => {
      return error
        ? console.error(error)
        : console.log('File Created Successfully!')
    });

  })