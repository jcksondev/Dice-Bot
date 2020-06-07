const _ = require('lodash');
module.exports = {
    name: 'rr',
    usage: '[+-] {modifier}',
    execute(message, args) {
        // Takes the argument and removes any whitespaces and commas from potential spaces
        const arg = args.toString().toLowerCase().replace(/\s/g, '');
        const command = arg.replace(/[,]/g, '');

        // Checks input for 'a', 'adv', 'd', 'dis', creates a boolean value for adv/dis, and instantiates the rolls and total
        const advantage = command.includes('adv');
        const disadvantage = command.includes('dis');
        let roll = 0;
        let rolls = null;
        let total = 0;

        // Creates an array with two potential sizes for adv/dis
        if(advantage || disadvantage) {
            rolls = new Array(2).fill(0);
        }else {
            rolls = new Array(1).fill(0);
        }

        // Rolls a d20 or two dependant on adv/dis
        rolls.forEach((val, index) => {
            rolls[index] = _.random(1, 20);
        });

        // Creates two fields for potential arguments, scans for a - or + and creates a value dependant on what is found. Defaults to 0
        const penalty = parseInt(command.split(/[-]/g)[1], 10) || 0;
        const bonus = parseInt(command.split(/[+]/g)[1], 10) || 0;

        // Calculate the advantage/disadvantage number and output, else output the normal number with modifier
        const max = rolls.reduce((a, b) => {
            return Math.max(a, b);
        });

        const min = rolls.reduce((a, b) => {
            return Math.min(a, b);
        });

        if(advantage) {total = max - penalty + bonus; roll = max;}
        else if(disadvantage) {total = min - penalty + bonus; roll = min;}
        else {total = rolls.reduce((r, v) => r += v) - penalty + bonus; roll = rolls.reduce((r, v) => r += v);}

        // Custom messages if user gets a Natural 1/20 and the default message output
        const nat1 = '**Crtitical Fail!**';
        const nat20 = '**Natural 20!**';
        const returnMessages = [
            `**Rolls**: [ ${rolls.join(', ')} ] ${penalty ? `- ${penalty}` : ''} ${bonus ? `+ ${bonus}` : ''}\n**Total**: ${total}`,
        ];

        // Final output
        if(roll === 1) {
            message.channel.send(`${returnMessages}\n${nat1}`);
        }else if(roll === 20) {
            message.channel.send(`${returnMessages}\n${nat20}`);
        }else {
            message.channel.send(`${returnMessages}`);
        }
    },
};