import { Request, Response } from "express";
import { prisma } from "../prisma/client.js";

export const createForm = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const form = await prisma.form.create({
      data: {
        title: formData.title,
        backgroundColor: formData.backgroundColor,
        showLabels: formData.showLabels,
        fontFamily: formData.fontFamily,
        language: formData.language,
        userId: req.user.userId,
        fields: {
          create: formData.fields.map((field: any) => ({
            type: field.type,
            name: field.name,
            label: field.label,
            placeholder: field.placeholder || {},
            backgroundColor: field.backgroundColor,
            value: field?.value || "",
          })),
        },
      },
      include: { fields: true },
    });
    res.status(201).json(form);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Form submission failed" });
  }
};
