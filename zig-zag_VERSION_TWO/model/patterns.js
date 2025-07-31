function createPattern(patternN, subPatternN = 0, levelNum) {
    // size
    patternCanvas.width = 100;
    patternCanvas.height = 100;

    let imageData;
    let data;
    let matrixChars;
    let charArray;
    let spacing;

    switch (patternN) {
        case 0:
            break;
        case 1:
            switch (levelNum) {
                case 1:
                    imageData = patternContext.getImageData(0, 0, 100, 100);
                    data = imageData.data;
                    switch (subPatternN) {
                        case 0:
                        case 7:
                            // Draw asphalt background
                            patternContext.fillStyle = "rgba(49, 47, 47, 0.95)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Add cracks
                            patternContext.strokeStyle = "rgb(126, 118, 118)";
                            patternContext.lineWidth = 0.3;
                            patternContext.filter = "blur(1px)";
                            for (let i = 0; i < 6; i++) {
                                patternContext.beginPath();
                                patternContext.moveTo(Math.random() * 100, Math.random() * 100);
                                patternContext.lineTo(Math.random() * 100, Math.random() * 100);
                                patternContext.stroke();
                            }
                            break;
                        case 1:
                        case 5:
                            // Draw base color
                            patternContext.fillStyle = "rgba(70, 70, 70, 0.8)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Function to draw a polygon
                            function drawPolygon(ctx, x, y, radius, sides, rotation = 0) {
                                ctx.beginPath();
                                for (let i = 0; i < sides; i++) {
                                    const angle = (i / sides) * 2 * Math.PI + rotation;
                                    const px = x + radius * Math.cos(angle);
                                    const py = y + radius * Math.sin(angle);
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.closePath();
                            }

                            // Draw geometric shapes
                            for (let i = 0; i < 100; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const radius = Math.random() * 10 + 5;
                                const sides = Math.floor(Math.random() * 3) + 3; // 3 to 5 sides
                                const rotation = Math.random() * Math.PI * 2;
                                const shade = Math.floor(Math.random() * 50) + 50;

                                patternContext.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 0.7)`;
                                drawPolygon(patternContext, x, y, radius, sides, rotation);
                                patternContext.fill();
                            }

                            // Add holes in the asphalt
                            for (let i = 0; i < 3; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const radius = Math.random() * 8 + 2;

                                patternContext.beginPath();
                                patternContext.arc(x, y, radius, 0, Math.PI * Math.random() * 1);
                                patternContext.fillStyle = "rgba(30, 30, 30, 0.8)";
                                patternContext.fill();

                                // Add shadow to holes
                                patternContext.beginPath();
                                patternContext.arc(x - 0.5, y - 0.5, radius, 0, Math.PI * 2);
                                patternContext.fillStyle = "rgba(0, 0, 0, 0.1)";
                                patternContext.fill();
                            }

                            // Apply a slight noise effect
                            imageData = patternContext.getImageData(0, 0, 100, 100);
                            data = imageData.data;
                            for (let i = 0; i < data.length; i += 4) {
                                const noise = Math.random() * 10 - 5;
                                data[i] = Math.max(0, Math.min(255, data[i] + noise));
                                data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
                                data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
                            }
                            patternContext.putImageData(imageData, 0, 0);
                            break;
                        case 2:
                        case 9:
                            // Draw base color
                            patternContext.fillStyle = "rgba(63, 65, 72, 0.95)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Function to draw a polygon
                            function drawPolygon(ctx, x, y, radius, sides, rotation = 0) {
                                ctx.beginPath();
                                for (let i = 0; i < sides; i++) {
                                    const angle = (i / sides) * 2 * Math.PI + rotation;
                                    const px = x + radius * Math.cos(angle);
                                    const py = y + radius * Math.sin(angle);
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.closePath();
                            }

                            // Apply a slight noise effect
                            imageData = patternContext.getImageData(0, 0, 100, 100);
                            data = imageData.data;
                            for (let i = 0; i < data.length; i += 4) {
                                const noise = Math.random() * 20 - 5;
                                data[i] = Math.max(0, Math.min(255, data[i] + noise));
                                data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
                                data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
                            }
                            patternContext.putImageData(imageData, 0, 0);
                            break;
                        case 3:
                        case 6:
                            // Draw asphalt background
                            patternContext.fillStyle = "rgba(60, 60, 60, 0.6)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Add texture (small pebbles)
                            for (let i = 0; i < 500; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const radius = Math.random() * 1.5 + 0.5;
                                const color = Math.random() * 30 + 40;

                                patternContext.beginPath();
                                patternContext.arc(x, y, radius, 0, Math.PI * 2);
                                patternContext.fillStyle = `rgb(${color}, ${color}, ${color})`;
                                patternContext.fill();
                            }

                            // Add subtle grid pattern
                            patternContext.strokeStyle = "rgba(80, 80, 80, 0.3)";
                            patternContext.lineWidth = 0.5;

                            for (let i = 0; i <= 100; i += 10) {
                                patternContext.beginPath();
                                patternContext.moveTo(i, 0);
                                patternContext.lineTo(i, 100);
                                patternContext.stroke();

                                patternContext.beginPath();
                                patternContext.moveTo(0, i);
                                patternContext.lineTo(100, i);
                                patternContext.stroke();
                            }

                            // Apply a slight blur
                            patternContext.filter = "blur(0.5px)";
                            patternContext.drawImage(patternCanvas, 0, 0);
                            break;
                        case 4:
                        case 8:
                            // Draw base asphalt color
                            patternContext.fillStyle = "rgba(70, 70, 70, .95)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Add zigzag cracks (transparent)
                            patternContext.lineWidth = 1.5;
                            patternContext.strokeStyle = "rgba(0, 0, 0, 1)"; // Transparent stroke for cracks

                            for (let i = 0; i < 15; i++) {
                                let startX = Math.random() * 100;
                                let startY = Math.random() * 100;

                                patternContext.beginPath();
                                patternContext.moveTo(startX, startY);

                                // Create a zigzag path
                                for (let j = 0; j < 5; j++) {
                                    const offsetX = (Math.random() - 0.5) * 20; // Random horizontal offset
                                    const offsetY = Math.random() * 20; // Random vertical offset
                                    let nextX = startX + offsetX;
                                    let nextY = startY + offsetY;

                                    patternContext.lineTo(nextX, nextY);
                                    startX = nextX;
                                    startY = nextY;
                                }

                                // Make the cracks transparent by cutting out the path
                                patternContext.globalCompositeOperation = "destination-out";
                                patternContext.stroke();
                            }

                            // Reset composite operation to default
                            patternContext.globalCompositeOperation = "source-over";
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            break;
        case 99: // track end
            switch (subPatternN) {
                default:
                    // Create a 2x2 checkerboard pattern
                    const squareSize = 40;
                    const color1 = "white";
                    const color2 = "black";

                    trackEndCanvas.width = squareSize * 2;
                    trackEndCanvas.height = squareSize * 2;

                    trackEndContext.fillStyle = color1;
                    trackEndContext.fillRect(0, 0, squareSize * 2, squareSize * 2);
                    trackEndContext.fillStyle = color2;
                    trackEndContext.fillRect(0, 0, squareSize, squareSize);
                    trackEndContext.fillRect(squareSize, squareSize, squareSize, squareSize);
                    break;
            }
            break;
        default:
            break;
    }
}
