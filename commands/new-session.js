module.exports = {
    name: 's',
    aliases: ['session'],
    usage: '[s]',
    execute(message) {
        message.channel.send('```diff\n- NEW SESSION - ```');
    },
};