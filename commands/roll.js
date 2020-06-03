const _ = require('lodash');
module.exports = {
    name: 'r',
    aliases: ['roll'],
    usage: 'd(number) <+-> [modifier]',
    execute(message, args) {
        // Removes whitespace and turns args into a string, add a 1 to the front if no quantity is defined
        let arg = args.toString().toLowerCase().replace(/\s/g, '');
        if (arg[0] === 'd') arg = '1' + arg;

        /**
         * Splits the string into an array by number of rolls and the rest of the data
         * Takes the addition data string and removes all commas cause Javascript has commas from the split() function
         **/
        const splitArgs = arg.split(/d/g);
        splitArgs[1] = splitArgs[1].replace(/[,]/g, '');
        
        // Scans different parts of the array and stores data for calculation
        const quantity = parseInt(splitArgs[0], 10); 
        const type = parseInt(splitArgs[1].split(/[+-,]/g)[0]) || 0;
        const penalty = parseInt(splitArgs[1].split(/[-,]/g)[1]) || 0;
        const bonus = parseInt(splitArgs[1].split(/[+,]/g)[1]) || 0;

        // Creates new array with the amount of dice rolled
        const rolls = new Array(quantity).fill(0);
        let total = 0;

        // Rolls a dice dependant on specified arguments 
        rolls.forEach((val, index) => {
            rolls[index] = _.random(1, type);
        });

        // Takes all the rolls and creates a total by going through and adding bonus and removing penalty
        total = rolls.reduce((r, v) => r += v) - penalty + bonus;

        // Basic output message, outputs numbers in an array with the modifier at the end
        const returnMessages = [
            `**Rolls**: [ ${rolls.join(', ')} ] ${penalty ? `- ${penalty}` : ''} ${bonus ? `+ ${bonus}` : ''}\n**Total**: ${total}`,
        ];

        // Removes the last part of the array if no modifier exists
        if (!penalty && !bonus) {
            _.remove(returnMessages, (value, index) => {
                return index === 1;
            });
        }

        message.channel.send(returnMessages);
    },
};