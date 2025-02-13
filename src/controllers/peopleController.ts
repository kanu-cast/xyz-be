import { Request, Response } from "express";
import { PeopleService } from "../services/peopleService";
import { getPaginationOptions } from "../utils/pagination";
import Person from "../models/Person.models";
import { sendResponse } from "../utils/sendResponse";

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
    const person = await Person.findByPk(req.params.id);
    if (!person) {
      return sendResponse(res, 404, "Person not found", null, [
        "Person not found"
      ]);
    }
    sendResponse(res, 200, "Person retrieved successfully", person);
  } catch (error) {
    sendResponse(res, 500, "Failed to retrieve person", null, [
      "Internal server error"
    ]);
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const person = await Person.findByPk(req.params.id);
    if (!person) {
      // Use sendResponse and return to stop execution
      return sendResponse(res, 404, "Person not found", null, [
        "Person not found"
      ]);
    }

    const updatedPerson = await person.update(req.body);
    // Use sendResponse without returning
    sendResponse(res, 200, "Person updated successfully", updatedPerson);
  } catch (error) {
    // Use sendResponse without returning
    sendResponse(res, 500, "Failed to update person", null, [
      "Internal server error"
    ]);
  }
};
