import Person from "../models/Person.models";

export class PeopleService {
  async createPerson(personData: any) {
    return await Person.create(personData);
  }

  async getAllPeople(limit: number, offset: number, order: any) {
    const data = await Person.findAll({ limit, offset, order });
    const total = await Person.count();
    return { data, total };
  }

  async getPersonById(personId: string) {
    return await Person.findByPk(personId);
  }

  async updatePerson(personId: string, personData: any) {
    const person = await Person.findByPk(personId);
    if (!person) {
      return null;
    }
    return await person.update(personData);
  }
}
