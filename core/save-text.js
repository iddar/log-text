'use strict';

class LogTextError extends Error {
  constructor(message) {
    super();
    this['class'] = 'LogText';
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
};

class LogText {
  constructor(args) {
    this.db = args.dbInstance;
  }

  saveText(text, callback) {
    let item = {text: text};
    if (text.length > 140) return callback(new LogTextError('text length limit to 140 characters'))

    item.tags = text.match(/(#[a-zA-z0-9]+)/g);
    item.mentions = text.match(/(@[a-zA-z0-9]+)/g);

    Array.isArray(item.tags)
      ? item.tags = item.tags.map( tag => tag.replace('#', ''))
      : delete item.tags;

    Array.isArray(item.mentions)
      ? item.mentions = item.mentions.map( mention => mention.replace('@', ''))
      : delete item.mentions;

    this.db.saveItem(item, function(error, itemSaved) {
      if (error) console.error(new LogTextError('Save item fail'));
      callback(null, itemSaved);
    });
  }

}

module.exports = db => new LogText(db);
