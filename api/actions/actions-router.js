// Write your "actions" router here!
const express = require('express');
const { checkActionExists, checkProjectExists, validateAction, validateActionCompleted } = require('./actions-middlware');

const actions = require('./actions-model');

const router = express.Router();

router.get("/", (req, res, next) => {
    actions.get()
     .then(resp => {
         res.status(200).json(resp);
     }).catch(next)
})

router.get("/:id", checkActionExists, (req, res, next) => {
    const { id } = req.params;

    actions.get(id)
    .then(resp => {
        res.status(200).json(resp);
    }).catch(next)
})

router.post("/", [checkProjectExists, validateAction], (req, res, next) => {
    const neoAction = req.body

    actions.insert(neoAction)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.put("/:id", [checkProjectExists, validateAction, validateActionCompleted], (req, res, next) => {
    const { id } = req.params;
    const neoAction = req.body

    actions.update(id, neoAction)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.delete('/:id', checkActionExists, (req, res, next) => {
    const { id } = req.params;

    actions.remove(id)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

module.exports = router;