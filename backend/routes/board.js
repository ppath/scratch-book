const router = require('express').Router(); 
const { new_board_validation } = require('../validation');
const verify = require('./verification');
const Board = require('../models/Board');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//get a board by id
router.get('/get/:boardId', async (req, res) => {
    const verified = verify(req, res);

    try {
        const verified = verify(req, res);

        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });

        return res.json({  title: board.title, 
                    is_public: board.is_public, 
                    comment: board.comment,
                    webpages: board.webpages, 
                    ratings: board.ratings });

    } catch (err) {
        return res.json({ error: err });
    }
});

//add new board
router.post('/', async (req, res) => {    
    const verified = verify(req, res);

    //input validation 
    const validation_result = new_board_validation(req.body); 
    if (validation_result.error) 
        return res.json({ message: validation_result.error.details[0].message });

    try {
        //check if title already exists
        const exists = await Board.findOne({ title: req.body.title });
        if (exists) 
            return res.json({ message: "Title already exists" });

        const board = new Board({
            title: req.body.title, 
            is_public: req.body.is_public,
            comment: req.body.comment
        });

        const board_save = await board.save();

        //connect new board to the user 
        await User.updateOne(
            { _id: verified.sub },  
            { $push: { owned : board_save._id }}
        );

        return res.json({ board: board_save._id, 
                    user: verified.sub });
        
    } catch(err) {
        return res.json({ error: err });
    }
});

router.delete('/delete', async (req, res) => {    
    const verified = verify(req, res);

    try {
        //check if title already exists
        const board = await Board.findOne({ title: req.body.title });
        if (!board) 
            return res.json({ message: "Board does not exist" });
    
        const board_delete = await board.deleteOne({ title: req.body.title });

        //todo: remove references and check ownership
        
    } catch(err) {
        return res.json({ error: err });
    }
});

router.put('/:boardId', async (req, res) => {    
    const verified = verify(req, res);

    //input validation 
    const validation_result = new_board_validation(req.body); 
    if (validation_result.error) 
        return res.json({ message: validation_result.error.details[0].message });
    //todo: remove references and check ownership
    
    // if (!verified.owned.includes(req.params.boardId)) 
    //     return res.status(400).send("Does not own this board");

    try {
        //check if title already exists
        var board = await Board.findOne({ title: req.body.title });
        if (board) 
            return res.json({ message: "Title already exists" });

        board = await Board.findOne({ _id: req.params.boardId });

        var board_update = await board.updateOne( {
                                title: req.body.title,
                                is_public: req.body.is_public, 
                                comment: req.body.comment});

        return res.json({ board: board._id });
        
    } catch(err) {
        return res.json({ error: err });
    }
});

//follow a board
router.post('/follow', async (req, res) => {    
    const verified = verify(req, res);

    try {
        //check if title already exists
        const board = await Board.findOne({title: req.body.title});

        if (!board)
            return res.json({ message: "Board does not exist" });

        const user = await User.findOne({_id: verified.sub});

        if (user.followed.includes(board._id)) 
            return res.json({ message: "Already following this board" });

        //connect new board to the user 
        await User.updateOne(
            { _id: verified.sub },  
            { $push: { followed : board._id }}
        );
        
        return res.json({ board: board._id, 
                    user: verified.sub });
        
    } catch(err) {
        return res.json({ error: err });
    }
});

//boards followed by a user
router.get('/followed', async (req, res) => {
    const verified = verify(req, res);

    try {
        const user = await User.findOne({ _id: verified.sub });

        if (!user.followed)
            return res.json({ message: "Does not follow any board" });
        
        const followed_boards = [];
        for (const board_id of user.followed) {
            const board = await Board.findOne({ _id: board_id });
            if (board != null)
                followed_boards.push(board);
        }

        return res.json({ following: followed_boards });


    } catch (err) {
        return res.json({ message: err });
    }
});

//boards owned by a user
router.get('/owned', async (req, res) => {
    const verified = verify(req, res);

    try {
        const user = await User.findOne({ _id: verified.sub });
        
        if (!user.owned)
            return res.json({ message: "Does not own any board" });

        const owning_boards = [];
        for (const board_id of user.owned) {
            const board = await Board.findOne({ _id: board_id });
            if (board != null)
                owning_boards.push(board);
        }

        return res.json({ owning: owning_boards});

    } catch (err) {
        return res.json({ message: err });
    }
});

module.exports = router;