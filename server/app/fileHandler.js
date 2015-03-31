'use strict';

var fs = require('fs');

class FileHandler{
    writeToFile(galaxy) {
        let writeStream = fs.createWriteStream(__dirname + '/world' + (+new Date()) + '.galaxy');
        var i = 0;

        function writeStars() {
            var cont = true;
            while (cont && i < galaxy.stars.length) {
                let star = galaxy.stars[i];

                // Color int (4), Size double (8), Poisiton double (8 * 3), NumPlanets byte (1)
                var starBuffer = new Buffer(4 + 8 + 8 * 3 + 1);
                starBuffer.writeUInt32BE(star.color, 0);
                starBuffer.writeDoubleBE(star.size, 4);
                starBuffer.writeDoubleBE(star.position.x, 12);
                starBuffer.writeDoubleBE(star.position.y, 20);
                starBuffer.writeDoubleBE(star.position.z, 28);
                starBuffer.writeUInt8(star.planets.length, 36);
                writeStream.write(starBuffer);
                var innerCont = true;

                for (let j = 0; j < star.planets.length; j++) {
                    let planet = star.planets[j];

                    // Distance double (8), Size dobule (8)
                    var planetBuffer = new Buffer(8 + 8);
                    planetBuffer.writeDoubleBE(planet.distance, 0);
                    planetBuffer.writeDoubleBE(planet.size, 8);
                    innerCont = writeStream.write(planetBuffer);
                }

                cont = innerCont;
                i++;
            }
            if (i < galaxy.stars.length) {
                writeStream.needDrain = true;
                writeStream.once('drain', writeStars);
            } else {
                writeStream.end();
                console.log('File written (' + i + ' stars)');
            }
        }

        writeStars();
    }
}

module.exports = FileHandler;