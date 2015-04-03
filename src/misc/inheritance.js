'use strict';

/**
 * Constructor for any living being
 * Prototype chain: LivingBeing --> Object.prototype --> null
 */
function LivingBeing () {
    this.isAlive = true;
    this.birthday = new Date();
    this.legs = 0;
    this.diet = '-';
}

LivingBeing.prototype.move = function (distance, direction) {
    console.error('Sorry this living being can\'t move');
}

/**
 * Mammals
 * Prototype chain: Mammal --> LivingBeing.prototype --> Object.prototype --> null
 */
function Mammal() {
    LivingBeing.call(this);
    this.bodyTemperature = 30;
}

// Mammals inherit from LivingBeing
Mammal.prototype = Object.create(LivingBeing.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.move = function (distance, direction) {
    console.log('Walking ' + distance + ' ' + direction);
}
Mammal.prototype.walk = function (distance, direction) {
    this.move(distance, direction);
}

/**
 * Felines
 * Prototype chain: Feline --> Mammal.prototype --> LivingBeing.prototype --> Object.prototype --> null
 */
function Feline() {
    Mammal.call(this);
    this.diet = 'Meat';
    this.legs = 4
}

Feline.prototype = Object.create(Mammal.prototype);
Feline.prototype.constructor = Feline;

function Bird () {
    LivingBeing.call(this);
    this.legs = 2;
    this.wings = 2;
}

Bird.prototype = Object.create(LivingBeing.prototype);
Bird.prototype.constructor = Bird;
Bird.prototype.move = function(distance, direction) {
    console.log('Flying ' + distance + ' ' + direction);
}
Bird.prototype.fly = Bird.prototype.move;

function Parrot () {
    Bird.call(this);
    this.diet = 'Birdseed';
}

Parrot.prototype = Object.create(Bird.prototype);
Parrot.prototype.constructor = Parrot;

var grumpyCat = new Feline();
grumpyCat.walk('1 meter', 'north');

var coralReef = new LivingBeing();
coralReef.move('1 meter', 'south');

var blue = new Parrot();
blue.fly('1 Km', 'east');

function printPrototypeChain(name, object)
{
    console.log('Prototype chain:\n');
    var prototypeObject = Object.getPrototypeOf(object);
    do {
        console.log('--');
        Object.getOwnPropertyNames(prototypeObject).forEach(function(propertyName, idx, array) {
            console.log(propertyName + ' -> ' + prototypeObject[propertyName]);
        });
        prototypeObject = Object.getPrototypeOf(prototypeObject);
    } while (prototypeObject !== null);
    console.log('\n');
}

/**
 * Let's just print the entire prototype chain
 */
printPrototypeChain('LivingBeing', coralReef);
printPrototypeChain('Feline', grumpyCat);
printPrototypeChain('Parrot', blue);
