const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./botconfig.json');
const chalk = require('chalk');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.initiative = require('./initiative.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}


// Activated when the bot turns on, outputs a message to the console
client.once('ready', () => {
    console.log(chalk.blue(`Logged in as ${client.user.tag}`));

    client.user.setPresence({
        activity: {
            name: 'Lofi for Nat 20\'s',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/chillhopmusic'
        }
    });
});

// Activated whenever a message is typed in any of the discord channels the bot has access to
client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}`;

        if (command.usage) {
            reply += `\nThe proper usage would be \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.log(chalk.redBright('FATAL ERROR'), 'Something really bad happened!');
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

// Bot logins with the special token, then fires the client.once command
client.login(token);