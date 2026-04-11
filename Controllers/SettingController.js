const Setting = require("../Models/Setting")

async function createRecord(req, res) {
    try {
        var data = await Setting.find()
        if (data.length) {
            data = data[0]
            data.siteName = req.body.siteName ?? data.siteName
            data.address = req.body.address ?? data.address
            data.map1 = req.body.map1 ?? data.map1
            data.map2 = req.body.map2 ?? data.map2
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            data.whatsapp = req.body.whatsapp ?? data.whatsapp
            data.facebook = req.body.facebook ?? data.facebook
            data.twitter = req.body.twitter ?? data.twitter
            data.linkedin = req.body.linkedin ?? data.linkedin
            data.instagram = req.body.instagram ?? data.instagram
            data.youtube = req.body.youtube ?? data.youtube
            await data.save()
        }
        else {
            data = new Setting(req.body)
            await data.save()
        }
        res.send({
            result: "Done",
            data: data
        })
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

async function getRecord(req, res) {
    try {
        let data = await Setting.find()
        res.send({
            result: "Done",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}


module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
}