module.exports = {
    name: 'p',
    description: 'Prune up to 100 messages',
    aliases: ['prune'],
    args: true,
    usage: '[1-100]',
    execute(message, args) {
        const amount = parseInt(args[0]);

        if(isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        }else if(amount < 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 100.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        });
    },
};