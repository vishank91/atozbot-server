const { GoogleGenAI } = require("@google/genai");
const Text = require("../Models/Text");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateTitle(input) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create an exact 3-5 word title for this query: "${input}". Return only the title without quotes or special characters.`
        });

        return response.text?.replace(/["']/g, "").trim() || "New Chat";
    }
    catch (error) {
        console.log(error);
        return "New Chat";
    }
}

async function createRecord(req, res) {
    try {
        const { _id, userid, input } = req.body;

        if (!input) {
            return res.status(400).json({
                result: "Fail",
                reason: "Input is required"
            });
        }

        let chat;
        let isNewChat = false;

        if (_id) {
            chat = await Text.findById(_id);

            if (!chat) {
                return res.status(404).json({
                    result: "Fail",
                    reason: "Chat not found"
                });
            }

            chat.chats.push({
                type: "Request",
                data: input
            });
        }
        else {
            isNewChat = true;

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

        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const metadata = {
            type: "meta",
            _id: chat._id,
            title: chat.title,
            isNewChat
        };

        res.write(JSON.stringify(metadata) + "\n\n");

        const stream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: input
        });

        let fullResponse = "";

        for await (const chunk of stream) {
            const text = chunk.text || "";

            fullResponse += text;

            res.write(text);
        }

        chat.chats.push({
            type: "Response",
            data: fullResponse
        });

        await chat.save();

        res.end();
    }
    catch (error) {
        console.log(error);

        if (!res.headersSent) {
            res.status(500).json({
                result: "Fail",
                reason: "Internal Server Error"
            });
        }
        else {
            res.end();
        }
    }
}

async function getRecord(req, res) {
    try {
        const data = await Text.find().sort({
            createdAt: -1
        });

        res.json({
            result: "Done",
            data
        });
    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function getSingleRecord(req, res) {
    try {
        const data = await Text.findById(req.params._id);

        if (!data) {
            return res.status(404).json({
                result: "Fail",
                reason: "Chat not found"
            });
        }

        res.json({
            result: "Done",
            data
        });
    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function deleteRecord(req, res) {
    try {
        const data = await Text.findById(req.params._id);

        if (data) {
            await data.deleteOne();
        }

        res.json({
            result: "Done"
        });
    }
    catch (error) {
        console.log(error);

        res.status(500).json({
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