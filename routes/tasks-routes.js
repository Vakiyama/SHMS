const router = require('express').Router()
const tasksStorage = require('../schemas/tasks-model')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json(null));

// Internal Logic

const makeNewTasksFrame = (id) => {
    new tasksStorage({
        id: id,
        tasks: []
    }).save().then((taskFrame) => {
        console.log(`new taskFrame`)
        console.log(taskFrame)
    })
}

const addNewTask = (task) => {
    tasksStorage.findOne({id: 1}).then((currentTasks) => {
        if (!currentTasks) {
            return
        }
        currentTasks.tasks = task
        currentTasks.save(err => {
            if (err) {
                console.log(err)
                return
            }
            console.log('New Task added succesfully')
        })
    })
}

// routes

router.get('/tasks', (req, res) => {
    tasksStorage.findOne({id: 1}).then((currentTasks) => {
        if (!currentTasks) {
            res.status(404).json({tasks: []})
            console.log('404')
            return
        }
        console.log(currentTasks.tasks)
        res.status(200).json({tasks: currentTasks.tasks})
    })
})

router.post('/tasks', (req, res) => {
    tasksStorage.findOne({id: 1}).then((currentTasks) => {
        if (!currentTasks) {
            makeNewTasksFrame(1)
            setTimeout(() => {
                addNewTask(req.body.tasks)
            }, 4000)
            res.status(200).json()
            return
        }
        console.log(req.body.tasks)
        addNewTask(req.body.tasks)
        res.status(200).json()
    })
})

module.exports = router;