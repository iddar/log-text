'use strict';
var bucket = [];

function getRealId(itemId) {
  return --itemId;
}

function getNewId() {
  return bucket.length + 1
}

class Memory extends Error{
  constructor() {
    super();
  }

  saveItem(item, callback) {
    item.id = getNewId();
    item.createAt = (new Date()).toISOString();
    item.updateAt = (new Date()).toISOString();
    bucket.push(item);

    return this.getItemById(item.id, function (error, savedItem) {
      callback(null, savedItem);
    });
  }

  getItemById(itemId, callback) {
    let realId = getRealId(itemId);
    if (bucket[realId] === undefined) return callback(new MemoryError('id no match'));

    return callback(null, bucket[realId]);
  }

  updateItemById(itemId, newData, callback){
    let realId = getRealId(itemId);
    if (bucket[realId] === undefined) return callback(new MemoryError('No update item: Invalid id'));

    delete newData.id;
    delete newData.createAt;
    newData.updateAt = (new Date()).toISOString();
    bucket[realId] = newData;

    return this.getItemById(itemId, function (error, savedItem) {
      callback(null, savedItem);
    });
  }

  deleteItemById(itemId, callback) {
    let realId = getRealId(itemId);
    if (bucket[realId] === undefined) return callback(new MemoryError('No delete item: Invalid id'));
    delete bucket[realId];
    return callback(null, 'item remove');
  }
}

module.exports = new Memory;
