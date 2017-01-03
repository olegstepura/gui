"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_dao_ng_1 = require("./abstract-dao-ng");
var VolumeDatasetPropertyReservationDao = (function (_super) {
    __extends(VolumeDatasetPropertyReservationDao, _super);
    function VolumeDatasetPropertyReservationDao() {
        _super.call(this, 'VolumeDatasetPropertyReservation');
    }
    return VolumeDatasetPropertyReservationDao;
}(abstract_dao_ng_1.AbstractDao));
exports.VolumeDatasetPropertyReservationDao = VolumeDatasetPropertyReservationDao;