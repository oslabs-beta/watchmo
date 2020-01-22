#!/usr/bin/env node

const fs = require('fs');
const path = require('path');


fs.mkdirSync(path.join(process.argv[2], '/watchmo'));
fs.appendFileSync(path.join(process.argv[2], '/watchmo/watchmo.config'), 'testing');
