interface Life {
    max: number;
    min: number;
}

interface Weight {
    max: number;
    min: number;
}

interface Attributes {
    name: string;
    description: string;
    life: Life;
    male_weight: Weight;
    female_weight: Weight;
    hypoallergonic: boolean;
}

interface RelationshipData {
    id: string;
    type: string;
}

interface GroupRelationship {
    data: RelationshipData;
}

interface Relationships {
    group: GroupRelationship;
}

interface Breed {
    id: string;
    type: 'breed';
    attributes: Attributes;
    relationships: Relationships;
}

interface ApiResponse {
    data: Breed[];
}

export class DogApiAdapter {
    private readonly baseUrl: string = 'https://dogapi.dog/api/v2';

    async getBreeds(limit: number = 10): Promise<Breed[]> {
        try {
            const response = await fetch(`${this.baseUrl}/breeds`);
            const data: ApiResponse = await response.json();
            return data.data.slice(0, limit);
        } catch (error) {
            console.error('Error fetching dog breeds:', error);
            throw error;
        }
    }

    async getBreedById(id: string): Promise<Breed | null> {
        try {
            const response = await fetch(`${this.baseUrl}/breeds/${id}`);
            const data: ApiResponse = await response.json();
            return data.data[0] || null;
        } catch (error) {
            console.error(`Error fetching breed with ID ${id}:`, error);
            throw error;
        }
    }
} 