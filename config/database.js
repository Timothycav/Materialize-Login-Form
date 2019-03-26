if(process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI:mongodb = 'mongodb://tim:timtim7@ds127129.mlab.com:27129/vid' }
    } else {
       module.exports = {mongoURI: 'mongodb://localhost/videoideas-dev'}
    }
