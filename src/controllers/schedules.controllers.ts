import { Request, Response } from "express";
import { AppError } from "../errors";
import { iSchema } from "../interfaces/schedule.interfaces";
import createScheduleService from "../services/schedule/createSchedule.service";
import readSchedulesByRealEstateIdService from "../services/schedule/readSchedulesByRealEstateId.service";

const createSheduleController = async (req: Request, res: Response): Promise<Response> => {

    const shBody: iSchema = req.body
    const userId = Number(req.user.id)
    const {hour, date} = shBody

    let hours = Number(hour.split(':')[0])
    let minutes = hour.split(':')[1]
    if(req.body.hour != `${hours}:${minutes}`) throw new AppError("Invalid hour, available times are 8AM to 18PM", 400)
    if(hours >= 18 || hours < 8) throw new AppError("Invalid hour, available times are 8AM to 18PM", 400)

    let year = date.split('/')[0]
    if(year.length != 4) throw new AppError('bed format A', 400)
    let day = date.split('/')[1]
    if(day.length != 2 || Number(day) > 30 || Number(day) < 0) throw new AppError('bed format B', 400)
    let month = date.split('/')[2]
    if(month.length != 2 || Number(month) > 12 || Number(month) < 0) throw new AppError('bed format C', 400)
    if(req.body.date != `${year}/${day}/${month}`) throw new AppError("bed format BODY", 400)
    let asd = new Date(`${year}/${month}/${day}`).getDay()
    if(asd == 0 || asd == 6) throw new AppError("Invalid date, work days are monday to friday", 400)

    shBody.date = `${year}/${month}/${day}`

    await createScheduleService(shBody, userId)

    return res.status(201).json({message: "Schedule created"})

}

const readSchedulesByRealEstateIdController = async (req: Request, res: Response): Promise<Response> => {

    if(!req.user.admin) throw new AppError("Insufficient permission", 403);

    const list = await readSchedulesByRealEstateIdService(Number(req.params.id))

    if(!list?.schedules) throw new AppError("RealEstate not found", 404);

    return res.json(list)

}

export {createSheduleController, readSchedulesByRealEstateIdController}