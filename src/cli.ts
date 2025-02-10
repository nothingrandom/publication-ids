#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import { parse } from './index';

const cli = meow(`
  Usage
    $ publication-ids <input>
`, {
  importMeta: import.meta,
});

const input = cli.input;

if (!input.length) {
  console.error('Please provide an input');
  console.error('Example: publication-ids 10.48550/arXiv.2307.12108');
  console.error('See: publication-ids --help');
  process.exit(1);
}

console.log(parse(input));
