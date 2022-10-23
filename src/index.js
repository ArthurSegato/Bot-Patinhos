/*
*	BIBLIOTECAS
*/
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const { token } = require('./config.json');

// Cria uma nova instancia do cliente
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

/*
*	LEITURA DOS COMANDOS
*/

// Cria um coleção de comandos
client.commands = new Collection();

// Pega o caminho dos comandos
const commandsPath = path.join(__dirname, 'commands');

// Cria um lista com os arquivos dos comandos
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Le todos os arquivos dos comandos dentro da pasta de comandos
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Cria um novo item na coleção, usando como chave o nome do comando e o valor como o módulo exportado
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log("\x1b[33m[ AVISO ]", `\x1b[0mO comando em ${filePath} não tem a propriedade nome ou dados`);
	}
}

/*
*	INICIALIZAÇÃO DO BOT
*/

// Quando o bot rodar, executa apenas uma vez o aviso no console
client.once(Events.ClientReady, c => {
	console.log("\x1b[32m[ OK ]",`\x1b[0mLogado como ${c.user.tag}`);
});

// Sempre que receber algum evento, seja ele comandos ou interaçoes, executa essa porra ai abaixo
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error("\x1b[31m[ FALHA ]", `\x1b[0mO comando ${interaction.commandName} não foi encontrado.`);
		return;
	}
	
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Deu merda irmão, alguma coisa quebrou.', ephemeral: true });
	}
});

// Loga o bot no discord usando o token
client.login(token);