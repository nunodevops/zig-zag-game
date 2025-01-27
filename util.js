function getRandomColor() {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    
    return `rgb(${r}, ${g}, ${b})`;
}

function distanceFrom(obj1, obj2) {
    return Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y)
}