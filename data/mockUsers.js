import { faker } from '@faker-js/faker';

// Generate 100 mock users
export const mockUsers = Array.from({ length: 100 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['admin', 'user', 'manager']),
    registrationDate: faker.date.past(),
    status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    lastLogin: faker.date.recent(),
    avatar: faker.image.avatar()
}));