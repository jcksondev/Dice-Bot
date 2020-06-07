/* eslint-disable prefer-const */
module.exports = {
    name: 'initlist',
    usage: '',
    execute(message, args, client) {
        let sortedArray = [];

        for(const i in client.initiative) {
            sortedArray.push(client.initiative[i]);
        }

        function compare(a, b) {
            const initA = a.initiative;
            const initB = b.initiative;

            let comparison = 0;
            if(initA > initB) comparison = -1;
            else if (initA < initB) comparison = 1;

            return comparison;
        }

        console.log(sortedArray);
        console.log(sortedArray.sort(compare));
        sortedArray.forEach((val, index) => {
            message.channel.send(`**${sortedArray[index].user}:** ${sortedArray[index].initiative}`);
        });
    }
};