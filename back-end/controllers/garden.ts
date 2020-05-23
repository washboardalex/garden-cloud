export const getGarden = (req, res, db) => {
    // const { id } = req.params;  
    const id = 1;
    console.log('here we go!')
        
    db.select('*').from('gardens').where('user_id', id)
        .then(garden => {
            console.log('here is the garden')
            console.log(garden)
            if (garden.length) {
                const gardenData = garden[0];
                db.select('*').from('garden_beds').where('user_id', id)
                .then(beds => {
                    if (beds.length) gardenData.beds = beds;
                    res.json({gardenData});
                    //Will need something to see if there is an error
                    //instead of them actually having no beds
                    //Probably have default one bed or something
                })
                .catch(err => {
                    res.status(400).json(`error getting garden beds, err : ${err}` );
                    console.log('Error in getting beds, error is : ');
                    console.log(err);
                });
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'));    
        
        
        
    // db.select('*').from('users').where({id})
    //     .then(user => {
    //         if (user.length) {
    //             const usrData = user[0];
    //             db.select('*').from('garden_beds').where('user_id', id)
    //             .then(beds => {
    //                 let gardenBeds = [];
    //                 if (beds.length) gardenBeds = beds;
    //                 res.json({usrData, gardenBeds});
    //                 //Will need something to see if there is an error
    //                 //instead of them actually having no beds
    //                 //Probably have default one bed or something
    //             })
    //             .catch(err => {
    //                 res.status(400).json(`error getting garden beds, err : ${err}` );
    //                 console.log('Error in getting beds, error is : ');
    //                 console.log(err);
    //             });
    //         } else {
    //             res.status(400).json('Not found')
    //         }
    //     })
    //     .catch(err => res.status(400).json('error getting user'));
}

export const updateGarden = (req, res, db) => {
    const { data } = req.body;
    const { id } = req.params;

    if (id && data) {
        console.log('data is : ')
        console.log(data);
        console.log('we got the information here');
        const userId = data.userId
        const { id, bedWidth, bedLength, top, left } = data.bed;

        db('garden_beds')
        .insert({
        user_id: userId, 
        bed_length: parseFloat(bedLength), 
        bed_width: parseFloat(bedWidth),
        left_position: parseFloat(left),
        top_position: parseFloat(top)
        })
        .returning('*')
        .then(item => {
        console.log('we are going to response yall!')
        res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
    } else {
        console.log('yall fucked up');
        res.status(400).json('noooo it didnt work');
    }
}
  