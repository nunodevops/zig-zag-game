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
        let checkerSize;
        let colors;
        let cols;
        let rows;
        let nascarColors;
        let centerX;
        let centerY;
        let numLines;

        // nascarColors
        nascarColors = ["#ffd659", "#e4002b", "#007ac2"];

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
                        centerX = backgroundCanvas.width / 2;
                        centerY = backgroundCanvas.height / 2;
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
                        // Draw other background
                        ctx.fillStyle = "#1a1a1a";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Draw racing drifts
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

                        // Draw speedometers
                        const numSpeedometers = 10;
                        for (let i = 0; i < numSpeedometers; i++) {
                            const x = Math.random() * backgroundCanvas.width;
                            const y = Math.random() * backgroundCanvas.height;
                            const radius = Math.random() * 50 + 50; // Random size between 50 and 100
                            const speed = Math.floor(Math.random() * 180); // Random speed between 0 and 180

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

                        // Add a subtle overlay to blend everything
                        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        break;
                    case 6:
                        // Draw new background
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

                        // Add a subtle overlay to blend everything
                        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        break;
                    case 7:
                        // Draw everything
                        // Create a dark background
                        ctx.fillStyle = "#1a1a1a";
                        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

                        // Add atmospheric lights
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

                        // draw race track
                        centerX = backgroundCanvas.width / 2;
                        centerY = backgroundCanvas.height / 2;
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

                        // Draw racing lines
                        centerX = backgroundCanvas.width / 2;
                        centerY = backgroundCanvas.height / 2;
                        numLines = 50;

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

                        // draw speed lines
                        centerX = backgroundCanvas.width / 2;
                        centerY = backgroundCanvas.height / 2;
                        numLines = 100;

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
            default:
                break;
        }
    }

    updateColors() {
        this.backgroundColor = getRandomColor();
    }
}
