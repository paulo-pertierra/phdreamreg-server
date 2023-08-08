import { Registree } from "@prisma/client";
import * as registreeService from "./registree.service";
import { query, validationResult } from "express-validator";

export const createRegistree  = async (data: Omit<Registree, "uuid" | "updatedAt" | "createdAt">) => {
  registreeService.createRegistree(data);
}