
class Animal {
    constructor (birthYear, speciesName, weight, gender, location) {
        this.birthYear = birthYear;
        this.speciesName = speciesName;
        this.weight = weight;
        this.gender = gender;
        this.location = location;
        }
    getAge() {
        return (new Date().getFullYear() - this.birthYear);
    }

}

class Bird extends Animal {
    constructor (birthYear, speciesName, weight, gender, location, numEggs, birdVariety){
        super(birthYear, speciesName, weight, gender, location);
        this.numEggs = numEggs;
        this.birdVariety = birdVariety;
        }
        
    move() {
        console.log("flap flap");
    }
}

class Monkey extends Animal {
    constructor (birthYear, speciesName, weight, gender, location, habitat, monkeyVariety){
        super(birthYear, speciesName, weight, gender, location);
        this.habitat = habitat;
        this.monkeyVariety = monkeyVariety;
        }
    move() {
        console.log("climbing...");
    }
}

class Zoo {
    constructor (zooName) {
        this.zooName = zooName;
        this.maxVisitors = 5000;
        this.animals = [];  // array which will contain all individual animals
    }

    getAnimals() {
        return this.animals;
    }

    getAnimal(n) {
        return this.animals[n];
    }

    getNumberOfAnimals() {
        return this.animals.length;
    }

    createAnimals(n, newBorn){   // newBorn is a boolean to indicate if animal has just been born or not
    let birdSp = ["Canary", "Parrot", "Cockatoo", "Ostrich", "Pheasant"];
    let monkeySp = ["Orang-utan", "Gorilla", "Chimpansee", "Maki", "Baboon"];
    let mf = ["Male", "Female"];
    let monkeyH = ["Trees", "Rocks"];
    let monkeyV = ["Narrow Nosed", "Wide Nosed"];
    let birdV = ["Bird of Prey", "Water Bird"];
    let currentYear = new Date().getFullYear();

        for (let i = 0; i<n; i++) {
            let birdOrMonkey = Math.floor(Math.random() * 2);
            let randomBirthYear = (newBorn ? currentYear : currentYear - Math.floor(Math.random() * 20));
            let randomSpecies = Math.floor(Math.random() * 5);
            let randomWeight =  newBorn ? Math.floor(Math.random() * 30) + 1: Math.floor(Math.random() * 300) + 1;
            let randomGender = Math.floor(Math.random() * 2);
            let randomLocation = Math.floor(Math.random() * 300) + 1;
            let randomHabitat = Math.floor(Math.random() * 2);
            let randomVariety = Math.floor(Math.random() * 2);
            let randomEggs = newBorn ? 0 : Math.floor(Math.random() * 20);

            if (birdOrMonkey == 1) {
                this.animals.push(new Bird(randomBirthYear, birdSp[randomSpecies], (randomWeight/100).toFixed(2), mf[randomGender], "Enclosure: " + randomLocation, randomEggs, birdV[randomVariety]));
            } else {
                this.animals.push(new Monkey(randomBirthYear, monkeySp[randomSpecies], randomWeight, mf[randomGender], "Enclosure: " + randomLocation, monkeyH[randomHabitat], monkeyV[randomVariety]));
            }
        }
    
    }


}

myZoo = new Zoo("Noorder Dierenpark");
myZoo.createAnimals(1000, false);
myZoo.createAnimals(1, true);

// console.log(myZoo.getAnimals());
// console.log(myZoo.getAnimal(10));
// myZoo.getAnimal(10).move();

let numberOfBirds = 0;
myZoo.getAnimals().forEach(animal => {
    if (animal instanceof Bird) numberOfBirds++; 
});

document.getElementById("noBirds").innerText = "Birds: " + numberOfBirds;
document.getElementById("noMonkeys").innerText = "Monkeys: " + (myZoo.getNumberOfAnimals() - numberOfBirds);

console.log(myZoo.getAnimal(500));
