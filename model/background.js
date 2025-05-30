class Background {
    constructor(level) {
        this.level = level;
        this.backgroundColor = "rgb(0, 0, 0)";
        this.isTransitioning = false;
        this.transitionAlpha = 0;
    }

    drawBackground(level, subLevel, transitionCtx = null) {
        const ctx = transitionCtx || bckCtx;
        this.#drawBackgroundContent(level, subLevel, ctx);
    }

    transition(level, newSubLevel) {
        this.isTransitioning = true;
        this.transitionAlpha = 0;

        // Make transition canvas visible and clear it
        transitionCanvas.style.display = "block";
        transitionCanvas.style.opacity = "0";
        transitionCtx.clearRect(0, 0, transitionCanvas.width, transitionCanvas.height);

        // Draw new background to transition canvas
        this.drawBackground(level, newSubLevel, transitionCtx);

        // Use CSS transitions for smoother fading
        transitionCanvas.style.transition = "opacity 2s ease-in-out";

        // Small delay to ensure proper rendering
        requestAnimationFrame(() => {
            transitionCanvas.style.opacity = "1";

            // Wait for transition to complete
            setTimeout(() => {
                this.isTransitioning = false;
                this.drawBackground(level, newSubLevel);

                // Fade out transition canvas
                transitionCanvas.style.opacity = "0";

                // Clean up after fade out
                setTimeout(() => {
                    transitionCanvas.style.display = "none";
                    transitionCtx.clearRect(0, 0, transitionCanvas.width, transitionCanvas.height);
                    transitionCanvas.style.transition = "";
                }, 2000);
            }, 2000);
        });
    }

    #drawBackgroundContent(level, subLevel, ctx) {
        // vars
        let gradient;
        let fontSize;
        let columns;
        let darkGreen;
        let mediumGreen;
        let lightGreen;
        let neonGreen;
        let codeGreen;
        let matrixGreen = "#00ff00";
        let blackGreen = "#001a00";
        let baseGreen = "#002200";
        let highlightGreen = "#00FF00";
        let bloomGreen;
        let streamCount;
        let checkerSize;
        let colors;
        let nascarColors;
        let grad;
        let cols;
        let rows;
        let cellW;
        let cellH;
        let eggColors;

        // draw background according to level
        switch (level) {
            case 1:
                switch (subLevel) {
                    case 0:
                        // Draw the gradient background
                        gradient = ctx.createLinearGradient(0, 0, 0, backgroundCanvas.height);
                        gradient.addColorStop(0, "#F7D03D"); // Yellow
                        gradient.addColorStop(0.25, "#D50032"); // Red
                        gradient.addColorStop(0.5, "#A500B5"); // Purple
                        gradient.addColorStop(0.75, "#003DA5"); // Blue
                        gradient.addColorStop(1, "#FFFFFF"); // White

                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Draw tire marks (drift patterns)
                        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
                        ctx.lineWidth = 7;
                        for (let i = 0; i < 8; i++) {
                            // Draw double lines for each tire mark
                            for (let j = 0; j < 2; j++) {
                                ctx.beginPath();
                                const startX = Math.random() * backgroundCanvas.width;
                                const startY = Math.random() * backgroundCanvas.height;
                                ctx.moveTo(startX, startY);
                                // Create curved tire marks with longer, smoother curves
                                ctx.bezierCurveTo(startX + 150, startY + 20, startX + 300, startY + 40, startX + 450, startY + 10);
                                ctx.stroke();
                                // Add parallel line slightly offset
                                ctx.beginPath();
                                ctx.moveTo(startX, startY + 5);
                                ctx.bezierCurveTo(startX + 150, startY + 25, startX + 300, startY + 45, startX + 450, startY + 15);
                                ctx.stroke();
                            }
                        }

                        // Draw tire tracks
                        for (let i = 0; i < backgroundCanvas.height; i += 100) {
                            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                            ctx.fillRect(backgroundCanvas.width * 0.2, i, 20, 60);
                            ctx.fillRect(backgroundCanvas.width * 0.8, i, 20, 60);
                        }

                        // Add confetti
                        for (let i = 0; i < 100; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const size = Math.random() * 3 + 3;
                            colors = ["#F7D03D", "#D50032", "#A500B5", "#003DA5", "#FFFFFF"];

                            ctx.save();
                            ctx.translate(x, y);
                            ctx.rotate(Math.random() * Math.PI * 2);
                            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                            ctx.fillRect(-size / 2, -size / 2, size, size);
                            ctx.restore();
                        }

                        // Add finish line pattern
                        checkerSize = 20;
                        for (let x = 0; x < backgroundCanvas.width; x += checkerSize * 2) {
                            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                            ctx.fillRect(x, backgroundCanvas.height / 6, checkerSize, checkerSize);
                            ctx.fillRect(x + checkerSize, backgroundCanvas.height / 6 + checkerSize, checkerSize, checkerSize);

                            ctx.fillRect(x, backgroundCanvas.height / 2, checkerSize, checkerSize);
                            ctx.fillRect(x + checkerSize, backgroundCanvas.height / 2 + checkerSize, checkerSize, checkerSize);

                            ctx.fillRect(x, backgroundCanvas.height - backgroundCanvas.height / 6, checkerSize, checkerSize);
                            ctx.fillRect(x + checkerSize, backgroundCanvas.height - backgroundCanvas.height / 6 + checkerSize, checkerSize, checkerSize);
                        }

                        // Add speed lines
                        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
                        ctx.lineWidth = 2;
                        for (let i = 0; i < 20; i++) {
                            const y = Math.random() * backgroundCanvas.height;
                            ctx.beginPath();
                            ctx.moveTo(0, y);
                            ctx.lineTo(100 + Math.random() * 100, y);
                            ctx.stroke();
                        }
                        break;
                    case 1:
                        //Get canvas dimensions
                        const width = backgroundCanvas.width;
                        const height = backgroundCanvas.height;

                        // Dark asphalt background with blue tint
                        ctx.fillStyle = "#003DA5"; // Using the blue color
                        ctx.fillRect(0, 0, width, height);

                        // Draw racing stripes
                        const stripesWidth = 30;
                        const stripeGap = 40;
                        const sColors = ["#F7D03D", "#D50032", "#A500B5"]; // Yellow, Red, Purple
                        let colorIndex = 0;
                        for (let x = 0; x < width; x += stripesWidth + stripeGap) {
                            ctx.fillStyle = sColors[colorIndex % 3];
                            ctx.fillRect(x, 0, stripesWidth, height);
                            colorIndex++;
                        }

                        // Draw checkered pattern at the top and bottom
                        const squareSize = 20;
                        const rowNums = 2;
                        for (let y = 0; y < rowNums * squareSize; y += squareSize) {
                            for (let x = 0; x < width; x += squareSize) {
                                if ((x + y) % (squareSize * 2) === 0) {
                                    ctx.fillStyle = "#FFFFFF"; // White
                                    ctx.fillRect(x, height / 6 + y, squareSize, squareSize);
                                    ctx.fillRect(x, height - height / 6 - y - squareSize, squareSize, squareSize);
                                }
                            }
                        }

                        // Add racing lights
                        const lights = ["#D50032", "#F7D03D", "rgb(37, 125, 21)"]; // Red, Yellow, Purple
                        for (let i = 0; i < 6; i++) {
                            const x = (width / 6) * i + width / 12;
                            lights.forEach((color, index) => {
                                ctx.beginPath();
                                ctx.arc(x, height / 2 + index * 20, 8, 0, Math.PI * 2);
                                ctx.fillStyle = color;
                                ctx.fill();

                                // Add glow effect
                                ctx.shadowColor = color;
                                ctx.shadowBlur = 15;
                                ctx.fill();
                                ctx.shadowBlur = 0;
                            });
                        }

                        // Add speed lines
                        const speedLineColors = ["#F7D03D", "#FFFFFF", "#A500B5"]; // Yellow, White, Purple
                        for (let i = 0; i < 50; i++) {
                            ctx.beginPath();
                            ctx.strokeStyle = speedLineColors[i % 3];
                            ctx.lineWidth = Math.random() * 2 + 1;

                            const y = Math.random() * height;
                            const lineLength = Math.random() * 100 + 50;

                            ctx.moveTo(Math.random() * width, y);
                            ctx.lineTo(Math.random() * width + lineLength, y);
                            ctx.stroke();
                        }
                        break;
                    case 2:
                        ctx.fillStyle = "rgb(0, 0, 0)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Draw checkered pattern
                        cols = 10;
                        rows = 15;
                        const cellWidth = backgroundCanvas.width / cols;
                        const cellHeight = backgroundCanvas.height / rows;

                        gradient = ctx.createLinearGradient(0, 0, 0, backgroundCanvas.height);
                        gradient.addColorStop(0, "#F7D03D"); // Yellow
                        gradient.addColorStop(0.25, "#D50032"); // Red
                        gradient.addColorStop(0.5, "#A500B5"); // Purple
                        gradient.addColorStop(0.75, "#003DA5"); // Blue
                        gradient.addColorStop(1, "#FFFFFF"); // White

                        // Draw animated checkered pattern
                        for (let row = 0; row < rows; row++) {
                            for (let col = 0; col < cols; col++) {
                                ctx.fillStyle = (row + col) % 2 === 0 ? gradient : "black";
                                const xOffset = Math.sin(row * 0.5) * 10;
                                const yOffset = Math.cos(col * 0.5) * 10;
                                ctx.beginPath();
                                ctx.moveTo(col * cellWidth + xOffset, row * cellHeight + yOffset);
                                ctx.lineTo((col + 1) * cellWidth + xOffset, row * cellHeight + yOffset);
                                ctx.lineTo((col + 1) * cellWidth - xOffset, (row + 1) * cellHeight - yOffset);
                                ctx.lineTo(col * cellWidth - xOffset, (row + 1) * cellHeight - yOffset);
                                ctx.closePath();
                                ctx.fill();
                            }
                        }

                        // Add sharp speed numbers
                        const speeds = ["299", "180", "220", "340"];
                        colors = ["#F7D03D", "#D50032", "#A500B5", "#003DA5"];
                        const speedTypes = ["km/h", "mph"];
                        speeds.forEach((speed) => {
                            ctx.save();
                            ctx.translate(Math.random() * backgroundCanvas.width + 10, Math.random() * backgroundCanvas.height + 10);
                            ctx.rotate((Math.random() - 0.9) * 0.7);
                            ctx.font = "bold 48px 'Racing Sans One', Arial";
                            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                            ctx.strokeStyle = "#000000";
                            ctx.lineWidth = 2;
                            const speedType = speedTypes[Math.floor(Math.random() * speedTypes.length)];
                            ctx.strokeText(speed + speedType, 0, 0);
                            ctx.fillText(speed + speedType, 0, 0);
                            ctx.restore();
                        });

                        // Add RPM gauge elements
                        for (let i = 0; i < 3; i++) {
                            const x = Math.random() * backgroundCanvas.width + 10;
                            const y = Math.random() * backgroundCanvas.height + 10;
                            const size = 60;

                            // Draw gauge arc
                            ctx.beginPath();
                            ctx.arc(x, y, size, Math.PI * 0.75, Math.PI * 0.25, false);
                            ctx.strokeStyle = "#F7D03D";
                            ctx.lineWidth = 4;
                            ctx.stroke();

                            // Add red zone
                            ctx.beginPath();
                            ctx.arc(x, y, size, Math.PI * 0.1, Math.PI * 0.25, false);
                            ctx.strokeStyle = "#D50032";
                            ctx.stroke();
                        }

                        // Add sharp lightning bolt effects
                        for (let i = 0; i < 6; i++) {
                            ctx.beginPath();
                            const startX = Math.random() * backgroundCanvas.width;
                            const startY = Math.random() * backgroundCanvas.height;
                            ctx.moveTo(startX, startY);
                            ctx.lineTo(startX + 20, startY + 30);
                            ctx.lineTo(startX + 40, startY + 15);
                            ctx.lineTo(startX + 60, startY + 45);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`;
                            ctx.shadowBlur = 30;
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                        break;
                    case 3:
                        ctx.fillStyle = "rgb(0, 0, 0,0.8)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        const numRows = 12;
                        const numCols = 12;
                        const squareWidth = backgroundCanvas.width / numCols;
                        const squareHeight = backgroundCanvas.height / numRows;

                        // Colors similar to the image
                        const color1 = "rgb(255, 255, 255)";
                        const color2 = "rgb(0, 0, 0)";

                        for (let row = 0; row < numRows; row++) {
                            for (let col = 0; col < numCols; col++) {
                                const x = col * squareWidth;
                                const y = row * squareHeight;

                                // Subtle wave distortion
                                const waveX = Math.sin(y / 50) * squareWidth * 0.1;
                                const waveY = Math.cos(x / 50) * squareHeight * 0.1;

                                ctx.save();
                                ctx.translate(x + waveX, y + waveY);
                                ctx.rotate(Math.sin((x + y) / 80) * 0.03); // Subtle rotation

                                ctx.fillStyle = (row + col) % 2 === 0 ? color2 : color1;
                                ctx.fillRect(0, 0, squareWidth, squareHeight);
                                ctx.restore();
                            }
                        }

                        // Sparkle effect
                        for (let i = 0; i < 30; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const size = Math.random() * 6;
                            const opacity = Math.random() * 0.7 + 0.3; // Varying opacity

                            ctx.beginPath();
                            ctx.arc(x, y, size, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(255, 255, 200, ${opacity})`; // Soft yellow with opacity
                            ctx.shadowColor = "yellow"; // Add glow
                            ctx.shadowBlur = size * 2; // Blur based on size
                            ctx.fill();
                            ctx.shadowColor = null; // Reset shadow properties
                            ctx.shadowBlur = 0;
                        }
                        break;
                    case 4:
                        // Dark metallic background with gradient
                        gradient = ctx.createLinearGradient(0, 0, 0, backgroundCanvas.height);
                        gradient.addColorStop(0, "rgba(255, 0, 51, 0.94)");
                        gradient.addColorStop(1, "#000000");
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Draw speed meter arcs
                        const centerX = backgroundCanvas.width / 2;
                        const centerY = backgroundCanvas.height / 2;
                        const radius = backgroundCanvas.height / 3;

                        // Draw main speedometer
                        ctx.beginPath();
                        ctx.strokeStyle = "#FFFFFF";
                        ctx.lineWidth = 15;
                        ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 0.25, false);
                        ctx.stroke();

                        // Draw speed markers
                        for (let i = 0; i <= 12; i++) {
                            const angle = Math.PI * 1.5 * (i / 12) - Math.PI * 0.75;
                            const markerLength = i % 3 === 0 ? 30 : 15;

                            ctx.beginPath();
                            ctx.strokeStyle = i <= 8 ? "#F7D03D" : "#D50032";
                            ctx.lineWidth = 3;
                            const x1 = centerX + (radius - markerLength) * Math.cos(angle);
                            const y1 = centerY + (radius - markerLength) * Math.sin(angle);
                            const x2 = centerX + radius * Math.cos(angle);
                            const y2 = centerY + radius * Math.sin(angle);
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.stroke();
                        }

                        // Add RPM meter
                        const rpmGradient = ctx.createLinearGradient(50, 50, 150, 150);
                        rpmGradient.addColorStop(0, "#F7D03D");
                        rpmGradient.addColorStop(1, "#D50032");

                        ctx.beginPath();
                        ctx.strokeStyle = rpmGradient;
                        ctx.lineWidth = 10;
                        ctx.arc(100, 100, 40, 0, Math.PI * 1.5, false);
                        ctx.stroke();

                        // Add glowing effect lines
                        for (let i = 0; i < 20; i++) {
                            const startX = Math.random() * backgroundCanvas.width;
                            const startY = Math.random() * backgroundCanvas.height;
                            const length = Math.random() * 100 + 50;
                            const angle = (Math.random() * Math.PI) / 4 - Math.PI / 8;

                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(247, 208, 61, ${Math.random() * 0.5})`;
                            ctx.lineWidth = Math.random() * 2 + 1;
                            ctx.moveTo(startX, startY);
                            ctx.lineTo(startX + length * Math.cos(angle), startY + length * Math.sin(angle));
                            ctx.stroke();
                        }

                        // Add warning lights
                        const warningLights = ["#D50032", "#F7D03D"];
                        warningLights.forEach((color, i) => {
                            ctx.beginPath();
                            ctx.arc(50 + i * 50, backgroundCanvas.height - 50, 10, 0, Math.PI * 2);
                            ctx.fillStyle = color;
                            ctx.fill();
                            ctx.shadowColor = color;
                            ctx.shadowBlur = 15;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                        });
                        break;
                    case 5:
                        // Define NASCAR colors
                        nascarColors = ["#ffd659", "#e4002b", "#007ac2"];

                        // Function to draw the background
                        function drawOtherBackground() {
                            ctx.fillStyle = "#1a1a1a";
                            ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
                        }

                        // Function to draw a speedometer
                        function drawSpeedometer(x, y, radius, speed) {
                            // Outer circle
                            ctx.beginPath();
                            ctx.arc(x, y, radius, 0, Math.PI * 2);
                            ctx.fillStyle = "#333";
                            ctx.fill();
                            ctx.lineWidth = 5;
                            ctx.strokeStyle = "#fff";
                            ctx.stroke();

                            // Inner circle for decoration
                            ctx.beginPath();
                            ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
                            ctx.fillStyle = nascarColors[Math.floor(Math.random() * nascarColors.length)];
                            ctx.fill();

                            // Speed text
                            ctx.font = `${radius * 0.3}px Arial`;
                            ctx.fillStyle = "#fff";
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillText(`${speed} KMPH`, x, y);

                            // Speedometer needle
                            const angle = (Math.PI / 180) * (speed / 180) * 270 - Math.PI / 4;
                            const needleLength = radius * 0.7;
                            const needleX = x + Math.cos(angle) * needleLength;
                            const needleY = y + Math.sin(angle) * needleLength;

                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(needleX, needleY);
                            ctx.strokeStyle = "#ff0000";
                            ctx.lineWidth = 4;
                            ctx.stroke();
                        }

                        // Function to draw multiple speedometers dynamically
                        function drawSpeedometers() {
                            const numSpeedometers = 10;

                            for (let i = 0; i < numSpeedometers; i++) {
                                const x = Math.random() * backgroundCanvas.width;
                                const y = Math.random() * backgroundCanvas.height;
                                const radius = Math.random() * 50 + 50; // Random size between 50 and 100
                                const speed = Math.floor(Math.random() * 180); // Random speed between 0 and 180

                                drawSpeedometer(x, y, radius, speed);
                            }
                        }

                        // Function to draw tire drift marks
                        function drawDriftMarks() {
                            for (let i = 0; i < 30; i++) {
                                const startX = Math.random() * backgroundCanvas.width;
                                const startY = Math.random() * backgroundCanvas.height;
                                const controlX1 = startX + Math.random() * 300 - 150;
                                const controlY1 = startY + Math.random() * 300 - 150;
                                const controlX2 = startX + Math.random() * 600 - 300;
                                const controlY2 = startY + Math.random() * 600 - 300;
                                const endX = startX + Math.random() * 900 - 450;
                                const endY = startY + Math.random() * 900 - 450;

                                ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
                                ctx.lineWidth = Math.random() * 20 + 10;
                                ctx.lineCap = "round";
                                ctx.lineJoin = "round";
                                ctx.beginPath();
                                ctx.moveTo(startX, startY);
                                ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
                                ctx.stroke();

                                // Add a second line for double tire marks
                                ctx.lineWidth *= 0.5;
                                ctx.beginPath();
                                ctx.moveTo(startX + 10, startY + 10);
                                ctx.bezierCurveTo(controlX1 + 10, controlY1 + 10, controlX2 + 10, controlY2 + 10, endX + 10, endY + 10);
                                ctx.stroke();
                            }
                        }

                        // Draw everything
                        drawOtherBackground();
                        drawDriftMarks();
                        drawSpeedometers();

                        // Add a subtle overlay to blend everything
                        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        break;
                    case 6:
                        // Function to draw a weird background
                        function drawNewBackground() {
                            ctx.fillStyle = "#000000";
                            ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                            // Draw abstract shapes
                            for (let i = 0; i < 100; i++) {
                                const x = Math.random() * backgroundCanvas.width;
                                const y = Math.random() * backgroundCanvas.height;
                                const size = Math.random() * 100 + 20;

                                ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x + size, y - size / 2);
                                ctx.lineTo(x + size * 1.5, y);
                                ctx.lineTo(x + size, y + size / 2);
                                ctx.closePath();
                                ctx.fill();

                                // Add some "speed lines"
                                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x + size, y);
                                ctx.stroke();
                            }

                            // Draw a "swirling vortex"
                            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
                            ctx.beginPath();
                            ctx.arc(backgroundCanvas.width / 2, backgroundCanvas.height / 2, 200, 0, Math.PI * 2);
                            ctx.fill();

                            // Add some "chaotic lines"
                            for (let i = 0; i < 50; i++) {
                                ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.5 + 0.5})`;
                                ctx.lineWidth = Math.random() * 5 + 1;
                                ctx.beginPath();
                                ctx.moveTo(Math.random() * backgroundCanvas.width, Math.random() * backgroundCanvas.height);
                                ctx.lineTo(Math.random() * backgroundCanvas.width, Math.random() * backgroundCanvas.height);
                                ctx.stroke();
                            }
                        }

                        // Draw everything
                        drawNewBackground();

                        // Add a subtle overlay to blend everything
                        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        break;
                    case 7:
                        // Define NASCAR colors
                        nascarColors = ["#ffd659", "#e4002b", "#007ac2"];

                        // Function to draw background
                        function drawBackground() {
                            ctx.fillStyle = "#1a1a1a";
                            ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
                        }

                        // Function to draw the race track
                        function drawRaceTrack() {
                            const centerX = backgroundCanvas.width / 2;
                            const centerY = backgroundCanvas.height / 2;
                            const radiusX = backgroundCanvas.width * 0.4;
                            const radiusY = backgroundCanvas.height * 0.4;

                            ctx.strokeStyle = "#ffffff";
                            ctx.lineWidth = 50;
                            ctx.beginPath();
                            ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Add a subtle glow to the track
                            ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
                            ctx.shadowBlur = 10;
                            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
                            ctx.lineWidth = 35;
                            ctx.stroke();
                            ctx.shadowBlur = 0;
                        }

                        // Function to draw racing lines with blur and shadow
                        function drawRacingLines() {
                            const centerX = backgroundCanvas.width / 2;
                            const centerY = backgroundCanvas.height / 2;
                            const numLines = 50;

                            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                            ctx.shadowBlur = 5;
                            ctx.shadowOffsetX = 2;
                            ctx.shadowOffsetY = 2;

                            for (let i = 0; i < numLines; i++) {
                                const angle = (i / numLines) * Math.PI * 2;
                                const radiusX = backgroundCanvas.width * 0.4 + Math.sin(i * 0.5) * 20;
                                const radiusY = backgroundCanvas.height * 0.4 + Math.sin(i * 0.5) * 20;

                                const x1 = centerX + Math.cos(angle) * radiusX;
                                const y1 = centerY + Math.sin(angle) * radiusY;
                                const x2 = centerX + Math.cos(angle + 0.1) * radiusX;
                                const y2 = centerY + Math.sin(angle + 0.1) * radiusY;

                                ctx.strokeStyle = nascarColors[i % nascarColors.length];
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(x1, y1);
                                ctx.lineTo(x2, y2);
                                ctx.stroke();
                            }

                            ctx.shadowBlur = 0;
                            ctx.shadowOffsetX = 0;
                            ctx.shadowOffsetY = 0;
                        }

                        // Function to add atmospheric lights
                        function drawAtmosphericLights() {
                            const numLights = 3;

                            for (let i = 0; i < numLights; i++) {
                                const x = Math.random() * backgroundCanvas.width;
                                const y = Math.random() * backgroundCanvas.height;
                                const radius = Math.random() * 30 + 50;

                                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                                gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
                                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                                ctx.fillStyle = gradient;
                                ctx.beginPath();
                                ctx.arc(x, y, radius, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }

                        // Function to add some "speed lines" effect with blur
                        function drawSpeedLines() {
                            const centerX = backgroundCanvas.width / 2;
                            const centerY = backgroundCanvas.height / 2;
                            const numLines = 100;

                            ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
                            ctx.shadowBlur = 3;

                            for (let i = 0; i < numLines; i++) {
                                const angle = (i / numLines) * Math.PI * 2;
                                const radiusX = backgroundCanvas.width * 0.45 + Math.random() * 30;
                                const radiusY = backgroundCanvas.height * 0.45 + Math.random() * 30;

                                const x1 = centerX + Math.cos(angle) * radiusX;
                                const y1 = centerY + Math.sin(angle) * radiusY;
                                const x2 = centerX + Math.cos(angle) * (radiusX - 20);
                                const y2 = centerY + Math.sin(angle) * (radiusY - 20);

                                ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(x1, y1);
                                ctx.lineTo(x2, y2);
                                ctx.stroke();
                            }

                            ctx.shadowBlur = 0;
                        }

                        // Draw everything
                        drawBackground();
                        drawAtmosphericLights();
                        drawRaceTrack();
                        drawRacingLines();
                        drawSpeedLines();

                        // Add a subtle overlay to blend everything
                        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        break;
                    case 8:
                        // Create a dynamic background
                        ctx.fillStyle = "#1a1a1a";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Draw speed lines
                        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
                        ctx.lineWidth = 2;
                        for (let i = 0; i < 100; i++) {
                            const y = Math.random() * backgroundCanvas.height;
                            const length = Math.random() * 200 + 50;
                            ctx.beginPath();
                            ctx.moveTo(0, y);
                            ctx.lineTo(length, y);
                            ctx.stroke();
                        }

                        // Draw a checkered flag pattern
                        ctx.fillStyle = "rgb(136, 144, 23)";
                        const flagSize = 20;
                        for (let x = 0; x < backgroundCanvas.width; x += flagSize * 2) {
                            for (let y = 0; y < backgroundCanvas.height; y += flagSize * 2) {
                                ctx.fillRect(x, y, flagSize, flagSize);
                                ctx.fillRect(x + flagSize, y + flagSize, flagSize, flagSize);
                            }
                        }

                        // Draw a stylized podium
                        const podiumColors = ["gray", "orange", "brown"];
                        const podiumHeight = [2, 3, 1];
                        for (let i = 0; i < 3; i++) {
                            ctx.fillStyle = podiumColors[i];
                            const width = backgroundCanvas.width / 6;
                            const height = podiumHeight[i] * 50;
                            const x = backgroundCanvas.width / 2.5 + (i - 1) * width;
                            const y = backgroundCanvas.height - height;
                            ctx.fillRect(x, y, width, height);
                        }

                        // Draw confetti
                        for (let i = 0; i < 100; i++) {
                            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const size = Math.random() * 10 + 5;
                            ctx.fillRect(x, y, size, size);
                        }

                        // Add a glow effect around the trophy
                        ctx.shadowColor = "#FFD700";
                        ctx.shadowBlur = 50;
                        ctx.beginPath();
                        //ctx.arc(trophyX, trophyY + 75, 100, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(255, 215, 0, 0.3)";
                        ctx.fill();

                        // Reset shadow
                        ctx.shadowColor = "transparent";
                        ctx.shadowBlur = 0;

                        break;
                    case 9:
                        // Create a swirling vortex background
                        const vortexGradient = ctx.createRadialGradient(
                            backgroundCanvas.width / 2,
                            backgroundCanvas.height / 2,
                            0,
                            backgroundCanvas.width / 2,
                            backgroundCanvas.height / 2,
                            backgroundCanvas.width
                        );
                        vortexGradient.addColorStop(0, "rgb(60, 8, 8)");
                        vortexGradient.addColorStop(0.5, "rgb(1, 0, 0)");
                        vortexGradient.addColorStop(1, "rgb(209, 69, 111)");

                        ctx.fillStyle = vortexGradient;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Draw swirling lines
                        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                        ctx.lineWidth = 2;
                        for (let i = 0; i < 100; i++) {
                            ctx.beginPath();
                            ctx.moveTo(backgroundCanvas.width / 2, backgroundCanvas.height / 2);
                            ctx.bezierCurveTo(
                                Math.random() * backgroundCanvas.width,
                                Math.random() * backgroundCanvas.height,
                                Math.random() * backgroundCanvas.width,
                                Math.random() * backgroundCanvas.height,
                                Math.random() * backgroundCanvas.width,
                                Math.random() * backgroundCanvas.height
                            );
                            ctx.stroke();
                        }

                        // Create floating, distorted checkered patterns
                        for (let i = 0; i < 5; i++) {
                            const size = Math.random() * 100 + 50;
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;

                            ctx.save();
                            ctx.translate(x, y);
                            ctx.rotate(Math.random() * Math.PI * 2);

                            for (let j = 0; j < 5; j++) {
                                for (let k = 0; k < 5; k++) {
                                    ctx.fillStyle = (j + k) % 2 === 0 ? "rgba(0, 0, 0, 0.7)" : "rgba(235, 223, 223, 0.7)";
                                    ctx.beginPath();
                                    ctx.moveTo((j * size) / 5, (k * size) / 5);
                                    ctx.lineTo(((j + 1) * size) / 5, (k * size) / 5);
                                    ctx.lineTo(((j + 1) * size) / 5, ((k + 1) * size) / 5);
                                    ctx.lineTo((j * size) / 5, ((k + 1) * size) / 5);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            ctx.restore();
                        }

                        // Add abstract car shapes
                        for (let i = 0; i < 7; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const size = Math.random() * 100 + 50;

                            ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(x + size, y + size / 2);
                            ctx.lineTo(x + size, y + size);
                            ctx.lineTo(x - size / 2, y + size);
                            ctx.closePath();
                            ctx.fill();

                            // Add "speed lines"
                            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
                            ctx.lineWidth = 3;
                            for (let j = 0; j < 5; j++) {
                                ctx.beginPath();
                                ctx.moveTo(x - size / 2 - j * 20, y + size / 2);
                                ctx.lineTo(x - size - j * 20, y + size / 2);
                                ctx.stroke();
                            }
                        }

                        // Create a "warp speed" effect
                        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                        for (let i = 0; i < 200; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const length = Math.random() * 50 + 10;
                            const angle = Math.atan2(y - backgroundCanvas.height / 2, x - backgroundCanvas.width / 2);

                            ctx.save();
                            ctx.translate(x, y);
                            ctx.rotate(angle);
                            ctx.fillRect(0, -1, length, 2);
                            ctx.restore();
                        }

                        break;
                    default:
                        break;
                }
                break;
            /////////////////////////////////////////////////////////////////////////////
            case 2:
                switch (subLevel) {
                    case 0:
                        ctx.fillStyle = "rgb(0, 0, 0)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        var chars = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        chars = chars.split("");

                        fontSize = 16;
                        columns = Math.floor(backgroundCanvas.width / fontSize);

                        for (var i = 0; i < columns; i++) {
                            var columnHeight = Math.floor((Math.random() * backgroundCanvas.height) / 15) + 5;
                            for (var j = 0; j < columnHeight; j++) {
                                var text = chars[Math.floor(Math.random() * chars.length)];
                                ctx.fillStyle = "rgba(0, " + Math.floor(Math.random() * 255) + ", 0, 1)";
                                ctx.font = fontSize + "px monospace";
                                ctx.fillText(text, i * fontSize, j * fontSize);
                            }
                        }
                        break;
                    case 1:
                        // Color palette
                        darkGreen = "#001a00";
                        lightGreen = "#00ff00";
                        codeGreen = "#39ff14";
                        const glowWhite = "#ffffff";

                        // Base background
                        ctx.fillStyle = darkGreen;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Configuration
                        const gridSize = 40;
                        const nodeSize = 3;
                        const lineWidth = 0.5;

                        // Draw grid nodes and connections
                        for (let x = 0; x <= backgroundCanvas.width; x += gridSize) {
                            for (let y = 0; y <= backgroundCanvas.height; y += gridSize) {
                                // Draw node
                                ctx.fillStyle = lightGreen;
                                ctx.beginPath();
                                ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
                                ctx.fill();

                                // Draw connections
                                ctx.strokeStyle = codeGreen;
                                ctx.lineWidth = lineWidth;

                                if (x < backgroundCanvas.width) {
                                    ctx.beginPath();
                                    ctx.moveTo(x, y);
                                    ctx.lineTo(x + gridSize, y);
                                    ctx.stroke();
                                }

                                if (y < backgroundCanvas.height) {
                                    ctx.beginPath();
                                    ctx.moveTo(x, y);
                                    ctx.lineTo(x, y + gridSize);
                                    ctx.stroke();
                                }
                            }
                        }

                        // Add abstract data streams
                        streamCount = 15;
                        for (let i = 0; i < streamCount; i++) {
                            const startX = Math.random() * backgroundCanvas.width;
                            const startY = Math.random() * backgroundCanvas.height;
                            const endX = Math.random() * backgroundCanvas.width;
                            const endY = Math.random() * backgroundCanvas.height;

                            ctx.strokeStyle = `rgba(0, 255, 0, ${Math.random() * 0.5 + 0.1})`;
                            ctx.lineWidth = Math.random() * 2 + 1;
                            ctx.beginPath();
                            ctx.moveTo(startX, startY);
                            ctx.lineTo(endX, endY);
                            ctx.stroke();
                        }

                        // Add glowing focal points
                        const focalPoints = 20;
                        for (let i = 0; i < focalPoints; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const radius = Math.random() * 50 + 20;

                            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                            gradient.addColorStop(0, glowWhite);
                            gradient.addColorStop(0.2, codeGreen);
                            gradient.addColorStop(1, "transparent");

                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(x, y, radius, 0, Math.PI * 2);
                            ctx.fill();
                        }
                        break;
                    case 2:
                        // Color palette
                        const deepBlue = "#001433";
                        const electricBlue = "#0077be";
                        neonGreen = "#39ff14";
                        const digitalPurple = "#9932cc";

                        // Base background
                        ctx.fillStyle = deepBlue;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Create fragmented reality effect
                        const fragmentCount = 200;
                        for (let i = 0; i < fragmentCount; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const size = Math.random() * 100 + 20;
                            const angle = Math.random() * Math.PI * 2;

                            ctx.save();
                            ctx.translate(x, y);
                            ctx.rotate(angle);

                            // Draw distorted rectangle
                            ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`;
                            ctx.fillRect(-size / 2, -size / 2, size, size);

                            // Add glitch effect
                            if (Math.random() > 0.7) {
                                ctx.fillStyle = neonGreen;
                                ctx.fillRect(-size / 2, -size / 4, size, size / 8);
                            }

                            ctx.restore();
                        }

                        // Create digital noise
                        const noiseSize = 2;
                        for (let x = 0; x < backgroundCanvas.width; x += noiseSize) {
                            for (let y = 0; y < backgroundCanvas.height; y += noiseSize) {
                                if (Math.random() > 0.995) {
                                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
                                    ctx.fillRect(x, y, noiseSize, noiseSize);
                                }
                            }
                        }

                        // Add data streams
                        streamCount = 30;
                        for (let i = 0; i < streamCount; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const length = Math.random() * 200 + 100;
                            const width = Math.random() * 3 + 1;

                            const gradient = ctx.createLinearGradient(x, y, x, y + length);
                            gradient.addColorStop(0, "transparent");
                            gradient.addColorStop(0.5, electricBlue);
                            gradient.addColorStop(1, "transparent");

                            ctx.strokeStyle = gradient;
                            ctx.lineWidth = width;
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(x, y + length);
                            ctx.stroke();
                        }

                        // Add reality rifts
                        const riftCount = 5;
                        for (let i = 0; i < riftCount; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const size = Math.random() * 200 + 100;

                            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
                            gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
                            gradient.addColorStop(0.2, digitalPurple);
                            gradient.addColorStop(1, "transparent");

                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(x, y, size, 0, Math.PI * 2);
                            ctx.fill();
                        }
                        break;
                    case 3:
                        // Color palette (all in green spectrum)
                        darkGreen = "#001a00";
                        mediumGreen = "#006400";
                        lightGreen = "#00ff00";
                        neonGreen = "#39ff14";

                        // Base background
                        ctx.fillStyle = darkGreen;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Create digital foliage
                        function drawBranch(x, y, length, angle, depth) {
                            if (depth > 8) return;

                            const endX = x + length * Math.cos(angle);
                            const endY = y + length * Math.sin(angle);

                            ctx.strokeStyle = `rgba(0, ${100 + depth * 20}, 0, ${0.7 - depth * 0.05})`;
                            ctx.lineWidth = 10 - depth;
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(endX, endY);
                            ctx.stroke();

                            if (depth < 3 || Math.random() < 0.6) {
                                drawBranch(endX, endY, length * 0.8, angle - Math.PI / 6, depth + 1);
                                drawBranch(endX, endY, length * 0.8, angle + Math.PI / 6, depth + 1);
                            }
                        }

                        for (let i = 0; i < 5; i++) {
                            drawBranch(Math.random() * backgroundCanvas.width, backgroundCanvas.height, Math.random() * 100 + 50, -Math.PI / 2 + ((Math.random() - 0.5) * Math.PI) / 4, 0);
                        }

                        // Add digital particles
                        const particleCount = 1000;
                        for (let i = 0; i < particleCount; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const size = Math.random() * 3 + 1;

                            ctx.fillStyle = `rgba(0, ${Math.random() * 255}, 0, ${Math.random() * 0.5 + 0.1})`;
                            ctx.beginPath();
                            ctx.arc(x, y, size, 0, Math.PI * 2);
                            ctx.fill();
                        }

                        // Create data streams
                        streamCount = 60;
                        for (let i = 0; i < streamCount; i++) {
                            let x = Math.random() * backgroundCanvas.width;
                            let y = 0;
                            const speed = Math.random() * 2 + 1;
                            const width = Math.random() * 2 + 1;

                            ctx.strokeStyle = neonGreen;
                            ctx.lineWidth = width;
                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            while (y < backgroundCanvas.height) {
                                x += (Math.random() - 0.5) * 20;
                                y += speed;
                                ctx.lineTo(x, y);
                            }
                            ctx.stroke();
                        }

                        // Add digital nodes
                        const nodeCount = 50;
                        for (let i = 0; i < nodeCount; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const size = Math.random() * 10 + 5;

                            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
                            gradient.addColorStop(0, lightGreen);
                            gradient.addColorStop(1, "transparent");

                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(x, y, size, 0, Math.PI * 2);
                            ctx.fill();
                        }

                        // Create hexagonal grid overlay
                        ctx.strokeStyle = `rgba(0, 255, 0, 0.1)`;
                        ctx.lineWidth = 1;
                        const hexSize = 50;
                        const sqrt3 = Math.sqrt(3);

                        for (let x = 0; x < backgroundCanvas.width + hexSize * 2; x += hexSize * 3) {
                            for (let y = 0; y < backgroundCanvas.height + hexSize * 2; y += hexSize * sqrt3) {
                                drawHexagon(x, y);
                                drawHexagon(x + hexSize * 1.5, y + (hexSize * sqrt3) / 2);
                            }
                        }

                        function drawHexagon(x, y) {
                            ctx.beginPath();
                            for (let i = 0; i < 6; i++) {
                                const angle = (i * Math.PI) / 3;
                                const hx = x + hexSize * Math.cos(angle);
                                const hy = y + hexSize * Math.sin(angle);
                                if (i === 0) ctx.moveTo(hx, hy);
                                else ctx.lineTo(hx, hy);
                            }
                            ctx.closePath();
                            ctx.stroke();
                        }
                        break;
                    case 4:
                        // Color palette
                        darkGreen = "#003300";
                        codeGreen = "#39ff14";

                        // Base background
                        ctx.fillStyle = blackGreen;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Create digital rain
                        function drawRain() {
                            ctx.font = "14px monospace";
                            ctx.fillStyle = matrixGreen;

                            for (let i = 0; i < backgroundCanvas.width; i += 20) {
                                let j = 0;
                                while (j < backgroundCanvas.height) {
                                    ctx.fillText(String.fromCharCode(33 + Math.random() * 94), i, j);
                                    j += 20 * Math.random() + 10;
                                }
                            }
                        }

                        // Create dream bubbles
                        function drawBubble(x, y, radius) {
                            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                            gradient.addColorStop(0, "rgba(0, 255, 0, 0.1)");
                            gradient.addColorStop(1, "rgba(0, 255, 0, 0)");

                            ctx.beginPath();
                            ctx.arc(x, y, radius, 0, Math.PI * 2);
                            ctx.fillStyle = gradient;
                            ctx.fill();
                        }

                        // Create neural network
                        function drawNetwork() {
                            const nodes = [];
                            for (let i = 0; i < 20; i++) {
                                nodes.push({
                                    x: Math.random() * backgroundCanvas.width,
                                    y: Math.random() * backgroundCanvas.height,
                                });
                            }

                            ctx.strokeStyle = codeGreen;
                            ctx.lineWidth = 0.5;

                            for (let i = 0; i < nodes.length; i++) {
                                for (let j = i + 1; j < nodes.length; j++) {
                                    ctx.beginPath();
                                    ctx.moveTo(nodes[i].x, nodes[i].y);
                                    ctx.lineTo(nodes[j].x, nodes[j].y);
                                    ctx.stroke();
                                }
                            }

                            nodes.forEach((node) => {
                                ctx.fillStyle = matrixGreen;
                                ctx.beginPath();
                                ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
                                ctx.fill();
                            });
                        }

                        // Create glitch effect
                        function drawGlitch() {
                            for (let i = 0; i < 10; i++) {
                                const x = Math.random() * backgroundCanvas.width;
                                const y = Math.random() * backgroundCanvas.height;
                                const width = Math.random() * 100 + 50;
                                const height = Math.random() * 50 + 25;

                                ctx.fillStyle = `rgba(0, ${Math.random() * 255}, 0, 0.1)`;
                                ctx.fillRect(x, y, width, height);
                            }
                        }

                        // Render scene
                        drawRain();
                        drawNetwork();

                        for (let i = 0; i < 50; i++) {
                            drawBubble(Math.random() * backgroundCanvas.width, Math.random() * backgroundCanvas.height, Math.random() * 100 + 50);
                        }

                        drawGlitch();

                        // Add subtle pulsing effect
                        ctx.fillStyle = "rgba(0, 255, 0, 0.05)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        break;
                    case 5:
                        // Sinister color palette
                        const bloodRed = "#8B0000";
                        const voidBlack = "#000000";
                        const sicklyGreen = "#1A4D1A";
                        const corruptedCode = "#3D0C02";

                        // Base background
                        ctx.fillStyle = voidBlack;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Create corrupted code rain
                        function drawCorruptedRain() {
                            ctx.font = "16px monospace";
                            ctx.fillStyle = corruptedCode;

                            for (let i = 0; i < backgroundCanvas.width; i += 20) {
                                let j = 0;
                                while (j < backgroundCanvas.height) {
                                    if (Math.random() < 0.1) {
                                        ctx.fillStyle = bloodRed;
                                    } else {
                                        ctx.fillStyle = corruptedCode;
                                    }
                                    ctx.fillText(String.fromCharCode(33 + Math.random() * 94), i, j);
                                    j += 20 * Math.random() + 10;
                                }
                            }
                        }

                        // Create ominous tendrils
                        function drawTendrils() {
                            ctx.strokeStyle = sicklyGreen;
                            ctx.lineWidth = 1;

                            for (let i = 0; i < 50; i++) {
                                let x = Math.random() * backgroundCanvas.width;
                                let y = 0;
                                ctx.beginPath();
                                ctx.moveTo(x, y);

                                while (y < backgroundCanvas.height) {
                                    x += Math.sin(y * 0.01) * 5;
                                    y += 2;
                                    ctx.lineTo(x, y);
                                }
                                ctx.stroke();
                            }
                        }

                        // Create glitch effect
                        function drawGlitchEffect() {
                            for (let i = 0; i < 20; i++) {
                                const x = Math.random() * backgroundCanvas.width;
                                const y = Math.random() * backgroundCanvas.height;
                                const width = Math.random() * 100 + 50;
                                const height = Math.random() * 50 + 25;

                                ctx.fillStyle = `rgba(139, 0, 0, 0.2)`;
                                ctx.fillRect(x, y, width, height);
                            }
                        }

                        // Render scene
                        drawCorruptedRain();
                        drawTendrils();

                        drawGlitchEffect();

                        // Add pulsing effect
                        ctx.fillStyle = "rgba(139, 0, 0, 0.05)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
                        break;
                    case 6:
                        // Color palette
                        darkGreen = "#003300";
                        //const blackGreen = "#001a00";

                        // Base background
                        ctx.fillStyle = blackGreen;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Function to draw the relaxed matrix code rain
                        function drawRelaxedMatrixRain() {
                            ctx.font = "12px monospace";
                            const chars = "01"; // Binary
                            const hex = "0123456789ABCDEF";
                            const dataTypes = [chars, hex, "0123456789", "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
                            ctx.fillStyle = matrixGreen;

                            for (let i = 0; i < backgroundCanvas.width; i += 15) {
                                let j = 0;
                                while (j < backgroundCanvas.height) {
                                    const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
                                    const char = dataType[Math.floor(Math.random() * dataType.length)];
                                    const alpha = Math.random() * 0.9; // Less intense
                                    ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
                                    ctx.fillText(char, i + Math.random() * 5 - 2.5, j + Math.random() * 5 - 2.5); // Small random offset
                                    j += 15;
                                }
                            }
                        }

                        // Function to create floating data clusters (bits, bytes, etc.)
                        function drawDataClusters() {
                            const clusterCount = 50;
                            for (let i = 0; i < clusterCount; i++) {
                                const x = Math.random() * backgroundCanvas.width;
                                const y = Math.random() * backgroundCanvas.height;
                                const size = Math.random() * 20 + 10;
                                const type = Math.floor(Math.random() * 3); // 0: bit, 1: byte, 2: hex

                                let data = "";
                                let len = 0;

                                if (type === 0) {
                                    // Bit
                                    len = 1;
                                    data = Math.round(Math.random()).toString();
                                } else if (type === 1) {
                                    // Byte
                                    len = 8;
                                    for (let k = 0; k < len; k++) {
                                        data += Math.round(Math.random()).toString();
                                    }
                                } else {
                                    // Hex
                                    len = 2;
                                    for (let k = 0; k < len; k++) {
                                        data += "0123456789ABCDEF"[Math.floor(Math.random() * 16)];
                                    }
                                }
                                ctx.font = `${size}px monospace`;
                                ctx.fillStyle = matrixGreen;
                                ctx.globalAlpha = 0.6;
                                ctx.fillText(data, x, y);
                                ctx.globalAlpha = 1;
                            }
                        }

                        // Draw the code rain and data clusters
                        drawRelaxedMatrixRain();
                        drawDataClusters();

                        break;
                    case 7:
                        // Color palette (Matrix Green scale)
                        const baseColor = "#001A00"; // Deep, dark green
                        const highlightColor1 = "#004D00"; // Slightly lighter
                        const highlightColor2 = "#008000"; // Medium, classic green
                        const bloomColor = "#00FF00"; // Brightest, almost neon green

                        // Base background
                        ctx.fillStyle = baseColor;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Function to draw vertical bands
                        function drawVerticalBands() {
                            const bandWidth = 15; // Width of each band
                            const offset = 20; // controls vertical bands spacing

                            for (let x = 0; x < backgroundCanvas.width; x += bandWidth) {
                                const intensity = Math.random() * 0.5 + 0.5; // Random intensity for variation

                                // Draw the band
                                ctx.fillStyle = baseColor; // background level
                                ctx.fillRect(x, 0, bandWidth, backgroundCanvas.height);

                                ctx.fillStyle = highlightColor1;
                                ctx.fillRect(x, 0, bandWidth, backgroundCanvas.height * intensity * 0.2);

                                ctx.fillStyle = highlightColor2; // stronger highlight
                                ctx.fillRect(x, backgroundCanvas.height * (0.8 * intensity), bandWidth, backgroundCanvas.height);
                            }
                        }

                        // Function to draw glowing dots
                        function drawGlowingDots() {
                            const dotSize = 2; // Size of each dot
                            const dotCount = 200; // Number of dots
                            const bloomRadius = 5; // Size of bloom around dots - INCREASED

                            for (let i = 0; i < dotCount; i++) {
                                const x = Math.random() * backgroundCanvas.width;
                                const y = Math.random() * backgroundCanvas.height;

                                // Draw bloom
                                ctx.fillStyle = `rgba(0, 255, 0, 0.2)`; //Added transparency
                                ctx.beginPath();
                                ctx.arc(x, y, dotSize + bloomRadius, 0, 2 * Math.PI);
                                ctx.fill();

                                // Draw core dot
                                ctx.fillStyle = bloomColor;
                                ctx.beginPath();
                                ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
                                ctx.fill();
                            }
                        }

                        // Function to draw vertical lines
                        function drawVerticalLines() {
                            const lineCount = 100; // Number of lines
                            const lineHeight = 20; // Length of the lines
                            const lineWidth = 1;

                            for (let i = 0; i < lineCount; i++) {
                                const x = Math.random() * backgroundCanvas.width;
                                const startY = Math.random() * backgroundCanvas.height;
                                ctx.strokeStyle = highlightColor2;
                                ctx.lineWidth = lineWidth;
                                ctx.beginPath();
                                ctx.moveTo(x, startY);
                                ctx.lineTo(x, startY + lineHeight);
                                ctx.stroke();
                            }
                        }

                        // Function to draw distorted blocks
                        function drawDistortedBlocks() {
                            const blockCount = 20;
                            const blockSize = 100;

                            for (let i = 0; i < blockCount; i++) {
                                const x = Math.random() * backgroundCanvas.width - blockSize / 2;
                                const y = Math.random() * backgroundCanvas.height - blockSize / 2;

                                ctx.fillStyle = highlightColor1;
                                ctx.shadowBlur = 50;
                                ctx.shadowColor = highlightColor2;
                                ctx.fillRect(x, y, blockSize, blockSize);

                                ctx.fillStyle = highlightColor2;
                                ctx.fillRect(x + blockSize / 4, y + blockSize / 4, blockSize / 2, blockSize / 2);
                            }
                        }

                        // Call the drawing functions
                        drawVerticalBands();
                        drawGlowingDots();
                        drawVerticalLines();
                        drawDistortedBlocks();
                        break;
                    case 8:
                        // Matrix color palette
                        codeGreen = "#008800";
                        bloomGreen = "rgba(33, 53, 33, 0.1)"; // Slightly transparent

                        // Base background
                        ctx.fillStyle = baseGreen;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Function to create distorted, organic-looking shapes
                        function drawAbstractShapes() {
                            const shapeCount = 40; // number of main structures
                            const maxSegments = 20; // smoothness of structure contour
                            const maxDisplacement = 30; // contour noise

                            for (let i = 0; i < shapeCount; i++) {
                                ctx.fillStyle = codeGreen;
                                ctx.strokeStyle = bloomGreen;
                                ctx.shadowBlur = 50;
                                ctx.shadowColor = highlightGreen;
                                ctx.lineWidth = 1; // Outline strength

                                const centerX = Math.random() * backgroundCanvas.width;
                                const centerY = Math.random() * backgroundCanvas.height;
                                const baseRadius = Math.random() * 80 + 20; // base shape size

                                ctx.beginPath();
                                // Start point
                                let angle = 0; // Start at 0 radians
                                let radius = baseRadius + Math.random() * maxDisplacement - maxDisplacement / 2;

                                ctx.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));

                                // Segment creation
                                let segmentAngle = (Math.PI * 2) / maxSegments;
                                for (let j = 1; j <= maxSegments; j++) {
                                    angle = j * segmentAngle;
                                    radius = baseRadius + Math.random() * maxDisplacement - maxDisplacement / 2;

                                    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
                                }

                                // Fill and outline
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();
                            }
                        }

                        // Function to create falling code streams
                        function drawFallingCode() {
                            streamCount = 80; // Number of stream structures
                            const streamHeight = 200; // maximum length of code
                            const segmentSize = 5; // height of numbers
                            const glyphSize = 20; // width stream occupies
                            const glyphSpace = 2; // Space between glyphs
                            const streamDensity = 0.6; // Number of numbers within stream

                            // Data set to select from
                            const charset = "0123456789";

                            for (let i = 0; i < streamCount; i++) {
                                // Stream dimensions
                                const startX = Math.random() * backgroundCanvas.width;
                                const startY = Math.random() * backgroundCanvas.height - streamHeight;

                                ctx.fillStyle = highlightGreen;
                                ctx.font = `${segmentSize}px monospace`;

                                // Stream structure
                                for (let j = 0; j < streamHeight; j += segmentSize + glyphSpace) {
                                    // Code segment
                                    if (Math.random() < streamDensity) {
                                        ctx.fillText(charset[Math.floor(Math.random() * charset.length)], startX, startY + j);
                                    }
                                }
                            }
                        }

                        // Call the drawing functions
                        drawAbstractShapes();
                        drawFallingCode();
                        break;
                    case 9:
                        // Matrix color palette
                        codeGreen = "#008800";
                        bloomGreen = "rgba(0, 255, 0, 0.1)"; // Slightly transparent

                        // Base background
                        ctx.fillStyle = baseGreen;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Function to create distorted, organic-looking shapes
                        function drawNewAbstractShapes() {
                            const shapeCount = 5; // Reduced shape count
                            const maxSegments = 20; // smoothness of structure contour
                            const maxDisplacement = 30; // contour noise

                            for (let i = 0; i < shapeCount; i++) {
                                ctx.fillStyle = codeGreen;
                                ctx.strokeStyle = bloomGreen;
                                ctx.shadowBlur = 5; //Reduced shadowBlur
                                ctx.shadowColor = highlightGreen;
                                ctx.lineWidth = 1; // Outline strength

                                const centerX = Math.random() * backgroundCanvas.width;
                                const centerY = Math.random() * backgroundCanvas.height;
                                const baseRadius = Math.random() * 100 + 50; //Adjusted size

                                ctx.beginPath();
                                // Start point
                                let angle = 0; // Start at 0 radians
                                let radius = baseRadius * 0.9 + Math.random() * maxDisplacement - maxDisplacement / 2;

                                ctx.moveTo(centerX + radius * Math.cos(angle), centerY * radius + radius * Math.sin(angle));

                                // Segment creation
                                let segmentAngle = (Math.PI * 2) / maxSegments;
                                for (let j = 1; j <= maxSegments; j++) {
                                    angle = j * segmentAngle;
                                    radius = baseRadius + Math.random() * maxDisplacement - maxDisplacement / 2;

                                    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
                                }

                                // Fill and outline
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();
                            }
                        }

                        // Function to create falling code streams
                        function drawNewFallingCode() {
                            streamCount = 100; // Increased
                            const streamHeight = backgroundCanvas.height; //Adjusted
                            const segmentSize = 16; //Adjusted
                            const glyphSize = 20; // width stream occupies
                            const glyphSpace = 5; // Space between glyphs - Adjusted for space
                            const streamDensity = 0.8; // Number of numbers within stream - Adjusted

                            // Data set to select from
                            const charset = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                            for (let i = 0; i < streamCount; i++) {
                                // Stream dimensions
                                const startX = Math.random() * backgroundCanvas.width;
                                const startY = Math.random() * backgroundCanvas.height - streamHeight;

                                ctx.fillStyle = highlightGreen;
                                ctx.font = `${segmentSize}px monospace`;
                                ctx.shadowBlur = 2; //Reduced shadowBlur
                                ctx.shadowColor = highlightGreen;

                                // Stream structure
                                for (let j = 0; j < streamHeight; j += segmentSize + glyphSpace) {
                                    // Code segment
                                    if (Math.random() < streamDensity) {
                                        ctx.fillText(charset[Math.floor(Math.random() * charset.length)], startX, startY + j);
                                    }
                                }
                                ctx.shadowBlur = null;
                                ctx.shadowColor = null;
                            }
                        }

                        // Call the drawing functions
                        drawNewAbstractShapes();
                        drawNewFallingCode();
                        break;
                    default:
                        break;
                }
                break;
            /////////////////////////////////////////////////////////////////////////////
            case 3:
                switch (subLevel) {
                    case 0:
                        // Pastel gradient sky (no hills)
                        grad = ctx.createLinearGradient(0, 0, 0, backgroundCanvas.height);
                        grad.addColorStop(0, "#ffe7fa");
                        grad.addColorStop(0.5, "#b7eaff");
                        grad.addColorStop(1, "#e6ffe7");
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Egg colors and patterns
                        eggColors = ["#f9b6e4", "#b6f9e9", "#f9e3b6", "#b6c7f9"];
                        var eggPatterns = [
                            function (x, y, rx, ry) {
                                // zigzag
                                ctx.save();
                                ctx.translate(x, y);
                                ctx.beginPath();
                                ctx.ellipse(0, 0, rx, ry, 0, 0, 2 * Math.PI);
                                ctx.clip();
                                ctx.strokeStyle = "#ff6f91";
                                ctx.lineWidth = 3;
                                for (var i = -ry + 10; i < ry; i += 20) {
                                    ctx.beginPath();
                                    for (var j = -rx; j < rx; j += 20) {
                                        ctx.lineTo(j, i + ((j / 20) % 2 == 0 ? 8 : -8));
                                    }
                                    ctx.stroke();
                                }
                                ctx.restore();
                            },
                            function (x, y, rx, ry) {
                                // dots
                                ctx.save();
                                ctx.translate(x, y);
                                ctx.beginPath();
                                ctx.ellipse(0, 0, rx, ry, 0, 0, 2 * Math.PI);
                                ctx.clip();
                                for (var i = -ry + 10; i < ry; i += 20) {
                                    for (var j = -rx + 10; j < rx; j += 20) {
                                        ctx.beginPath();
                                        ctx.arc(j, i, 5, 0, 2 * Math.PI);
                                        ctx.fillStyle = "#fff";
                                        ctx.fill();
                                    }
                                }
                                ctx.restore();
                            },
                            function (x, y, rx, ry) {
                                // stripes
                                ctx.save();
                                ctx.translate(x, y);
                                ctx.beginPath();
                                ctx.ellipse(0, 0, rx, ry, 0, 0, 2 * Math.PI);
                                ctx.clip();
                                for (var i = -ry + 10; i < ry; i += 15) {
                                    ctx.beginPath();
                                    ctx.moveTo(-rx, i);
                                    ctx.lineTo(rx, i);
                                    ctx.strokeStyle = "#a3c9f9";
                                    ctx.lineWidth = 7;
                                    ctx.stroke();
                                }
                                ctx.restore();
                            },
                            function (x, y, rx, ry) {
                                // wavy
                                ctx.save();
                                ctx.translate(x, y);
                                ctx.beginPath();
                                ctx.ellipse(0, 0, rx, ry, 0, 0, 2 * Math.PI);
                                ctx.clip();
                                ctx.strokeStyle = "#ffb86f";
                                ctx.lineWidth = 4;
                                for (var i = -ry + 20; i < ry; i += 30) {
                                    ctx.beginPath();
                                    for (var j = -rx; j < rx; j += 10) {
                                        ctx.lineTo(j, i + 10 * Math.sin(j / 15));
                                    }
                                    ctx.stroke();
                                }
                                ctx.restore();
                            },
                        ];

                        // Evenly distribute eggs using a grid
                        var eggCount = 7;
                        var eggCols = Math.ceil(Math.sqrt(eggCount));
                        var eggRows = Math.ceil(eggCount / eggCols);
                        var eggGridW = backgroundCanvas.width / eggCols;
                        var eggGridH = backgroundCanvas.height / eggRows;
                        for (var i = 0; i < eggCount; i++) {
                            var rx = 60 + (i % 3) * 20;
                            var ry = 90 + ((i + 1) % 2) * 25;
                            var col = i % eggCols;
                            var row = Math.floor(i / eggCols);
                            // Randomly position within the grid cell, keeping the whole egg on screen
                            var x = col * eggGridW + rx + Math.random() * (eggGridW - 2 * rx);
                            var y = row * eggGridH + ry + Math.random() * (eggGridH - 2 * ry);
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = eggColors[i % eggColors.length];
                            ctx.shadowColor = "#aaa";
                            ctx.shadowBlur = 15;
                            ctx.fill();
                            ctx.restore();
                            eggPatterns[i % eggPatterns.length](x, y, rx, ry);
                            // Oddly, one egg has a tiny carrot stuck in it
                            if (i == 3) {
                                ctx.save();
                                ctx.translate(x + 20, y + ry / 2);
                                ctx.rotate(-0.2);
                                ctx.fillStyle = "#ffb347";
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(10, 30);
                                ctx.lineTo(-10, 30);
                                ctx.closePath();
                                ctx.fill();
                                ctx.strokeStyle = "#7ec850";
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(0, -12);
                                ctx.moveTo(-3, -5);
                                ctx.lineTo(3, -8);
                                ctx.stroke();
                                ctx.restore();
                            }
                        }

                        // Evenly distribute carrots using a grid
                        var carrotCount = 8;
                        var carrotCols = Math.ceil(Math.sqrt(carrotCount));
                        var carrotRows = Math.ceil(carrotCount / carrotCols);
                        var carrotGridW = backgroundCanvas.width / carrotCols;
                        var carrotGridH = backgroundCanvas.height / carrotRows;
                        var carrotW = 26,
                            carrotH = 38;
                        for (var i = 0; i < carrotCount; i++) {
                            var col = i % carrotCols;
                            var row = Math.floor(i / carrotCols);
                            var cx = col * carrotGridW + carrotW / 2 + Math.random() * (carrotGridW - carrotW);
                            var cy = row * carrotGridH + carrotH / 2 + Math.random() * (carrotGridH - carrotH);
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate((Math.random() - 0.5) * 1.5);
                            ctx.fillStyle = "#ffb347";
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(13, 38);
                            ctx.lineTo(-13, 38);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = "#7ec850";
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(0, -20);
                            ctx.moveTo(-4, -10);
                            ctx.lineTo(4, -16);
                            ctx.stroke();
                            ctx.restore();
                        }

                        // Evenly distribute bunnies using a grid
                        var bunnyCount = 4;
                        var bunnyCols = 2;
                        var bunnyRows = 2;
                        var bunnyGridW = backgroundCanvas.width / bunnyCols;
                        var bunnyGridH = backgroundCanvas.height / bunnyRows;
                        var bunnyBodyW = 48,
                            bunnyBodyH = 76; // body size (ellipse rx*2, ry*2)
                        for (var i = 0; i < bunnyCount; i++) {
                            var col = i % bunnyCols;
                            var row = Math.floor(i / bunnyCols);
                            // Randomly position within the grid cell, keeping the bunny on screen
                            var bx = col * bunnyGridW + bunnyBodyW / 2 + Math.random() * (bunnyGridW - bunnyBodyW);
                            var by = row * bunnyGridH + bunnyBodyH / 2 + Math.random() * (bunnyGridH - bunnyBodyH);
                            ctx.save();
                            ctx.translate(bx, by);
                            ctx.scale(1 + 0.2 * (i % 2), 1 - 0.1 * (i % 3));
                            ctx.beginPath(); // body
                            ctx.ellipse(0, 0, 24, 38, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = "rgba(180,180,200,0.23)";
                            ctx.fill();
                            ctx.beginPath(); // head
                            ctx.ellipse(0, -35, 15, 18, 0, 0, 2 * Math.PI);
                            ctx.fill();
                            ctx.beginPath(); // left ear
                            ctx.ellipse(-7, -55, 6, 22, -0.2, 0, 2 * Math.PI);
                            ctx.fill();
                            ctx.beginPath(); // right ear
                            ctx.ellipse(7, -55, 6, 22, 0.2, 0, 2 * Math.PI);
                            ctx.fill();
                            // Odd: one bunny has three ears
                            if (i == 2) {
                                ctx.beginPath();
                                ctx.ellipse(0, -62, 5, 18, 0, 0, 2 * Math.PI);
                                ctx.fill();
                            }
                            ctx.restore();
                        }

                        // Add a few floating pastel blobs for oddness
                        for (var i = 0; i < 10; i++) {
                            ctx.save();
                            ctx.globalAlpha = 0.18;
                            ctx.beginPath();
                            ctx.arc(Math.random() * backgroundCanvas.width, Math.random() * backgroundCanvas.height * 0.7, 40 + Math.random() * 35, 0, 2 * Math.PI);
                            ctx.fillStyle = ["#f9b6e4", "#b6f9e9", "#f9e3b6", "#b6c7f9"][i % 4];
                            ctx.fill();
                            ctx.restore();
                        }
                        break;
                    case 1:
                        // --- Van Gogh Sky: swirling brushstrokes ---
                        for (var i = 0; i < 70; i++) {
                            var cx = Math.random() * backgroundCanvas.width;
                            var cy = Math.random() * backgroundCanvas.height * 0.5;
                            var r = 60 + Math.random() * 90;
                            var angle = Math.random() * Math.PI * 2;
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate(angle);
                            ctx.globalAlpha = 0.18 + Math.random() * 0.13;
                            ctx.strokeStyle = ["#6ec6f5", "#f7e05c", "#b5c6e8", "#f9f6e7", "#3b7edb"][i % 5];
                            ctx.lineWidth = 12 + Math.random() * 10;
                            ctx.beginPath();
                            ctx.arc(0, 0, r, 0, Math.PI * 2 * 0.8);
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                            ctx.restore();
                        }

                        // --- Sun, like Van Gogh's "Starry Night" ---
                        ctx.save();
                        ctx.globalAlpha = 0.9;
                        ctx.beginPath();
                        ctx.arc(backgroundCanvas.width * 0.13, backgroundCanvas.height * 0.18, 44, 0, Math.PI * 2);
                        ctx.fillStyle = "#ffe27a";
                        ctx.shadowColor = "#ffd700";
                        ctx.shadowBlur = 30;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // --- Swirling ground with impasto brushstrokes and crosshatch grass ---
                        for (var y = backgroundCanvas.height * 0.65; y < backgroundCanvas.height; y += 18) {
                            for (var x = 0; x < backgroundCanvas.width; x += 30) {
                                ctx.save();
                                ctx.strokeStyle = ["#8bc34a", "#f9e3b6", "#f7e05c", "#5cae3b", "#b3e57a"][Math.floor(Math.random() * 5)];
                                ctx.globalAlpha = 0.21 + Math.random() * 0.16;
                                ctx.lineWidth = 12 + Math.random() * 8;
                                ctx.beginPath();
                                ctx.arc(x + Math.random() * 20, y + Math.random() * 10, 22 + Math.random() * 10, Math.PI * 0.8, Math.PI * 2.2);
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                        }
                        // Crosshatch grass
                        for (var i = 0; i < 600; i++) {
                            var gx = Math.random() * backgroundCanvas.width;
                            var gy = backgroundCanvas.height * 0.7 + Math.random() * backgroundCanvas.height * 0.3;
                            ctx.save();
                            ctx.strokeStyle = ["#388e3c", "#689f38", "#aed581", "#f7e05c"][i % 4];
                            ctx.lineWidth = 2.2 + Math.random() * 1.7;
                            ctx.beginPath();
                            ctx.moveTo(gx, gy);
                            ctx.lineTo(gx + Math.random() * 12 - 6, gy - 12 - Math.random() * 8);
                            ctx.stroke();
                            ctx.restore();
                        }

                        // --- Van Gogh Easter Eggs: outlined, impasto, pointillism ---
                        eggColors = ["#f7e05c", "#f9b6e4", "#b6f9e9", "#f9e3b6", "#b6c7f9"];
                        var eggCount = 7;
                        var eggCols = Math.ceil(Math.sqrt(eggCount));
                        var eggRows = Math.ceil(eggCount / eggCols);
                        var eggGridW = backgroundCanvas.width / eggCols;
                        var eggGridH = backgroundCanvas.height / eggRows;
                        for (var i = 0; i < eggCount; i++) {
                            var rx = 38 + (i % 3) * 12;
                            var ry = 56 + ((i + 1) % 2) * 14;
                            var col = i % eggCols;
                            var row = Math.floor(i / eggCols);
                            var x = col * eggGridW + rx + Math.random() * (eggGridW - 2 * rx);
                            var y = row * eggGridH + ry + Math.random() * (eggGridH - 2 * ry) + backgroundCanvas.height * 0.13;
                            // Egg body
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = eggColors[i % eggColors.length];
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 0;
                            ctx.globalAlpha = 0.93;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.lineWidth = 5;
                            ctx.strokeStyle = "#222";
                            ctx.stroke();
                            ctx.restore();
                            // Impasto dabs and pointillism
                            for (var d = 0; d < 40; d++) {
                                var ang = Math.random() * Math.PI * 2;
                                var rad = Math.random() * 0.9;
                                var ex = x + Math.cos(ang) * rx * rad * 0.9;
                                var ey = y + Math.sin(ang) * ry * rad * 0.9;
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc(ex, ey, 3 + Math.random() * 2, 0, Math.PI * 2);
                                ctx.globalAlpha = 0.7;
                                ctx.fillStyle = eggColors[(i + d + 1) % eggColors.length];
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                            // Zigzag or wavy outline
                            ctx.save();
                            ctx.beginPath();
                            for (var a = 0; a <= Math.PI * 2 + 0.1; a += Math.PI / 20) {
                                var rrx = rx + Math.sin(a * 8) * 3;
                                var rry = ry + Math.cos(a * 6) * 2;
                                ctx.lineTo(x + Math.cos(a) * rrx, y + Math.sin(a) * rry);
                            }
                            ctx.lineWidth = 2.5;
                            ctx.strokeStyle = "#444";
                            ctx.globalAlpha = 0.7;
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                            ctx.restore();
                            // Odd: one egg has a carrot stuck in it
                            if (i == 3) {
                                ctx.save();
                                ctx.translate(x + 18, y + ry / 2);
                                ctx.rotate(-0.2);
                                ctx.fillStyle = "#ffb347";
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(8, 20);
                                ctx.lineTo(-8, 20);
                                ctx.closePath();
                                ctx.fill();
                                ctx.strokeStyle = "#7ec850";
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(0, -8);
                                ctx.moveTo(-2, -3);
                                ctx.lineTo(2, -6);
                                ctx.stroke();
                                ctx.restore();
                            }
                        }

                        // --- Van Gogh Carrots: outlined, impasto ---
                        var carrotCount = 8;
                        var carrotCols = Math.ceil(Math.sqrt(carrotCount));
                        var carrotRows = Math.ceil(carrotCount / carrotCols);
                        var carrotGridW = backgroundCanvas.width / carrotCols;
                        var carrotGridH = backgroundCanvas.height / carrotRows;
                        for (var i = 0; i < carrotCount; i++) {
                            var col = i % carrotCols;
                            var row = Math.floor(i / carrotCols);
                            var cx = col * carrotGridW + 20 + Math.random() * (carrotGridW - 40);
                            var cy = row * carrotGridH + 30 + Math.random() * (carrotGridH - 60) + backgroundCanvas.height * 0.09;
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate((Math.random() - 0.5) * 1.5);
                            // Body
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(11, 32);
                            ctx.lineTo(-11, 32);
                            ctx.closePath();
                            ctx.fillStyle = "#ffb347";
                            ctx.globalAlpha = 0.95;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.lineWidth = 3;
                            ctx.strokeStyle = "#964b00";
                            ctx.stroke();
                            // Impasto dabs
                            for (var d = 0; d < 8; d++) {
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc((Math.random() - 0.5) * 12, 10 + d * 2 + Math.random() * 6, 2 + Math.random() * 1.5, 0, Math.PI * 2);
                                ctx.globalAlpha = 0.6;
                                ctx.fillStyle = "#ffd180";
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                            // Leaves
                            for (var l = 0; l < 3; l++) {
                                ctx.save();
                                ctx.rotate((l - 1) * 0.3 + Math.random() * 0.2);
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(-4 + l * 4, -12 - Math.random() * 10);
                                ctx.lineTo(0, -8 - Math.random() * 8);
                                ctx.closePath();
                                ctx.globalAlpha = 0.7;
                                ctx.fillStyle = "#7ec850";
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.lineWidth = 2;
                                ctx.strokeStyle = "#417c18";
                                ctx.stroke();
                                ctx.restore();
                            }
                            ctx.restore();
                        }

                        // --- Van Gogh Bunnies: outlined, expressive, impasto ---
                        var bunnyCount = 4;
                        var bunnyCols = 2;
                        var bunnyRows = 2;
                        var bunnyGridW = backgroundCanvas.width / bunnyCols;
                        var bunnyGridH = backgroundCanvas.height / bunnyRows;
                        for (var i = 0; i < bunnyCount; i++) {
                            var col = i % bunnyCols;
                            var row = Math.floor(i / bunnyCols);
                            var bx = col * bunnyGridW + 50 + Math.random() * (bunnyGridW - 100);
                            var by = row * bunnyGridH + 80 + Math.random() * (bunnyGridH - 160) + backgroundCanvas.height * 0.12;
                            ctx.save();
                            ctx.translate(bx, by);
                            ctx.scale(1 + 0.2 * (i % 2), 1 - 0.1 * (i % 3));
                            // Body
                            ctx.beginPath();
                            ctx.ellipse(0, 0, 24, 38, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = "#e3e7f9";
                            ctx.globalAlpha = 0.82;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.lineWidth = 4;
                            ctx.strokeStyle = "#222";
                            ctx.stroke();
                            // Head
                            ctx.beginPath();
                            ctx.ellipse(0, -32, 15, 18, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = "#f9e3b6";
                            ctx.globalAlpha = 0.85;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.lineWidth = 3;
                            ctx.strokeStyle = "#222";
                            ctx.stroke();
                            // Ears
                            ctx.beginPath();
                            ctx.ellipse(-7, -55, 6, 22, -0.2, 0, 2 * Math.PI);
                            ctx.ellipse(7, -55, 6, 22, 0.2, 0, 2 * Math.PI);
                            if (i == 2) ctx.ellipse(0, -62, 5, 18, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = "#f7e05c";
                            ctx.globalAlpha = 0.8;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = "#222";
                            ctx.stroke();
                            // Impasto dabs
                            for (var d = 0; d < 8; d++) {
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50, 2 + Math.random() * 1.5, 0, Math.PI * 2);
                                ctx.globalAlpha = 0.3;
                                ctx.fillStyle = "#fff";
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                            ctx.restore();
                        }

                        // --- Floating impasto blobs for texture and movement ---
                        for (var i = 0; i < 14; i++) {
                            ctx.save();
                            ctx.globalAlpha = 0.19 + Math.random() * 0.13;
                            ctx.beginPath();
                            var cx = Math.random() * backgroundCanvas.width;
                            var cy = Math.random() * backgroundCanvas.height * 0.7;
                            ctx.arc(cx, cy, 30 + Math.random() * 40, 0, 2 * Math.PI);
                            ctx.fillStyle = ["#f9b6e4", "#b6f9e9", "#f9e3b6", "#b6c7f9", "#f7e05c"][i % 5];
                            ctx.fill();
                            ctx.restore();
                        }
                        break;
                    case 2:
                        // --- Cubist pastel color palette ---
                        var palette = ["#f9b6e4", "#b6f9e9", "#f9e3b6", "#b6c7f9", "#fceabb", "#d1ffd6", "#b7eaff", "#ffe7fa", "#ffb347", "#7ec850", "#8ecae6", "#f6bd60"];

                        // --- Cubist background: many intersecting polygons ---
                        for (var i = 0; i < 40; i++) {
                            var points = [];
                            var cx = Math.random() * backgroundCanvas.width;
                            var cy = Math.random() * backgroundCanvas.height;
                            var sides = 3 + Math.floor(Math.random() * 3); // triangles to pentagons
                            var radius = 80 + Math.random() * 200;
                            var angleOffset = Math.random() * Math.PI * 2;
                            for (var j = 0; j < sides; j++) {
                                var angle = angleOffset + (j * Math.PI * 2) / sides + Math.random() * 0.2;
                                var r = radius * (0.7 + Math.random() * 0.5);
                                points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
                            }
                            ctx.beginPath();
                            ctx.moveTo(points[0][0], points[0][1]);
                            for (var j = 1; j < points.length; j++) {
                                ctx.lineTo(points[j][0], points[j][1]);
                            }
                            ctx.closePath();
                            ctx.globalAlpha = 0.28 + Math.random() * 0.15;
                            ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
                            ctx.fill();
                            ctx.globalAlpha = 1;
                        }

                        // --- Cubist Eggs: angular polygons ---
                        var eggCount = 7;
                        var eggCols = Math.ceil(Math.sqrt(eggCount));
                        var eggRows = Math.ceil(eggCount / eggCols);
                        var eggGridW = backgroundCanvas.width / eggCols;
                        var eggGridH = backgroundCanvas.height / eggRows;
                        for (var i = 0; i < eggCount; i++) {
                            var col = i % eggCols;
                            var row = Math.floor(i / eggCols);
                            var ex = col * eggGridW + 80 + Math.random() * (eggGridW - 160);
                            var ey = row * eggGridH + 120 + Math.random() * (eggGridH - 200);

                            // Egg as a faceted polygon (like a gem)
                            var eggFacets = 8 + Math.floor(Math.random() * 3);
                            var eggR = 60 + Math.random() * 30;
                            var eggPoints = [];
                            for (var j = 0; j < eggFacets; j++) {
                                var angle = (Math.PI * 2 * j) / eggFacets - Math.PI / 2;
                                // Make bottom more round, top more pointy
                                var r = eggR * (j < eggFacets / 2 ? 1.1 + Math.random() * 0.2 : 0.7 + Math.random() * 0.2);
                                var px = ex + Math.cos(angle) * r * (0.9 + Math.random() * 0.2);
                                var py = ey + Math.sin(angle) * r * (1.15 + Math.random() * 0.3);
                                eggPoints.push([px, py]);
                            }
                            ctx.save();
                            ctx.beginPath();
                            ctx.moveTo(eggPoints[0][0], eggPoints[0][1]);
                            for (var j = 1; j < eggPoints.length; j++) ctx.lineTo(eggPoints[j][0], eggPoints[j][1]);
                            ctx.closePath();
                            ctx.shadowColor = "#bbb";
                            ctx.shadowBlur = 12;
                            ctx.fillStyle = palette[(i * 2) % palette.length];
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.restore();

                            // Add cubist decorations: lines and triangles
                            for (var d = 0; d < 4; d++) {
                                ctx.save();
                                ctx.beginPath();
                                var idx1 = Math.floor(Math.random() * eggPoints.length);
                                var idx2 = (idx1 + Math.floor(1 + (Math.random() * eggPoints.length) / 2)) % eggPoints.length;
                                ctx.moveTo(eggPoints[idx1][0], eggPoints[idx1][1]);
                                ctx.lineTo(eggPoints[idx2][0], eggPoints[idx2][1]);
                                ctx.strokeStyle = palette[(i + d + 5) % palette.length];
                                ctx.lineWidth = 3 + Math.random() * 2;
                                ctx.globalAlpha = 0.6;
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                            for (var d = 0; d < 2; d++) {
                                ctx.save();
                                ctx.beginPath();
                                var idx1 = Math.floor(Math.random() * eggPoints.length);
                                var idx2 = (idx1 + 1) % eggPoints.length;
                                var idx3 = (idx1 + 3) % eggPoints.length;
                                ctx.moveTo(eggPoints[idx1][0], eggPoints[idx1][1]);
                                ctx.lineTo(eggPoints[idx2][0], eggPoints[idx2][1]);
                                ctx.lineTo(eggPoints[idx3][0], eggPoints[idx3][1]);
                                ctx.closePath();
                                ctx.globalAlpha = 0.25;
                                ctx.fillStyle = palette[(i + d + 8) % palette.length];
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }

                            // Odd: one egg has a cubist carrot stuck in it
                            if (i == 3) {
                                var cx = ex + 30,
                                    cy = ey + 60;
                                ctx.save();
                                ctx.translate(cx, cy);
                                ctx.rotate(-0.3);
                                // Carrot body (polygon)
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(18, 50);
                                ctx.lineTo(-18, 50);
                                ctx.closePath();
                                ctx.fillStyle = "#ffb347";
                                ctx.globalAlpha = 0.9;
                                ctx.fill();
                                // Carrot top (cubist leaves)
                                for (var l = 0; l < 3; l++) {
                                    ctx.beginPath();
                                    ctx.moveTo(0, 0);
                                    ctx.lineTo(-6 + l * 6, -15 - Math.random() * 10);
                                    ctx.lineTo(0, -10 - Math.random() * 15);
                                    ctx.closePath();
                                    ctx.fillStyle = "#7ec850";
                                    ctx.globalAlpha = 0.8;
                                    ctx.fill();
                                }
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                        }

                        // --- Cubist Carrots: triangles and polygons ---
                        var carrotCount = 8;
                        var carrotCols = Math.ceil(Math.sqrt(carrotCount));
                        var carrotRows = Math.ceil(carrotCount / carrotCols);
                        var carrotGridW = backgroundCanvas.width / carrotCols;
                        var carrotGridH = backgroundCanvas.height / carrotRows;
                        for (var i = 0; i < carrotCount; i++) {
                            var col = i % carrotCols;
                            var row = Math.floor(i / carrotCols);
                            var cx = col * carrotGridW + 30 + Math.random() * (carrotGridW - 60);
                            var cy = row * carrotGridH + 40 + Math.random() * (carrotGridH - 80);
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate((Math.random() - 0.5) * 1.5);
                            // Carrot body as angular polygon
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(15 + Math.random() * 5, 55 + Math.random() * 10);
                            ctx.lineTo(-15 - Math.random() * 5, 55 + Math.random() * 10);
                            ctx.closePath();
                            ctx.fillStyle = "#ffb347";
                            ctx.globalAlpha = 0.95;
                            ctx.fill();
                            // Carrot top as cubist leaves (triangles)
                            for (var l = 0; l < 3; l++) {
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(-5 + l * 5, -18 - Math.random() * 12);
                                ctx.lineTo(0, -12 - Math.random() * 18);
                                ctx.closePath();
                                ctx.fillStyle = "#7ec850";
                                ctx.globalAlpha = 0.7;
                                ctx.fill();
                            }
                            ctx.globalAlpha = 1;
                            ctx.restore();
                        }

                        // --- Cubist Bunnies: geometric abstraction ---
                        var bunnyCount = 4;
                        var bunnyCols = 2;
                        var bunnyRows = 2;
                        var bunnyGridW = backgroundCanvas.width / bunnyCols;
                        var bunnyGridH = backgroundCanvas.height / bunnyRows;
                        for (var i = 0; i < bunnyCount; i++) {
                            var col = i % bunnyCols;
                            var row = Math.floor(i / bunnyCols);
                            var bx = col * bunnyGridW + 60 + Math.random() * (bunnyGridW - 120);
                            var by = row * bunnyGridH + 80 + Math.random() * (bunnyGridH - 160);
                            ctx.save();
                            ctx.translate(bx, by);
                            ctx.rotate((Math.random() - 0.5) * 0.3);

                            // Body: large polygon
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(28 + Math.random() * 12, 60 + Math.random() * 10);
                            ctx.lineTo(-28 - Math.random() * 12, 60 + Math.random() * 10);
                            ctx.lineTo(-24 - Math.random() * 8, 20 + Math.random() * 10);
                            ctx.lineTo(24 + Math.random() * 8, 20 + Math.random() * 10);
                            ctx.closePath();
                            ctx.fillStyle = "rgba(180,180,200,0.22)";
                            ctx.fill();

                            // Head: smaller polygon
                            ctx.beginPath();
                            ctx.moveTo(0, -12);
                            ctx.lineTo(18 + Math.random() * 8, -28 + Math.random() * 8);
                            ctx.lineTo(-18 - Math.random() * 8, -28 + Math.random() * 8);
                            ctx.closePath();
                            ctx.fill();

                            // Ears: tall triangles
                            ctx.beginPath();
                            ctx.moveTo(-7, -28);
                            ctx.lineTo(-14 - Math.random() * 4, -58 - Math.random() * 12);
                            ctx.lineTo(-2 - Math.random() * 4, -38 - Math.random() * 8);
                            ctx.closePath();
                            ctx.fill();
                            ctx.beginPath();
                            ctx.moveTo(7, -28);
                            ctx.lineTo(14 + Math.random() * 4, -58 - Math.random() * 12);
                            ctx.lineTo(2 + Math.random() * 4, -38 - Math.random() * 8);
                            ctx.closePath();
                            ctx.fill();
                            // Odd: one bunny has a third ear
                            if (i == 2) {
                                ctx.beginPath();
                                ctx.moveTo(0, -30);
                                ctx.lineTo(0, -65 - Math.random() * 10);
                                ctx.lineTo(6, -50 - Math.random() * 5);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Tail: small polygon
                            ctx.beginPath();
                            ctx.moveTo(-18 + Math.random() * 8, 58 + Math.random() * 8);
                            ctx.lineTo(-12 + Math.random() * 6, 68 + Math.random() * 6);
                            ctx.lineTo(-22 + Math.random() * 6, 70 + Math.random() * 6);
                            ctx.closePath();
                            ctx.globalAlpha = 0.4;
                            ctx.fillStyle = "#fff";
                            ctx.fill();
                            ctx.globalAlpha = 1;

                            ctx.restore();
                        }

                        // --- Cubist pastel blobs for oddness ---
                        for (var i = 0; i < 10; i++) {
                            ctx.save();
                            ctx.globalAlpha = 0.13 + Math.random() * 0.09;
                            ctx.beginPath();
                            var cx = Math.random() * backgroundCanvas.width;
                            var cy = Math.random() * backgroundCanvas.height;
                            ctx.moveTo(cx, cy);
                            var blobSides = 5 + Math.floor(Math.random() * 4);
                            var blobR = 40 + Math.random() * 60;
                            for (var j = 0; j < blobSides; j++) {
                                var angle = (Math.PI * 2 * j) / blobSides + Math.random() * 0.2;
                                var r = blobR * (0.7 + Math.random() * 0.6);
                                ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
                            }
                            ctx.closePath();
                            ctx.fillStyle = palette[i % palette.length];
                            ctx.fill();
                            ctx.restore();
                        }
                        break;
                    case 3:
                        // --- Picasso-inspired palette: bold, expressive, layered ---
                        var palette = [
                            "#1e3269",
                            "#f5c242",
                            "#e84a5f",
                            "#6ab187",
                            "#f9b6e4",
                            "#b6f9e9",
                            "#f9e3b6",
                            "#b6c7f9",
                            "#ffb347",
                            "#7ec850",
                            "#8ecae6",
                            "#f6bd60",
                            "#e63946",
                            "#22223b",
                            "#9a8c98",
                            "#f7fff7",
                            "#ffbe0b",
                            "#3a86ff",
                        ];

                        // --- Layered, fragmented background ---
                        for (var i = 0; i < 30; i++) {
                            var points = [];
                            var cx = Math.random() * backgroundCanvas.width;
                            var cy = Math.random() * backgroundCanvas.height;
                            var sides = 4 + Math.floor(Math.random() * 3); // quadrilaterals to hexagons
                            var radius = 140 + Math.random() * 210;
                            var angleOffset = Math.random() * Math.PI * 2;
                            for (var j = 0; j < sides; j++) {
                                var angle = angleOffset + (j * Math.PI * 2) / sides + Math.random() * 0.3;
                                var r = radius * (0.7 + Math.random() * 0.6);
                                points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
                            }
                            ctx.beginPath();
                            ctx.moveTo(points[0][0], points[0][1]);
                            for (var j = 1; j < points.length; j++) {
                                ctx.lineTo(points[j][0], points[j][1]);
                            }
                            ctx.closePath();
                            ctx.globalAlpha = 0.22 + Math.random() * 0.18;
                            ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
                            ctx.fill();
                            ctx.globalAlpha = 1;
                        }

                        // --- Picasso-style Easter eggs: angular, layered, with odd "faces" ---
                        var eggCount = 6;
                        var eggCols = 3;
                        var eggRows = 2;
                        var eggGridW = backgroundCanvas.width / eggCols;
                        var eggGridH = backgroundCanvas.height / eggRows;
                        for (var i = 0; i < eggCount; i++) {
                            var col = i % eggCols;
                            var row = Math.floor(i / eggCols);
                            var ex = col * eggGridW + 100 + Math.random() * (eggGridW - 200);
                            var ey = row * eggGridH + 120 + Math.random() * (eggGridH - 180);

                            // Egg as a layered, faceted, Picasso-esque form
                            for (var l = 0; l < 3; l++) {
                                var facets = 7 + Math.floor(Math.random() * 2);
                                var r = 60 + Math.random() * 20 - l * 10;
                                var points = [];
                                for (var j = 0; j < facets; j++) {
                                    var angle = (Math.PI * 2 * j) / facets - Math.PI / 2;
                                    var rr = r * (j < facets / 2 ? 1.2 + Math.random() * 0.2 : 0.7 + Math.random() * 0.2);
                                    var px = ex + Math.cos(angle) * rr * (0.9 + Math.random() * 0.2);
                                    var py = ey + Math.sin(angle) * rr * (1.15 + Math.random() * 0.3);
                                    points.push([px, py]);
                                }
                                ctx.save();
                                ctx.beginPath();
                                ctx.moveTo(points[0][0], points[0][1]);
                                for (var j = 1; j < points.length; j++) ctx.lineTo(points[j][0], points[j][1]);
                                ctx.closePath();
                                ctx.globalAlpha = 0.7 - l * 0.2;
                                ctx.fillStyle = palette[(i * 3 + l + 7) % palette.length];
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                            // Picasso-esque "face": mask-like, fragmented
                            ctx.save();
                            ctx.translate(ex, ey + 10);
                            ctx.rotate((Math.random() - 0.5) * 0.5);
                            // Face base
                            ctx.beginPath();
                            ctx.moveTo(-18, -12);
                            ctx.lineTo(18, -12);
                            ctx.lineTo(20, 30);
                            ctx.lineTo(-20, 30);
                            ctx.closePath();
                            ctx.globalAlpha = 0.8;
                            ctx.fillStyle = palette[(i * 4 + 2) % palette.length];
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            // Nose (triangle)
                            ctx.beginPath();
                            ctx.moveTo(0, 2);
                            ctx.lineTo(7, 18);
                            ctx.lineTo(-7, 18);
                            ctx.closePath();
                            ctx.fillStyle = palette[(i * 4 + 3) % palette.length];
                            ctx.globalAlpha = 0.6;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            // Eyes (asymmetrical)
                            ctx.beginPath();
                            ctx.arc(-7, 0, 4, 0, Math.PI * 2);
                            ctx.arc(7, 4, 5, 0, Math.PI * 2);
                            ctx.fillStyle = "#22223b";
                            ctx.globalAlpha = 0.7;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            // Mouth (fragmented line)
                            ctx.beginPath();
                            ctx.moveTo(-6, 22);
                            ctx.lineTo(0, 25);
                            ctx.lineTo(7, 21);
                            ctx.strokeStyle = "#e84a5f";
                            ctx.lineWidth = 2;
                            ctx.globalAlpha = 0.8;
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                            ctx.restore();
                        }

                        // --- Picasso-style carrots: angular, layered, with mask-like tops ---
                        var carrotCount = 7;
                        var carrotCols = 4;
                        var carrotRows = 2;
                        var carrotGridW = backgroundCanvas.width / carrotCols;
                        var carrotGridH = backgroundCanvas.height / carrotRows;
                        for (var i = 0; i < carrotCount; i++) {
                            var col = i % carrotCols;
                            var row = Math.floor(i / carrotCols);
                            var cx = col * carrotGridW + 40 + Math.random() * (carrotGridW - 80);
                            var cy = row * carrotGridH + 60 + Math.random() * (carrotGridH - 120);
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate((Math.random() - 0.5) * 1.2);
                            // Carrot body: layered polygons
                            for (var l = 0; l < 2; l++) {
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(16 + Math.random() * 5 - l * 3, 60 + Math.random() * 8 - l * 7);
                                ctx.lineTo(-16 - Math.random() * 5 + l * 3, 60 + Math.random() * 8 - l * 7);
                                ctx.closePath();
                                ctx.globalAlpha = 0.8 - l * 0.3;
                                ctx.fillStyle = palette[(i * 2 + l + 4) % palette.length];
                                ctx.fill();
                                ctx.globalAlpha = 1;
                            }
                            // Top: Picasso mask-like forms
                            for (var t = 0; t < 2; t++) {
                                ctx.save();
                                ctx.rotate((Math.random() - 0.5) * 0.6);
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(-6 + t * 12, -18 - Math.random() * 10);
                                ctx.lineTo(0, -15 - Math.random() * 15);
                                ctx.closePath();
                                ctx.globalAlpha = 0.7;
                                ctx.fillStyle = palette[(i * 3 + t + 9) % palette.length];
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                            ctx.restore();
                        }

                        // --- Picasso-style bunnies: mask-like, geometric, with multiple perspectives ---
                        var bunnyCount = 4;
                        var bunnyCols = 2;
                        var bunnyRows = 2;
                        var bunnyGridW = backgroundCanvas.width / bunnyCols;
                        var bunnyGridH = backgroundCanvas.height / bunnyRows;
                        for (var i = 0; i < bunnyCount; i++) {
                            var col = i % bunnyCols;
                            var row = Math.floor(i / bunnyCols);
                            var bx = col * bunnyGridW + 80 + Math.random() * (bunnyGridW - 160);
                            var by = row * bunnyGridH + 100 + Math.random() * (bunnyGridH - 180);
                            ctx.save();
                            ctx.translate(bx, by);
                            ctx.rotate((Math.random() - 0.5) * 0.4);

                            // Body: layered polygons
                            for (var l = 0; l < 2; l++) {
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(32 + Math.random() * 12 - l * 6, 68 + Math.random() * 10 - l * 8);
                                ctx.lineTo(-32 - Math.random() * 12 + l * 6, 68 + Math.random() * 10 - l * 8);
                                ctx.lineTo(-28 - Math.random() * 8 + l * 4, 22 + Math.random() * 10 - l * 5);
                                ctx.lineTo(28 + Math.random() * 8 - l * 4, 22 + Math.random() * 10 - l * 5);
                                ctx.closePath();
                                ctx.globalAlpha = 0.22 + l * 0.16;
                                ctx.fillStyle = palette[(i * 3 + l + 7) % palette.length];
                                ctx.fill();
                                ctx.globalAlpha = 1;
                            }

                            // Head: Picasso mask, two perspectives
                            ctx.save();
                            ctx.translate(0, -18);
                            ctx.rotate((Math.random() - 0.5) * 0.2);
                            ctx.beginPath();
                            ctx.moveTo(-18, -10);
                            ctx.lineTo(18, -10);
                            ctx.lineTo(14, 20);
                            ctx.lineTo(-14, 20);
                            ctx.closePath();
                            ctx.globalAlpha = 0.8;
                            ctx.fillStyle = palette[(i * 4 + 2) % palette.length];
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            // Two eyes, different sizes and angles
                            ctx.beginPath();
                            ctx.arc(-7, 2, 5, 0, Math.PI * 2);
                            ctx.arc(7, 6, 3, 0, Math.PI * 2);
                            ctx.fillStyle = "#22223b";
                            ctx.globalAlpha = 0.7;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            // Nose as triangle
                            ctx.beginPath();
                            ctx.moveTo(0, 8);
                            ctx.lineTo(4, 16);
                            ctx.lineTo(-4, 16);
                            ctx.closePath();
                            ctx.fillStyle = "#e84a5f";
                            ctx.globalAlpha = 0.7;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            // Mouth as jagged line
                            ctx.beginPath();
                            ctx.moveTo(-3, 18);
                            ctx.lineTo(0, 22);
                            ctx.lineTo(5, 18);
                            ctx.strokeStyle = "#22223b";
                            ctx.lineWidth = 2;
                            ctx.globalAlpha = 0.8;
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                            ctx.restore();

                            // Ears: two (or three) angular triangles, different directions
                            ctx.save();
                            ctx.translate(0, -28);
                            ctx.rotate((Math.random() - 0.5) * 0.2);
                            for (var e = 0; e < 2 + (i == 2 ? 1 : 0); e++) {
                                ctx.save();
                                ctx.rotate((e - 0.5) * 0.6 + (Math.random() - 0.5) * 0.2);
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(-6 + e * 8, -42 - Math.random() * 14);
                                ctx.lineTo(6 + e * 8, -32 - Math.random() * 10);
                                ctx.closePath();
                                ctx.globalAlpha = 0.7;
                                ctx.fillStyle = palette[(i * 2 + e + 8) % palette.length];
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                            ctx.restore();

                            // Tail: small polygon
                            ctx.beginPath();
                            ctx.moveTo(-18 + Math.random() * 8, 68 + Math.random() * 8);
                            ctx.lineTo(-12 + Math.random() * 6, 78 + Math.random() * 6);
                            ctx.lineTo(-22 + Math.random() * 6, 80 + Math.random() * 6);
                            ctx.closePath();
                            ctx.globalAlpha = 0.5;
                            ctx.fillStyle = "#f7fff7";
                            ctx.fill();
                            ctx.globalAlpha = 1;

                            ctx.restore();
                        }

                        // --- Picasso-style floating fragments for extra layering ---
                        for (var i = 0; i < 12; i++) {
                            ctx.save();
                            ctx.globalAlpha = 0.13 + Math.random() * 0.13;
                            ctx.beginPath();
                            var cx = Math.random() * backgroundCanvas.width;
                            var cy = Math.random() * backgroundCanvas.height;
                            ctx.moveTo(cx, cy);
                            var blobSides = 4 + Math.floor(Math.random() * 4);
                            var blobR = 50 + Math.random() * 80;
                            for (var j = 0; j < blobSides; j++) {
                                var angle = (Math.PI * 2 * j) / blobSides + Math.random() * 0.3;
                                var r = blobR * (0.7 + Math.random() * 0.6);
                                ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
                            }
                            ctx.closePath();
                            ctx.fillStyle = palette[i % palette.length];
                            ctx.fill();
                            ctx.restore();
                        }

                        // --- Big Picasso-style Rabbit in the Center ---
                        var cx = backgroundCanvas.width / 2;
                        var cy = backgroundCanvas.height / 2;
                        var scale = Math.min(backgroundCanvas.width, backgroundCanvas.height) / 2.2;

                        ctx.save();
                        ctx.translate(cx, cy);
                        ctx.scale(scale / 400, scale / 400);

                        // Body: Cubist, angular, layered
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(-70, 110);
                        ctx.lineTo(70, 110);
                        ctx.lineTo(90, 40);
                        ctx.lineTo(60, -60);
                        ctx.lineTo(-60, -60);
                        ctx.lineTo(-90, 40);
                        ctx.closePath();
                        ctx.fillStyle = palette[0];
                        ctx.globalAlpha = 0.7;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(-60, -60);
                        ctx.lineTo(60, -60);
                        ctx.lineTo(40, -130);
                        ctx.lineTo(-40, -130);
                        ctx.closePath();
                        ctx.fillStyle = palette[3];
                        ctx.globalAlpha = 0.6;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Head: divided, mask-like face
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(-70, -60);
                        ctx.lineTo(70, -60);
                        ctx.lineTo(60, -180);
                        ctx.lineTo(0, -220);
                        ctx.lineTo(-60, -180);
                        ctx.closePath();
                        ctx.fillStyle = palette[1];
                        ctx.globalAlpha = 0.85;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Face division (cubist)
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(0, -220);
                        ctx.lineTo(0, 110);
                        ctx.lineWidth = 7;
                        ctx.strokeStyle = palette[2];
                        ctx.globalAlpha = 0.7;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Left side face patch
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(-70, -60);
                        ctx.lineTo(-60, -180);
                        ctx.lineTo(0, -220);
                        ctx.lineTo(0, -60);
                        ctx.closePath();
                        ctx.fillStyle = palette[5];
                        ctx.globalAlpha = 0.7;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Right side face patch
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(70, -60);
                        ctx.lineTo(60, -180);
                        ctx.lineTo(0, -220);
                        ctx.lineTo(0, -60);
                        ctx.closePath();
                        ctx.fillStyle = palette[4];
                        ctx.globalAlpha = 0.7;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Eyes (asymmetric, Picasso style)
                        ctx.save();
                        // Left eye
                        ctx.beginPath();
                        ctx.ellipse(-25, -140, 18, 10, -0.2, 0, Math.PI * 2);
                        ctx.fillStyle = "#fff";
                        ctx.fill();
                        ctx.beginPath();
                        ctx.ellipse(-25, -140, 7, 7, 0, 0, Math.PI * 2);
                        ctx.fillStyle = "#22223b";
                        ctx.fill();
                        // Right eye
                        ctx.beginPath();
                        ctx.ellipse(30, -130, 10, 16, 0.4, 0, Math.PI * 2);
                        ctx.fillStyle = "#fff";
                        ctx.fill();
                        ctx.beginPath();
                        ctx.ellipse(30, -130, 4, 7, 0, 0, Math.PI * 2);
                        ctx.fillStyle = "#22223b";
                        ctx.fill();
                        ctx.restore();

                        // Nose (heart-shaped, off-center)
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(0, -110);
                        ctx.bezierCurveTo(-10, -120, -25, -100, 0, -90);
                        ctx.bezierCurveTo(25, -100, 10, -120, 0, -110);
                        ctx.closePath();
                        ctx.fillStyle = "#e84a5f";
                        ctx.globalAlpha = 0.8;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Mouth (fragmented line)
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(-8, -85);
                        ctx.lineTo(0, -80);
                        ctx.lineTo(8, -85);
                        ctx.strokeStyle = "#22223b";
                        ctx.lineWidth = 4;
                        ctx.globalAlpha = 0.8;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Teeth
                        ctx.save();
                        ctx.beginPath();
                        ctx.rect(-6, -80, 5, 10);
                        ctx.rect(1, -80, 5, 10);
                        ctx.fillStyle = "#f7fff7";
                        ctx.globalAlpha = 0.9;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Whiskers (skewed, cubist)
                        ctx.save();
                        ctx.strokeStyle = "#1e3269";
                        ctx.lineWidth = 3;
                        ctx.globalAlpha = 0.7;
                        for (var i = 0; i < 3; i++) {
                            ctx.beginPath();
                            ctx.moveTo(-10, -95 + i * 7);
                            ctx.lineTo(-40 - i * 10, -110 + i * 10);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(10, -95 + i * 7);
                            ctx.lineTo(40 + i * 10, -110 + i * 10);
                            ctx.stroke();
                        }
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Ears (fragmented, expressive, multi-angle)
                        ctx.save();
                        // Left ear
                        ctx.beginPath();
                        ctx.moveTo(-40, -200);
                        ctx.lineTo(-90, -340);
                        ctx.lineTo(-50, -320);
                        ctx.lineTo(-30, -250);
                        ctx.closePath();
                        ctx.fillStyle = palette[6];
                        ctx.globalAlpha = 0.9;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        // Right ear
                        ctx.beginPath();
                        ctx.moveTo(40, -200);
                        ctx.lineTo(80, -330);
                        ctx.lineTo(60, -320);
                        ctx.lineTo(30, -250);
                        ctx.closePath();
                        ctx.fillStyle = palette[7];
                        ctx.globalAlpha = 0.9;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        // Odd: third ear, Picasso style
                        ctx.beginPath();
                        ctx.moveTo(0, -210);
                        ctx.lineTo(0, -350);
                        ctx.lineTo(18, -330);
                        ctx.lineTo(8, -250);
                        ctx.closePath();
                        ctx.fillStyle = palette[8];
                        ctx.globalAlpha = 0.7;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Decorative cubist lines and shapes on face
                        ctx.save();
                        ctx.strokeStyle = palette[9];
                        ctx.lineWidth = 4;
                        ctx.globalAlpha = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(-35, -180);
                        ctx.lineTo(0, -160);
                        ctx.lineTo(35, -170);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(-10, -120);
                        ctx.lineTo(-35, -100);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(10, -120);
                        ctx.lineTo(35, -100);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // Bow tie (fragmented)
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(-20, 120);
                        ctx.lineTo(-50, 140);
                        ctx.lineTo(-20, 130);
                        ctx.closePath();
                        ctx.fillStyle = palette[10];
                        ctx.globalAlpha = 0.85;
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(20, 120);
                        ctx.lineTo(50, 140);
                        ctx.lineTo(20, 130);
                        ctx.closePath();
                        ctx.fillStyle = palette[11];
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(0, 125, 11, 0, Math.PI * 2);
                        ctx.fillStyle = palette[12];
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();
                        ctx.restore();
                        break;
                    case 4:
                        // Mondrian palette
                        const mondrianColors = ["#fff", "#e53935", "#fbc02d", "#1976d2"]; // white, red, yellow, blue

                        // --- Generate Mondrian-style grid: rectangles at least 200px in width/height ---

                        function makeSplits(total, minSize) {
                            // Always include 0 and total
                            let splits = [0];
                            let pos = 0;
                            while (pos < total - minSize) {
                                // Pick next split at least minSize ahead, but leave at least minSize for the last rect
                                let maxNext = total - minSize;
                                let minNext = pos + minSize;
                                if (minNext >= maxNext) break;
                                let next = minNext + Math.random() * (maxNext - minNext);
                                splits.push(Math.round(next));
                                pos = Math.round(next);
                            }
                            splits.push(total);
                            // Remove duplicates and sort
                            splits = Array.from(new Set(splits)).sort((a, b) => a - b);
                            return splits;
                        }

                        const minRectSize = 50;
                        const vSplits = makeSplits(backgroundCanvas.width, minRectSize);
                        const hSplits = makeSplits(backgroundCanvas.height, minRectSize);

                        const rects = [];
                        for (let i = 0; i < vSplits.length - 1; i++) {
                            for (let j = 0; j < hSplits.length - 1; j++) {
                                const w = vSplits[i + 1] - vSplits[i];
                                const h = hSplits[j + 1] - hSplits[j];
                                if (w >= minRectSize && h >= minRectSize) {
                                    rects.push({
                                        x: vSplits[i],
                                        y: hSplits[j],
                                        w: w,
                                        h: h,
                                        color: "#fff", // assign color below
                                    });
                                }
                            }
                        }

                        // Assign color to a few rectangles (most remain white)
                        let colorable = rects.slice().sort(() => Math.random() - 0.5);
                        let nColor = Math.min(3, Math.floor(rects.length / 3));
                        for (let i = 0; i < nColor; i++) {
                            colorable[i].color = mondrianColors[1 + (i % 3)];
                        }

                        // Draw rectangles
                        rects.forEach((r) => {
                            ctx.fillStyle = r.color;
                            ctx.fillRect(r.x, r.y, r.w, r.h);
                        });

                        // Draw thick black grid lines
                        ctx.save();
                        ctx.strokeStyle = "#111";
                        ctx.lineWidth = Math.max(10, Math.round(Math.min(backgroundCanvas.width, backgroundCanvas.height) * 0.012));
                        vSplits.forEach((x) => {
                            ctx.beginPath();
                            ctx.moveTo(x, 0);
                            ctx.lineTo(x, backgroundCanvas.height);
                            ctx.stroke();
                        });
                        hSplits.forEach((y) => {
                            ctx.beginPath();
                            ctx.moveTo(0, y);
                            ctx.lineTo(backgroundCanvas.width, y);
                            ctx.stroke();
                        });
                        ctx.restore();

                        // --- Mondrian-style Easter motifs (geometric, outlined) ---
                        function drawEllipse(x, y, rx, ry, fillColor, strokeColor, lineWidth = 6) {
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = fillColor;
                            ctx.fill();
                            ctx.lineWidth = lineWidth;
                            ctx.strokeStyle = strokeColor;
                            ctx.stroke();
                            ctx.restore();
                        }

                        function drawEgg(x, y, size, colorIdx) {
                            const rx = size * 0.6;
                            const ry = size;
                            drawEllipse(x, y, rx, ry, mondrianColors[colorIdx], "#111");
                            ctx.save();
                            ctx.beginPath();
                            ctx.moveTo(x - rx * 0.7, y + ry * 0.2);
                            ctx.lineTo(x + rx * 0.7, y + ry * 0.2);
                            ctx.lineWidth = 4;
                            ctx.strokeStyle = "#111";
                            ctx.stroke();
                            ctx.restore();
                        }

                        // Place motifs in random rectangles, avoiding overlap
                        function pickRect() {
                            return rects[Math.floor(Math.random() * rects.length)];
                        }

                        // Eggs
                        for (let i = 0; i < 7; i++) {
                            const r = pickRect();
                            const ex = r.x + r.w / 2;
                            const ey = r.y + r.h / 2;
                            const size = Math.min(r.w, r.h) * 0.28;
                            drawEgg(ex, ey, size, 1 + (i % 3));
                        }
                        break;
                    case 5:
                        grad = ctx.createLinearGradient(0, 0, 0, backgroundCanvas.height);
                        grad.addColorStop(0, "rgb(203, 140, 88)");
                        grad.addColorStop(0.4, "rgb(150, 106, 176)");
                        grad.addColorStop(1, "rgb(151, 196, 240)");
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Klimt palette: golds, black, white, green, red, blue, turquoise, ochre
                        const golds = ["#d4af37", "#e6c200", "#bfa14a", "#fffbe8"];
                        const klimtColors = ["#d4af37", "#e6c200", "#bfa14a", "#fffbe8", "#000", "#fff", "#8ec850", "#b6f9e9", "#f9b6e4", "#e84a5f", "#1976d2", "#fbc02d", "#f6e2b3", "#b7a583"];

                        // --- Ornate Klimt-style swirling background ---
                        function drawSwirls() {
                            for (let i = 0; i < 24; i++) {
                                const cx = Math.random() * backgroundCanvas.width;
                                const cy = Math.random() * backgroundCanvas.height;
                                const r = 60 + Math.random() * 140;
                                const start = Math.random() * Math.PI * 2;
                                ctx.save();
                                ctx.beginPath();
                                ctx.lineWidth = 6 + Math.random() * 4;
                                ctx.strokeStyle = golds[Math.floor(Math.random() * golds.length)];
                                ctx.globalAlpha = 0.18 + Math.random() * 0.13;
                                ctx.arc(cx, cy, r, start, start + Math.PI * (1.2 + Math.random() * 0.8), false);
                                ctx.stroke();
                                ctx.restore();
                            }
                        }
                        drawSwirls();

                        // --- Klimt-style mosaic dots and rectangles ---
                        for (let i = 0; i < 120; i++) {
                            ctx.save();
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            if (Math.random() < 0.5) {
                                ctx.beginPath();
                                ctx.arc(x, y, 7 + Math.random() * 10, 0, Math.PI * 2);
                                ctx.globalAlpha = 0.17 + Math.random() * 0.13;
                                ctx.fillStyle = klimtColors[Math.floor(Math.random() * klimtColors.length)];
                                ctx.fill();
                            } else {
                                ctx.globalAlpha = 0.14 + Math.random() * 0.13;
                                ctx.fillStyle = klimtColors[Math.floor(Math.random() * klimtColors.length)];
                                ctx.fillRect(x, y, 12 + Math.random() * 14, 12 + Math.random() * 14);
                            }
                            ctx.restore();
                        }

                        // --- Klimt-style Easter eggs ---
                        function drawTheEgg(x, y, rx, ry, palette) {
                            // Egg base
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = palette[0];
                            ctx.shadowColor = "#bfa14a";
                            ctx.shadowBlur = 18;
                            ctx.globalAlpha = 0.95;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.globalAlpha = 1;
                            ctx.strokeStyle = "#bfa14a";
                            ctx.lineWidth = 4;
                            ctx.stroke();
                            ctx.restore();

                            // Ornamentation: gold spirals and dots
                            for (let i = 0; i < 8 + Math.floor(Math.random() * 6); i++) {
                                const angle = Math.random() * Math.PI * 2;
                                const r = Math.random() * 0.7;
                                const ex = x + Math.cos(angle) * rx * r * 0.9;
                                const ey = y + Math.sin(angle) * ry * r * 0.9;
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc(ex, ey, 7 + Math.random() * 6, 0, Math.PI * 2);
                                ctx.globalAlpha = 0.8;
                                ctx.lineWidth = 3;
                                ctx.strokeStyle = golds[Math.floor(Math.random() * golds.length)];
                                ctx.stroke();
                                ctx.restore();
                                // Dots
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc(ex + Math.random() * 12 - 6, ey + Math.random() * 12 - 6, 3 + Math.random() * 2, 0, Math.PI * 2);
                                ctx.globalAlpha = 0.7;
                                ctx.fillStyle = golds[Math.floor(Math.random() * golds.length)];
                                ctx.fill();
                                ctx.restore();
                            }
                            // Colored rectangles
                            for (let i = 0; i < 4; i++) {
                                ctx.save();
                                ctx.globalAlpha = 0.7;
                                ctx.fillStyle = palette[1 + (i % (palette.length - 1))];
                                ctx.fillRect(x + (Math.random() - 0.5) * rx * 1.3, y + (Math.random() - 0.5) * ry * 1.3, 10 + Math.random() * 8, 10 + Math.random() * 8);
                                ctx.restore();
                            }
                        }
                        for (let i = 0; i < 8; i++) {
                            const x = backgroundCanvas.width * (0.12 + 0.12 * i) + Math.random() * 40;
                            const y = backgroundCanvas.height * (0.65 + Math.sin(i) * 0.08) + Math.random() * 30;
                            const rx = 44 + (i % 3) * 16;
                            const ry = 66 + ((i + 1) % 2) * 22;
                            const palette = [golds[i % golds.length], klimtColors[(i + 2) % klimtColors.length], klimtColors[(i + 5) % klimtColors.length], klimtColors[(i + 7) % klimtColors.length]];
                            drawTheEgg(x, y, rx, ry, palette);
                        }

                        // --- Klimt-style bunnies: gold, mosaic, and swirl decorated ---
                        function drawTheBunny(x, y, size, palette) {
                            // Body (ellipse)
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(x, y, size * 0.5, size * 0.8, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = palette[0];
                            ctx.globalAlpha = 0.93;
                            ctx.shadowColor = "#bfa14a";
                            ctx.shadowBlur = 14;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.globalAlpha = 1;
                            ctx.strokeStyle = "#bfa14a";
                            ctx.lineWidth = 4;
                            ctx.stroke();
                            ctx.restore();

                            // Head (circle)
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(x, y - size * 0.7, size * 0.29, 0, 2 * Math.PI);
                            ctx.fillStyle = palette[1];
                            ctx.globalAlpha = 0.95;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.strokeStyle = "#bfa14a";
                            ctx.lineWidth = 3;
                            ctx.stroke();
                            ctx.restore();

                            // Ears (ellipses)
                            for (let e = 0; e < 2; e++) {
                                ctx.save();
                                ctx.beginPath();
                                ctx.ellipse(x + (e === 0 ? -size * 0.15 : size * 0.15), y - size * 1.1, size * 0.12, size * 0.38, e === 0 ? -0.2 : 0.2, 0, 2 * Math.PI);
                                ctx.fillStyle = palette[2];
                                ctx.globalAlpha = 0.8;
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.strokeStyle = "#bfa14a";
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                ctx.restore();
                            }
                            // Klimt-style gold dots and swirls on body
                            for (let i = 0; i < 7; i++) {
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc(x + (Math.random() - 0.5) * size * 0.6, y + (Math.random() - 0.5) * size * 1.2, 5 + Math.random() * 3, 0, Math.PI * 2);
                                ctx.globalAlpha = 0.7;
                                ctx.fillStyle = golds[Math.floor(Math.random() * golds.length)];
                                ctx.fill();
                                ctx.restore();
                            }
                            for (let i = 0; i < 3; i++) {
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc(
                                    x + (Math.random() - 0.5) * size * 0.5,
                                    y + (Math.random() - 0.5) * size * 1.1,
                                    12 + Math.random() * 7,
                                    Math.random() * Math.PI * 2,
                                    Math.random() * Math.PI * 2 + Math.PI * 1.2
                                );
                                ctx.globalAlpha = 0.4;
                                ctx.lineWidth = 3;
                                ctx.strokeStyle = golds[Math.floor(Math.random() * golds.length)];
                                ctx.stroke();
                                ctx.restore();
                            }
                        }
                        for (let i = 0; i < 5; i++) {
                            const x = backgroundCanvas.width * (0.15 + 0.17 * i) + Math.random() * 40;
                            const y = backgroundCanvas.height * (0.45 + Math.cos(i) * 0.13) + Math.random() * 30;
                            const size = 56 + Math.random() * 28;
                            const palette = [golds[i % golds.length], klimtColors[(i + 3) % klimtColors.length], klimtColors[(i + 6) % klimtColors.length]];
                            drawTheBunny(x, y, size, palette);
                        }

                        // --- Klimt-style flowers: gold, mosaic, and spiral petals ---
                        function drawTheFlower(x, y, size, palette) {
                            // Center
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(x, y, size * 0.3, 0, 2 * Math.PI);
                            ctx.fillStyle = golds[0];
                            ctx.globalAlpha = 0.88;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.strokeStyle = "#bfa14a";
                            ctx.lineWidth = 2;
                            ctx.stroke();
                            ctx.restore();
                            // Petals (spirals)
                            for (let i = 0; i < 6; i++) {
                                ctx.save();
                                ctx.beginPath();
                                const angle = ((Math.PI * 2) / 6) * i;
                                ctx.arc(x + Math.cos(angle) * size * 0.4, y + Math.sin(angle) * size * 0.4, size * 0.23, angle, angle + Math.PI * 1.1);
                                ctx.globalAlpha = 0.7;
                                ctx.lineWidth = 5;
                                ctx.strokeStyle = palette[i % palette.length];
                                ctx.stroke();
                                ctx.restore();
                            }
                        }
                        for (let i = 0; i < 7; i++) {
                            const x = backgroundCanvas.width * (0.1 + 0.12 * i) + Math.random() * 30;
                            const y = backgroundCanvas.height * (0.18 + Math.sin(i) * 0.08) + Math.random() * 20;
                            const size = 34 + Math.random() * 18;
                            const palette = [klimtColors[(i + 4) % klimtColors.length], golds[i % golds.length], klimtColors[(i + 8) % klimtColors.length]];
                            drawTheFlower(x, y, size, palette);
                        }

                        // --- Klimt-style decorative butterflies ---
                        function drawButterfly(x, y, size, palette) {
                            // Wings
                            for (let s = -1; s <= 1; s += 2) {
                                ctx.save();
                                ctx.beginPath();
                                ctx.ellipse(x + s * size * 0.22, y, size * 0.28, size * 0.18, 0, 0, 2 * Math.PI);
                                ctx.fillStyle = palette[0];
                                ctx.globalAlpha = 0.7;
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.strokeStyle = golds[1];
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                ctx.restore();
                                // Gold dots
                                for (let i = 0; i < 3; i++) {
                                    ctx.save();
                                    ctx.beginPath();
                                    ctx.arc(x + s * size * 0.22 + (Math.random() - 0.5) * size * 0.1, y + (Math.random() - 0.5) * size * 0.15, 3 + Math.random() * 2, 0, Math.PI * 2);
                                    ctx.globalAlpha = 0.8;
                                    ctx.fillStyle = golds[Math.floor(Math.random() * golds.length)];
                                    ctx.fill();
                                    ctx.restore();
                                }
                            }
                            // Body
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(x, y, size * 0.07, size * 0.27, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = palette[1];
                            ctx.globalAlpha = 0.8;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.strokeStyle = golds[2];
                            ctx.lineWidth = 2;
                            ctx.stroke();
                            ctx.restore();
                        }
                        for (let i = 0; i < 5; i++) {
                            const x = backgroundCanvas.width * (0.18 + 0.16 * i) + Math.random() * 30;
                            const y = backgroundCanvas.height * (0.25 + Math.sin(i) * 0.12) + Math.random() * 20;
                            const size = 32 + Math.random() * 12;
                            const palette = [klimtColors[(i + 2) % klimtColors.length], klimtColors[(i + 5) % klimtColors.length], golds[i % golds.length]];
                            drawButterfly(x, y, size, palette);
                        }
                        break;
                    case 6:
                        // Background gradient
                        grad = ctx.createLinearGradient(0, 0, 0, backgroundCanvas.height);
                        grad.addColorStop(0, "#f7f2ee");
                        grad.addColorStop(0.4, "#e9d9f2");
                        grad.addColorStop(1, "#d7e7f7");
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Sparkles
                        for (let i = 0; i < 80; i++) {
                            ctx.save();
                            ctx.globalAlpha = 0.17 + Math.random() * 0.13;
                            ctx.beginPath();
                            ctx.arc(Math.random() * backgroundCanvas.width, Math.random() * backgroundCanvas.height, 1 + Math.random() * 2, 0, 2 * Math.PI);
                            ctx.fillStyle = ["#fff", "#fbeee6", "#e3e1f7", "#ffe7fa"][i % 4];
                            ctx.fill();
                            ctx.restore();
                        }

                        // Fabergé palette sets for eggs
                        const fabergePalettes = [
                            ["#b1d3f7", "#3561a7", "#fffbe8"], // blue
                            ["#f7b1e3", "#a73590", "#fffbe8"], // pink
                            ["#d7f7b1", "#4da735", "#fffbe8"], // green
                            ["#f7e1b1", "#a77b35", "#fffbe8"], // gold
                            ["#e1b1f7", "#6e35a7", "#fffbe8"], // purple
                            ["#f7b1b1", "#a73535", "#fffbe8"], // red
                            ["#f7f7b1", "#c2c200", "#fffbe8"], // yellow
                        ];

                        // Draw one Fabergé egg
                        function drawFabergeEgg(x, y, rx, ry, palette) {
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
                            let eggGrad = ctx.createRadialGradient(x, y - ry * 0.4, rx * 0.2, x, y, rx * 1.1);
                            eggGrad.addColorStop(0, palette[0]);
                            eggGrad.addColorStop(0.8, palette[1]);
                            eggGrad.addColorStop(1, palette[2]);
                            ctx.fillStyle = eggGrad;
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 18;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.lineWidth = 5;
                            ctx.strokeStyle = "#d4af37";
                            ctx.stroke();
                            ctx.restore();

                            // Gold filigree bands
                            for (let b = 0; b < 3; b++) {
                                ctx.save();
                                ctx.beginPath();
                                let by = y - ry * 0.6 + b * ry * 0.6;
                                ctx.ellipse(x, by, rx * 0.98, ry * 0.15, 0, 0, 2 * Math.PI);
                                ctx.lineWidth = 3;
                                ctx.strokeStyle = "#d4af37";
                                ctx.globalAlpha = 0.7;
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                            // Gold vertical filigree
                            for (let a = 0; a < 4; a++) {
                                ctx.save();
                                ctx.beginPath();
                                let angle = (Math.PI / 2) * a;
                                ctx.ellipse(x, y, rx * 0.95, ry * 0.95, angle, 0, 2 * Math.PI);
                                ctx.lineWidth = 2.5;
                                ctx.strokeStyle = "#e6c200";
                                ctx.globalAlpha = 0.7;
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                            // Jewels (dots)
                            for (let j = 0; j < 12; j++) {
                                let ang = (Math.PI * 2 * j) / 12;
                                let ex = x + Math.cos(ang) * rx * 0.75;
                                let ey = y + Math.sin(ang) * ry * 0.75;
                                ctx.save();
                                ctx.beginPath();
                                ctx.arc(ex, ey, 6, 0, 2 * Math.PI);
                                ctx.fillStyle = ["#fff", "#e84a5f", "#1976d2", "#fbc02d", "#8ec850", "#b6f9e9", "#f9b6e4"][j % 7];
                                ctx.shadowColor = "#fff";
                                ctx.shadowBlur = 6;
                                ctx.fill();
                                ctx.shadowBlur = 0;
                                ctx.lineWidth = 2;
                                ctx.strokeStyle = "#d4af37";
                                ctx.stroke();
                                ctx.restore();
                            }
                            // Swirl/leaf gold filigree
                            for (let i = 0; i < 4; i++) {
                                ctx.save();
                                ctx.beginPath();
                                let ang = (Math.PI / 2) * i + Math.PI / 6;
                                let sx = x + Math.cos(ang) * rx * 0.4;
                                let sy = y + Math.sin(ang) * ry * 0.4;
                                ctx.moveTo(sx, sy);
                                for (let t = 0; t < 18; t++) {
                                    let theta = ang + t * 0.09;
                                    let r = rx * 0.12 + t * 1.2;
                                    ctx.lineTo(sx + Math.cos(theta) * r, sy + Math.sin(theta) * r);
                                }
                                ctx.lineWidth = 2;
                                ctx.strokeStyle = "#d4af37";
                                ctx.globalAlpha = 0.7;
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            }
                        }

                        // Evenly distribute eggs in a grid with random offset
                        cols = 7;
                        rows = 3;
                        cellW = backgroundCanvas.width / cols;
                        cellH = backgroundCanvas.height / rows;

                        for (let row = 0; row < rows; row++) {
                            for (let col = 0; col < cols; col++) {
                                const cx = col * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.3;
                                const cy = row * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.3;
                                const rx = 40 + Math.random() * 20;
                                const ry = rx * (1.4 + Math.random() * 0.3);
                                const palette = fabergePalettes[(row * cols + col) % fabergePalettes.length];
                                drawFabergeEgg(cx, cy, rx, ry, palette);
                            }
                        }
                        break;
                    case 7:
                        // --- Celestial gradient background (twilight sky) ---
                        grad = ctx.createLinearGradient(0, 0, 0, backgroundCanvas.height);
                        grad.addColorStop(0, "#232a4a");
                        grad.addColorStop(0.5, "#4a3785");
                        grad.addColorStop(1, "#e3eaff");
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // --- Nebula clouds ---
                        for (let i = 0; i < 10; i++) {
                            ctx.save();
                            ctx.globalAlpha = 0.1 + Math.random() * 0.13;
                            ctx.beginPath();
                            let cx = Math.random() * backgroundCanvas.width;
                            let cy = Math.random() * backgroundCanvas.height * 0.7;
                            ctx.arc(cx, cy, 120 + Math.random() * 80, 0, 2 * Math.PI);
                            ctx.fillStyle = ["#f9b6e4", "#b6f9e9", "#b6c7f9", "#f7e05c", "#fff", "#e3eaff"][i % 6];
                            ctx.fill();
                            ctx.restore();
                        }

                        // --- Stars and sparkles ---
                        for (let i = 0; i < 160; i++) {
                            ctx.save();
                            let x = Math.random() * backgroundCanvas.width;
                            let y = Math.random() * backgroundCanvas.height;
                            let r = Math.random() * 1.6 + 0.6;
                            ctx.globalAlpha = 0.4 + Math.random() * 0.5;
                            ctx.beginPath();
                            ctx.arc(x, y, r, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fff";
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 8 + Math.random() * 6;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.globalAlpha = 1;
                            ctx.restore();
                        }

                        // --- Constellations (simple lines) ---
                        function drawConstellation(points) {
                            ctx.save();
                            ctx.strokeStyle = "#ffe7fa";
                            ctx.lineWidth = 2;
                            ctx.globalAlpha = 0.6;
                            ctx.beginPath();
                            ctx.moveTo(points[0][0], points[0][1]);
                            for (let i = 1; i < points.length; i++) {
                                ctx.lineTo(points[i][0], points[i][1]);
                            }
                            ctx.stroke();
                            // Draw stars
                            for (let i = 0; i < points.length; i++) {
                                ctx.beginPath();
                                ctx.arc(points[i][0], points[i][1], 4, 0, 2 * Math.PI);
                                ctx.fillStyle = "#fff";
                                ctx.globalAlpha = 0.8;
                                ctx.shadowColor = "#fff";
                                ctx.shadowBlur = 8;
                                ctx.fill();
                                ctx.shadowBlur = 0;
                            }
                            ctx.restore();
                        }
                        // Example constellations
                        drawConstellation([
                            [backgroundCanvas.width * 0.15, backgroundCanvas.height * 0.23],
                            [backgroundCanvas.width * 0.19, backgroundCanvas.height * 0.18],
                            [backgroundCanvas.width * 0.23, backgroundCanvas.height * 0.27],
                            [backgroundCanvas.width * 0.28, backgroundCanvas.height * 0.21],
                        ]);
                        drawConstellation([
                            [backgroundCanvas.width * 0.68, backgroundCanvas.height * 0.11],
                            [backgroundCanvas.width * 0.71, backgroundCanvas.height * 0.19],
                            [backgroundCanvas.width * 0.76, backgroundCanvas.height * 0.13],
                        ]);

                        // --- Crescent moons ---
                        for (let i = 0; i < 2; i++) {
                            let mx = backgroundCanvas.width * (0.75 - 0.3 * i) + Math.random() * 40;
                            let my = backgroundCanvas.height * (0.16 + 0.25 * i) + Math.random() * 30;
                            let r = 46 + Math.random() * 12;
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(mx, my, r, Math.PI * 0.2, Math.PI * 1.8, false);
                            ctx.arc(mx + 12, my - 8, r * 0.82, Math.PI * 1.8, Math.PI * 0.2, true);
                            ctx.closePath();
                            ctx.globalAlpha = 0.6;
                            ctx.fillStyle = "#fffbe8";
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 18;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.globalAlpha = 1;
                            ctx.restore();
                        }

                        // --- Celestial Easter eggs (planet/constellation patterns) ---
                        eggColors = [
                            ["#fffbe8", "#f7e05c", "#ffe7fa"], // moon
                            ["#b6c7f9", "#1976d2", "#fff"],
                            ["#f9b6e4", "#e84a5f", "#fff"],
                            ["#b6f9e9", "#8ec850", "#fff"],
                            ["#f7e05c", "#fbc02d", "#fff"],
                            ["#e3eaff", "#b6c7f9", "#fff"],
                        ];
                        cols = 6;
                        rows = 3;
                        cellW = backgroundCanvas.width / cols;
                        cellH = backgroundCanvas.height / rows;

                        function drawCelestialEgg(x, y, rx, ry, palette, i) {
                            // Egg base
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
                            let eggGrad = ctx.createRadialGradient(x, y - ry * 0.3, rx * 0.2, x, y, rx * 1.1);
                            eggGrad.addColorStop(0, palette[0]);
                            eggGrad.addColorStop(0.7, palette[1]);
                            eggGrad.addColorStop(1, palette[2]);
                            ctx.fillStyle = eggGrad;
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 12;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.lineWidth = 3;
                            ctx.strokeStyle = "#fffbe8";
                            ctx.stroke();
                            ctx.restore();

                            // Egg highlight
                            ctx.save();
                            ctx.globalAlpha = 0.22;
                            ctx.beginPath();
                            ctx.ellipse(x - rx * 0.25, y - ry * 0.35, rx * 0.33, ry * 0.22, -0.3, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fff";
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.restore();

                            // Celestial/planet patterns
                            ctx.save();
                            if (i % 3 === 0) {
                                // Constellation lines
                                ctx.strokeStyle = "#ffe7fa";
                                ctx.lineWidth = 2;
                                ctx.globalAlpha = 0.7;
                                ctx.beginPath();
                                for (let j = 0; j < 5; j++) {
                                    let ang = (Math.PI * 2 * j) / 5 + Math.random() * 0.2;
                                    let px = x + Math.cos(ang) * rx * 0.6;
                                    let py = y + Math.sin(ang) * ry * 0.6;
                                    if (j === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                // Stars
                                for (let j = 0; j < 5; j++) {
                                    let ang = (Math.PI * 2 * j) / 5 + Math.random() * 0.2;
                                    let px = x + Math.cos(ang) * rx * 0.6;
                                    let py = y + Math.sin(ang) * ry * 0.6;
                                    ctx.beginPath();
                                    ctx.arc(px, py, 4, 0, 2 * Math.PI);
                                    ctx.globalAlpha = 0.9;
                                    ctx.fillStyle = "#fff";
                                    ctx.shadowColor = "#fff";
                                    ctx.shadowBlur = 7;
                                    ctx.fill();
                                    ctx.shadowBlur = 0;
                                }
                            } else if (i % 3 === 1) {
                                // Rings like Saturn
                                ctx.save();
                                ctx.beginPath();
                                ctx.ellipse(x, y + ry * 0.15, rx * 1.1, ry * 0.22, -0.3, 0, 2 * Math.PI);
                                ctx.strokeStyle = "#ffe7fa";
                                ctx.globalAlpha = 0.7;
                                ctx.lineWidth = 3;
                                ctx.stroke();
                                ctx.restore();
                            } else {
                                // Craters or dots
                                for (let j = 0; j < 7; j++) {
                                    let ang = (Math.PI * 2 * j) / 7 + Math.random() * 0.3;
                                    let px = x + Math.cos(ang) * rx * 0.5 + Math.random() * 8;
                                    let py = y + Math.sin(ang) * ry * 0.5 + Math.random() * 8;
                                    ctx.beginPath();
                                    ctx.arc(px, py, 5 + Math.random() * 3, 0, 2 * Math.PI);
                                    ctx.globalAlpha = 0.5 + Math.random() * 0.4;
                                    ctx.fillStyle = "#fffbe8";
                                    ctx.fill();
                                }
                            }
                            ctx.globalAlpha = 1;
                            ctx.restore();
                        }

                        for (let row = 0; row < rows; row++) {
                            for (let col = 0; col < cols; col++) {
                                let cx = col * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.25;
                                let cy = row * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.18;
                                let rx = 44 + Math.random() * 14;
                                let ry = rx * (1.3 + Math.random() * 0.2);
                                let palette = eggColors[(row * cols + col) % eggColors.length];
                                drawCelestialEgg(cx, cy, rx, ry, palette, row * cols + col);
                            }
                        }

                        // --- Celestial bunnies (glowing, radiant) ---
                        for (let i = 0; i < 3; i++) {
                            let bx = backgroundCanvas.width * (0.22 + 0.28 * i) + (Math.random() - 0.5) * 40;
                            let by = backgroundCanvas.height * (0.18 + Math.sin(i) * 0.11) + (Math.random() - 0.5) * 30;
                            let size = 60 + Math.random() * 20;
                            // Body
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(bx, by + size * 0.31, size * 0.32, size * 0.43, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fffbe8";
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 18;
                            ctx.globalAlpha = 0.8;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.globalAlpha = 1;
                            ctx.lineWidth = 4;
                            ctx.strokeStyle = "#ffe7fa";
                            ctx.stroke();
                            // Head
                            ctx.beginPath();
                            ctx.ellipse(bx, by, size * 0.33, size * 0.33, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fff";
                            ctx.globalAlpha = 0.95;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.stroke();
                            // Ears
                            for (let e = 0; e < 2; e++) {
                                ctx.save();
                                ctx.beginPath();
                                ctx.ellipse(bx + (e === 0 ? -size * 0.14 : size * 0.14), by - size * 0.33, size * 0.1, size * 0.32, e === 0 ? -0.18 : 0.18, 0, 2 * Math.PI);
                                ctx.fillStyle = "#e3eaff";
                                ctx.globalAlpha = 0.7;
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.stroke();
                                ctx.restore();
                            }
                            // Face: glowing eyes
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(bx - size * 0.09, by - size * 0.02, size * 0.07, 0, 2 * Math.PI);
                            ctx.arc(bx + size * 0.09, by - size * 0.02, size * 0.07, 0, 2 * Math.PI);
                            ctx.fillStyle = "#ffe7fa";
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 8;
                            ctx.globalAlpha = 0.8;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.globalAlpha = 1;
                            ctx.restore();
                            ctx.restore();
                        }
                        break;
                    case 8:
                        // --- Candy Crush-style background gradient ---
                        grad = ctx.createLinearGradient(0, 0, 0, backgroundCanvas.height);
                        grad.addColorStop(0, "#ffe7fa");
                        grad.addColorStop(0.5, "#b7eaff");
                        grad.addColorStop(1, "#fff7d1");
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // --- Soft game board grid ---
                        (cols = 8), (rows = 5);
                        cellW = backgroundCanvas.width / cols;
                        cellH = backgroundCanvas.height / rows;
                        ctx.save();
                        ctx.globalAlpha = 0.11;
                        ctx.strokeStyle = "#fff";
                        ctx.lineWidth = 8;
                        for (let i = 1; i < cols; i++) {
                            ctx.beginPath();
                            ctx.moveTo(i * cellW, 0);
                            ctx.lineTo(i * cellW, backgroundCanvas.height);
                            ctx.stroke();
                        }
                        for (let j = 1; j < rows; j++) {
                            ctx.beginPath();
                            ctx.moveTo(0, j * cellH);
                            ctx.lineTo(backgroundCanvas.width, j * cellH);
                            ctx.stroke();
                        }
                        ctx.restore();

                        // --- Sparkles and glows ---
                        for (let i = 0; i < 80; i++) {
                            ctx.save();
                            ctx.globalAlpha = 0.18 + Math.random() * 0.14;
                            ctx.beginPath();
                            ctx.arc(Math.random() * backgroundCanvas.width, Math.random() * backgroundCanvas.height, 2 + Math.random() * 3, 0, 2 * Math.PI);
                            ctx.fillStyle = ["#fff", "#ffe7fa", "#b7eaff", "#fff7d1"][i % 4];
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 10;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.restore();
                        }

                        // --- Glossy Candy/Easter Egg Drawing Function with realistic shape ---
                        function drawCandyEgg(x, y, rx, ry, type, colorA, colorB) {
                            // Base egg/candy
                            ctx.save();
                            ctx.beginPath();
                            // Adjusted shape: rx closer to ry for plumper egg
                            ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
                            // Glossy gradient
                            let eggGrad = ctx.createRadialGradient(x - rx * 0.3, y - ry * 0.25, rx * 0.1, x, y, rx * 1.1);
                            eggGrad.addColorStop(0, colorA);
                            eggGrad.addColorStop(0.7, colorB);
                            eggGrad.addColorStop(1, "#fff");
                            ctx.fillStyle = eggGrad;
                            ctx.shadowColor = colorA;
                            ctx.shadowBlur = 16;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.lineWidth = 4;
                            ctx.strokeStyle = "#fff";
                            ctx.globalAlpha = 0.7;
                            ctx.stroke();
                            ctx.globalAlpha = 1;

                            // Shine
                            ctx.save();
                            ctx.globalAlpha = 0.36;
                            ctx.beginPath();
                            ctx.ellipse(x - rx * 0.25, y - ry * 0.35, rx * 0.33, ry * 0.18, -0.3, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fff";
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.restore();

                            // Pattern overlays
                            if (type === "stripe") {
                                ctx.save();
                                ctx.globalAlpha = 0.38;
                                ctx.strokeStyle = "#fff";
                                ctx.lineWidth = 8;
                                for (let sy = -ry * 0.8; sy <= ry * 0.8; sy += ry * 0.35) {
                                    ctx.beginPath();
                                    ctx.moveTo(x - rx * 0.95, y + sy);
                                    ctx.lineTo(x + rx * 0.95, y + sy);
                                    ctx.stroke();
                                }
                                ctx.restore();
                            } else if (type === "zigzag") {
                                ctx.save();
                                ctx.globalAlpha = 0.7;
                                ctx.strokeStyle = "#fff";
                                ctx.lineWidth = 5;
                                ctx.beginPath();
                                for (let t = 0; t <= 1; t += 0.08) {
                                    let px = x - rx + t * 2 * rx;
                                    let py = y + Math.sin(t * 10) * ry * 0.15;
                                    if (t === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                ctx.restore();
                            } else if (type === "dots") {
                                ctx.save();
                                ctx.globalAlpha = 0.7;
                                ctx.fillStyle = "#fff";
                                for (let d = 0; d < 8; d++) {
                                    let ang = (Math.PI * 2 * d) / 8 + Math.random() * 0.4;
                                    let px = x + Math.cos(ang) * rx * 0.55;
                                    let py = y + Math.sin(ang) * ry * 0.55;
                                    ctx.beginPath();
                                    ctx.arc(px, py, 7, 0, 2 * Math.PI);
                                    ctx.fill();
                                }
                                ctx.restore();
                            } else if (type === "jellybean") {
                                ctx.save();
                                ctx.globalAlpha = 0.3;
                                ctx.beginPath();
                                ctx.ellipse(x, y + ry * 0.35, rx * 0.6, ry * 0.18, 0, 0, 2 * Math.PI);
                                ctx.fillStyle = "#fff";
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.restore();
                            } else if (type === "candywrap") {
                                // Wrapping bow
                                ctx.save();
                                ctx.globalAlpha = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(x - rx * 0.9, y);
                                ctx.lineTo(x - rx * 1.3, y - ry * 0.6);
                                ctx.lineTo(x - rx * 1.1, y + ry * 0.6);
                                ctx.closePath();
                                ctx.fillStyle = "#fff7d1";
                                ctx.fill();
                                ctx.beginPath();
                                ctx.moveTo(x + rx * 0.9, y);
                                ctx.lineTo(x + rx * 1.3, y - ry * 0.6);
                                ctx.lineTo(x + rx * 1.1, y + ry * 0.6);
                                ctx.closePath();
                                ctx.fillStyle = "#ffe7fa";
                                ctx.fill();
                                ctx.restore();
                                // Band
                                ctx.save();
                                ctx.globalAlpha = 0.5;
                                ctx.beginPath();
                                ctx.ellipse(x, y, rx * 0.36, ry * 0.13, 0, 0, 2 * Math.PI);
                                ctx.fillStyle = "#fff";
                                ctx.fill();
                                ctx.restore();
                            }
                            ctx.restore();
                        }

                        // --- Place candies/eggs in grid ---
                        const candyTypes = ["stripe", "zigzag", "dots", "jellybean", "candywrap"];
                        const colorCombos = [
                            ["#f9b6e4", "#e84a5f"],
                            ["#b6f9e9", "#8ec850"],
                            ["#f9e3b6", "#f7e05c"],
                            ["#b6c7f9", "#1976d2"],
                            ["#f7e05c", "#fbc02d"],
                            ["#e5b6f9", "#b06eea"],
                            ["#ffd6e0", "#ff7eb9"],
                            ["#fffbe8", "#ffe7fa"],
                        ];

                        for (let row = 0; row < rows; row++) {
                            for (let col = 0; col < cols; col++) {
                                let cx = col * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.18;
                                let cy = row * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.18;
                                // Adjust rx and ry for plumper eggs:
                                let rx = cellW * 0.32 + Math.random() * cellW * 0.05; // wider
                                let ry = rx * (1.3 + Math.random() * 0.2); // height proportional to width
                                let type = candyTypes[(row * cols + col) % candyTypes.length];
                                let colorIdx = (row * cols + col) % colorCombos.length;
                                drawCandyEgg(cx, cy, rx, ry, type, colorCombos[colorIdx][0], colorCombos[colorIdx][1]);
                            }
                        }
                        break;
                    case 9:
                        // --- Light blue celestial gradient sky ---
                        grad = ctx.createLinearGradient(0, 0, 0, backgroundCanvas.height);
                        grad.addColorStop(0, "#cce5ff"); // very light blue
                        grad.addColorStop(0.5, "#99c2ff"); // soft sky blue
                        grad.addColorStop(1, "#e6f0ff"); // pale blue-white
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // --- Soft clouds ---
                        for (let i = 0; i < 8; i++) {
                            ctx.save();
                            ctx.globalAlpha = 0.1 + Math.random() * 0.13;
                            ctx.beginPath();
                            let cx = Math.random() * backgroundCanvas.width;
                            let cy = Math.random() * backgroundCanvas.height * 0.7;
                            ctx.arc(cx, cy, 120 + Math.random() * 80, 0, 2 * Math.PI);
                            ctx.fillStyle = ["#fff", "#d9e9ff", "#b6c7f9", "#f7e05c"][i % 4];
                            ctx.fill();
                            ctx.restore();
                        }

                        // --- Stars and sparkles ---
                        for (let i = 0; i < 140; i++) {
                            ctx.save();
                            let x = Math.random() * backgroundCanvas.width;
                            let y = Math.random() * backgroundCanvas.height * 0.96;
                            let r = Math.random() * 1.6 + 0.7;
                            ctx.globalAlpha = 0.4 + Math.random() * 0.5;
                            ctx.beginPath();
                            ctx.arc(x, y, r, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fff";
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 8 + Math.random() * 6;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            ctx.globalAlpha = 1;
                            ctx.restore();
                        }

                        // --- Celestial glow behind the egg ---
                        const centerX = backgroundCanvas.width / 2;
                        const centerY = backgroundCanvas.height / 2;
                        const eggW = Math.min(backgroundCanvas.width, backgroundCanvas.height) * 0.28;
                        const eggH = eggW * 1.35;
                        const glowR = eggH * 1.25;

                        let glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowR);
                        glowGrad.addColorStop(0, "#fffbe8");
                        glowGrad.addColorStop(0.25, "#ffe7fa");
                        glowGrad.addColorStop(0.7, "#ffe7fa00");
                        glowGrad.addColorStop(1, "rgba(255,255,255,0)");
                        ctx.save();
                        ctx.globalAlpha = 0.7;
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, glowR, 0, 2 * Math.PI);
                        ctx.fillStyle = glowGrad;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // --- Celestial rays ---
                        for (let i = 0; i < 16; i++) {
                            let angle = (Math.PI * 2 * i) / 16;
                            ctx.save();
                            ctx.globalAlpha = 0.13 + Math.random() * 0.09;
                            ctx.strokeStyle = "#fffbe8";
                            ctx.lineWidth = 9 + Math.random() * 6;
                            ctx.beginPath();
                            ctx.moveTo(centerX, centerY);
                            ctx.lineTo(centerX + Math.cos(angle) * glowR * 1.18, centerY + Math.sin(angle) * glowR * 1.18);
                            ctx.stroke();
                            ctx.restore();
                        }

                        // --- Big glowing egg in the center ---
                        ctx.save();
                        ctx.beginPath();
                        ctx.ellipse(centerX, centerY, eggW, eggH, 0, 0, 2 * Math.PI);
                        // Egg gradient (soft gold/white)
                        let eggGrad = ctx.createRadialGradient(centerX, centerY - eggH * 0.3, eggW * 0.2, centerX, centerY, eggW * 1.2);
                        eggGrad.addColorStop(0, "#fffbe8");
                        eggGrad.addColorStop(0.5, "#ffe7fa");
                        eggGrad.addColorStop(0.9, "#e3eaff");
                        eggGrad.addColorStop(1, "#fffbe800");
                        ctx.fillStyle = eggGrad;
                        ctx.shadowColor = "#fffbe8";
                        ctx.shadowBlur = 24;
                        ctx.fill();
                        ctx.shadowBlur = 0;
                        ctx.lineWidth = 7;
                        ctx.globalAlpha = 0.95;
                        ctx.strokeStyle = "#fffbe8";
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // --- Egg celestial pattern: constellation and stars ---
                        ctx.save();
                        ctx.globalAlpha = 0.6;
                        ctx.strokeStyle = "#ffe7fa";
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        let starPts = [];
                        for (let j = 0; j < 6; j++) {
                            let ang = (Math.PI * 2 * j) / 6 - Math.PI / 2 + Math.random() * 0.18;
                            let px = centerX + Math.cos(ang) * eggW * 0.65;
                            let py = centerY + Math.sin(ang) * eggH * 0.65;
                            starPts.push([px, py]);
                            if (j === 0) ctx.moveTo(px, py);
                            else ctx.lineTo(px, py);
                        }
                        ctx.stroke();
                        for (let j = 0; j < starPts.length; j++) {
                            ctx.beginPath();
                            ctx.arc(starPts[j][0], starPts[j][1], 7, 0, 2 * Math.PI);
                            ctx.globalAlpha = 0.85;
                            ctx.fillStyle = "#fff";
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = 10;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                        }
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // --- Shine on the egg ---
                        ctx.save();
                        ctx.globalAlpha = 0.18;
                        ctx.beginPath();
                        ctx.ellipse(centerX - eggW * 0.25, centerY - eggH * 0.35, eggW * 0.33, eggH * 0.18, -0.3, 0, 2 * Math.PI);
                        ctx.fillStyle = "#fff";
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        ctx.restore();

                        // --- Doves (Holy Spirit) ---
                        function drawDove(x, y, size, flip, blur) {
                            ctx.save();
                            ctx.translate(x, y);
                            ctx.scale(flip ? -1 : 1, 1);
                            ctx.rotate(-0.15 + Math.random() * 0.3);
                            ctx.globalAlpha = blur ? 0.36 : 0.82;
                            ctx.filter = blur ? "blur(2.5px)" : "none";
                            // Body
                            ctx.beginPath();
                            ctx.ellipse(0, 0, size * 0.44, size * 0.21, 0.2, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fff";
                            ctx.shadowColor = "#fff";
                            ctx.shadowBlur = blur ? 13 : 7;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                            // Wing
                            ctx.beginPath();
                            ctx.ellipse(size * 0.19, -size * 0.09, size * 0.19, size * 0.11, 0.8, 0, 2 * Math.PI);
                            ctx.fillStyle = "#e3eaff";
                            ctx.fill();
                            ctx.filter = "none";
                            ctx.globalAlpha = 1;
                            ctx.restore();
                        }

                        // Main doves (not blurred)
                        drawDove(centerX - eggW * 1.1, centerY - eggH * 0.7, eggW * 0.42, false, false);
                        drawDove(centerX + eggW * 1.1, centerY - eggH * 0.7, eggW * 0.37, true, false);

                        // Extra blurred doves for ethereal effect
                        drawDove(centerX - eggW * 1.4, centerY + eggH * 0.2, eggW * 0.32, false, true);
                        drawDove(centerX + eggW * 1.3, centerY + eggH * 0.18, eggW * 0.29, true, true);

                        // --- Angels: blurred, glowing, symbolic shapes ---
                        function drawAngel(x, y, size, flip, blur) {
                            ctx.save();
                            ctx.translate(x, y);
                            ctx.scale(flip ? -1 : 1, 1);
                            ctx.globalAlpha = blur ? 0.16 : 0.28;
                            ctx.filter = blur ? "blur(3.5px)" : "blur(1.5px)";
                            // Halo
                            ctx.beginPath();
                            ctx.ellipse(0, -size * 0.46, size * 0.22, size * 0.07, 0, 0, 2 * Math.PI);
                            ctx.strokeStyle = "#fffbe8";
                            ctx.lineWidth = blur ? 7 : 4;
                            ctx.shadowColor = "#fffbe8";
                            ctx.shadowBlur = blur ? 12 : 6;
                            ctx.stroke();
                            ctx.shadowBlur = 0;
                            // Head
                            ctx.beginPath();
                            ctx.arc(0, -size * 0.37, size * 0.13, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fff";
                            ctx.fill();
                            // Body
                            ctx.beginPath();
                            ctx.ellipse(0, 0, size * 0.19, size * 0.34, 0, 0, 2 * Math.PI);
                            ctx.fillStyle = "#fffbe8";
                            ctx.fill();
                            // Wings
                            ctx.beginPath();
                            ctx.ellipse(-size * 0.18, -size * 0.08, size * 0.18, size * 0.22, -0.5, 0, 2 * Math.PI);
                            ctx.ellipse(size * 0.18, -size * 0.08, size * 0.18, size * 0.22, 0.5, 0, 2 * Math.PI);
                            ctx.fillStyle = "#e3eaff";
                            ctx.fill();
                            ctx.filter = "none";
                            ctx.globalAlpha = 1;
                            ctx.restore();
                        }

                        // Main angel (center top, less blur)
                        drawAngel(centerX, centerY - eggH * 1.13, eggW * 0.7, false, false);
                        // Blurred angels (sides)
                        drawAngel(centerX - eggW * 1.8, centerY - eggH * 0.4, eggW * 0.6, false, true);
                        drawAngel(centerX + eggW * 1.7, centerY - eggH * 0.5, eggW * 0.55, true, true);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    updateColors() {
        this.backgroundColor = getRandomColor();
    }
}
