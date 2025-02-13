import { Request, Response } from "express";
import { PeopleService } from "../services/peopleService";
import { getPaginationOptions } from "../utils/pagination";

const peopleService = new PeopleService();

export const createPerson = async (req: Request, res: Response) => {
  try {
    const newPerson = await peopleService.createPerson(req.body);
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(500).json({ message: "Error creating person" });
  }
};

export const getAllPeople = async (req: Request, res: Response) => {
  try {
    const { limit, offset, order } = getPaginationOptions(req);
    const { data, total } = await peopleService.getAllPeople(
      limit,
      offset,
      order
    );
    res.status(200).json({ data, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching people" });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const person = await peopleService.getPersonById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: "Error fetching person" });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const updatedPerson = await peopleService.updatePerson(
      req.params.id,
      req.body
    );
    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(500).json({ message: "Error updating person" });
  }
};
