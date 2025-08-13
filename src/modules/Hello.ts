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
    description: "Check the bot's latency.",
  })
  async ping(i: ChatInputCommandInteraction) {
    const lang = await loadLocale(i.locale)
    await i.reply(lang.all_cmd.powered_footer)
  }
}

export const setup = async () => {
  return new HelloExtension()
}
