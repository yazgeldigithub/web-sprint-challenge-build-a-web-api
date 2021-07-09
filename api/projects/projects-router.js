// Write your "projects" router here!
const express = require('express');
const { checkProjectExists, validateCompleted, validateProject } = require('./projects-middleware');

const projects = require('./projects-model');
const actions = require('../actions/actions-model')

const router = express.Router();

router.get("/", (req, res, next) => {
    projects.get()
     .then(resp => {
         res.status(200).json(resp);
     }).catch(next)
})

router.get("/:id", checkProjectExists, (req, res, next) => {
    const { id } = req.params;

    projects.get(id)
    .then((resp) => {
        res.status(200).json(resp);
    }).catch(next);
})

router.get('/:id/actions', checkProjectExists, (req, res, next) => {
    const { id } = req.params;

    actions.getByProjectId(id)
        .then((resp) => {
            res.status(200).json(resp);
        }).catch(next);
})

router.post("/", validateProject, (req, res, next) => {
    const neoProject = req.body;

    projects.insert(neoProject)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.put("/:id", [checkProjectExists, validateProject, validateCompleted], (req, res, next) => {
    const { id } = req.params;
    const updateThis = req.body

    updateThis.id = id;

    projects.update(id, updateThis)
        .then(() => {
            projects.get(id)
                .then((resp) => {
                    res.status(201).json(resp);
                }).catch(next);
        }).catch(next);
})

router.delete("/:id", checkProjectExists, (req, res, next) => {
    const { id } = req.params;

    projects.remove(id)
        .then((resp) => {
            if (resp === -1) {
                res.status(500).json({ message: "error deleting requested project" })
            } else {
                res.status(200).json(resp);
            }
        })
        .catch(next);
})

module.exports = router;