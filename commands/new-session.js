module.exports = {
    name: 's',
    aliases: ['session'],
    usage: '[s]',
    async execute(message) {
        await message.delete();
        message.channel.send('```diff\n- NEW SESSION - ```');
    },
};