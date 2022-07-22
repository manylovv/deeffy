#!/usr/bin/env node
import { Command } from 'commander';
import deeffy from '../src/index.js';

const program = new Command();

program
  .name('deeffy')
  .description('Compares two configuration files and shows a difference.')
  .version('0.9.2')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    const diff = deeffy(filepath1, filepath2, format);
    console.log(diff);
  });

program.parse(process.argv);
