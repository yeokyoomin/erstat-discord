import { Extension, applicationCommand, option } from '@pikokr/command.ts'
import { ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType } from 'discord.js'
import { loadLocale, formatMessage, comma } from '../structures/util_modules'
import * as callapi from '../structures/api_modules'

class MainModules extends Extension {
    @applicationCommand({
        name: 'routes',
        type: ApplicationCommandType.ChatInput,
        description: "Check out the features related to roots.",
        nameLocalizations: {
            ko: "루트"
        },
        descriptionLocalizations: {
            ko: "루트와 관련된 기능들을 확인해 보세요."
        }
    })
    async info(
        @option({
            name: 'routeid',
            nameLocalizations: {
                'ko': "루트id"
            },
            description: 'Please enter your root ID.',
            descriptionLocalizations: {
                'ko': "루트 ID를 입력해 주세요."
            },
            type: ApplicationCommandOptionType.String,
            required: true,
        })
        infodeatail: string,
        i: ChatInputCommandInteraction
    ) {
        const lang = await loadLocale(i.locale)
        const routedata = callapi.get_root_info(infodeatail)
        const Embed = new EmbedBuilder()
            .setColor("#60a5fa")
            .setTitle(`${lang.cmd_routesearch}`)
            .setDescription(`${routedata}`)
            .setFooter({ text: lang.all_cmd.powered_footer })
        return i.reply({ embeds: [Embed] })
    }
}

export const setup = async () => {
    return new MainModules()
}
