const Pricing = require("../Models/Pricing")

async function createRecord(req, res) {
    try {
        let data = new Pricing(req.body)
        await data.save()
        res.send({
            result: "Done",
            data: data
        })
    } catch (error) {
        console.log(error)
        let errorMessage = {}
        error.keyValue ? errorMessage.name = "This Pricing Plan Is Already Exist" : ''
        error.errors?.name ? errorName.name = error.errors.name.message : ''
        error.errors?.basePrice ? errorName.basePrice = error.errors.basePrice.message : ''
        error.errors?.discount ? errorName.discount = error.errors.discount.message : ''
        error.errors?.finalPrice ? errorName.finalPrice = error.errors.finalPrice.message : ''
        error.errors?.shortDescription ? errorName.shortDescription = error.errors.shortDescription.message : ''
        error.errors?.description ? errorName.description = error.errors.description.message : ''

        res.status(400).send({
            result: "Fail",
            reason: errorMessage
        })
    }
}

async function getRecord(req, res) {
    try {
        let data = await Pricing.find()
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

async function getSingleRecord(req, res) {
    try {
        let data = await Pricing.findOne({ _id: req.params._id })
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

async function updateRecord(req, res) {
    try {
        let data = await Pricing.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name
            data.basePrice = req.body.basePrice
            data.discount = req.body.discount
            data.finalPrice = req.body.finalPrice
            data.shortDescription = req.body.shortDescription
            data.description = req.body.description
            data.status = req.body.status
            await data.save()
            res.send({
                result: "Done",
                data: data
            })
        }
        else {
            res.status(401).send({
                result: "Fail",
                reason: "Record Not Found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Pricing.findOne({ _id: req.params._id })
        if (data)
            await data.deleteOne()

        res.send({
            result: "Done"
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
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord
}