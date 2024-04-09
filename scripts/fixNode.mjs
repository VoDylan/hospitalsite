/* eslint-env node */
import { executeCommands } from './commandRunner.mjs';

const command = process.platform === 'win32' ? ['taskkill /F /IM node.exe /T'] : ['pkill -f node'];
executeCommands(command, () => {
  console.log('Node processes killed.');
});
