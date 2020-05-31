const _ = require('lodash');
/* TODO: Fix bug where having a space between the + in roll command doesnt factor in bonus, plus ur gay
 * Command $r 4d8+12
 * ['4', '8', '+', '12']
 */
module.exports = {
    name: 'r',
    aliases: ['roll'],
    usage: 'd(number) <+-> [modifier]',
    execute(message, args) {
        let arg = args.toString().toLowerCase().replace(/\s/g, '');
        if(arg[0] === 'd') arg = '1' + arg;
        const splitArgs = arg.split('d');

        const quantity = parseInt(splitArgs[0], 10);
        const type = parseInt(splitArgs[1].split(/[+-]/g)[0], 10) || 0;
        const penalty = parseInt(splitArgs[1].split(/[-]/g)[1], 10) || 0;
        const bonus = parseInt(splitArgs[1].split(/[+]/g)[1], 10) || 0;

        const rolls = new Array(quantity).fill(0);
        let total = 0;

        rolls.forEach((val, index) => {
            rolls[index] = _.random(1, type);
        });

        total = rolls.reduce((r, v) => r += v) - penalty + bonus;

        const returnMessages = [
            `**Rolls**: [ ${rolls.join(', ')} ] ${penalty ? `- ${penalty}` : ''} ${bonus ? `+ ${bonus}` : ''}\n**Total**: ${total}`,
        ];

        if(!penalty && !bonus) {
            _.remove(returnMessages, (value, index) => {
                return index === 1;
            });
        }

        message.channel.send(returnMessages);
    },
};