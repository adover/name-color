#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const names = require('color-namer');
const _ = require('lodash');
const question = {
    type: 'input',
    name: 'colour',
    message: 'Enter a hex value with or without hash (or press \'x\' to exit)',
    default: function () {
      return '#ff0000';
  	}
}

const userArgs = process.argv.slice(2);

clear();
console.log(chalk.bold.white.bgRed('                    '));
console.log(chalk.bold.white.bgRed('  Find that colour  '));
console.log(chalk.bold.white.bgRed('                    \r\n'));

if(userArgs[0]){
	doAnswer(userArgs[0]);
}

function doAnswer(answer) {
	try{
		const result = names(answer.colour);
		_.each(result, (v, k) => {
			console.log(`${k} result: ${v[0].name}`);
		});
	}catch(e) {
		doQuestion(question, doAnswer);
	}
}

(function doQuestion(q, doAnswer) {

	inquirer.prompt([q]).then((answer) => {

		if(answer.colour === 'x') {
			process.exit();
		}else if(answer.colour.substr(0,1) !== '#') {
			answer.colour = '#' + answer.colour;
		}

		doAnswer(answer);

		doQuestion(q, doAnswer);

	}, (e) => {
		console.log(e)
	});

}(question, doAnswer));
