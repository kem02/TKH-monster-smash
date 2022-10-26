//random integer function 
//see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomNum(min, max) {
  //return a random integer between min - max
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

//Fighter class is parent class to Hero and Monster
//Fighter contains everything that both Hero and Monster have - method, properties
class Fighter {
  constructor(name) {
      this.name = name;
      this.healthPoints = 15;
  }
  //hero and monster will both have attack method
  //targetObj is the object representing either Hero or a Monster
  attack(targetObj) {
    let attackPoints = randomNum(1,6);
    targetObj.healthPoints = targetObj.healthPoints - attackPoints;
    return `${this.name} attacked ${targetObj.name}. ${this.name} did ${attackPoints} damage. ${targetObj.name} has ${targetObj.healthPoints} health left`
  }

}

class Hero extends Fighter {
  constructor(name, weapon) {
      super(name);
      this.weapon = weapon;
  }
}



class Monster extends Fighter {
  constructor(name, superPowers){
      super(name);
      this.superPowers = superPowers;
  }
}

let ironman = new Hero("IronMan", "photon cannon")
// console.log(ironman)

let galactus = new Monster("Galactus", "planet destroyer")
// console.log(galactus)



//parameters hero and monster -> pass in galactus and Ironman objects
function playRound(hero, monster) {
  //use randomNum to return either 0 or 1
  // whoGoesFirst = randomNum(0,2)
  //0 = player goes first, 1 = monster goes first
  
  let zeroOrOne = randomNum(0,2);
  //1 or any number higher than 1 -> evaluate to true

  //use if/else to determine who goes first

  //player goes first -> zeroOrOne = 0 -> false -> !false -> evaluate to true
  // ! -> not operator
  //1 = true, 0 = false, !0 = true, !1 = false
  if(zeroOrOne === 0) {
    //if hero goes first, call .attack() method on hero
    //knight is the hero
    let attackMessage = hero.attack(monster); // attack() returns the output string
    alert(attackMessage);
    //then if monsterHealth > 0, run monsterAttack
    if (monster.healthPoints > 0) {
      let attackMessage = monster.attack(hero);
      alert(attackMessage);
    } else {
      alert(`${monster.name} has no more health left.`);
    }
  } 
  
  else { //else zeroOrOne = 1 -> monster attacks first
      //if monster goes first, run monsterAttack
      let attackMessage = monster.attack(hero);
      alert(attackMessage);
      if(hero.healthPoints > 0){
        let attackMessage = hero.attack(monster);
        alert(attackMessage);
      } else {
        alert(`${hero.name} has no more health left.`);
      }
  }

}

function playGame(hero, monster) {
  //beginning game message
  alert(
    `Hello, ${hero.name}! You are fighting ${monster.name}! Your health is at ${hero.healthPoints}, ${monster.name}'s health is at ${monster.healthPoints}`
  );

  let roundNumber = 0;

  //while loop that runs until player or monster's health is <= 0 
  //add the condition in the while loop parentheses 
  while(hero.healthPoints > 0 && monster.healthPoints > 0) {
    roundNumber++
   //write an alert statement that tells the player what round number it is, and the player's and monster's current health points
    alert(`It is round ${roundNumber}. ${hero.name} health is ${hero.healthPoints} and ${monster.name} health is ${monster.healthPoints}`);
   //call playRound inside the while loop
    playRound(hero, monster);
  }
  //outside of while loop, declare a winner and use alert to show a win or lose message 
  if(hero.healthPoints <= 0) {
    alert(`${monster.name} wins with ${monster.superPowers}!`);
  } else {
    alert(`${hero.name} wins with ${hero.weapon}!`);
  }
}

//call playGame to start game

playGame(ironman, galactus);