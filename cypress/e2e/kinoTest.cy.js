import seats from '../fixtures/seats';
import seats2 from '../fixtures/seats2';
import correctlogin from '../fixtures/correctlogin';
import wronglogin from '../fixtures/wronglogin';

describe('template spec', () => {
    //beforeEach(() => {
    //    cy.visit('/');
    //});
    it('Тестирование количества дней', () => {
        cy.visit('/');
        cy.get('.page-nav__day').should('have.length', 7);
    });
    it('Тестирование количества сеансов', () => {
        cy.visit('/');
        cy.get('main > :nth-child(1)').should('be.visible');
        cy.get('main > :nth-child(2)').should('be.visible');
        cy.get('main > :nth-child(3)').should('be.visible');
    });
    it('Тестирование выбора сеанса и места', () => {
        cy.visit('/');
        cy.get('.page-nav__day').eq(3).click();
        cy.get('.movie').first().contains('13:00').click();
        cy.get(':nth-child(4) > :nth-child(4)').click();
        cy.get('.acceptin-button').click();
        cy.contains('Вы выбрали билеты:').should('be.visible');
    });

    it('Тестирование выбора мест по диагонали', () => {
        cy.visit('/');
        cy.get('.page-nav__day').eq(4).click();

        cy.get('.movie').first().contains('13:00').click();

        cy.fixture('seats').then((seats) => {
            seats.forEach((seat) => {
                cy.get(
                    `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
                ).click();
            });
        });
        cy.get('.acceptin-button').click();
        cy.contains('1/1, 2/2, 3/3, 4/4, 5/5, 6/6, 7/7').should('be.visible');
    });
    it('Тестирование выбора мест седьмого ряда ', () => {
        cy.visit('/');
        cy.get('.page-nav__day').eq(4).click();

        cy.get('.movie').first().contains('13:00').click();

        cy.fixture('seats2').then((seats) => {
            seats.forEach((seat) => {
                cy.get(
                    `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
                ).click();
            });
        });
        cy.get('.acceptin-button').click();
        cy.contains('7/1, 7/2, 7/3, 7/4, 7/5, 7/6, 7/7, 7/8').should(
            'be.visible'
        );
    });
    it('Тестирование логина и пароля администратора', () => {
        cy.visit('http://qamid.tmweb.ru/admin');
        cy.fixture('correctlogin').then((correctlogin) => {
            const login = correctlogin.login;
            const password = correctlogin.password;
            cy.get('[for="email"] > .login__input').type(login);
            cy.get('[for="pwd"] > .login__input').type(password);
            cy.contains('Авторизоваться').click();
            cy.get('.page-header__subtitle').should('be.visible');
        });
    });
    it('Тестирование неверного логина и пароля администратора', () => {
        cy.visit('http://qamid.tmweb.ru/admin');
        cy.fixture('wronglogin').then((wronglogin) => {
            const login = wronglogin.login;
            const password = wronglogin.password;
            cy.get('[for="email"] > .login__input').type(login);
            cy.get('[for="pwd"] > .login__input').type(password);
            cy.contains('Авторизоваться').click();
            cy.contains('Ошибка авторизации!').should('be.visible');
        });
    });
    it('Тестирование фильма из админки', () => {
        cy.visit('http://qamid.tmweb.ru/admin');
        cy.fixture('correctlogin').then((correctlogin) => {
            const login = correctlogin.login;
            const password = correctlogin.password;
            cy.get('[for="email"] > .login__input').type(login);
            cy.get('[for="pwd"] > .login__input').type(password);
            cy.contains('Авторизоваться').click();
            cy.get('.page-header__subtitle').should('be.visible');

            cy.get(
                '[draggable="true"][data-film-id="122"] > .conf-step__movie-title'
            )
                .then(($el) => $el.textContent)
                .should('have.text', 'Микки маус');
            cy.get(
                '[draggable="true"][data-film-id="122"] > .conf-step__movie-title'
            )
                .invoke('text')
                .then((text) => {
                    cy.visit('qamid.tmweb.ru');
                    cy.get(
                        ':nth-child(2) > .movie__info > .movie__description > .movie__title'
                    ).should('have.text', text);

                    cy.get(':nth-child(2) > .movie-seances__time').click();
                    cy.get(':nth-child(3) > :nth-child(3)').click();
                    cy.get('.acceptin-button').click();
                    cy.contains('Вы выбрали билеты:').should('be.visible');
                });
        });
    });
});
