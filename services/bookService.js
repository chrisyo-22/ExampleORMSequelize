const Book = require("../models/Book")

exports.addBook = async function (BookObj) {
    const ins = await Book.create(BookObj);
    return ins.toJSON();
}

exports.deleteBook = async function (BookId) {
    //Method 1
    //1. get instance
    // const ins = await Admin.findByPk(adminId);
    // //2. delete instance
    // const res = await ins.destroy();

    //Method 2
    await Book.destroy({
        where: {
            id: BookId
        }
    })
}

exports.updateBook = async function (id, bookObj) {
    //Method 1: get instance and update
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId;
    // ins.save();

    //Method 2:
    const res = await Book.update(bookObj, {
        where: {
            id
        }
    })

}

/**
 * Get book by page
 */
exports.getBooksByPage = async function (page = 1, limit = 10, name = "", author = "") {
    const option = {};
    if (name) {
        option.name = name;
    }
    if (author) {
        option.author = author;
    }

    const res = await Book.findAndCountAll({
        where: option,
        offset: (page - 1) * limit,
        limit: limit

    })
    // console.log(res.rows);
    return {
        total: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }

}


exports.getBookById = async function (bookId) {
    const res = await Book.findByPk(bookId);
    return JSON.parse(JSON.stringify(res));
}