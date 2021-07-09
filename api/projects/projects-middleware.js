const db = require('./projects-model')

// add middlewares here related to projects
const checkProjectExists = (req, res, next) => {
    const { id } = req.params;

    db.get(id)
        .then(resp => {
            if (resp === undefined || resp === null) {
                res.status(404).json({ message: "that project id does not exist "})
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

const validateProject = (req, res, next) => {
    const neoPost = req.body;

    if (!neoPost) {
        res.status(400).json({ 
            message: "no project object sent as JSON" })
    } else if (!neoPost.name) {
        res.status(400).json({ 
            message: "name field is required "});
    } else if (!neoPost.description) {
        res.status(400).json({ 
            message: "description field is required "});
    } else {
        next();
    }
}

const validateCompleted = (req, res, next) => {
    const neoPost = req.body;

    if (!neoPost) {
        res.status(400).json({ 
            message: "no project object sent as JSON" })
    } else if (neoPost.completed === undefined || neoPost.completed === null) {
        res.status(400).json({ 
            message: "after initial creation, completed field is required "});
    } else {
        next();
    }
}

module.exports = {
    checkProjectExists,
    validateCompleted,
    validateProject
}