const puppeteer = require('puppeteer');

async function scrapeClassAttendance(userName, password) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized']
    });

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
    await page.waitForSelector('table'); // Adjust selector if needed

    // Extract table data
    const tableData = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table tr'));
        return rows.map(row => {
            const columns = Array.from(row.querySelectorAll('td, th')); // Include th for headers
            return columns.map(column => column.innerText); // Get text content
        });
    });

    // Convert to JSON format
    const jsonData = tableData.map((row, index) => ({
        id: index + 1,
        data: row
    }));

    await browser.close();
    console.log("Automation Ends here");

    // Process extracted data
    const dates = jsonData.map(row => row.data[0]);
    let percentages = jsonData.map(row => row.data[row.data.length - 1]);

    dates.splice(0, 3); // Remove first three entries
    dates.splice(dates.length - 2, 2); // Remove last two entries
    percentages.splice(0, 3); // Remove first three entries
    percentages.splice(percentages.length - 2, 2); // Remove last two entries

    percentages = percentages.map(p => p.replace('%', '')); // Remove '%' from percentages

    return { dates, percentages }; // Return dates and percentages
}

// Call the function and handle the result
(async () => {
    const userName = "9142483627";
    const password = "ABHI7860";

    const { dates, percentages } = await scrapeClassAttendance(userName, password);

    console.log("Dates:", dates);
    console.log("Percentages:", percentages);
})();





const lineChartData = {
    labels: [
        
    ],
    datasets: [
        {
            label: "Percentage",
            data: [],
            borderColor: "rgb(75, 192, 192)",
            fill: true,
            backgroundColor: "rgb(62,149,205,0.1)",
        }
    ]
}

export {
    scrapeClassAttendance,
    lineChartData
}