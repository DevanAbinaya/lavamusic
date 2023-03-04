import Event from "../../structures/Event.js";

export default class ClientReady extends Event {
  constructor(...args) {
    super(...args);
  }
  async run() {
    this.client.logger.ready(`Logged in as ${this.client.user.tag}`);
    this.client.user.setPresence({
      activities: [
        {
          name: "Music with owner",
          type: 2,
        },
      ],
      status: "idle",
    });
  }
}
