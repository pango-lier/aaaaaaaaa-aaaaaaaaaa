
const { delay, random } = require('./until')

class PuppeteerActionFunc {
    page;
    delayClickTime;
    delayTypingTime;
    constructor(
        page,
        delayClickTime,
        delayTypingTime
    ) {
        this.page = page;
        this.delayClickTime = delayClickTime || 0.3;
        this.delayTypingTime = delayTypingTime || 0.05;
    }
    /**
     * click element
     */
    async click(target) {
        await delay(this.delayClickTime);
        await this.page.waitForSelector(target);
        return this.page.click(target);
    }
    /**
     * goto url
     */
    async goto(url) {
        return this.page.goto(url, {
            waitUntil: "networkidle2",
        });
    }
    /**
     */
    async waitForSelector(selector) {
        return this.page.waitForSelector(selector);
    }
    /**
     * await a element Remove
     */
    /**
     * Type some text with speed per character is default 0,05s
     */
    async enter(key = 'Enter') {
        return await this.page.keyboard.press(key);
    }
    async input(value, delay = 1000) {
        // tslint:disable-next-line: prefer-for-of
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');
        await this.page.keyboard.press('Backspace');
        if (value !== null && value !== undefined && value !== 'null') {
            return this.page.keyboard.type(value + '', { delay: this.delayTypingTime * delay });
        }
    }

    async type(value) {
        if (value !== null && value !== undefined && value !== 'null') {
            return await this.page.keyboard.sendCharacter(value);
        }
    }

    /**
     * Upload file target input type file
     */
    // async uploadFile(url, selector, conditionPass): Promise<boolean> {
    //   const formUpload = await this.page.waitForSelector(selector);
    //   const pathFile = await downloadFile(url);
    //   await delay(1);
    //   await formUpload.uploadFile(pathFile);
    //   await delay(1);
    //   const result = formUpload.evaluate((upload) =>
    //     upload.dispatchEvent(new Event("change", { bubbles: true }))
    //   );
    //   // await this.page.waitForSelector(conditionPass, { timeout: 300000 });
    //   try {
    //     const fs = require("fs");
    //     await delay(1);
    //     await fs.unlinkSync(pathFile);
    //   } catch (e) {}
    //   return result;
    // }

    async uploadImage(
        pathFiles,
        fileChooserTriggerXpath,
    ) {
        const [fileChooser] = await Promise.all([
            this.page.waitForFileChooser(),
            this.click(fileChooserTriggerXpath),
        ]);
        await fileChooser?.accept(pathFiles);
    }

    async uploadImageFix2(
        pathFiles,
        se1, se2
    ) {
        const [fileChooser] = await Promise.all([
            this.page.waitForFileChooser(),
            this.check2(se1, se2),
        ]);
        await fileChooser?.accept(pathFiles);
    }

    async check2(
        se1,
        se2,
    ) {
        await this.click(se1);
        await this.delay(3);
        if (await this.checkSelector(se2)) {
            await this.click(se2);
        }
    }

    async uploadImageFrame(
        frame,
        pathFiles,
        fileChooserTriggerXpath,
    ) {
        const [fileChooser] = await Promise.all([
            this.page.waitForFileChooser(),
            frame.click(fileChooserTriggerXpath),
        ]);
        await fileChooser?.accept(pathFiles);
    }

    async deleteFiles(pathFiles) {
        await pathFiles.forEach(async (pathFile) => {
            try {
                const fs = require("fs");
                await delay(0.3);
                await fs.unlinkSync(pathFile);
            } catch (e) { }
        });

        return true;
    }

    /**
     * Delay
     */
    async delay(selector) {
        return delay(Number(selector));
    }

    async delayRandom(min, max) {
        return delay(Number(random(min, max)));
    }

    async getContent(selector) {
        return this.page.evaluate((selector) => {
            const element = document.querySelector(selector);
            return element.textContent.trim();
        }, selector);
    }

    async mouseWheelY(min, max = -1) {
        if (max == -1) {
            max = min;
        }
        await this.page.mouse.wheel({ deltaY: random(min, max) });
    }

    async clickTryCheck(selectorTarget, selectorCheck, loop = 5, delay = 1) {
        for (let i = 0; i < loop; i++) {
            await this.click(selectorTarget);
            await this.delay(delay);
            if (await this.checkSelector(selectorCheck)) {
                break;
            }
        }
    }

    checkSelector(params) {
        return this.page.evaluate((params) => {
            return document.querySelector(params) === null ? false : true;
        }, params);
    }

    checkDisabledSelector(params, attribute = "disabled") {
        return this.page.evaluate(({ params, attribute }) => {
            return document.querySelector(params).hasAttribute(attribute)
                ? true
                : false || false;
        }, { params, attribute });
    }

    getAttributeSelector(params, attribute = "disabled") {
        return this.page.evaluate(({ params, attribute }) => {
            const exist = document.querySelector(params).hasAttribute(attribute) || false;
            if (exist) {
                const a = document.querySelector(params).getAttribute(attribute);
                if (a === "true") return false;
                if (a === "false") return false;
                return a || false;
            }
            return false;

        }, { params, attribute });
    }

    checkExistId(id) {
        return this.page.evaluate((id) => {
            var myElement = document.getElementById(id);
            if (myElement) return true;
            return false;
        }, id);
    }

    getContentSelector(selector) {
        return this.page.evaluate((selector) => {
            var element = document.querySelector(selector);
            if (element) {
                return element.textContent.trim();
            }
            return false;
        }, selector);
    }

    getContentSelectorAll(selector) {
        return this.page.evaluate((selector) => {
            var elements = document.querySelectorAll(selector);
            let data = [];
            if (elements) {
                for (let i = 0; i < elements.length; i++) {
                    // data.push(elements[i].textContent.trim());
                }
                return data;
            }
            return false;
        }, selector);
    }

    getHrefSelector(selector) {
        return this.page.evaluate((selector) => {
            var element = document.querySelector(selector);
            if (element) {
                return element.href;
            }
            return false;
        }, selector);
    }

    selectDate(selector, day) {
        return this.page.evaluate(
            ({ selector, day }) => {
                var tags = document.querySelectorAll(selector);
                for (let i = 0; i < tags.length; i++) {
                    if (tags[i].textContent.trim() == day.toString()) {
                        tags[i].click();
                    }
                }
                return false;
            },
            { selector, day }
        );
    }
}

module.exports = PuppeteerActionFunc;