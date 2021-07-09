const db = require('./actions-model')
const dbp = require('../projects/projects-model')

// add middlewares here related to actions
module.exports = {
    checkActionExists,
    checkProjectExists,
    validateAction,
    validateActionCompleted
}

function checkActionExists(req, res, next) {
    const { id } = req.params;

    db.get(id)
        .then(resp => {
            if (resp === undefined || resp === null) {
                res.status(404).json({ message: "that action id does not exist "})
            } else {
                req.action = resp;
                next();
            }
        }).catch(err => {
            res.status(500).json({ 
                message: "Error retrieving record",
                err: err 
            })
        })
}

function checkProjectExists(req, res, next) {
    const { project_id } = req.params;

    dbp.get(project_id)
        .then(resp => {
            if (resp === undefined || resp === null) {
                res.status(404).json({ message: "that action id does not exist "})
            } else {
                req.project = resp;
                next();
            }
        }).catch(err => {
            res.status(500).json({ 
                message: "Error retrieving record",
                err: err 
            })
        })
}

function validateAction(req, res, next) {
    const neoAction = req.body;

    if (!neoAction) {
        res.status(400).json({ 
            message: "no action object sent as JSON" })
    } else if (!neoAction.notes) {
        res.status(400).json({ 
            message: "notes field is required "});
    } else if (!neoAction.description) {
        res.status(400).json({ 
            message: "description field is required "});
    } else if (!neoAction.project_id) {
        res.status(400).json({ 
            message: "project_id is required "});
    } else {
        next();
    }
}

function validateActionCompleted(req, res, next) {
    const neoAction = req.body;

    if (!neoAction) {
        res.status(400).json({
            message: "no action object sent as JSON" })
    } else if (!neoAction.completed) {
        res.status(400).json({ 
            message: "after initial creation, completed field is required "});
    } else {
        next();
    }
}