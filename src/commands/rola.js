const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rola')
		.setDescription('Informa a todos o tamanho da sua rola.'),
	async execute(interaction) {
		const size = Math.floor(Math.random() * 10) + 1;
		await interaction.reply(`${interaction.user} tem ${size}cm de rola!`);
	},
};