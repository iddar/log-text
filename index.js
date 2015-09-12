'use strict';
const db = require('./database/memory');
const logText = require('./core/save-text')({dbInstance: db});

logText.saveText('Disfrutando elsfdfdsfff fdsfdsfdsfdsfdsfdsfdsfdsdsff  sdfdsfdsfdsfdsfdsdsff diadsfsdfdsfsdfdsfdsfdsf sdfdsfdsfsdf sdfdsfdsfsfsfdf en gdl con @lacanijalagartija', console.log);
logText.saveText('Lo mejor de viajar es la gente #nomada', console.log);
