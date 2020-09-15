const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const log = console.log;

let result = [];
let page = 0;

const getHtml = async () => {
  try {
    return await axios.get("https://ko.wiktionary.org/w/index.php?title=%EB%B6%84%EB%A5%98:%ED%95%9C%EA%B5%AD%EC%96%B4_%EB%AA%85%EC%82%AC&from=%EA%B0%80");
  } catch (error) {
    console.error(error);
  }
};

const parsingLoop = () => {
  getHtml()
  .then(html => {
  })
  .then(res => {
    if(!res) {
      return fs.writeFile('word.txt', result, 'utf8', (err) => {
        console.log(`${result.length}개 단어 저장 완료`);
      });
    }
    page++;
    console.log(`진행중: ${page / 2.6714}% 완료`);
    parsingLoop();
  });
}

parsingLoop();

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $(".mw-category-group > ul > li").children("a");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
