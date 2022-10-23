const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('piada')
        .setDescription('Conta uma piada.'),
    async execute(interaction) {
        const listaPiadas = [
            "Em qual candidato o viper vota?\n||Em qualquer um abaixo do 18.||",
            "Qual a semelhança entre um Padre, o Michel Jackson e o Viper?\n||Todos já comeram crianças.||"
        ];
        await interaction.reply(listaPiadas[Math.floor(Math.random() * listaPiadas.length)]);
    },
};

