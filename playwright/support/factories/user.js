import { faker } from '@faker-js/faker';

export const getUser = () => {

    const fisrtName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        name: `${fisrtName} ${lastName}`,
        email: faker.internet.email({ fisrtName, lastName }).toLowerCase(),
        password: 'pwd123'
    };
}