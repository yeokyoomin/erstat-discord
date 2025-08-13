import { Extension, applicationCommand, listener } from '@pikokr/command.ts'
import { ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { formatMessage, loadLocale } from '../structures/dev_modules'

class HelloExtension extends Extension {
  @listener({ event: 'ready' })
  async ready() {
    this.logger.info(`Logged in as ${this.client.user?.tag}`)
    await this.commandClient.fetchOwners()
  }

  @listener({ event: 'applicationCommandInvokeError', emitter: 'cts' })
  async errorHandler(err: Error) {
    this.logger.error(err)
  }

  @applicationCommand({
    name: 'ping',
    type: ApplicationCommandType.ChatInput,
    description: "Check the bot's latency",
    nameLocalizations: {
      ko: "핑"
    },
    descriptionLocalizations: {
      ko: "봇의 지연시간을 확인해요."
    }
  })
  async ping(i: ChatInputCommandInteraction) {
    const lang = await loadLocale(i.locale)
    await i.deferReply();
    const reply = await i.fetchReply();
    const Ping_Embed = new EmbedBuilder()
      .setColor("#60a5fa")
      .setTitle(`${lang.cmd_pong}`)
      .addFields(
        { name: "Client", value: `${reply.createdTimestamp - i.createdTimestamp}ms`, inline: true },
        { name: "Websocket", value: `${i.client.ws.ping}ms`, inline: true }
      )
      .setFooter({ text: lang.all_cmd.powered_footer })
    return i.editReply({ embeds: [Ping_Embed] })
  }
}

export const setup = async () => {
  return new HelloExtension()
}
