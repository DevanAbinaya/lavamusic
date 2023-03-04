import Command from "../../structures/Command.js";
import { Message } from "discord.js";

export default class Purge extends Command {
  constructor(client) {
    super(client, {
      name: "clear",
      description: {
        content: "Delete messages in a channel",
        usage: "<amount>",
        examples: ["clear 50"],
      },
      aliases: ["c"],
      category: "dev",
      cooldown: 3,
      args: true,
      permissions: {
        dev: false,
        client: ["SendMessages", "ViewChannel", "EmbedLinks"],
        user: [],
      },
      player: {
        voice: false,
        dj: false,
        active: false,
        djPerm: null,
      },
      slashCommand: false,
    });
  }
  /**
   * @param {Message} message
   */
  async run(message, args, ctx) {
    await setTimeout(() => message.delete(), 100);
    let amount = Number(args[0], 10) || parseInt(args[0]);
    if (isNaN(amount) || !Number.isInteger(amount)) {
      return message.channel.send(
        "Please enter a number of messages to purge.",
        {
          message,
        }
      );
    } else if (!amount || amount < 2) {
      return message.channel.send(
        "Please enter a number of message between 2",
        {
          message,
        }
      );
    }
    if (amount <= amount + 200) {
      if (Math.floor(amount / 100) % 100 === 0) {
        message.channel.bulkDelete(amount, true).then((m) => {
          message.channel
            .send(`✅  Cleared **${m.size}**/**${amount}** messages!`, {
              timeout: 4000,
              message,
            })
            .then((msg) => {
              setTimeout(() => msg.delete(), ms("5 seconds"));
            });
        });
      } else if (Math.floor(amount / 100) % 100) {
        setTimeout(() => {
          for (let i = 0; i < Math.floor(amount / 100) % 100; i++) {
            message.channel.bulkDelete(100, true);
          }
        }, 1000);
        setTimeout(() => {
          message.channel
            .send(`✅  Cleared **${amount}**/**${amount}** messages!`, {
              timeout: 4000,
              message,
            })
            .then((msg) => {
              setTimeout(() => msg.delete(), ms("5 seconds"));
            });
        }, 3000);
      } else if (amount % 100 === 0) {
        message.channel.bulkDelete(amount, true).then((m) => {
          message.channel
            .send(`✅  Cleared **${m.size}**/**${amount}** messages!`, {
              timeout: 4000,
              message,
            })
            .then((msg) => {
              setTimeout(() => msg.delete(), ms("5 seconds"));
            });
        });
      } else {
        let s = await message.channel.bulkDelete(amount % 100, true);
        message.channel
          .send(`✅  Cleared **${s.size}**/**${amount}** messages!`, {
            timeout: 4000,
            message,
          })
          .then((msg) => {
            setTimeout(() => msg.delete(), ms("5 seconds"));
          });
      }
    }
  }
}
