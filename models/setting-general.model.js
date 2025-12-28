const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const settingGeneralSchema = new mongoose.Schema(
    {
        websiteName: String,
        logo: String,
        phone: String,
        email: String,
        copyright: String,
        address: String,
    },
    {
        timestamps: true,
    }
);
const SettingGeneral = mongoose.model("SettingGeneral", settingGeneralSchema, "setting-general");
module.exports = SettingGeneral;