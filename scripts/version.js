const REGEX = new RegExp('^v([0-9]*)\.([0-9]*)\.[0-9]*-([0-9]*)-(.*)$');
const MATCH = REGEX.exec(process.argv[2]);
const VERSION = `${MATCH[1]}.${MATCH[2]}.${MATCH[3]}`;

console.log(VERSION);