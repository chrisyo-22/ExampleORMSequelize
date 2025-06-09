//fetch data from Douban Books
const axios = require("axios").default;
const cheerio = require("cheerio");
const Book = require("../models/Book");
const sequelize = require("sequelize");
/**
 * Fetch Douban's book HTML source code
 */
async function getBookHTML() {
    const res = await axios.get("https://book.douban.com/tag/%E7%BC%96%E7%A8%8B");
    // console.log(res.data);
    return res.data;
}

// Parse the book list using cheerio
// Get basic info of book and then a detail url for those books
async function getBookLinks() {
    const html = await getBookHTML();
    const $ = cheerio.load(html);
    const archorElements = $(".article #subject_list ul li .info h2 a");
    const links = archorElements.map((i, ele) => {
        const link = ele.attribs["href"];
        return link;
    }).get();
    return links
    // console.log(archorElements.length);
}

/**
 * 
 * @param {} detailURL
 * Based on the book url, get the detail info of the book 
 */
async function getBookDetail(detailURL) {
    const resp = await axios.get(detailURL);
    const $ = cheerio.load(resp.data);
    const name = $("h1 span").text();
    const imgurl = $("#mainpic a img").attr("src");
    // Find the author information
    const authorSpan = $("#info span").filter((i, ele) => {
        return $(ele).find('.pl').text().trim() === "作者";
    });
    //author name is at the next <a>, or you can use authorSpan.next("a");
    let author = "";
    if (authorSpan.length > 0) {
        const authorLink = authorSpan.find("a");
        if (authorLink.length > 0) {
            author = authorLink.text().trim();
        }
    }

    // Find the publish date information
    const publishDateSpan = $("#info span.pl").filter((i, ele) => {
        return $(ele).text().trim() === "出版年:";
    });

    let publishDate = "";
    if (publishDateSpan.length > 0) {
        // Get the next text node after the "出版年:" span
        const nextNode = publishDateSpan[0].nextSibling;
        if (nextNode && nextNode.nodeType === 3) { // Text node
            publishDate = nextNode.nodeValue.trim().replace(/^:\s*/, '');
        }
    }
    return {
        name,
        imgurl,
        publishDate,
        author
    }

    // console.log(imgurl);

}

/**
 * Fetch all books
 */

async function fetchAll() {
    const links = await getBookLinks();
    for (let i = 0; i < links.length; i++) {
        const proms = links.map(link => {
            return getBookDetail(link)
        });
        return Promise.all(proms);
    }
}

async function saveToDB(){
    const books = await fetchAll();
    await Book.bulkCreate(books);
    console.log("Book saved");
}




saveToDB();