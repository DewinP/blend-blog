import { IsEmail, Length } from "class-validator";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, select: false })
  @IsEmail()
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  @Length(4, 20)
  password!: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
