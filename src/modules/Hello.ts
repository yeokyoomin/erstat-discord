import { Extension, applicationCommand, listener } from '@pikokr/command.ts'
import { ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

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
    description: "Check the bot's latency.",
  })
  async ping(i: ChatInputCommandInteraction) {
    const userLocale = i.locale;
    await i.reply(`현재 언어 : ${i.locale}`)
  }
}

export const setup = async () => {
  return new HelloExtension()
}
