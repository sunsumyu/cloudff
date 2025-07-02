// import { launch } from 'puppeteer'
// import { Solver } from '@2captcha/captcha-solver'
// import { readFileSync } from 'fs'
// import { normalizeUserAgent } from './normalize-ua.js'

// const sleep = ms => new Promise(r => setTimeout(r, ms));

// const solver = new Solver('ba387276b6f4eb7c6f079b70191031c2')
// // const solver = new Solver(process.env.CAPTCHA_API_KEY)

// const example = async () => {
//     // If you are using `headless: true` mode, you need to fix userAgent. NormalizeUserAgent is used for this purpose.
//     const initialUserAgent = await normalizeUserAgent()

//     const browser = await launch({
//         headless: false,
//         devtools: true,
//         args: [
//             `--user-agent=${initialUserAgent}`,
//         ]
//     })

//     const [page] = await browser.pages()

//     // const preloadFile = readFileSync('./inject.js', 'utf8');
//     // await page.evaluateOnNewDocument(preloadFile);
//     let params = {
        // sitekey: '0x4AAAAAAADnPIDROrmt1Wwj',
        // pageurl: 'https://testnet.campnetwork.xyz',
        // data: '958fa38d4eacdf21',
        // pagedata: '9uaG7g9ay3Inn2VpUuhd0E9T3k1FiHYkceX_3BDNaMM-1751474993-1.3.1.1-FJoHo0Opojb39ezovdfFTRnDVrfn.HHGOMCpFk.3VezJa3pr8aPGoHXTxYXMRGD0wBW9eWdY8KpVy3jzkbTbA.HSmg5JtACXOpDoqmeHYT8Aw1BESId_Kt_UwRgdbFlPZQzPw1Jf2GWVMOL_Nug.BGN25eh1pJARmV1aP1ju.wmgcsodrB.5g8EUyaz305vlm_8bvBuIT7oSodtN6iWHDi3E6v50kPd5.68Rr7UDlA7wAmRc5crFFFCWfMhApq08vh3837VYbGUyk7.1eDUUc71z8SXfhsFCCi1LK4ijtZ0W3GnnLzWZ1YkSakYY0ICBQPmWOClTGQVJtS8qGpWIS.IfB2CU_9DpemmFErnGPE0HqEr1yjAb3f5YWFsk0agIbtqFf3wPTO71gOUmUNY1TDk_1rmKjbnD4PYNcnrtqVCBrUp4lxv68vH8Bl5AeRdk',
        // action: 'managed',
        // userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        // json: 1
//     }
//     page.goto('https://testnet.campnetwork.xyz')
//     // Here we intercept the console messages to catch the message logged by inject.js script
//     // page.on('console', async (msg) => {

//     // const txt = msg.text()
//     // if (txt.includes('intercepted-params:')) {
//     try {
//         if (1 === 1) {
//             // const params = JSON.parse(txt.replace('intercepted-params:', ''))
//             console.log(params)

//             try {
//                 console.log(`Solving the captcha...`)
//                 const res = await solver.cloudflareTurnstile(params)
//                 console.log(`Solved the captcha ${res.id}`)
//                 console.log(res)
//                 await page.evaluate((token) => {
//                     cfCallback(token)
//                 }, res.data)
//             } catch (e) {
//                 e.data
//                 console.log(e.err,"返回的错误信息",e.data)
//                 // return process.exit()
//             }
//         } else {
//             return;
//         }
//     } catch (error) {
//         console.log(error);
//     }

//     await sleep1();
//     // })

// }
function sleep1() {
    return new Promise(() => { });
}
// example()


import { launch } from 'puppeteer'
import { Solver } from '@2captcha/captcha-solver'
import { readFileSync } from 'fs'
import { normalizeUserAgent } from './normalize-ua.js'

const sleep = ms => new Promise(r => setTimeout(r, ms));

const solver = new Solver('ba387276b6f4eb7c6f079b70191031c2')

const example = async () => {
    // If you are using `headless: true` mode, you need to fix userAgent. NormalizeUserAgent is used for this purpose.
    const initialUserAgent = await normalizeUserAgent()

    const browser = await launch({
        headless: false,
        devtools: true,
        args: [
            `--user-agent=${initialUserAgent}`,
        ]
    })

    const [page] = await browser.pages()

    const preloadFile = readFileSync('./inject.js', 'utf8');
    await page.evaluateOnNewDocument(preloadFile);


    // Here we intercept the console messages to catch the message logged by inject.js script
    page.on('console', async (msg) => {
        const txt = msg.text()
        if (txt.includes('intercepted-params:')) {
            const params = JSON.parse(txt.replace('intercepted-params:', ''))
            console.log(params)

            try {
                console.log(`Solving the captcha...`)
                const res = await solver.cloudflareTurnstile(params)
                console.log(`Solved the captcha ${res.id}`)
                console.log(res)
                await page.evaluate((token) => {
                    cfCallback(token)
                }, res.data)
            } catch (e) {
                console.log(e.err)
                return process.exit()
            }
        } else {
            return;
        }
    })
    // page.goto('https://2captcha.com/demo/cloudflare-turnstile-challenge')
    page.goto('https://testnet.campnetwork.xyz')
}

example()