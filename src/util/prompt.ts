import prompt from 'prompt';

prompt.message = "";
prompt.delimiter = " >>";
prompt.start({ noHandleSIGINT: true });

export default prompt;