const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true, 'Category title is required']
        },
        imageUrl:{
            type:String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2o86IDNmk8t6E2yl-5LPK401pby8B2BX0Vg&s"
        },
    },
    {timestamps:true}
);


module.exports = mongoose.model('Category', categorySchema);