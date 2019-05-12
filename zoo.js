
class Animal {
    constructor (birthYear, speciesName, weight, gender, energyLevel) {
        this.birthYear = birthYear;
        this.speciesName = speciesName;
        this.weight = weight;
        this.gender = gender;
        this.energyLevel = energyLevel;
        
        }

    getAge() {
        return (new Date().getFullYear() - this.birthYear);
    }

    getEnergyLevel() {
        return this.energyLevel;
    }

    setEnergyLevel(energy) {
        this.energyLevel = energy;
    }

    
}

class Bird extends Animal {
    constructor (birthYear, speciesName, weight, gender, energyLevel, numEggs, birdVariety){
        super(birthYear, speciesName, weight, gender, energyLevel);
        this.numEggs = numEggs;
        this.birdVariety = birdVariety;
        }
        
    move() {
        console.log("flap flap");
    }
}

class Monkey extends Animal {
    constructor (birthYear, speciesName, weight, gender, energyLevel, habitat, monkeyVariety){
        super(birthYear, speciesName, weight, gender, energyLevel);
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

    getNumberOfBirds() {
        let numberOfBirds = 0;
        // this.getAnimals().forEach(animal => {
        //     if (animal instanceof Bird) numberOfBirds++; 
        //     });
        this.getAnimals().forEach(function(animal) {
              if (animal instanceof Bird) numberOfBirds++; 
              });
        return numberOfBirds;
    }

    getNumberOfMonkeys() {
        return this.getNumberOfAnimals() - this.getNumberOfBirds();
    }


    createAnimals(n, newBorn){   // newBorn==true means new born animal
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
            let randomenergyLevel = Math.floor(Math.random() * 100) + 1;
            let randomHabitat = Math.floor(Math.random() * 2);
            let randomVariety = Math.floor(Math.random() * 2);
            let randomEggs = newBorn ? 0 : Math.floor(Math.random() * 20);

            if (birdOrMonkey == 1) {
                this.animals.push(new Bird(randomBirthYear, birdSp[randomSpecies], (randomWeight/100).toFixed(2), mf[randomGender],randomenergyLevel, randomEggs, birdV[randomVariety]));
                } else {
                    this.animals.push(new Monkey(randomBirthYear, monkeySp[randomSpecies], randomWeight, mf[randomGender], randomenergyLevel, monkeyH[randomHabitat], monkeyV[randomVariety]));
                }
        }
    
    }

}

myZoo = new Zoo("Noorder Dierenpark");
myZoo.createAnimals(1000, false);
let zooRunning = false;
let runZoo;  // variable for timer
//myZoo.createAnimals(1, true);

function showStatistics() {
    document.getElementById("noBirds").innerText = "Birds: " + myZoo.getNumberOfBirds();
    document.getElementById("noMonkeys").innerText = "Monkeys: " + myZoo.getNumberOfMonkeys();
}

document.getElementById("button").addEventListener("click", start);

function start() {
    if (!zooRunning) {
        runZoo = setInterval(startZoo, 1000);
        document.getElementById("button").style.backgroundColor="red";
        document.getElementById("button").innerText="Click me to pause!";
        zooRunning = true;
    }
    else {
        clearInterval(runZoo);
        document.getElementById("button").style.backgroundColor="rgb(130, 243, 17)";
        document.getElementById("button").innerText="Click me to re-start!";
        zooRunning = false;
    }
}

function startZoo() {
  
    showStatistics();
    myZoo.animals.pop();


}
