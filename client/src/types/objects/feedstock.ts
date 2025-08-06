

export enum MeasureUnit {
    KILOGRAMMS = "KILOGRAMMS",
    UNIT = "UNIT",
    HOURS = "HOURS",
    OTHERS = "OTHERS"
}


export interface CreateFeedStock {
    name: string
    description: string
    measure_unit: MeasureUnit
    unit_cost: number
    provider: string | null
}


export interface Feedstock extends CreateFeedStock {
    created_at: Date
    updated_at: Date
    id: string
    is_deleted: boolean | null
}


export interface ResponseFeedstock {
    description?: string,
    message?: string,
    error?: string
}