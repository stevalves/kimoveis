import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
class Categories {
    
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

}

export { Categories };
