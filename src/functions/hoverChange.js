function hoverChange(texts) {

    for (let text of texts) {
        // Change color on hover
        text.on("pointerover", () => {
            text.setColor("#ffff00").setScale(1.1); // Yellow when hovered
        });

        text.on("pointerout", () => {
            text.setColor("#ffffff").setScale(1); // Back to white when not hovered
        });
    }
}

export default hoverChange;