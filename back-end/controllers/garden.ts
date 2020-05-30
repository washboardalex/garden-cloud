export const getGarden = (req, res, db) => {
    const { id } = req.params;  
        
    db.select('*').from('gardens').where('user_id', id)
        .then(garden => {

            if (garden.length) {
                
                let dimensions = {
                    lengthMetres: 0,
                    widthMetres: 0
                };

                let beds = [];
                
                dimensions.lengthMetres = parseFloat(garden[0].garden_length);
                dimensions.widthMetres = parseFloat(garden[0].garden_width);

                db.select('*').from('garden_beds').where('user_id', id)
                    .then(bedsData => {

                        if (bedsData.length) {
                            beds = bedsData.map(
                                bed => {
                                    return {
                                        id: bed.garden_bed_id,
                                        lengthMetres: bed.bed_length,
                                        widthMetres: bed.bed_width,
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
                        console.error('Error in retrieving garden beds from database: ', err);
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
        res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
    } else {
        res.status(400).json('noooo it didnt work');
    }
}
  