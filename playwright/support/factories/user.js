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

export const getUserWithLink = () => {
    const fisrtName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        name: `${fisrtName} ${lastName}`,
        email: faker.internet.email({ fisrtName, lastName }).toLowerCase(),
        password: 'pwd123',
        link: {
            original_url: faker.internet.url(),
            title: faker.music.songName()
        }
    };
}