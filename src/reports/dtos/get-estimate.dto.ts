import { Transform } from "class-transformer";
import { IsNumber, IsString ,Min,Max, IsLongitude, IsLatitude,} from "class-validator";

export class GetEstimateDto{
    @IsString()
    make:string;
    @IsString()
    model:string;

    @Transform(({value})=>parseInt(value))
    @Min(1930)
    @Max(2050)
    year:number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    @Transform(({value})=>parseInt(value))
    mileage:number
    @Transform(({value})=>parseFloat(value))
    @IsLongitude()
    lng:number;
    @Transform(({value})=>parseFloat(value))

    @IsLatitude()
    lat:number



}