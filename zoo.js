"use strict"

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

    getSpeciesName() {
        return this.speciesName;
    }

    setEnergyLevel(energy) {
        this.energyLevel = energy;
    }

    live() {
        this.energyLevel--;
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
        this.deadAnimals = [];
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
        this.getAnimals().forEach(function(animal) {
              if (animal instanceof Bird) numberOfBirds++; 
              });
        return numberOfBirds;
    }

    getNumberOfMonkeys() {
        return this.getNumberOfAnimals() - this.getNumberOfBirds();
    }

    getName() {
        return this.zooName;
    }

    getNumberOfDeadAnimals() {
        return this.deadAnimals.length;
    }

    addDeadAnimal(animal) {
        this.deadAnimals.push(animal);
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

let myZoo = new Zoo("Noorder Dierenpark");  // creates new zoo 
myZoo.createAnimals(1000, false);       // creates animals in zoo with newBorn = false
let zooRunning = false;
let runZoo;  // variable for timer
let lastTenDead = new Array(10);
lastTenDead.fill("alive", 0, 10);

document.getElementById("zooName").innerText = myZoo.getName();

//experimental
for (let i = 0; i < 10; i++){
    let node = document.createElement("P");
    let textnode = document.createTextNode(".");
    node.appendChild(textnode);
    document.getElementById("deaths").appendChild(node);
}

function showStatistics() {
    document.getElementById("noBirds").innerText = "Birds: " + myZoo.getNumberOfBirds();
    document.getElementById("noMonkeys").innerText = "Monkeys: " + myZoo.getNumberOfMonkeys();
    document.getElementById("deadAnimals").innerText = "Animals dead: " + myZoo.getNumberOfDeadAnimals();

    //experimental code beneath
    for (let i = 0; i < 10; i++){
        document.getElementById("deaths").childNodes[i+3].innerText = lastTenDead[i];
    }

}

document.getElementById("button").addEventListener("click", start);

function start() {
    if (!zooRunning) {
        runZoo = setInterval(startZoo, 1000);
        document.getElementById("button").style.backgroundColor = "rgb(248, 166, 89)";
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

function animalsLive() {                                        // decreases animals energylevel
    let animals = myZoo.getAnimals();
    for(let i = 0; i < animals.length ; i++) {
        animals[i].live(); 
            if (animals[i].getEnergyLevel() == 0) {
                
                lastTenDead.splice(0,1);
                lastTenDead.push(animals[i].getSpeciesName());
                myZoo.addDeadAnimal(animals.splice(i,1));        // add deceased animal to deadAnimal array
            }
        }
}



function startZoo() {
  
    showStatistics();
    animalsLive();
    


}
