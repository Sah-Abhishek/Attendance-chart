const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;


async function scrapeClassAttendance(userName, password) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('https://erp.rkgit.edu.in/', { waitUntil: 'networkidle2' });

    await Promise.all([
        page.click('#rblMemberType_1'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    await page.type('#yourUsername', userName);
    await page.type('#yourPassword', password);

    await Promise.all([
        page.click('#btnLogin'),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);

    // Click on the sidebar and wait for the navigation to complete
    await page.click('.toggle-sidebar-btn');
    await page.waitForSelector('.sidebar', { visible: true });

    await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        const link = links.find(el => el.textContent.includes('Class Attendance'));
        if (link) {
            link.click();
        }
    });

    // Wait for the table to load after clicking the link
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.waitForSelector('table');

    // Extract table data
    const tableData = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table tr'));
        return rows.map(row => {
            const columns = Array.from(row.querySelectorAll('td, th'));
            return columns.map(column => column.innerText);
        });
    });

    const jsonData = tableData.map((row, index) => ({
        id: index + 1,
        data: row
    }));

    await browser.close();

    const dates = jsonData.map(row => row.data[0]);
    let percentages = jsonData.map(row => row.data[row.data.length - 1]);

    dates.splice(0, 3);
    dates.splice(dates.length - 2, 2);
    percentages.splice(0, 3);
    percentages.splice(percentages.length - 2, 2);
    
    percentages = percentages.map(p => p.replace('%', ''));

    return { dates, percentages };
}


app.get("/test", (req, res) => {
    res.status(200).json({
        message: "The backend is working fine"
    })
})

app.post('/api/attendance', async (req, res) => {
    const { userName, password } = req.body;
    console.log(userName);
    console.log(password);

    try{
        const { dates, percentages } = await scrapeClassAttendance(userName, password);
        console.log(percentages);
        console.log(dates);
        res.status(200).json({
            dates,
            percentages
        });
    }catch(error){
        res.status(500).json({
            message: "Unable to scrape Attendance"
        })
    }
})


app.listen(PORT, async () => {
    console.log("Server is listening on port 3000");
    
});