var AbstractInspector = require("ui/abstract/abstract-inspector").AbstractInspector,
    RsyncCopyRsyncdirection = require('core/model/enumerations/rsync-copy-rsyncdirection').RsyncCopyRsyncdirection,
    RsyncCopyRsyncmode = require('core/model/enumerations/rsync-copy-rsyncmode').RsyncCopyRsyncmode;



exports.RsyncArgs = AbstractInspector.specialize({
    _inspectorTemplateDidLoad: {
        value: function() {
            var self = this;

            this.rsyncDirections = RsyncCopyRsyncdirection.members.map(function(x) {
                return {
                    label: x.toLowerCase().toCapitalized(),
                    value: x
                };
            });

            this.rsyncModes = RsyncCopyRsyncmode.members.map(function(x) {
                return {
                    label: x.toLowerCase().toCapitalized(),
                    value: x
                };
            });
        }
    },

    enterDocument: {
        value: function(isFirstTime) {
            this.super(isFirstTime);
            if (this.object.length !== 1) {
                this.object.push({rsync_properties: {}});
                this.object.__type = this.type;
            }
            this._extra = this.object[0].rsync_properties.extra;
        }
    },

    save: {
        value: function() {
            this.object[0].rsync_properties.extra = this._extra;
            return this.object;
        }
    }
});
