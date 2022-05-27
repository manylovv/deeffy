#!/usr/bin/env node
/* eslint-disable no-undef */

import { Command } from 'commander';
import gendiff from './src/gendiff-func';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action(gendiff);

program.parse(process.argv);
