import { Card } from './components';
import { DogApiAdapter } from './services/DogApiAdapter';

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

const style = document.createElement('style');
style.textContent = `
    .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }
`;
document.head.appendChild(style);

const container = document.createElement('div');
container.className = 'cards-container';
document.body.appendChild(container);

const dogApi = new DogApiAdapter();

dogApi.getBreeds()
    .then(breeds => {
        breeds.forEach(breed => {
            const attributes = breed.attributes;

            const card = new Card();
            card.setAttribute('name', attributes.name);
            card.setAttribute('description', attributes.description);
            card.setAttribute('image', 'https://via.placeholder.com/300x200');
            card.setAttribute('male_weight', attributes.male_weight.max.toString());
            card.setAttribute('female_weight', attributes.female_weight.max.toString());
            
            container.appendChild(card);

            console.log(`Card: ${attributes.name}`);
            console.log('Description:', attributes.description);
            console.log('Male Weight:', `${attributes.male_weight.min}-${attributes.male_weight.max} kg`);
            console.log('Female Weight:', `${attributes.female_weight.min}-${attributes.female_weight.max} kg`);
            console.log('-------------------');
        });
    })
    .catch(error => {
        console.error('Error fetching dog breeds:', error);
    });






