

export class Gen{

  // program to get a random item from an array
  public static cena: string[] = ["10","15","20"]
  public static genre: string[] = ["Adventure","Animation","Children","Comedy","Fantasy","Romance","Drama","Action","Crime","Thriller","Horror","Mystery","Sci-Fi","War","Musical","Documentary","IMAX","Western","Film-Noir","(no genres listed)"]
  public static getRandomItem(arr:Array<any>) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
  }
  public static getRndInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  public static addRandomPrice(){
    return this.getRandomItem(this.cena);
  }
  public static addRandomGenre(){
    return this.getRandomItem(this.genre);
  }

  public populateRandomArr(iterations:number){

    let arr = [];

    for (let index = 0; index < iterations; index++) {
      arr.push({

      })

    }
  }

}
