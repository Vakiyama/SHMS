const router = require('express').Router()
const itemStorage = require('../schemas/items-model')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json(null));

// Internal Logic

const addNewItemDB = (res) => {
    console.log(res.body.items)
    itemStorage.findOne({id: 1}).then((currentItemStorage) => {
        if (!currentItemStorage) return
        currentItemStorage.items = res.body.items
        currentItemStorage.save((err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('Shopping list item added')
        })
    })
}

const makeNewItemStorage = (id) => {
    new itemStorage({
        id: id,
        items: []
    }).save().then((newItemStorage) => {
        console.log(`new Item Storage is ${newItemStorage}`)
    })
}


// Routes

router.post('/items', (req, res) => {
    console.log('post received')
    itemStorage.findOne({id: 1}).then((currentItemStorage) => {
        console.log(currentItemStorage)
        if (!currentItemStorage) {
            makeNewItemStorage(1)
            setTimeout(() => {
                addNewItemDB(req)
                res.status(200).json({ items: currentItemStorage.items })
            }, 4000)

            console.log('Making new item storage frame with id 1, item added')
            return
        }
        addNewItemDB(req)
        res.status(200).json()
    })
}) 

router.get('/items', (req, res) => {
    console.log('item request accepted')
    itemStorage.findOne({id: 1}).then((currentItemStorage) => {
        if (!currentItemStorage) {
            res.status(404).json({ items: [] })
            console.log('Item GET request 404, no items')
            return
        }
        res.status(200).json({ items: currentItemStorage.items })
        console.log('Item GET request success')
    })
})


module.exports = router;