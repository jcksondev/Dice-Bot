const fs = require('fs');
const _ = require('lodash');
module.exports = {
    name: 'init',
    usage: ' + [Initiative Bonus]',
    execute(message, args, client) {
        const arg = args.toString().toLowerCase().replace(/\s/g, '');
        const command = arg.replace(/[,]/g, '');

        const roll = _.random(1, 20);

        const penalty = parseInt(command.split(/[-]/g)[1], 10) || 0;
        const bonus = parseInt(command.split(/[+]/g)[1], 10) || 0;

        const total = roll - penalty + bonus;

        client.initiative[message.author.id] = {
            user: message.author.username,
            initiative: total,
        };

        fs.writeFile('./initiative.json', JSON.stringify(client.initiative, null, 4), err => {
            if(err) throw err;
        });

        message.channel.send(`**Roll**: [ ${roll} ] ${penalty ? `- ${penalty}` : ''} ${bonus ? `+ ${bonus}` : ''}\n**Initiative**: ${total}`);
    },
};