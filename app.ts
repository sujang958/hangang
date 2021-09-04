import { Client, Collection, Intents } from "discord.js"
import { config } from "dotenv"
import * as fs from "fs"
import { CommandModel, connect } from "./db"
import Command, { commandDo } from "./interfaces/command"

config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

const CommandsDo = new Collection<string, commandDo>()

client.on('ready', (cln): void => {
    console.log('Logined on', cln.user.tag)
})

client.on('ready', async (): Promise<void> => {
    if (!process.env.DB_URI)    throw new Error('Can`t connect to database')
    connect(String(process.env.DB_URI))
    const commandFiles = fs.readdirSync('./commands/')
    for (const file of commandFiles) {
        const { command, commandDo }: Command = require(`./commands/${file}`).default
        const checkCommand = await CommandModel.findOne({ name: command.name })

        if (checkCommand)
            if (checkCommand.registered)
                continue
        
        CommandsDo.set(command.name, commandDo)
        const SlashCommand = await client.application?.commands.create(command)
        if (SlashCommand) {
            const RegisterCommandModel = new CommandModel({
                _id: SlashCommand.id,
                name: command.name,
                registered: true,
            })
        }
    }
    console.log('Command initialized')
})

client.on('interactionCreate', interaction => {
    if (!interaction.isCommand())   return
    const commandDo = CommandsDo.get(interaction.commandName)
    if (commandDo)
        return commandDo(interaction, client)
})

client.login(process.env.BOT_TOKEN)
// https://discord.com/api/oauth2/authorize?client_id=883619043330912276&permissions=125952&scope=bot%20applications.commands