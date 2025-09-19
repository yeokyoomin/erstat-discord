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
            name: 'id',
            description: 'Please enter your route ID.',
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
                const desc = routedata.result.recommendWeaponRouteDesc.desc || lang.route_cmd.no_desc
                let spath = routedata.result.recommendWeaponRouteDesc?.skillPath?.includes('q')
                    ? routedata.result.recommendWeaponRouteDesc.skillPath
                    : lang.route_cmd.no_skillpath
                const Embed = new EmbedBuilder()
                    .setColor("#60a5fa")
                    .setTitle(`${routedata.result.recommendWeaponRoute.title}`)
                    .setDescription(`${formatMessage(lang.route_cmd.author, { user: routedata.result.recommendWeaponRoute.userNickname })}\ndescription : ${desc}\nskill tree : ${spath}`)
                    .setFooter({ text: lang.all_cmd.powered_footer })
                    .setImage('https://cdn.discordapp.com/attachments/1306871563114647593/1381126676536229918/-001_6.png?ex=68c24ef3&is=68c0fd73&hm=e7e1443e97db94b8fce434cf0b70b318b1df222798264c4add2a67f5a981e549&')
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
