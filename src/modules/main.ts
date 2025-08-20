import { Extension, applicationCommand, option } from '@pikokr/command.ts'
import { ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType } from 'discord.js'
import { loadLocale, formatMessage, comma } from '../structures/util_modules'

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
            name: 'type',
            nameLocalizations: {
                'ko': "타입"
            },
            description: 'Please select how you would like to use the route command.',
            descriptionLocalizations: {
                'ko': "루트 명령어를 어떤 방법으로 사용할지 선택해 주세요."
            },
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: '루트 ID',
                    nameLocalizations: {

                    },
                    value: 'rid',
                },
                {
                    name: '추천 루트',
                    value: 'rec',
                },
            ],
        })
        viewtype: string,
        i: ChatInputCommandInteraction
    ) {
    }
}