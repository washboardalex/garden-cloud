export const getGarden = (req, res, db) => {
    // const { id } = req.params;  
    const id = 1;
    console.log('here we go!')
        
    db.select('*').from('gardens').where('user_id', id)
        .then(garden => {

            if (garden.length) {
                
                let dimensions = {
                    length: 0,
                    width: 0
                };

                let beds = [];
                
                dimensions.length = parseFloat(garden[0].garden_length);
                dimensions.width = parseFloat(garden[0].garden_width);

                db.select('*').from('garden_beds').where('user_id', id)
                    .then(bedsData => {

                        if (bedsData.length) {
                            beds = bedsData.map(
                                bed => {
                                    return {
                                        id: bed.garden_bed_id,
                                        length: bed.bed_length,
                                        width: bed.bed_width,
                                        positionLeft: bed.left_position,
                                        positionTop: bed.top_position
                                    };
                                }
                            )
                        }

                        res.json({dimensions, beds});
                        
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
  