import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sandMessage = async (req, res) => {
    try {
        const sanderId = req.id;
        const receivedId = req.params.id;
        const {message} = req.body;

        let isConversation = await Conversation.findOne({
            participants: {$all: [sanderId, receivedId]}
        });

        if(!isConversation) {
            isConversation = await Conversation.create({
                participants: [sanderId, receivedId]
            })
        }

        const newMessage = await Message.create({
            sanderId,
            receivedId,
            message
        });

        if(newMessage) isConversation.messages.push(newMessage._id);

        await Promise.all([isConversation.save(), newMessage.save()]);

        return res.status(201).json({
            success: true,
            newMessage
        });

    } catch (error) {
        console.log('error in sand message api ', error)
    }
};

export const getMessage = async (req, res) => {
    try {
        const sanderId = req.id;
        const receivedId = req.params.id;
        const isConversation = await Conversation.find({
            participants: {$all: [sanderId, receivedId]}
        });
        if(!isConversation) return res.status(200).json({success: true, message: []})

        return res.status(200).json({success: true, messages: isConversation?.messages})
    } catch (error) {
        console.log('error in get Message api ', error)
    }
};