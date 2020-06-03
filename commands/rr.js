const _ = require('lodash');
module.exports = {
    name: 'rr',
    usage: '[+-] {modifier}',
    execute(message, args) {
        // Takes the argument and removes any whitespaces and commas from potential spaces
        const arg = args.toString().toLowerCase().replace(/\s/g, '');
        const command = arg.replace(/[,]/g, '');

        // Create a random number between 1 and 20, or a d20 roll
        const roll = _.random(1, 20);

        // Creates two fields for potential arguments, scans for a - or + and creates a value dependant on what is found. Defaults to 0
        const penalty = parseInt(command.split(/[-]/g)[1], 10) || 0; console.log(penalty);
        const bonus = parseInt(command.split(/[+]/g)[1], 10) || 0; console.log(bonus);

        const total = roll - penalty + bonus;

        // Custom messages if user gets a Natural 1/20 and the default message output
        const nat1 = '**Crtitical Fail!**';
        const nat20 = '**Natural 20!**';
        const returnMessages = [
            `**Rolls**: [ ${roll} ] ${penalty ? `- ${penalty}` : ''} ${bonus ? `+ ${bonus}` : ''}\n**Total**: ${total}`,
        ];

        if(roll === 20) {
            message.channel.send(`${returnMessages} \n${nat20}`);
        }else if(roll === 1) {
            message.channel.send(`${returnMessages} \n${nat1}`);
        }else {
            message.channel.send(`${returnMessages}`);
        }
    }
};