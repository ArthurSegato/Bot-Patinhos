const { SlashCommandBuilder} = require('discord.js');

const url = "https://youtu.be/5Zo2UtAO5JU?t=22";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kiara')
		.setDescription('Takanashi Kiara agresivamente gay.'),
	async execute(interaction) {

	}
};