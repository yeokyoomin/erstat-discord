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
        infodetail: string,
        i: ChatInputCommandInteraction
    ) {
        const lang = await loadLocale(i.locale)
        const Embed = new EmbedBuilder()
            .setColor("#60a5fa")
            .setTitle(`${lang.cmd_routesearch}`)
            .setDescription(`${lang.route_cmd.route_please_wait}`)
            .setFooter({ text: lang.all_cmd.powered_footer })

        await i.reply({ embeds: [Embed] })

        const routedata = await callapi.get_root_info(infodetail)
        console.log(routedata)
        try {
            if (routedata.code == 404) {
                const ErrorEmbed = new EmbedBuilder()
                    .setColor("#f75555")
                    .setTitle(`${lang.all_cmd.error}`)
                    .setDescription(`${formatMessage(lang.route_cmd.route_not_founded, { id: infodetail })}`)
                    .setFooter({ text: lang.all_cmd.powered_footer })
                return await i.editReply({ embeds: [ErrorEmbed] })
            } else {
                const Embed = new EmbedBuilder()
                    .setColor("#60a5fa")
                    .setTitle(`${lang.cmd_routesearch}`)
                    .setDescription(`[In dev]`)
                    .setFooter({ text: lang.all_cmd.powered_footer })
                return await i.editReply({ embeds: [Embed] })
            }
        } catch (error) {
            const ErrorEmbed = new EmbedBuilder()
                .setColor("#f75555")
                .setTitle(`${lang.all_cmd.error}`)
                .setDescription(`${lang.route_cmd.route_search_error}\n\`⚠️ ${error}\``)
                .setFooter({ text: lang.all_cmd.powered_footer })
            return await i.editReply({ embeds: [ErrorEmbed] })
        }
    }
}

export const setup = async () => {
    return new MainModules()
}
