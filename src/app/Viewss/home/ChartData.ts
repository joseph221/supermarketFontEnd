export class ChartData{
    apr:number;
    feb:number;
    jan:number;
    jun:number;
    mar:number;
    may:number;

    constructor(jan = 0, feb = 0, mar = 0,apr = 0,may = 0, jun = 0) {
        this.jan = jan;
        this.feb = feb;
        this.mar = mar
        this.apr = apr
        this.may = may
        this.jun = jun
    }

    
}