export interface Vehicle {

    id: number;
    name: string;
    models: {
        id: number,
        makeId: number,
        name: string
    };


}
