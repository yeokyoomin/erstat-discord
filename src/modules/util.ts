import { Extension, applicationCommand } from '@pikokr/command.ts'
import { ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { loadLocale, formatMessage, comma } from '../structures/util_modules'
import { default as axios } from 'axios';
import { config } from '../config';

class UtilModules extends Extension {
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
        { name: "Websocket", value: `${i.client.ws.ping}ms`, inline: true },
        { name: "Erstat", value: `미지원.`, inline: true }
      )
      .setFooter({ text: lang.all_cmd.powered_footer })
    return i.editReply({ embeds: [Ping_Embed] })
  }

  @applicationCommand({
    name: 'current-player',
    type: ApplicationCommandType.ChatInput,
    description: "Check the current number of concurrent users on Eternal Return.",
    nameLocalizations: {
      ko: "동시접속자"
    },
    descriptionLocalizations: {
      ko: "이터널리턴의 현재 동시 접속자 수를 확인해요."
    }
  })
  async CurrentPlayers(i: ChatInputCommandInteraction) {
    const lang = await loadLocale(i.locale)
    let current_description
    try {
      const req_cp = await axios.get(config.app_id)
      current_description = formatMessage(lang.spec_cmd.cp_desc, { user: String(comma(req_cp.data.response.player_count)) });
      if (req_cp.data.response.result != 1) {
        current_description = lang.all_cmd.req_failed
      }
    } catch {
      current_description = lang.all_cmd.req_failed
    }
    const Embed = new EmbedBuilder()
      .setColor("#60a5fa")
      .setTitle(`${lang.cmd_currentplayer}`)
      .setDescription(`${current_description}`)
      .setFooter({ text: lang.all_cmd.powered_footer })
    return i.reply({ embeds: [Embed] })
  }
}

export const setup = async () => {
  return new UtilModules()
}
