function createPattern(patternN, subPatternN = 0, levelNum) {
    // size
    patternCanvas.width = 100;
    patternCanvas.height = 100;

    let imageData;
    let data;
    let matrixChars;
    let charArray;
    let spacing;

    // Array of Easter pastel colors
    let easterColors = [
        "#ffb7c5", // Pink
        "#ffe066", // Yellow
        "#b5ead7", // Mint
        "#c7ceea", // Lavender
        "#a2d5f2", // Sky Blue
        "#f7cac9", // Peach
    ];

    let easterChars = ["🐣", "🥚", "🐰", "🌸", "🌷", "💐"];

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
                case 2:
                    switch (subPatternN) {
                        case 0:
                            // Draw base color (dark background)
                            patternContext.fillStyle = "rgb(184, 203, 192)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Define the characters for the falling code
                            matrixChars = "01";
                            charArray = matrixChars.split("");

                            // Set font and text properties
                            patternContext.font = "12px monospace";
                            patternContext.textAlign = "center";

                            // Function to draw a single column of falling characters
                            function drawMatrixColumn(ctx, x, yStart) {
                                let y = yStart;
                                for (let i = 0; i < 6; i++) {
                                    const char = charArray[Math.floor(Math.random() * charArray.length)];
                                    ctx.fillStyle = `rgba(0, 0, 0, ${1 - i * 0.2})`; // Fading green effect
                                    ctx.fillText(char, x, y);
                                    y += 16; // Move down for the next character
                                }
                            }

                            // Draw multiple columns of falling characters
                            for (let x = 10; x < 100; x += 20) {
                                const yStart = Math.random() * -50; // Random starting position for each column
                                drawMatrixColumn(patternContext, x, yStart);
                            }

                            // Apply a slight noise effect for a digital look
                            imageData = patternContext.getImageData(0, 0, 100, 100);
                            data = imageData.data;
                            for (let i = 0; i < data.length; i += 4) {
                                const noise = Math.random() * 20 - 10;
                                data[i] += noise; // Red channel
                                data[i + 1] += noise; // Green channel
                                data[i + 2] += noise; // Blue channel
                            }
                            patternContext.putImageData(imageData, 0, 0);
                            break;
                        case 1:
                            // Draw base color (dark background)
                            patternContext.fillStyle = "rgb(155, 174, 163)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Digital Rain Pattern
                            matrixChars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
                            patternContext.font = "10px 'MS Gothic', monospace";
                            patternContext.textAlign = "center";

                            for (let x = 0; x < 100; x += 10) {
                                let y = Math.random() * -50; // Random starting position for falling characters
                                while (y < 100) {
                                    const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                                    patternContext.fillStyle = `rgba(0, 255, 102, ${Math.random() * 0.8 + 0.2})`; // Green with varying opacity
                                    patternContext.fillText(char, x, y);
                                    y += 12; // Move down for the next character
                                }
                            }

                            // Fractured Reality Pattern
                            for (let i = 0; i < 15; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const width = Math.random() * 30 + 10;
                                const height = Math.random() * 30 + 10;

                                patternContext.save();
                                patternContext.translate(x, y);
                                patternContext.rotate((Math.random() * Math.PI) / 2); // Random rotation for fractured effect
                                patternContext.fillStyle = `rgba(0, 100, 102, ${Math.random() * 0.5 + 0.1})`; // Green with varying opacity
                                patternContext.fillRect(-width / 2, -height / 2, width, height);
                                patternContext.restore();
                            }
                            break;
                        case 2:
                            // Set up the base canvas size for the pattern
                            patternContext.fillStyle = "rgb(75, 77, 120)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Draw concentric circles (symbolizing interconnected nodes)
                            function drawConcentricCircles(centerX, centerY) {
                                const circleColors = ["rgba(0, 255, 102, 0.8)", "rgba(0, 255, 102, 0.5)", "rgba(0, 255, 102, 0.3)"];
                                for (let i = 0; i < circleColors.length; i++) {
                                    patternContext.beginPath();
                                    patternContext.arc(centerX, centerY, (i + 1) * 10, 0, Math.PI * 2);
                                    patternContext.strokeStyle = circleColors[i];
                                    patternContext.lineWidth = 1;
                                    patternContext.stroke();
                                }
                            }

                            // Draw radial lines (symbolizing connection points)
                            function drawRadialLines(centerX, centerY) {
                                const lineCount = 12; // Number of radial lines
                                for (let i = 0; i < lineCount; i++) {
                                    const angle = ((Math.PI * 2) / lineCount) * i;
                                    const xEnd = centerX + Math.cos(angle) * 50;
                                    const yEnd = centerY + Math.sin(angle) * 50;

                                    patternContext.beginPath();
                                    patternContext.moveTo(centerX, centerY);
                                    patternContext.lineTo(xEnd, yEnd);
                                    patternContext.strokeStyle = "rgba(0, 255, 102, 0.5)";
                                    patternContext.lineWidth = 1;
                                    patternContext.stroke();
                                }
                            }

                            // Draw random "Matrix code" characters across the canvas
                            function drawMatrixCode() {
                                const matrixChars = "01日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑ";
                                const charArray = matrixChars.split("");

                                patternContext.font = "8px 'MS Gothic', monospace";
                                for (let x = -10; x < 110; x += 10) {
                                    for (let y = -10; y < 110; y += 10) {
                                        const char = charArray[Math.floor(Math.random() * charArray.length)];
                                        patternContext.fillStyle = `rgba(0, 255, 102, ${Math.random() * 0.8 + 0.2})`;
                                        patternContext.fillText(char, x + Math.random() * 5 - 2.5, y + Math.random() * 5 - 2.5);
                                    }
                                }
                            }

                            // Combine all elements into the seamless pattern
                            drawConcentricCircles(50, 50); // Central node
                            drawRadialLines(50, 50); // Connections emanating from the center
                            drawMatrixCode(); // Random code scattered across the canvas
                            break;
                        case 3:
                            // Set up the canvas
                            patternContext.fillStyle = "rgb(26, 79, 81)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Function to draw an equilateral triangle
                            function drawTriangle(x, y, size, direction) {
                                patternContext.beginPath();
                                if (direction === "up") {
                                    patternContext.moveTo(x, y + size);
                                    patternContext.lineTo(x - size, y);
                                    patternContext.lineTo(x + size, y);
                                } else {
                                    patternContext.moveTo(x, y);
                                    patternContext.lineTo(x - size, y + size);
                                    patternContext.lineTo(x + size, y + size);
                                }
                                patternContext.closePath();
                            }

                            // Draw triangle grid
                            for (let i = 0; i < 110; i += 20) {
                                for (let j = 0; j < 110; j += 20) {
                                    const direction = (i + j) % 40 < 20 ? "up" : "down";
                                    patternContext.fillStyle = "rgba(0, 255, 0, 0.2)";
                                    drawTriangle(i, j, 10, direction);
                                    patternContext.fill();
                                    patternContext.strokeStyle = "rgba(0, 255, 0, 0.5)";
                                    patternContext.stroke();
                                }
                            }

                            // Add subtle noise texture
                            imageData = patternContext.getImageData(0, 0, 100, 100);
                            data = imageData.data;
                            for (let i = 0; i < data.length; i += 4) {
                                const noise = Math.random() * 10 - 5;
                                data[i + 1] += noise; // Only affect green channel
                            }
                            patternContext.putImageData(imageData, 0, 0);

                            break;
                        case 4:
                            // Set up the canvas
                            patternContext.fillStyle = "rgb(17, 14, 45)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Function to draw a qubit
                            function drawQubit(x, y, size, state) {
                                patternContext.beginPath();
                                patternContext.arc(x, y, size, 0, Math.PI * 2);
                                patternContext.fillStyle = state ? "rgba(0, 255, 0, 0.5)" : "rgba(0, 100, 0, 0.3)";
                                patternContext.fill();
                                patternContext.strokeStyle = "rgba(73, 98, 73, 0.8)";
                                patternContext.stroke();
                            }

                            // Function to draw quantum entanglement
                            function drawEntanglement(x1, y1, x2, y2) {
                                patternContext.beginPath();
                                patternContext.moveTo(x1, y1);
                                patternContext.lineTo(x2, y2);
                                patternContext.strokeStyle = "rgba(0, 255, 0, 0.2)";
                                patternContext.setLineDash([2, 2]);
                                patternContext.stroke();
                                patternContext.setLineDash([]);
                            }

                            // Function to draw matrix code
                            function drawMatrixCode(x, y) {
                                const code = Math.random() > 0.5 ? "0" : "1";
                                patternContext.fillStyle = "rgba(0, 255, 0, 0.7)";
                                patternContext.font = "8px monospace";
                                patternContext.fillText(code, x, y);
                            }

                            // Draw Quantum Matrix Lattice
                            for (let i = -10; i <= 110; i += 20) {
                                for (let j = -10; j <= 110; j += 20) {
                                    // Draw qubit
                                    const state = Math.random() > 0.5;
                                    drawQubit(i, j, 5, state);

                                    // Draw entanglement (horizontal and vertical)
                                    drawEntanglement(i, j, i + 20, j);
                                    drawEntanglement(i, j, i, j + 20);

                                    // Draw matrix code near qubit
                                    drawMatrixCode(i + 5, j + 5);
                                }
                            }

                            // Add quantum wave effect
                            patternContext.globalCompositeOperation = "screen";
                            for (let i = 0; i < 105; i += 10) {
                                patternContext.beginPath();
                                patternContext.moveTo(0, i);
                                for (let x = 0; x < 105; x++) {
                                    const y = i + Math.sin(x * 0.1) * 5;
                                    patternContext.lineTo(x, y);
                                }
                                patternContext.strokeStyle = `rgba(0, 255, 0, ${0.1 + Math.random() * 0.1})`;
                                patternContext.stroke();
                            }
                            patternContext.globalCompositeOperation = "source-over";
                            break;
                        case 5:
                            // Set up the canvas with a transparent background
                            patternContext.clearRect(0, 0, 100, 100);

                            // Function to create a quantum "bubble"
                            function drawQuantumBubble(x, y, radius) {
                                const gradient = patternContext.createRadialGradient(x, y, 0, x, y, radius);
                                gradient.addColorStop(0, "rgba(0, 255, 0, 0.1)");
                                gradient.addColorStop(0.8, "rgba(0, 255, 0, 0.4)");
                                gradient.addColorStop(1, "rgba(0, 255, 0, 0)");

                                patternContext.beginPath();
                                patternContext.arc(x, y, radius, 0, Math.PI * 2);
                                patternContext.fillStyle = gradient;
                                patternContext.fill();
                            }

                            // Create quantum bubbles
                            for (let i = 0; i < 5; i++) {
                                for (let j = 0; j < 5; j++) {
                                    const x = i * 25 + Math.random() * 10 - 5;
                                    const y = j * 25 + Math.random() * 10 - 5;
                                    const radius = Math.random() * 10 + 10;
                                    drawQuantumBubble(x, y, radius);
                                }
                            }

                            // Add Matrix code
                            patternContext.font = "10px monospace";
                            patternContext.fillStyle = "rgba(66, 66, 66, 0.8)";

                            for (let i = 0; i < 10; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const char = Math.random() > 0.5 ? "0" : "1";
                                patternContext.fillText(char, x, y);
                            }

                            // Create transparent holes
                            for (let i = 0; i < 3; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const radius = Math.random() * 15 + 5;

                                patternContext.globalCompositeOperation = "destination-out";
                                patternContext.beginPath();
                                patternContext.arc(x, y, radius, 0, Math.PI * 2);
                                patternContext.fill();
                                patternContext.globalCompositeOperation = "source-over";
                            }
                            break;
                        case 6:
                            // Set up the canvas with a semi-transparent dark background
                            patternContext.fillStyle = "rgba(0, 10, 20, 0.8)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Function to draw a quantum circuit path
                            function drawQuantumPath(x, y, length, angle) {
                                patternContext.save();
                                patternContext.translate(x, y);
                                patternContext.rotate(angle);

                                const gradient = patternContext.createLinearGradient(0, -2, length, 2);
                                gradient.addColorStop(0, "rgba(0, 255, 200, 0.1)");
                                gradient.addColorStop(0.5, "rgba(0, 255, 200, 0.7)");
                                gradient.addColorStop(1, "rgba(0, 255, 200, 0.1)");

                                patternContext.fillStyle = gradient;
                                patternContext.fillRect(0, -2, length, 4);
                                patternContext.restore();
                            }

                            // Draw quantum circuit paths
                            for (let i = 0; i < 20; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const length = Math.random() * 50 + 50;
                                const angle = Math.random() * Math.PI * 2;
                                drawQuantumPath(x, y, length, angle);
                            }

                            // Function to draw data nodes
                            function drawDataNode(x, y, radius) {
                                const gradient = patternContext.createRadialGradient(x, y, 0, x, y, radius);
                                gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
                                gradient.addColorStop(1, "rgba(0, 255, 200, 0)");

                                patternContext.beginPath();
                                patternContext.arc(x, y, radius, 0, Math.PI * 2);
                                patternContext.fillStyle = gradient;
                                patternContext.fill();
                            }

                            // Draw data nodes
                            for (let i = 0; i < 15; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const radius = Math.random() * 3 + 1;
                                drawDataNode(x, y, radius);
                            }

                            // Add flowing data effect
                            patternContext.font = "8px monospace";
                            for (let i = 0; i < 50; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const char = Math.random() > 0.5 ? "0" : "1";
                                const opacity = Math.random() * 0.5 + 0.2;
                                patternContext.fillStyle = `rgba(0, 255, 200, ${opacity})`;
                                patternContext.fillText(char, x, y);
                            }

                            // Add quantum interference pattern
                            patternContext.globalCompositeOperation = "lighter";
                            for (let i = 0; i < 100; i += 2) {
                                for (let j = 0; j < 100; j += 2) {
                                    const intensity = Math.sin(i * 0.1) * Math.cos(j * 0.1) * 0.1;
                                    patternContext.fillStyle = `rgba(0, 255, 200, ${Math.abs(intensity)})`;
                                    patternContext.fillRect(i, j, 2, 2);
                                }
                            }
                            patternContext.globalCompositeOperation = "source-over";

                            break;
                        case 7:
                            // Set up the canvas with a transparent background
                            patternContext.fillStyle = "rgba(58, 56, 56, 0.5)";
                            patternContext.fillRect(0, 0, 100, 100);

                            // Function to draw a curved line
                            function drawCurvedLine(startX, startY, endX, endY, curvature) {
                                patternContext.beginPath();
                                patternContext.moveTo(startX, startY);
                                patternContext.quadraticCurveTo((startX + endX) / 2 + curvature, (startY + endY) / 2 + curvature, endX, endY);
                                patternContext.stroke();
                            }

                            // Set line style
                            patternContext.lineWidth = 2;
                            patternContext.strokeStyle = "rgba(0, 255, 150, 0.3)";

                            // Draw curved lines
                            for (let i = 0; i < 5; i++) {
                                drawCurvedLine(0, i * 25, 100, i * 25 + 25, 25);
                                drawCurvedLine(i * 25, 0, i * 25 + 25, 100, 25);
                            }

                            // Add subtle glow effect
                            patternContext.shadowColor = "rgba(0, 255, 150, 0.5)";
                            patternContext.shadowBlur = 5;

                            // Add quantum "particles"
                            patternContext.fillStyle = "rgba(0, 255, 150, 0.7)";
                            for (let i = 0; i < 20; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const radius = Math.random() * 2 + 1;
                                patternContext.beginPath();
                                patternContext.arc(x, y, radius, 0, Math.PI * 2);
                                patternContext.fill();
                            }

                            // Add minimal Matrix-style binary
                            patternContext.font = "8px monospace";
                            patternContext.fillStyle = "rgba(0, 255, 150, 0.9)";
                            for (let i = 0; i < 10; i++) {
                                const x = Math.random() * 90 + 5;
                                const y = Math.random() * 90 + 10;
                                patternContext.fillText(Math.random() > 0.5 ? "0" : "1", x, y);
                            }
                            break;
                        case 8:
                            // Function to draw a glowing glass shard
                            function drawGlassShard(x, y, width, height, angle) {
                                patternContext.save();
                                patternContext.translate(x, y);
                                patternContext.rotate(angle);

                                // Create gradient for glowing effect
                                const gradient = patternContext.createLinearGradient(0, 0, width, height);
                                gradient.addColorStop(0, "rgba(0, 255, 0, 0.2)");
                                gradient.addColorStop(0.5, "rgba(0, 255, 0, 0.7)");
                                gradient.addColorStop(1, "rgba(0, 255, 0, 0.2)");

                                // Draw shard shape
                                patternContext.beginPath();
                                patternContext.moveTo(0, 0);
                                patternContext.lineTo(width / 2, height);
                                patternContext.lineTo(-width / 2, height);
                                patternContext.closePath();

                                // Apply gradient fill
                                patternContext.fillStyle = gradient;
                                patternContext.fill();

                                // Add glowing edge
                                patternContext.shadowColor = "rgba(0, 255, 0, 0.5)";
                                patternContext.shadowBlur = 10;
                                patternContext.strokeStyle = "rgb(87, 96, 87)";
                                patternContext.lineWidth = 1;
                                patternContext.stroke();

                                patternContext.restore();
                            }

                            // Draw multiple shards randomly
                            for (let i = 0; i < 30; i++) {
                                const x = Math.random() * patternCanvas.width;
                                const y = Math.random() * patternCanvas.height;
                                const width = Math.random() * 30 + 10;
                                const height = Math.random() * 50 + 20;
                                const angle = Math.random() * Math.PI * 2;

                                drawGlassShard(x, y, width, height, angle);
                            }

                            // Add subtle matrix code effect
                            patternContext.font = "8px monospace";
                            patternContext.fillStyle = "rgba(0, 255, 0, 0.5)";
                            for (let i = 0; i < 20; i++) {
                                const x = Math.random() * patternCanvas.width;
                                const y = Math.random() * patternCanvas.height;
                                const char = Math.random() > 0.5 ? "1" : "0";
                                patternContext.fillText(char, x, y);
                            }

                            break;
                        case 9:
                            // Set up the canvas
                            // Set background
                            patternContext.fillStyle = "rgba(2, 0, 20, 0.9)";
                            patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

                            // Function to draw a glowing line
                            function drawGlowingLine(x1, y1, x2, y2, color, width) {
                                patternContext.beginPath();
                                patternContext.moveTo(x1, y1);
                                patternContext.lineTo(x2, y2);
                                patternContext.strokeStyle = color;
                                patternContext.lineWidth = width;
                                patternContext.shadowColor = color;
                                patternContext.shadowBlur = 10;
                                patternContext.stroke();
                                patternContext.shadowBlur = 0;
                            }

                            // Draw circuit-like structure
                            for (let i = 0; i < 5; i++) {
                                const y = i * 20 + 10;
                                drawGlowingLine(0, y, 100, y, "rgba(0, 255, 150, 0.5)", 1);
                                for (let j = 0; j < 5; j++) {
                                    const x = j * 20 + 10;
                                    drawGlowingLine(x, y, x, y + 20, "rgba(0, 255, 150, 0.3)", 1);
                                }
                            }

                            // Function to draw falling digital rain
                            function drawDigitalRain(x, y, length) {
                                const gradient = patternContext.createLinearGradient(x, y, x, y + length);
                                gradient.addColorStop(0, "rgba(0, 255, 150, 0)");
                                gradient.addColorStop(0.2, "rgba(0, 255, 150, 0.8)");
                                gradient.addColorStop(1, "rgba(0, 255, 150, 0)");

                                patternContext.fillStyle = gradient;
                                patternContext.fillRect(x, y, 1, length);
                            }

                            // Draw digital rain
                            for (let i = 0; i < 20; i++) {
                                const x = Math.random() * patternCanvas.width;
                                const y = Math.random() * patternCanvas.height - 50;
                                const length = Math.random() * 30 + 20;
                                drawDigitalRain(x, y, length);
                            }

                            // Add Matrix characters
                            patternContext.font = "10px monospace";
                            patternContext.fillStyle = "rgba(0, 255, 150, 0.8)";
                            for (let i = 0; i < 30; i++) {
                                const x = Math.random() * patternCanvas.width;
                                const y = Math.random() * patternCanvas.height;
                                const char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
                                patternContext.fillText(char, x, y);
                            }

                            // Add glowing nodes at intersections
                            for (let i = 0; i < 5; i++) {
                                for (let j = 0; j < 5; j++) {
                                    const x = i * 20 + 10;
                                    const y = j * 20 + 10;
                                    patternContext.beginPath();
                                    patternContext.arc(x, y, 2, 0, Math.PI * 2);
                                    patternContext.fillStyle = "rgba(0, 255, 150, 0.8)";
                                    patternContext.fill();
                                    patternContext.shadowColor = "rgba(0, 255, 150, 1)";
                                    patternContext.shadowBlur = 5;
                                    patternContext.fill();
                                    patternContext.shadowBlur = 0;
                                }
                            }

                            break;
                        default:
                            break;
                    }
                    break;
                case 3:
                    switch (subPatternN) {
                        case 0:
                            // Draw base pastel color (like an Easter egg background)
                            patternContext.fillStyle = "#fff7e6"; // Light pastel yellow
                            patternContext.fillRect(0, 0, 100, 100);

                            // Add zigzag "ribbons" in pastel colors (like egg decorations)
                            patternContext.lineWidth = 2.2;
                            for (let i = 0; i < 10; i++) {
                                let startX = Math.random() * 100;
                                let startY = Math.random() * 100;
                                patternContext.beginPath();
                                patternContext.moveTo(startX, startY);

                                // Create a zigzag path
                                for (let j = 0; j < 6; j++) {
                                    const offsetX = (Math.random() - 0.5) * 18; // Random horizontal offset
                                    const offsetY = Math.random() * 15; // Random vertical offset
                                    let nextX = startX + offsetX;
                                    let nextY = startY + offsetY;
                                    patternContext.lineTo(nextX, nextY);
                                    startX = nextX;
                                    startY = nextY;
                                }
                                // Use a random pastel color for each zigzag
                                patternContext.strokeStyle = easterColors[Math.floor(Math.random() * easterColors.length)];
                                patternContext.shadowColor = "#fff";
                                patternContext.shadowBlur = 4;
                                patternContext.stroke();
                                patternContext.shadowBlur = 0;
                            }

                            // Add some pastel dots (like egg or candy decorations)
                            for (let i = 0; i < 18; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const radius = Math.random() * 2 + 2;
                                patternContext.beginPath();
                                patternContext.arc(x, y, radius, 0, Math.PI * 2);
                                patternContext.fillStyle = easterColors[Math.floor(Math.random() * easterColors.length)];
                                patternContext.shadowColor = "#fff";
                                patternContext.shadowBlur = 2;
                                patternContext.fill();
                                patternContext.shadowBlur = 0;
                            }
                            break;
                        case 1:
                            // Draw base color (pastel background)
                            patternContext.fillStyle = "#f9f5ff"; // Soft pastel lavender
                            patternContext.fillRect(0, 0, 100, 100);

                            // Define Easter characters for the falling "code"
                            easterChars = ["🐣", "🥚", "🐰", "🌸", "🌷", "💐", "E", "a", "s", "t", "e", "r"];

                            // Set font and text properties
                            patternContext.font = "bold 14px Comic Sans MS, Comic Sans, cursive";
                            patternContext.textAlign = "center";

                            // Function to draw a single column of falling Easter characters
                            function drawEasterColumn(ctx, x, yStart) {
                                let y = yStart;
                                for (let i = 0; i < 6; i++) {
                                    const char = easterChars[Math.floor(Math.random() * easterChars.length)];
                                    // Use pastel fading effect
                                    ctx.fillStyle = `rgba(180, 120, 255, ${1 - i * 0.18})`; // Fades from purple to transparent
                                    ctx.shadowColor = "#fff";
                                    ctx.shadowBlur = 3;
                                    ctx.fillText(char, x, y);
                                    ctx.shadowBlur = 0;
                                    y += 16; // Move down for the next character
                                }
                            }

                            // Draw multiple columns of falling Easter characters
                            for (let x = 12; x < 100; x += 18) {
                                const yStart = Math.random() * -40; // Random starting position for each column
                                drawEasterColumn(patternContext, x, yStart);
                            }

                            // Apply a pastel confetti effect for sparkle
                            let imageData = patternContext.getImageData(0, 0, 100, 100);
                            let data = imageData.data;
                            for (let i = 0; i < data.length; i += 4) {
                                // Add a random pastel sparkle
                                if (Math.random() < 0.07) {
                                    const pastel = [
                                        255 - Math.floor(Math.random() * 40), // R
                                        200 + Math.floor(Math.random() * 55), // G
                                        220 + Math.floor(Math.random() * 35), // B
                                    ];
                                    data[i] = pastel[0];
                                    data[i + 1] = pastel[1];
                                    data[i + 2] = pastel[2];
                                    data[i + 3] = 255;
                                }
                            }
                            patternContext.putImageData(imageData, 0, 0);
                            break;
                        case 2:
                            // Set up the canvas with a soft pastel background
                            patternContext.fillStyle = "#fff7e6"; // Lightest pastel yellow
                            patternContext.fillRect(0, 0, 100, 100);

                            // Function to draw a curved pastel ribbon
                            function drawCurvedRibbon(startX, startY, endX, endY, curvature, color) {
                                patternContext.beginPath();
                                patternContext.moveTo(startX, startY);
                                patternContext.quadraticCurveTo((startX + endX) / 2 + curvature, (startY + endY) / 2 + curvature, endX, endY);
                                patternContext.strokeStyle = color;
                                patternContext.lineWidth = 3;
                                patternContext.shadowColor = color;
                                patternContext.shadowBlur = 6;
                                patternContext.stroke();
                                patternContext.shadowBlur = 0;
                            }

                            // Draw pastel curved ribbons
                            for (let i = 0; i < 5; i++) {
                                drawCurvedRibbon(0, i * 25, 100, i * 25 + 25, 25, easterColors[i % easterColors.length]);
                                drawCurvedRibbon(i * 25, 0, i * 25 + 25, 100, 25, easterColors[(i + 2) % easterColors.length]);
                            }

                            // Add candy dots (Easter particles)
                            for (let i = 0; i < 20; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const radius = Math.random() * 2 + 2;
                                patternContext.beginPath();
                                patternContext.arc(x, y, radius, 0, Math.PI * 2);
                                const color = easterColors[Math.floor(Math.random() * easterColors.length)];
                                patternContext.fillStyle = color;
                                patternContext.shadowColor = "#fff";
                                patternContext.shadowBlur = 4;
                                patternContext.fill();
                                patternContext.shadowBlur = 0;
                            }

                            // Add playful Easter emojis instead of binary
                            patternContext.font = "bold 10px Comic Sans MS, Comic Sans, cursive";

                            for (let i = 0; i < 10; i++) {
                                const x = Math.random() * 90 + 5;
                                const y = Math.random() * 90 + 10;
                                const char = easterChars[Math.floor(Math.random() * easterChars.length)];
                                patternContext.fillStyle = easterColors[Math.floor(Math.random() * easterColors.length)];
                                patternContext.shadowColor = "#fff";
                                patternContext.shadowBlur = 3;
                                patternContext.fillText(char, x, y);
                                patternContext.shadowBlur = 0;
                            }
                            break;
                        case 3:
                            // Fill background with nothing (transparent)
                            // No need to clearRect if the canvas is already empty, but just in case:
                            patternContext.clearRect(0, 0, 100, 100);

                            // Pastel colors for dots
                            easterColors = [
                                "#ffb7c5", // Pink
                                "#ffe066", // Yellow
                                "#b5ead7", // Mint
                                "#c7ceea", // Lavender
                                "#a2d5f2", // Sky Blue
                            ];

                            // Draw evenly spaced pastel dots in a grid
                            spacing = 8;
                            for (let x = spacing / 2; x < 100; x += spacing) {
                                for (let y = spacing / 2; y < 100; y += spacing) {
                                    const color = easterColors[Math.floor(Math.random() * easterColors.length)];
                                    patternContext.beginPath();
                                    patternContext.arc(x, y, 4, 0, 2 * Math.PI);
                                    patternContext.fillStyle = color;
                                    patternContext.fill();
                                }
                            }

                            // Add a few transparent "holes"
                            for (let i = 0; i < 5; i++) {
                                const x = Math.random() * 80 + 10;
                                const y = Math.random() * 80 + 10;
                                const radius = Math.random() * 6 + 6;

                                patternContext.globalCompositeOperation = "destination-out";
                                patternContext.beginPath();
                                patternContext.arc(x, y, radius, 0, 2 * Math.PI);
                                patternContext.fill();
                                patternContext.globalCompositeOperation = "source-over";
                            }
                            break;
                        case 4:
                            // Fill background with a soft pastel color
                            patternContext.fillStyle = "#fffaf0"; // Very light pastel cream
                            patternContext.fillRect(0, 0, 100, 100);

                            // Pastel colors for dots
                            easterColors = [
                                "#ffb7c5", // Pink
                                "#ffe066", // Yellow
                                "#b5ead7", // Mint
                                "#c7ceea", // Lavender
                                "#a2d5f2", // Sky Blue
                            ];

                            // Draw evenly spaced pastel dots in a grid
                            spacing = 20;
                            for (let x = spacing / 2; x < 100; x += spacing) {
                                for (let y = spacing / 2; y < 100; y += spacing) {
                                    const color = easterColors[Math.floor(Math.random() * easterColors.length)];
                                    patternContext.beginPath();
                                    patternContext.arc(x, y, 4, 0, 2 * Math.PI);
                                    patternContext.fillStyle = color;
                                    patternContext.fill();
                                }
                            }
                            break;
                        case 5:
                            // Fill background with a soft pastel color
                            patternContext.fillStyle = "#fff9f2"; // Very light pastel peach
                            patternContext.fillRect(0, 0, 100, 100);

                            // Function to draw a simple Easter egg (oval with a stripe)
                            function drawSimpleEgg(x, y, width, height, color) {
                                patternContext.beginPath();
                                patternContext.ellipse(x, y, width, height, 0, 0, 2 * Math.PI);
                                patternContext.fillStyle = color;
                                patternContext.fill();

                                // Draw a simple horizontal stripe
                                patternContext.beginPath();
                                patternContext.ellipse(x, y, width * 0.7, height * 0.3, 0, 0, 2 * Math.PI);
                                patternContext.fillStyle = "white";
                                patternContext.fill();
                            }

                            // Function to draw a simple flower (5 petals)
                            function drawSimpleFlower(x, y, size, color) {
                                patternContext.fillStyle = color;
                                for (let i = 0; i < 5; i++) {
                                    const angle = ((Math.PI * 2) / 5) * i;
                                    const petalX = x + Math.cos(angle) * size * 0.6;
                                    const petalY = y + Math.sin(angle) * size * 0.6;
                                    patternContext.beginPath();
                                    patternContext.ellipse(petalX, petalY, size * 0.25, size * 0.5, angle, 0, 2 * Math.PI);
                                    patternContext.fill();
                                }
                                // Center circle
                                patternContext.beginPath();
                                patternContext.arc(x, y, size * 0.3, 0, 2 * Math.PI);
                                patternContext.fillStyle = "#fff";
                                patternContext.fill();
                            }

                            // Draw evenly spaced eggs and flowers in a grid
                            spacing = 25;
                            for (let x = spacing / 2; x < 100; x += spacing) {
                                for (let y = spacing / 2; y < 100; y += spacing) {
                                    // Randomly choose to draw egg or flower
                                    if (Math.random() < 0.5) {
                                        const color = easterColors[Math.floor(Math.random() * easterColors.length)];
                                        drawSimpleEgg(x, y, 6, 9, color);
                                    } else {
                                        const color = easterColors[Math.floor(Math.random() * easterColors.length)];
                                        drawSimpleFlower(x, y, 8, color);
                                    }
                                }
                            }
                            break;
                        case 6:
                            // Fill background with a soft pastel color
                            patternContext.fillStyle = "#f9f5ff"; // Soft pastel lavender
                            patternContext.fillRect(0, 0, 100, 100);

                            // Function to draw a decorated Easter egg
                            function drawEgg(x, y, w, h, color) {
                                patternContext.save();
                                patternContext.beginPath();
                                patternContext.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
                                patternContext.fillStyle = color;
                                patternContext.shadowColor = "#fff";
                                patternContext.shadowBlur = 6;
                                patternContext.fill();
                                patternContext.shadowBlur = 0;
                                // Add a zigzag or dot decoration
                                patternContext.strokeStyle = "#fff";
                                patternContext.lineWidth = 1.2;
                                patternContext.beginPath();
                                for (let i = -w * 0.7; i < w * 0.7; i += 7) {
                                    const px = x + i;
                                    const py = y + h * 0.2 * Math.sin(i / 5);
                                    patternContext.lineTo(px, py);
                                }
                                patternContext.stroke();
                                patternContext.restore();
                            }

                            // Function to draw a simple flower
                            function drawFlower(x, y, size, color) {
                                patternContext.save();
                                for (let i = 0; i < 6; i++) {
                                    patternContext.beginPath();
                                    const angle = ((Math.PI * 2) / 6) * i;
                                    patternContext.ellipse(x + Math.cos(angle) * size * 0.7, y + Math.sin(angle) * size * 0.7, size * 0.4, size * 0.15, angle, 0, 2 * Math.PI);
                                    patternContext.fillStyle = color;
                                    patternContext.fill();
                                }
                                // Center
                                patternContext.beginPath();
                                patternContext.arc(x, y, size * 0.18, 0, 2 * Math.PI);
                                patternContext.fillStyle = "#ffe066";
                                patternContext.fill();
                                patternContext.restore();
                            }

                            // Function to draw a bunny face
                            function drawBunny(x, y, size) {
                                patternContext.save();
                                // Face
                                patternContext.beginPath();
                                patternContext.ellipse(x, y, size * 0.5, size * 0.4, 0, 0, 2 * Math.PI);
                                patternContext.fillStyle = "#fff";
                                patternContext.shadowColor = "#eee";
                                patternContext.shadowBlur = 4;
                                patternContext.fill();
                                patternContext.shadowBlur = 0;
                                // Ears
                                for (let i = -1; i <= 1; i += 2) {
                                    patternContext.beginPath();
                                    patternContext.ellipse(x + i * size * 0.19, y - size * 0.45, size * 0.13, size * 0.32, 0, 0, 2 * Math.PI);
                                    patternContext.fillStyle = "#fff";
                                    patternContext.fill();
                                    // Inner ear
                                    patternContext.beginPath();
                                    patternContext.ellipse(x + i * size * 0.19, y - size * 0.45, size * 0.06, size * 0.15, 0, 0, 2 * Math.PI);
                                    patternContext.fillStyle = "#ffb7c5";
                                    patternContext.fill();
                                }
                                // Eyes
                                patternContext.beginPath();
                                patternContext.arc(x - size * 0.13, y - size * 0.05, size * 0.04, 0, 2 * Math.PI);
                                patternContext.arc(x + size * 0.13, y - size * 0.05, size * 0.04, 0, 2 * Math.PI);
                                patternContext.fillStyle = "#333";
                                patternContext.fill();
                                // Nose
                                patternContext.beginPath();
                                patternContext.arc(x, y + size * 0.04, size * 0.035, 0, 2 * Math.PI);
                                patternContext.fillStyle = "#ffb7c5";
                                patternContext.fill();
                                patternContext.restore();
                            }

                            // Draw eggs
                            for (let i = 0; i < 5; i++) {
                                const x = Math.random() * 90 + 5;
                                const y = Math.random() * 90 + 5;
                                const w = Math.random() * 7 + 10;
                                const h = w * (1.2 + Math.random() * 0.3);
                                drawEgg(x, y, w, h, easterColors[Math.floor(Math.random() * easterColors.length)]);
                            }

                            // Draw flowers
                            for (let i = 0; i < 6; i++) {
                                const x = Math.random() * 90 + 5;
                                const y = Math.random() * 90 + 5;
                                const size = Math.random() * 5 + 6;
                                drawFlower(x, y, size, easterColors[Math.floor(Math.random() * easterColors.length)]);
                            }

                            // Draw bunnies
                            for (let i = 0; i < 3; i++) {
                                const x = Math.random() * 80 + 10;
                                const y = Math.random() * 70 + 20;
                                const size = Math.random() * 8 + 10;
                                drawBunny(x, y, size);
                            }

                            // Optionally, scatter some small pastel dots (candy/confetti)
                            for (let i = 0; i < 20; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const r = Math.random() * 1.5 + 1;
                                patternContext.beginPath();
                                patternContext.arc(x, y, r, 0, 2 * Math.PI);
                                patternContext.fillStyle = easterColors[Math.floor(Math.random() * easterColors.length)];
                                patternContext.fill();
                            }
                            break;
                        case 7:
                            // Set up the base canvas size for the pattern
                            patternContext.fillStyle = "#f6e6ff"; // Light pastel lavender
                            patternContext.fillRect(0, 0, 100, 100);

                            // Draw concentric pastel "egg rings" (like decorated eggs)
                            function drawConcentricEggRings(centerX, centerY) {
                                const eggColors = [
                                    "rgba(255, 183, 197, 0.8)", // Pink
                                    "rgba(255, 224, 102, 0.5)", // Yellow
                                    "rgba(197, 206, 234, 0.3)", // Lavender
                                ];
                                for (let i = 0; i < eggColors.length; i++) {
                                    patternContext.beginPath();
                                    // Use ellipse for an egg shape
                                    patternContext.ellipse(centerX, centerY, (i + 1) * 10, (i + 1) * 13, 0, 0, Math.PI * 2);
                                    patternContext.strokeStyle = eggColors[i];
                                    patternContext.lineWidth = 2;
                                    patternContext.shadowColor = "#fff";
                                    patternContext.shadowBlur = 4;
                                    patternContext.stroke();
                                    patternContext.shadowBlur = 0;
                                }
                            }

                            // Draw pastel "rays" (like sunbeams or egg decorations)
                            function drawPastelRays(centerX, centerY) {
                                const rayColors = [
                                    "rgba(181, 234, 215, 0.7)", // Mint
                                    "rgba(162, 213, 242, 0.7)", // Sky Blue
                                    "rgba(255, 183, 197, 0.7)", // Pink
                                    "rgba(255, 224, 102, 0.7)", // Yellow
                                ];
                                const lineCount = 12;
                                for (let i = 0; i < lineCount; i++) {
                                    const angle = ((Math.PI * 2) / lineCount) * i;
                                    const xEnd = centerX + Math.cos(angle) * 50;
                                    const yEnd = centerY + Math.sin(angle) * 50;

                                    patternContext.beginPath();
                                    patternContext.moveTo(centerX, centerY);
                                    patternContext.lineTo(xEnd, yEnd);
                                    patternContext.strokeStyle = rayColors[i % rayColors.length];
                                    patternContext.lineWidth = 2;
                                    patternContext.shadowColor = "#fff";
                                    patternContext.shadowBlur = 3;
                                    patternContext.stroke();
                                    patternContext.shadowBlur = 0;
                                }
                            }

                            // Draw random Easter emojis and spring letters across the canvas
                            function drawEasterScatter() {
                                const scatterChars = ["🐣", "🥚", "🐰", "🌸", "🌷", "💐", "E", "a", "s", "t", "e", "r"];
                                patternContext.font = "bold 11px Comic Sans MS, Comic Sans, cursive";
                                for (let x = -10; x < 110; x += 13) {
                                    for (let y = -10; y < 110; y += 13) {
                                        const char = scatterChars[Math.floor(Math.random() * scatterChars.length)];
                                        // Use random pastel color for each scatter
                                        const pastel = [
                                            `rgba(255, 183, 197, ${Math.random() * 0.7 + 0.3})`, // Pink
                                            `rgba(255, 224, 102, ${Math.random() * 0.7 + 0.3})`, // Yellow
                                            `rgba(181, 234, 215, ${Math.random() * 0.7 + 0.3})`, // Mint
                                            `rgba(197, 206, 234, ${Math.random() * 0.7 + 0.3})`, // Lavender
                                            `rgba(162, 213, 242, ${Math.random() * 0.7 + 0.3})`, // Blue
                                            `rgba(247, 202, 201, ${Math.random() * 0.7 + 0.3})`, // Peach
                                        ];
                                        patternContext.fillStyle = pastel[Math.floor(Math.random() * pastel.length)];
                                        patternContext.fillText(char, x + Math.random() * 5 - 2.5, y + Math.random() * 5 - 2.5);
                                    }
                                }
                            }

                            // Combine all elements into the seamless Easter pattern
                            drawConcentricEggRings(50, 50); // Central egg rings
                            drawPastelRays(50, 50); // Pastel rays
                            drawEasterScatter(); // Easter emojis and letters scattered
                            break;
                        case 8:
                            // Set up the canvas
                            // Set pastel background (light lavender)
                            patternContext.fillStyle = "rgb(146, 142, 228)";
                            patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

                            // Function to draw a glowing pastel line (like Easter basket weave)
                            function drawGlowingLine(x1, y1, x2, y2, color, width) {
                                patternContext.beginPath();
                                patternContext.moveTo(x1, y1);
                                patternContext.lineTo(x2, y2);
                                patternContext.strokeStyle = color;
                                patternContext.lineWidth = width;
                                patternContext.shadowColor = color;
                                patternContext.shadowBlur = 8;
                                patternContext.stroke();
                                patternContext.shadowBlur = 0;
                            }

                            // Draw basket-weave pattern (horizontal and vertical pastel lines)
                            for (let i = 0; i < 5; i++) {
                                const y = i * 24 + 16;
                                drawGlowingLine(0, y, 120, y, easterColors[i % easterColors.length], 2);
                                for (let j = 0; j < 5; j++) {
                                    const x = j * 24 + 16;
                                    drawGlowingLine(x, y, x, y + 24, easterColors[(i + j) % easterColors.length], 2);
                                }
                            }

                            // Function to draw a falling Easter egg (ellipse with pastel gradient)
                            function drawEasterEgg(x, y, size) {
                                const gradient = patternContext.createRadialGradient(x, y, size * 0.3, x, y, size);
                                gradient.addColorStop(0, "#fff");
                                gradient.addColorStop(1, easterColors[Math.floor(Math.random() * easterColors.length)]);
                                patternContext.save();
                                patternContext.beginPath();
                                patternContext.ellipse(x, y, size * 0.7, size, 0, 0, 2 * Math.PI);
                                patternContext.fillStyle = gradient;
                                patternContext.shadowColor = "#fff";
                                patternContext.shadowBlur = 6;
                                patternContext.fill();
                                patternContext.shadowBlur = 0;
                                patternContext.restore();
                            }

                            // Draw falling Easter eggs
                            for (let i = 0; i < 18; i++) {
                                const x = Math.random() * patternCanvas.width;
                                const y = Math.random() * patternCanvas.height - 30;
                                const size = Math.random() * 6 + 8;
                                drawEasterEgg(x, y, size);
                            }

                            // Add playful "Happy Easter" letters or symbols
                            patternContext.font = "bold 14px Comic Sans MS, Comic Sans, cursive";
                            for (let i = 0; i < 16; i++) {
                                const x = Math.random() * patternCanvas.width;
                                const y = Math.random() * patternCanvas.height;
                                const char = easterChars[Math.floor(Math.random() * easterChars.length)];
                                patternContext.fillStyle = easterColors[Math.floor(Math.random() * easterColors.length)];
                                patternContext.shadowColor = "#fff";
                                patternContext.shadowBlur = 4;
                                patternContext.fillText(char, x, y);
                                patternContext.shadowBlur = 0;
                            }

                            // Add glowing pastel nodes at intersections (like candy dots)
                            for (let i = 0; i < 5; i++) {
                                for (let j = 0; j < 5; j++) {
                                    const x = i * 24 + 16;
                                    const y = j * 24 + 16;
                                    patternContext.beginPath();
                                    patternContext.arc(x, y, 4, 0, Math.PI * 2);
                                    patternContext.fillStyle = easterColors[(i * 5 + j) % easterColors.length];
                                    patternContext.shadowColor = "#fff";
                                    patternContext.shadowBlur = 6;
                                    patternContext.fill();
                                    patternContext.shadowBlur = 0;
                                }
                            }
                            break;
                        case 9:
                            // Set up the canvas with a transparent background
                            patternContext.clearRect(0, 0, 100, 100);

                            // Function to create a pastel "Easter bubble" (egg-shaped orb)
                            function drawEasterBubble(x, y, radius) {
                                // Pick a random pastel color
                                const pastel = easterColors[Math.floor(Math.random() * easterColors.length)];
                                const gradient = patternContext.createRadialGradient(x, y, radius * 0.2, x, y, radius);
                                gradient.addColorStop(0, "#fff");
                                gradient.addColorStop(0.7, pastel);
                                gradient.addColorStop(1, "rgba(255,255,255,0)");

                                patternContext.save();
                                patternContext.beginPath();
                                // Draw slightly egg-shaped ellipse for a festive look
                                patternContext.ellipse(x, y, radius * 0.8, radius, 0, 0, Math.PI * 2);
                                patternContext.fillStyle = gradient;
                                patternContext.shadowColor = pastel;
                                patternContext.shadowBlur = 8;
                                patternContext.fill();
                                patternContext.shadowBlur = 0;
                                patternContext.restore();
                            }

                            // Create pastel Easter bubbles
                            for (let i = 0; i < 5; i++) {
                                for (let j = 0; j < 5; j++) {
                                    const x = i * 25 + Math.random() * 10 - 5;
                                    const y = j * 25 + Math.random() * 10 - 5;
                                    const radius = Math.random() * 8 + 12;
                                    drawEasterBubble(x, y, radius);
                                }
                            }

                            // Add playful Easter emojis or letters
                            patternContext.font = "bold 13px Comic Sans MS, Comic Sans, cursive";
                            for (let i = 0; i < 10; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const char = easterChars[Math.floor(Math.random() * easterChars.length)];
                                patternContext.fillStyle = easterColors[Math.floor(Math.random() * easterColors.length)];
                                patternContext.shadowColor = "#fff";
                                patternContext.shadowBlur = 5;
                                patternContext.fillText(char, x, y);
                                patternContext.shadowBlur = 0;
                            }

                            // Create transparent "bite marks" (as if a bunny nibbled the eggs)
                            for (let i = 0; i < 3; i++) {
                                const x = Math.random() * 100;
                                const y = Math.random() * 100;
                                const radius = Math.random() * 8 + 6;

                                patternContext.globalCompositeOperation = "destination-out";
                                patternContext.beginPath();
                                // Use arc for a bite shape
                                patternContext.arc(x, y, radius, Math.PI * 0.25, Math.PI * 1.25, false);
                                patternContext.lineTo(x, y);
                                patternContext.closePath();
                                patternContext.fill();
                                patternContext.globalCompositeOperation = "source-over";
                            }
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
