class NotificationManager {
  constructor() {
    this.add = null;
    this.remove = null;
  }

  register(addFN, removeFN) {
      this.add = addFN;
      this.remove = removeFN;
  }

  addNotification(text, title, color){
      const textBody = {
          text,
          title,
          color
      }

      this.add(textBody);
  }
}

export default new NotificationManager();
