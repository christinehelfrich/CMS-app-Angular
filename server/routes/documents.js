var express = require('express');
var router = express.Router();
module.exports = router; 

const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

//router.get('/:id', (req, res, next) => {
//    res.send(req.params.id)
//  });



router.get('/', (req, res, next) => {
    Document.find().then(documents => {
        res.status(200).json({
            message: "documents fetched successfully",
            documents: documents
        });
    })
    .catch(err => {
        res.status(500).json({
            err: err
        })
    })
})

router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");
    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });
    document.save()
        .then(createdDocument => {
            res.status(201).json({
                message: 'Document added successfully',
                document: createdDocument
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
    Document.findOne({ id: req.params.id })
        .then(document => {
            //console.log(document)
            document.name = req.body.name;
            document.description = req.body.description;
            document.url = req.body.url;
            Document.updateOne({ id: req.params.id }, document)
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
    Document.findOne({ id: req.params.id })
      .then(document => {
        Document.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Document deleted successfully"
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
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });