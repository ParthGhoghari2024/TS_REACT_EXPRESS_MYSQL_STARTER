import { Request, RequestHandler, Response } from "express";
import { StringMappingType } from "typescript";
import con from "../config/db";
import { FieldPacket, QueryResult, RowDataPacket } from "mysql2";

const basicDetailsFormPageController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    res.render("basicDetailsFormPage");
  } catch (error) {
    console.log(error);
  }
};

interface BasicDetailsFormInterface {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipcode: number;
}

const basicDetailsFormPostController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body);

    const basicDetailsFormBody: BasicDetailsFormInterface = {
      fullName: req.body.fullName,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      zipcode: parseInt(req.body.zipcode),
    };
    const insertBasicDetailsSQL = `INSERT INTO  basicDetails(full_name,email,address,city,zipcode) values (?)`;

    const basicDetailsParams: BasicDetailsFormInterface[] =
      Object.values(basicDetailsFormBody);

    const [result] = await con.query<RowDataPacket[]>(insertBasicDetailsSQL, [
      basicDetailsParams,
    ]);

    res.json({ success: 1, result: result });
  } catch (error) {
    console.log(error);
  }
};

const getAllBasicDetailsController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const getAllBasicDetailsSQL = `SELECT id,full_name,email,address,city,zipcode from  basicDetails where deleted_at is null`;

    const [result]: [BasicDetailsFormInterface[], FieldPacket[]] =
      await con.query<BasicDetailsFormInterface[] & RowDataPacket[]>(
        getAllBasicDetailsSQL
      );

    res.json({ success: 1, result: result });
  } catch (error) {
    console.log(error);
  }
};

export {
  basicDetailsFormPageController,
  basicDetailsFormPostController,
  getAllBasicDetailsController,
  BasicDetailsFormInterface,
};
