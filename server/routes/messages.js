var express = require('express');
var router = express.Router();
module.exports = router; 


const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

router.get('/', (req, res, next) => {
    Message.find().then(messages => {
        res.status(200).json({
            message: "messages fetched successfully",
            messages: messages
        });
    })
    .catch(err => {
        res.status(500).json({
            err: err
        })
    })
})

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("documents");
    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });
    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'contact added successfully',
                message: createdMessage
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'An error occurred',
                err: err
            });
        });
});

router.route('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            message.subject = req.body.subject,
            message.msgText = req.body.msgText,
            message.sender = req.body.sender
            Message.updateOne({ id: req.params.id }, message)
        .then( result => {
            res.status(204).json({
                message: 'Document updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'An Error Occurred', 
                error: error
            });
        });

        });
});


router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "message deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'contact not found.',
          error: { message: 'Document not found'}
        });
      });
  });