var configApp = require('../config/configApp');

module.exports = {

    max_length_url: configApp.max_length_url || 12,
    min_length_url: configApp.min_length_url || 4,
    default_length_url: configApp.default_length_url || 6,

    generate: function (len) {
        if (!len) {
            len = this.default_length_url;
        } else if (len && len < this.min_length_url) {
            len = this.min_length_url;
        } else if (len && len > this.max_length_url) {
            len = this.max_length_url;
        }

        var text = "";
        var input = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < len; i++) {
            text += input.charAt(Math.floor(Math.random() * input.length));
        }

        return text;
    }

};