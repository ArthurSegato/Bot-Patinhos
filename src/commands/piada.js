const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs/promises');
const filePath = "./src/files/jokes.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('piada')
        .setDescription('Conta uma piada.'),
    async execute(interaction) {
        async function getJokes() {
            try {
                const data = await fs.readFile(filePath, { encoding: 'utf8' });
                const jokesObject = JSON.parse(data);
                const jokesList = [];
                for(key in jokesObject){
                    jokesList.push(jokesObject[key]);
                }
                await interaction.reply(jokesList[Math.floor(Math.random() * jokesList.length)]);
            } catch (err) {
                console.error(err);
            }
        }
        await getJokes();
    },
};

