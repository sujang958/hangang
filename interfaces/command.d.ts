import { ApplicationCommandData, Client, CommandInteraction } from "discord.js";

export default interface Command {
    command: ApplicationCommandData
    commandDo: commandDo
}

export type commandDo = (interaction: CommandInteraction, client: Client) => Promise<void> | Promise<any>