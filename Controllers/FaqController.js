const Faq = require("../Models/Faq")

async function createRecord(req, res) {
    try {
        let data = new Faq(req.body)
        await data.save()
        res.send({
            result: "Done",
            data: data
        })
    } catch (error) {
        console.log(error)
        let errorMessage = {}
        error.keyValue ? errorMessage.question = "This Question is Already Exist" : ''
        error.errors?.question ? errorName.question = error.errors.question.message : ''
        error.errors?.answer ? errorName.answer = error.errors.answer.message : ''

        res.status(400).send({
            result: "Fail",
            reason: errorMessage
        })
    }
}

async function getRecord(req, res) {
    try {
        let data = await Faq.find()
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
        let data = await Faq.findOne({ _id: req.params._id })
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
        let data = await Faq.findOne({ _id: req.params._id })
        if (data) {
            data.question = req.body.question
            data.answer = req.body.answer
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
        let data = await Faq.findOne({ _id: req.params._id })
        if (data){
            await data.deleteOne()
        }

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