export const delay = (s) =>
    new Promise((rs) => setTimeout(rs, s * 1000));

export const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

export const delayRandom = async (min, max) => {
    return await delay(random(min, max));
};

export const mouseWheel = async (page) => {
    for (let i = 0; i < random(2, 8); i++) {
        await delay(random(1, 12));
        await page.mouse.wheel({ deltaY: random(0, 20) * 300 });
    }
};