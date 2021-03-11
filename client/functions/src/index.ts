import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

admin.initializeApp();
const db=admin.firestore();

const app= express();
app.use(cors({origin: true}));
app.use(express.json());

// Creating a Task
app.post("/tasks", async (req, res) => {
  try {
    const uid = req.body.uid;
    const eventId = req.body.eventId;
    const event = await db
        .doc(`users/${uid}/events/${eventId}`)
        .get().then((doc) => {
          if (doc.exists) {
            return (doc.data());
          } else {
            // doc.data() will be undefined in this case
            return (null);
          }
      });
    if (event) {
      db.doc(`users/${uid}/tasks/${eventId}`)
          .set({
            title: event.title,
                end: event.end,
                start: event.start,
                allDay: event.allDay,
                id: event.id,
                backgroundColor: event.backgroundColor,
                borderColor: event.borderColor,
                totalTime: 0,
           });
        res.json({event});
    } else {
        res.status(400).json({message: "Invalid Request"});
    }
   } catch (err) {
        res.status(400).json({message: err});
   }
});

// Creating a milestone
app.post("/tasks/milestone", async (request, response) => {
    try {
        const uid = request.body.uid;
        const taskId = request.body.taskId;
        const milestoneTitle = request.body.milestoneTitle;
        const milestoneStart = request.body.milestoneStart;
        const milestoneEnd = request.body.milestoneEnd;
        await db.collection(`users/${uid}/tasks/${taskId}/milestone`)
            .add({
                title: milestoneTitle,
                end: milestoneStart,
                start: milestoneEnd,
                time: 0,
                running: false,
                complete: false,
                current: null,
           }).then((res) => {
                response.json({res});
           }).catch((res) => {
                response.status(400).json({res});
           });
   } catch (err) {
        response.status(400).json({message: err});
   }
});

// Starting a milestone
app.post("/tasks/milestone/start", async (request, response) => {
    try {
        const uid = request.body.uid;
        const taskId = request.body.taskId;
        const milestoneId = request.body.milestoneId;
        const milestone = await db
        .doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`)
        .get()
            .then((doc) => {
                if (doc.exists) {
                    return (doc.data());
               } else {
                    // doc.data() will be undefined in this case
                    return (null);
               }
           });

        if (milestone && milestone.running === false &&
            milestone.complete === false) {
            const currentTimesheet = await db.
            doc(`users/${uid}/tasks/${taskId}`).
            collection(`milestone/${milestoneId}/timesheet`)
                .add({
                    start: admin.firestore.Timestamp.now(),
                    end: null,
               }).then((res) => {
                    return (res.id);
               });
            await db.collection(`users/${uid}/tasks/${taskId}/milestone`)
            .doc(`${milestoneId}`)
                .update({
                    running: true,
                    current: currentTimesheet,
               });
            response.send("Sucess");
       } else {
            response.status(400).json({message: "Invalid Request"});
       }
   } catch (err) {
        response.status(400).json({message: err.message});
   }
});

// Stoping a milestone
app.post("/tasks/milestone/stop", async (request, response) => {
    try {
        const uid = request.body.uid;
        const taskId = request.body.taskId;
        const milestoneId = request.body.milestoneId;
        const task = await db.doc(`users/${uid}/tasks/${taskId}`)
            .get().then((doc) => {
                if (doc.exists) {
                    return (doc.data());
               } else {
                    // doc.data() will be undefined in this case
                    return (null);
               }
           });
        if (task) {
            const milestone = await db.
            doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`)
            .get().then((doc) => {
                    if (doc.exists) {
                        return (doc.data());
                   } else {
                        // doc.data() will be undefined in this case
                        return (null);
                   }
               });
            if (milestone && milestone.running ===
                true && milestone.complete === false) {
                const timesheetId = milestone.current;
                await db.collection(`users/${uid}/tasks/${taskId}/milestone`).
                doc(`${milestoneId}/timesheet/${timesheetId}`)
                    .update({
                        end: admin.firestore.Timestamp.now(),
                   }).then((res) => {
                        console.log(res);
                   });
                const timesheet = await db
                .collection(`users/${uid}/tasks/${taskId}/milestone`).
                doc(`${milestoneId}/timesheet/${timesheetId}`)
                    .get().then((doc) => {
                        if (doc.exists) {
                            return (doc.data());
                       } else {
                            // doc.data() will be undefined in this case
                            return (null);
                       }
                   });
                   if (timesheet) {
                       const newMilestoneTime = milestone.time +
                       (timesheet.end._seconds - timesheet.start._seconds);
                       await db.collection(`users/${uid}/tasks`).
                       doc(`${taskId}/milestone/${milestoneId}`)
                           .update({
                               running: false,
                               time: Math.floor(newMilestoneTime),
                               current: null,
                          });
                       const newTaskTime = task.totalTime+
                       (timesheet.end._seconds-
                        timesheet.start._seconds);
                       await db.doc(`users/${uid}/tasks/${taskId}`)
                           .update({
                               totalTime: Math.floor(newTaskTime),
                          });
                       response.send("Sucess");
                   } else {
                    response.status(400).json({message: "Invalid Request"});
                   }
       } else {
            response.status(400).json({message: "Invalid Request"});
       }
    } else {
        response.status(400).json({message: "Invalid Request"});
    }
   } catch (err) {
        response.status(400).json({message: err.message});
   }
});

