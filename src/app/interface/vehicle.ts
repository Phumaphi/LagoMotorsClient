

export interface Vehicle {
    id: number;
    name: string;
    modelId: number;
    models: {
        id: number,
        makeId: number,
        name: string
    };
    isRegistered: boolean;
    features: any[];
}
