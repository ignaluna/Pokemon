const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
    describe('attack', () => {
      it('should throw an error if attack is a String', (done) => {
        Pokemon.create({ attack: "hola"})
          .then(() => done(new Error('Attack should be an intenger')))
          .catch(() => done());
      });
      it('should work when its a valid attack', () => {
        Pokemon.create({ attack: 50 });
      });
    });
  });
});
