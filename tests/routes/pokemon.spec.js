/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const { application } = require('express');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'pikachu',
};

describe('ruta /pokemon', () => {
  it("responde con status 200 ruta /pokemon",() => agent.get("/pokemon").expect(200))
});
 
describe('ruta /pokemon/id', () => {
  it("responde con status 200 ruta /pokemon/id",() => agent.get("/pokemon/20").expect(200))
});

describe('ruta /pokemon/recipes?name="', () => {
  it("responde con status 200 ruta /pokemon?name=",() => agent.get(`/pokemon?name=${pokemon.name}`).expect(200))
});

describe('ruta /types', () => {
  it("responde con status 200 ruta /types",() => agent.get("/type").expect(200))
});