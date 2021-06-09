import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  crm: number;

  @Column()
  telephone: number;

  @Column()
  cellphone: number;

  @Column()
  cep: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  uf: string;

  @Column()
  district: string;

  @Column('varchar', { array: true })
  expertise: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

export default User;
