const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')
const app = express()
const admin = require('firebase-admin')
const moment = require('moment')

admin.initializeApp()
const db = admin.firestore()

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/events', async (request, response) => {
    const uid = request.query.uid;
    const eventId = request.query.eventId;
    const events = await db.doc(`users/${uid}/events/${eventId}`).get().then((doc) => {
        if (doc.exists) {
            return (doc.data())
        } else {
            // doc.data() will be undefined in this case
            response.send("No such document!");
        }
    })
    console.log(events.title)
    response.send(`${uid}`)
})
//Creating a Task 
app.post('/tasks', async (req, res) => {
    try {
        const uid = req.body.uid
        const eventId = req.body.eventId
        const event = await db.doc(`users/${uid}/events/${eventId}`).get().then((doc) => {
            if (doc.exists) {
                db.doc(`users/${uid}/tasks/${eventId}`)
                    .set({
                        title: doc.data().title,
                        end: doc.data().end,
                        start: doc.data().start,
                        allDay: doc.data().allDay,
                        id: doc.data().id,
                        backgroundColor: doc.data().backgroundColor,
                        borderColor: doc.data().borderColor,
                        totalTime: 0
                    })
                return (doc.data())
            } else {
                // doc.data() will be undefined in this case
                res.status(400).json({ message: "Invalid Request" })
            }
        })
        res.json({ event })
    } catch (err) {
        res.status(400).json({ message: err })
    }

})
//Creating a milestone 
app.post('/tasks/milestone', async (request, response) => {
    try {
        const uid = request.body.uid
        const taskId = request.body.taskId
        const milestoneTitle = request.body.milestoneTitle
        const milestoneStart = request.body.milestoneStart
        const milestoneEnd = request.body.milestoneEnd

        await db.collection(`users/${uid}/tasks/${taskId}/milestone`)
            .add({
                title: milestoneTitle,
                end: milestoneStart,
                start: milestoneEnd,
                time: 0,
                running: false,
                complete: false,
                current: null
            }).then(res => {
                response.json({ res })
            }).catch(res => {
                response.status(400).json({ res })
            })
    } catch (err) {
        res.status(400).json({ message: err })
    }

})
//Starting a milestone 
app.post('/tasks/milestone/start', async (request, response) => {
    try {
        const uid = request.body.uid
        const taskId = request.body.taskId
        const milestoneId = request.body.milestoneId
        const milestone = await db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`).get()
            .then((doc) => {
                if (doc.exists) {
                    return (doc.data())
                } else {
                    // doc.data() will be undefined in this case
                    response.status(400).json({ message: "Invalid Request" })
                }
            })

        if (milestone && milestone.running === false && milestone.complete === false) {
            await db.collection(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}/timesheet`)
                .add({
                    start: admin.firestore.Timestamp.now(),
                    end: null
                }).then(res => {
                    console.log(res)
                })

            await db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`)
                .update({
                    running: true
                })

            response.send("Sucess")
        } else {
            response.status(400).json({ message: "Invalid Request" })
        }
    }
    catch (err) {
        response.status(400).json({ message: err.message })
    }
})

//Stoping a milestone 
app.post('/tasks/milestone/stop', async (request, response) => {
    try {
        const uid = request.body.uid
        const taskId = request.body.taskId
        const milestoneId = request.body.milestoneId
        const timesheetId = request.body.timesheetId
        const milestone = await db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`).get()
            .then((doc) => {
                if (doc.exists) {
                    return (doc.data())
                } else {
                    // doc.data() will be undefined in this case
                    response.status(400).json({ message: "Invalid Request" })
                }
            })
        if (milestone && milestone.running === true && milestone.complete === false) {



            await db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}/timesheet/${timesheetId}`)
                .update({
                    end: admin.firestore.Timestamp.now()
                }).then(res => {
                    console.log(res)
                })

            const timesheet = await db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}/timesheet/${timesheetId}`)
                .get().then((doc) => {
                    if (doc.exists) {
                        return (doc.data())
                    } else {
                        // doc.data() will be undefined in this case
                        res.status(400).json({ message: "Invalid Request" })
                    }
                })

            const newTime = milestone.time + (timesheet.end._seconds - timesheet.start._seconds)
            await db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`)
                .update({
                    running: false,
                    time: Math.floor(newTime)
                })

            response.send("Sucess")

        } else {
            response.status(400).json({ message: "Invalid Request" })
        }
    }
    catch (err) {
        response.status(400).json({ message: err.message })
    }
})

//Completing a milestone 
app.post('/tasks/milestone/complete', async (request, response) => {
    try {
        const uid = request.body.uid
        const taskId = request.body.taskId
        const milestoneId = request.body.milestoneId
        const milestone = await db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`).get()
        .then((doc) => {
            if (doc.exists) {
                return (doc.data())
            } else {
                // doc.data() will be undefined in this case
                response.status(400).json({ message: "Invalid Request 193" })
            }
        })
    if (milestone && milestone.running === false && milestone.complete === false) {

            await db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`)
                .update({
                    complete: true
                }).catch((res)=>{
                    response.status(400).json({ message: res.message })
                })

            response.send("Sucess")
        } else {
            response.status(400).json({ message: "Invalid Request 207" })
        }
    }
    catch (err) {
        response.status(400).json({ message: err.message })
    }
})


exports.createUserRecord = functions.auth.user().onCreate(
    (user, context) => {
        const userRef = db.doc(`users/${user.uid}`)

        return userRef.set({
            createdAt: context.timestamp
        })
    }
)



exports.api = functions.https.onRequest(app)