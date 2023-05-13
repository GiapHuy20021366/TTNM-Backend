const dictionary = require("@vntk/dictionary");
import axios from "axios";
import { parse } from "node-html-parser";
const gis = require("g-i-s");
const ImageScraper = require("images-scraper");

const google = new ImageScraper({
  puppeteer: {
    headless: true,
  },
});

const getExamplesSingleWord = async (word) => {
  const senses = dictionary.lookup(word);
  return senses;
};

const crawlWordRoles = async (word) => {
  const data = await axios
    .get(`http://tratu.soha.vn/dict/vn_vn/${word}`)
    .then((response) => {
      const html = response.data;
      const root = parse(html);
      const content = root.querySelector("#content");
      const roleElements = content.querySelectorAll("#content-3");
      const roles = roleElements.map((roleElement) => {
        const role = {};
        // Get header of role
        const roleHeader = roleElement.querySelector("h3>span.mw-headline");
        role.role = roleHeader.childNodes[0]?._rawText.trim();
        // Get defs with examples
        const defElements = roleElement.querySelectorAll("div#content-5");
        const defs = defElements.map((defElement) => {
          const def = {};
          // Get def
          const defHeader = defElement.querySelector("h5>span.mw-headline");
          def.def = defHeader.childNodes[0]?._rawText.trim();
          // Get examples
          const exampleElements = defElement.querySelectorAll("dl>dd>i");
          const examples = exampleElements.map((exampleElement) => {
            return exampleElement.childNodes[0]?._rawText.trim();
          });
          def.examples = examples;
          // Get anonyms and synonyms
          const nonymElements = defElement
            .querySelectorAll("dl>dd")
            .filter((element) => element.querySelector("font>b"));
          const nonyms = nonymElements.map((nonymElement) => {
            const nonym = {};
            // Get type
            const type = nonymElement
              .querySelector("font>b")
              ?.childNodes[0]?._rawText.trim();
            nonym.type = type;
            // Get words
            const words = nonymElement.childNodes[1]?._rawText.trim();
            nonym.words = words;
            return nonym;
          });
          def.nonyms = nonyms;
          return def;
        });
        role.defs = defs;

        return role;
      });
      return roles;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

const scrapeImages = async (word, limit = 5) => {
  try {
    const results = await google.scrape(word, 5);
    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const searchImages = async (word) => {
  const images = await axios
    .get("https://pixabay.com/api/", {
      params: {
        key: process.env.PIXABAY_KEY,
        q: word,
        per_page: 5,
        lang: "vi",
      },
    })
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return images;
};

const searchGISImages = async (word) => {
  return new Promise((resolve, reject) => {
    gis(`Ảnh minh họa từ: ${word}`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getExamplesSingleWord,
  crawlWordRoles,
  scrapeImages,
  searchImages,
  searchGISImages,
};
