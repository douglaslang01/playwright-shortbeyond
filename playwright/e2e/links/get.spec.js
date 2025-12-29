import { test, expect } from '../../support/fixtures';

import { getUserWithLinks } from '../../support/factories/user'

test.describe('GET /api/links', () => {

    const user = getUserWithLinks(5);
    let token;

    test.beforeEach(async ({ auth }) => {
        await auth.createUser(user);
        token = await auth.getToken(user);
    });

    test('deve retornar uma lista de links pré-encurtados', async ({ links }) => {
        for (const link of user.links) {
            await links.createLink(link, token);
        }

        const response = await links.getlinks(token);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.message).toBe('Links Encurtados');
        expect(body.count).toBe(user.links.length);
        expect(Array.isArray(body.data)).toBeTruthy()

        for (const [index, link] of body.data.entries()) {
            expect(link).toHaveProperty('id');
            expect(link).toHaveProperty('original_url', user.links[index].original_url);
            expect(link).toHaveProperty('short_code');
            expect(link).toHaveProperty('title', user.links[index].title);

            expect(link.short_code).toMatch(/^[a-zA-Z0-9]{5}/);
        }
    });

    test('deve retornar uma lista vazia', async ({ links }) => {
        const response = await links.getlinks(token);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.count).toBe(0);
        expect(body.data).toHaveLength(0);
        expect(body.message).toBe('Links Encurtados');
    });
});