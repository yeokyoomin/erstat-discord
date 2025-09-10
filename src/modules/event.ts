import { Extension, listener } from '@pikokr/command.ts'
import { ActivityType, ApplicationCommand } from 'discord.js';

class EventModules extends Extension {
    @listener({ event: 'ready' })
    async ready() {
        this.logger.info(`Logged in as ${this.client.user?.tag}`)
        await this.commandClient.fetchOwners()

        const commands = await this.client.application?.commands.fetch();
        if (!commands) {
            return this.logger.warn("No registered commands exist, so the status message cannot be displayed.");
        }

        const statuses: { name: string; type: ActivityType }[] = [];
        commands.forEach((cmd: ApplicationCommand) => {
            const koName = cmd.nameLocalizations?.ko ?? cmd.name;
            const enName = cmd.name;

            statuses.push({
                name: `/${koName} 명령어를 사용해봐요!`,
                type: ActivityType.Playing,
            });
            statuses.push({
                name: `Try using /${enName} command!`,
                type: ActivityType.Playing,
            });
        });

        if (statuses.length === 0) {
            this.logger.warn("There are no status messages available for use.");
            return;
        }

        let i = 0;

        this.client.user?.setPresence({
            activities: [statuses[i]],
            status: "online",
        });

        setInterval(() => {
            i = (i + 1) % statuses.length;
            this.client.user?.setPresence({
                activities: [statuses[i]],
                status: "online",
            });
        }, 10 * 1000);
    }

    @listener({ event: 'applicationCommandInvokeError', emitter: 'cts' })
    async errorHandler(err: Error) {
        this.logger.error(err)
    }
}

export const setup = async () => {
    return new EventModules()
}
