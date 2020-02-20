class SpriteSheetXML {
    constructor(url) {
        this.array = [];
        this.fetchXMLtoArray(url);
    }

    fetchXMLtoArray(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);

        if (xhr.status === 200) {
            var children = xhr.responseXML.children[0].children;
            for (let index = 0; index < children.length; index++) {
                const element = children[index];
                this.array.push({
                    name: element.attributes.name.nodeValue,
                    x: element.attributes.x.nodeValue,
                    y: element.attributes.y.nodeValue,
                    width: element.attributes.width.nodeValue,
                    height: element.attributes.height.nodeValue
                });
            }
        } else {
            console.error('XML file cannot be loaded!')
        }
    }

    findIndex(attribute, value) {
        for (let index = 0; index < this.array.length; index++) {
            const element = this.array[index];
            if (element[attribute] == value) {
                return index;
            }
        }
    }
}

export default SpriteSheetXML;