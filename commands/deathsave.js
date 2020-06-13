const fs = require('fs');
const _ = require('lodash');
module.exports = {
    name: 'ds',
    execute(message, args, client) {
        const save = _.random(1, 20);
        const success = save >= 10 ? 1 : 0;
        const fail = save < 10 ? 1 : 0; 
        const userId = message.author.id;

        if(!client.deathsave[userId]) {
            client.deathsave[userId] = {
                user: message.author.username,
                success: success,
                fail: fail,
           };
        }else {
            client.deathsave[userId].success += success;
            client.deathsave[userId].fail += fail;
        }
        
        let returnMessage = save >= 10 ? '**Success!**' : '**Failure!**';
        if(client.deathsave[userId].success >= 3) returnMessage = 'Heroes ***NEVER***  die!';
        else if(client.deathsave[userId].fail >= 3) returnMessage = 'oh shit that\'s rough buddy...';
        else returnMessage += `\nSuccess: ${client.deathsave[userId].success}\nFailure: ${client.deathsave[userId].fail}`;
        message.channel.send(returnMessage); 

        if(client.deathsave[userId].success >= 3 || client.deathsave[userId].fail >= 3) {
            delete client.deathsave[userId];
        }

        fs.writeFile('./deathsave.json', JSON.stringify(client.deathsave, null, 4), err => {
            if(err) throw err;
        });
    },
};