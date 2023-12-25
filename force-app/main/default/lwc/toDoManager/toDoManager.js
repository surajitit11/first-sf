import { LightningElement } from 'lwc';

export default class ToDoManager extends LightningElement {
     time="11";
     greeting="Good Evening";

    getTime(){
        const date= new Date();
        const hour= date.getHours();
        const min= date.getMinutes();
    }

    getGreetings(hour){
        if(hour < 12){this.greeting= "Good morning";}
        else if(hour >= 12 && hour <17){this.greeting= "Good afternoon";}
        else{this.greeting="Good eveneing";}

    }
}