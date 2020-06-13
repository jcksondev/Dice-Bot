const fs = require('fs');
module.exports = {
    name: 'initclear',
    execute(message, args, client) {
        for(const i in client.initiative) {
            delete client.initiative[i];
            console.log(client.initiative);
        }

        fs.writeFile('./initiative.json', JSON.stringify(client.initiative), err => {
            if(err) throw err;
        });

        message.channel.send('```diff\n- INITIATIVE CLEARED - ```');
    }
};