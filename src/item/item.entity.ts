import { Entity, Column, ObjectIdColumn } from 'typeorm';
// validator : class-validator . example chirt github medium
import { IsString, MinLength, IsNotEmpty, IsNumber } from 'class-validator';

/* tslint:disable */
@Entity()
export class Item {
  @ObjectIdColumn()
  // tslint:disable-next-line: variable-name
  _id: string;
  @Column()
  @IsString()
	@IsNotEmpty()
  name: string;
  @Column()
  @IsString()
	@IsNotEmpty()
  description: string;
  @Column()
  @IsString()
	@IsNotEmpty()
  quantity: number;
}

export class ItemInput {
  @IsString()
	@MinLength(4, {
		message: 'name item must be at least 4 characters'
	})
	@IsNotEmpty({ message: 'item name can not be blank.' })
  name: string;
  @IsNotEmpty({ message: 'description can not be blank.' })
  description: string;
  @IsNumber()
  @IsNotEmpty({ message: 'quantity can not be blank.' })
  quantity: number;
}


export class ItemUpdate {
  @IsString()
	@MinLength(4, {
		message: 'name item must be at least 4 characters'
  })
  name?: string;
  description?: string;
  quantity?: number;
}
