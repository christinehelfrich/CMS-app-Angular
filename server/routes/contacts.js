var express = require('express');
var router = express.Router();
module.exports = router; 


const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
    Contact.find()
    .populate('group')
    .then(contacts => {
        res.status(200).json({
            message: "Contacts fetched successfully",
            contacts: contacts
        });
    })
    .catch(err => {
        res.status(500).json({
            err: err
        })
    })
})

router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");
    console.log(req.body)
    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imgUrl
    });
    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: 'contact added successfully',
                contact: createdContact
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'An error occurred',
                err: err
            });
        });
});

router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.imageUrl = req.body.imageUrl
            Contact.updateOne({ id: req.params.id }, contact)
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
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        Contact.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "contact deleted successfully"
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
          error: { contact: 'Document not found'}
        });
      });
  });