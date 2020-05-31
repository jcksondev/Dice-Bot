module.exports = {
    name: 'e',
    aliases: ['encounter'],
    usage: '[e]',
    execute(message) {
        message.channel.send('```diff\n- ENCOUNTER - ```');
    },
};