const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const Text = require("../Models/Text");


// ======================
// Generate Chat Title
// ======================
async function generateTitle(input) {
    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create an exact 3-4 word title for following query: "${input}"`,
        });

        return response.text?.replaceAll('"', "") || "New Chat";

    } catch (error) {
        console.log("Title Error:", error);
        return "New Chat";
    }
}


// ======================
// Create Chat Record
// ======================
async function createRecord(req, res) {

    try {

        const { _id, userid, input } = req.body;

        if (!input) {
            return res.status(400).send({
                result: "Fail",
                reason: "Input is required"
            });
        }

        let chat;

        // Existing Chat
        if (_id) {

            chat = await Text.findById(_id);

            if (!chat) {
                return res.status(404).send({
                    result: "Fail",
                    reason: "Chat not found"
                });
            }

            chat.chats.push({
                type: "Request",
                data: input
            });

        }

        // New Chat
        else {

            chat = new Text({
                user: userid || null,
                title: await generateTitle(input),
                chats: [
                    {
                        type: "Request",
                        data: input
                    }
                ]
            });

        }

        await chat.save();


        // Gemini Response
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: input,
        });


        chat.chats.push({
            type: "Response",
            data: response.text || "No Response"
        });

        await chat.save();


        res.send({
            result: "Done",
            chat: chat
        });

    }

    catch (error) {

        console.log("Create Record Error:", error);

        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });

    }
}


// ======================
// Get All Chats
// ======================
async function getRecord(req, res) {

    try {

        let data = await Text.find().sort({ createdAt: -1 });

        res.send({
            result: "Done",
            data: data
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });

    }

}


// ======================
// Get Single Chat
// ======================
async function getSingleRecord(req, res) {

    try {

        let data = await Text.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Chat not found"
            });
        }

        res.send({
            result: "Done",
            data: data
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });

    }

}


// ======================
// Delete Chat
// ======================
async function deleteRecord(req, res) {

    try {

        const data = await Text.findById(req.params._id);

        if (data) {
            await data.deleteOne();
        }

        res.send({
            result: "Done"
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });

    }

}


module.exports = {
    createRecord,
    getRecord,
    getSingleRecord,
    deleteRecord
};