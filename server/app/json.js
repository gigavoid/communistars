var json = [];
var planets = 0;
for (let i = 0; i < galaxy.stars.length; i++) {
    let star = galaxy.stars[i];
    let starObj = {
        color: star.color,
        size: star.size,
        position: star.position,
        planets: []
    };

    for (let j = 0; j < star.planets.length; j++) {
        let planet = star.planets[j];
        let planetObj = {
            distance: planet.distance,
            size: planet.size
        };
        planets++;
        starObj.planets.push(planetObj);
    }
    json.push(starObj);
}
console.log('Writing json');
console.log(planets);
fs.writeFile('galaxy.json', JSON.stringify(json), function(err) {
    if(err) {
        console.log('Could not save galaxy.json', err);
    } else {
        console.log('Galaxy saved');
    }
});
