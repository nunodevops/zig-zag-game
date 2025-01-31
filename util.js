function getRandomColor(useAlpha) {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);

    // alpha?
    let a = 1;
    if (useAlpha)
        a = Math.random() * (0.85 - 0.15) + 0.15;

    return `rgb(${r}, ${g}, ${b}, ${a})`;
}

function distanceFrom(obj1, obj2) {
    return Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y)
}

function isEqualRGBColor(color1, color2) {
    // Extract RGB values using regular expressions
    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.match(/\d+/g).map(Number);

    // Compare each component
    return rgb1[0] === rgb2[0] && rgb1[1] === rgb2[1] && rgb1[2] === rgb2[2];
}