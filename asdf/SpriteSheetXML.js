
/**
 * SpriteSheetXML - Reads XML files to get texture data
 * 
 * **XML format must be:**
 * 
 *   <TextureAlias imagePath="">
 * 
 *       <SubTexture x="" y="" width="" height=""></SubTexture>
 *       ...
 *   </TextureAlias>
 */
class SpriteSheetXML {
    /**
     * Set url of XML file
     * @param {String} url Url to XML file
     */
    constructor(url) {
        this.array = [];
        this.fetchXMLtoArray(url);
    }

    /**
     * Fetch XML file and put contents in a JS array
     * @param {String} url Url to XML file
     */
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

    /**
     * Find index of XML element with attribute == value
     * @param {String} attribute XML element attribute
     * @param {String} value Value of XML element attribute
     * @returns {number} Index of XML element
     */
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