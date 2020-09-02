const Discord = require('discord.js');
/* eslint-disable prefer-const */
module.exports = {
    name: 'initlist',
    usage: '',
    execute(message, args, client) {
        let sortedArray = [];

        for(const i in client.initiative) {
            sortedArray.push(client.initiative[i]);
        }

        sortedArray.sort(function(a, b) {
            return parseFloat(b.initiative) - parseFloat(a.initiative);
        });

        const initEmbed = new Discord.MessageEmbed()
            .setColor('#52307c')
            .setTitle('Initiative')
            .setDescription('Please use this it took a while to code')
            .attachFiles('./d20.jpg')
            .setAuthor('The Chad Dice Roller Bot', 'attachment://d20.jpg', 'https://github.com/JcksonDev/Dice-Bot')
            .setThumbnail('attachment://d20.jpg')
            .setFooter(Date());

        sortedArray.forEach(field => {
            initEmbed.addField(field.user, field.initiative);
        });

        message.channel.send(initEmbed);
    }
};