import { MeasureUnit } from "@/types/objects/feedstock";
import * as z from "zod"

export const feedstockSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    measure_unit: z.nativeEnum(MeasureUnit),
    unit_cost: z.number().min(0, "Unit cost must be positive"),
    provider: z.string().min(0),
});



export type FormDataFeedstock = z.infer<typeof feedstockSchema>;
