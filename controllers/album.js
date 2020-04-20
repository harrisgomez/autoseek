module.exports.handleAlbumRoute = db => (req, res) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('album', 1)
        .returning('album')
        .then(album => res.json(album))
        .catch(err => res.status(400).json('Error updating album.'));
}