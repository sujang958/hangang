import { MessageEmbed } from "discord.js"
import Command from "../interfaces/command"

const PingCommand: Command = {
    command: {
        name: '핑',
        description: '핑을 보여줍니다.'
    },
    async commandDo(interaction, client) {
        const embed = new MessageEmbed()
            .setTitle('핑')
            .setColor('GREEN')
            .addField('API Latency', `${client.ws.ping} ms`)
            .setTimestamp()

        return interaction.reply({ embeds: [embed] })
    }
}

export default PingCommand