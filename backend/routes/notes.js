const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator')

// ROUTE 1 : TO FETCH ALL NOTES : /notes/fetchNotes || LOGIN REQUIRED
router.get('/fetchNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (errors) {
        res.status(400).send("Server Error")
    }
})

// ROUTE 2 : TO CREATE NOTES : /notes/createNotes || LOGIN REQUIRED
router.post('/createNotes', fetchUser, [
    body('title', "please enter a valid  title").isLength({ min: 3 }),
    body('description', "description should be atleast 10 characters").isLength({ min: 10 })
],
    async (req, res) => {

        try {
            const { title, description, tag, date } = req.body

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const notes = new Notes({
                title, description, tag, date, user: req.user.id
            })
            const savedNotes = await notes.save()

            res.json(savedNotes)
        }
        catch (errors) {
            console.log(errors.message)
            res.status(400).send("Server Error")
        }
    })

// ROUTE 3 : TO UPDATE NOTES : /notes/updateNotes || LOGIN REQUIRED
router.put('/updateNotes/:id', fetchUser, async (req, res) => {

    const { title, description, tag } = req.body
    // CREATE A NEW NOTE OBJECT
    try {
        const newNotes = {}

        if (title) {
            newNotes.title = title
        }
        if (description) {
            newNotes.description = description
        }
        if (tag) {
            newNotes.tag = tag
        }

        // FIND THE NOTE TO BE UPDATED AND UPDATE IT

        let notes = await Notes.findById(req.params.id)

        if (!notes) {
            return res.status(404).send("Not found")
        }

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        res.json(notes)
    } catch (errors) {
        console.log(errors.message)
        res.status(400).send("Server Error")
    }

})
// ROUTE 4 : TO DELETE NOTES : /notes/deleteNotes || LOGIN REQUIRED
router.delete('/deleteNotes/:id', fetchUser, async (req, res) => {

    try {
        // FIND THE NOTE TO BE DELETED AND DELETE IT

        let notes = await Notes.findById(req.params.id)

        if (!notes) {
            return res.status(404).send("Not found")
        }

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note deleted successfuly", note: notes })
    } catch (errors) {
        console.log(errors.message)
        res.status(400).send("Server Error")
    }

})

module.exports = router