// Completing a milestone
app.post("/tasks/milestone/complete", async (request, response) => {
    try {
        const uid = request.body.uid;
        const taskId = request.body.taskId;
        const milestoneId = request.body.milestoneId;
        const milestone = await
        db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`).get()
            .then((doc) => {
                if (doc.exists) {
                    return (doc.data());
               } else {
                    // doc.data() will be undefined in this case
                    return (null);
               }
           });
        if (milestone && milestone.running === false &&
            milestone.complete === false) {
            await db.collection(`users/${uid}/tasks/${taskId}/milestone`)
            .doc(`${milestoneId}`)
                .update({
                    complete: true,
                    completedAt: admin.firestore.Timestamp.now(),
               }).catch((res) => {
                    response.status(400).json({message: res.message});
               });
            response.send("Sucess");
       } else {
            response.status(400).json({message: "Invalid Request"});
       }
   } catch (err) {
        response.status(400).json({message: err.message});
   }
});

// Resuming a milestone
app.post("/tasks/milestone/resume", async (request, response) => {
    try {
        const uid = request.body.uid;
        const taskId = request.body.taskId;
        const milestoneId = request.body.milestoneId;
        const milestone = await
        db.doc(`users/${uid}/tasks/${taskId}/milestone/${milestoneId}`).get()
            .then((doc) => {
                if (doc.exists) {
                    return (doc.data());
               } else {
                    // doc.data() will be undefined in this case
                    return (null);
               }
           });
        if (milestone && milestone.running === false &&
            milestone.complete === true ) {
            const timeDiff=(admin.firestore.Timestamp.now().seconds)-
            (milestone.completedAt._seconds);
            if (timeDiff>-1 && timeDiff<=86400) {
                await db.collection(`users/${uid}/tasks/${taskId}/milestone`)
                .doc(`${milestoneId}`)
                    .update({
                        complete: false,
                   }).catch((res) => {
                        response.status(400).json({message: res.message});
                   });
                response.send("Sucess");
            } else {
                response.status(400).json({message: "24 hours passed"});
            }
       } else {
            response.status(400).json({message: "Invalid Request"});
       }
   } catch (err) {
        response.status(400).json({message: err.message});
   }
});

app.get("/hello", async (request, response) => {
    response.send("Hello from Firebase!");
});
app.post("/hello", async (request, response) => {
    const name = request.body.name;
    response.send(`Hello ${name}`);
});

export const createUserRecord = functions.auth.user().onCreate(
    (user, context) => {
        const userRef = db.doc(`users/${user.uid}`);
        return userRef.set({
            createdAt: context.timestamp,
       });
   });

export const api = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
