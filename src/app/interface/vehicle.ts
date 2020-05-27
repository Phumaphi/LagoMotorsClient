

export interface Vehicle {
    id: number;
    modelId: number;
    isRegistered: boolean;
    features: any[];
    contact: {
        name: string;
        email: string;
        phone: string;
    };
}
