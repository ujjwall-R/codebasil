import cheerio from "cheerio";
import puppeteer from "puppeteer";

const getRawData = async (un) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.codechef.com/users/${un}`, {
    timeout: 180000,
  });

  let html = await page.evaluate(() => document.body.innerHTML);

  const $ = cheerio.load(html, {
    ignoreWhitespace: true,
  });

  const uname = $(".m-username--link").text();
  let location =
    $(".user-details").children().children()["3"].children[1].children[0].data +
    ", " +
    $(".user-details").children().children()["2"].children[1].children[0].data +
    ", " +
    $(".user-country-name").text();

  const profession = $(".user-details").children().children()["4"].children[1]
    .children[0].data;
  const institution = $(".user-details").children().children()["5"].children[1]
    .children[0].data;
  const stars = $(".rating-star").children().length;

  let recentActivities = [];
  for (let i = 0; i < 10; i++) {
    recentActivities.push(
      `Attempted a ${$(
        `#rankContentDiv > div:nth-child(1) > table > tbody > tr:nth-child(${
          i + 1
        }) > td:nth-child(4)`
      ).text()} problem at ${$(
        `#rankContentDiv > div:nth-child(1) > table > tbody > tr:nth-child(${
          i + 1
        }) > td:nth-child(1) > span > span`
      ).text()}`
    );
  }

  const codeChefData = {
    username: uname,
    profession: profession,
    institution: institution,
    location: location,
    stars: stars,
    recentActivities: recentActivities,
  };

  return codeChefData;
};

export { getRawData };
